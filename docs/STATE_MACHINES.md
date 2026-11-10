# State machine di Ritelrasional.app

Setiap bagian UI yang punya "keadaan" ditulis sebagai state machine eksplisit lewat `site/js/fsm.js`. Tujuannya:

- **UX**: tombol yang tidak berlaku dinonaktifkan, label selalu sesuai keadaan, dan klik ganda atau timer yang terlambat tidak bisa merusak tampilan.
- **DX**: transisi bisa dibaca di satu tempat. Event yang tidak sah diabaikan, bukan dicegah dengan `if` yang tersebar.
- **AX** (agent experience): agen bisa membaca dan menggerakkan UI tanpa menebak, lewat `data-state` dan `window.Machines`.

## API

```js
const m = Machines.create({
  id: "contoh",
  initial: "idle",
  context: { n: 0 },
  states: {
    idle:    { enter(ctx, payload, m) {}, on: { START: "running" } },
    running: { exit(ctx) {}, on: {
      STOP: "idle",
      TICK: { guard: (ctx, p) => ctx.n < 10, action: (ctx) => ctx.n++ },   // tanpa target = tetap di state yang sama
    } },
  },
}, { register: true });          // register:false untuk instance sementara (mis. kuis)

m.send("START");      // true jika transisi terjadi, false jika diabaikan
m.can("STOP");        // apakah event sah sekarang (memperhitungkan guard)
m.state; m.context; m.events(); m.enabled(); m.history(); m.definition();
m.bind(element);      // menulis data-machine="contoh" data-state="running" ke elemen
m.subscribe((state, from, event, ctx) => {});
```

Aturan penting:

- `enter` dan `exit` **hanya** berjalan saat state berubah. Transisi ke state yang sama (mis. `START` saat `running`) hanya menjalankan `action`, jadi letakkan pekerjaan yang harus diulang di `action`.
- Urutan: `exit(from)` → `action` → state berganti → `enter(to)` → `data-state` diperbarui → subscriber dipanggil.
- `localStorage.setItem("rr_debug_fsm","1")` menampilkan log setiap transisi dan event yang diabaikan di console.

`QuizUI.bind(box, { buttons, key, correct, onAnswer })` adalah machine `open → answered` yang dipakai **semua** kuis. Jawaban hanya diterima sekali, tombol diberi `aria-pressed` lalu dinonaktifkan, dan `.ex` dijadikan live region.

## Daftar machine

| id | File | State | Event | Masalah yang dihilangkan |
|---|---|---|---|---|
| `menu` | app.js | `closed` ⇄ `open` | TOGGLE, OPEN, CLOSE | Drawer HP tidak bisa ditutup lewat klik di luar atau Esc; tidak ada `aria-expanded`; fokus tidak dikembalikan |
| `termPopover` | app.js | `hidden` ⇄ `shown` | SHOW(el), TOGGLE_SAME, HIDE | Mengetuk istilah yang sama tidak menutup popover; tidak ada atribut aksesibilitas |
| `theme` | app.js | `system` → `light` → `dark` → `system` | NEXT | Tidak bisa kembali ke "ikut sistem"; label tidak menunjukkan keadaan |
| `lang` | app.js | `id` ⇄ `en` | ID, EN (lewat `window.setLang`) | Tombol tidak memberi tahu bahasa aktif (`aria-pressed`) |
| `readAloud` | guide.js | `unsupported` \| `idle` ⇄ `speaking` | PLAY, STOP, END(token) | Event `end` dari pemutaran lama mematikan pemutaran baru; peringatan "tidak ada suara" muncul sebelum daftar suara selesai dimuat |
| `orderBookLab` | lab.js | `idle` → `running` ⇄ `paused` → `revealed` | START, PAUSE, RESUME, GUESS, SPEED, STOP | Timer tembok palsu bocor ke ronde berikutnya; tombol Jeda aktif setelah menebak; waktu "amati" ikut menghitung masa jeda |
| `guide` | guide.js | `list` \| `step` (context `i`, `total`) | NEXT, PREV, GOTO(n) | Tidak ada navigasi keyboard (← →); langkah aktif tidak diumumkan (`aria-current`) |
| `quiz` (tidak didaftarkan, satu per kuis) | fsm.js | `open` → `answered` | ANSWER({key}) | Kuis Matriks Asing & Kamus Broker bisa dijawab berkali-kali; enam implementasi kuis berbeda |
| `flashcards` | cfa.js | `front` ⇄ `back`, `empty` | FLIP, AGAIN, KNOW, EMPTY | "Hafal" saat kartu habis menandai kartu lama; kartu bukan tombol (tidak bisa dipakai lewat keyboard) |
| `indicatorData` | indicators.js | `ready` \| `loading` \| `error` | LOAD(file), LOADED, FAIL, DEMO, DISMISS | CSV yang selesai dimuat setelah pindah halaman menimpa halaman lain; error memakai `alert()`; berkas lama bisa menang atas berkas baru |

### Diagram

```
menu            closed ──TOGGLE/OPEN──▶ open ──TOGGLE/CLOSE──▶ closed
termPopover     hidden ──SHOW(el)──▶ shown ──HIDE / TOGGLE_SAME──▶ hidden ; shown ──SHOW(el lain)──▶ shown
theme           system ──NEXT──▶ light ──NEXT──▶ dark ──NEXT──▶ system
readAloud       idle ──PLAY──▶ speaking ──STOP / END(token cocok)──▶ idle
orderBookLab    idle ──START──▶ running ⇄ paused ; running|paused ──GUESS──▶ revealed ; * ──START──▶ running ; * ──STOP──▶ idle
guide           step(i) ──NEXT [i<total-1] / PREV [i>0] / GOTO(n)──▶ step(i')
quiz            open ──ANSWER──▶ answered
flashcards      front ⇄ back (FLIP) ; front|back ──KNOW/AGAIN──▶ front ; ──EMPTY──▶ empty
indicatorData   ready|error ──LOAD──▶ loading ──LOADED(token)──▶ ready ; loading ──FAIL(token)──▶ error ; loading ──LOAD──▶ loading (berkas baru menggantikan)
```

## Menambah machine baru

1. Tulis definisi state & event dulu, lalu tempelkan efek samping (timer, DOM) di `enter`/`exit`/`action`.
2. Semua yang asinkron (timer, FileReader, speech) harus membawa **token** atau memeriksa state saat selesai. Hasil yang datang terlambat dikirim sebagai event dan ditolak oleh guard.
3. Panggil `.bind(elemen)` supaya `data-state` tersedia untuk CSS & agen.
4. Kalau halaman punya machine yang menjalankan timer, sediakan `unmount()` di modul halaman. Router memanggilnya saat pindah halaman.
5. Tambahkan baris di tabel di atas.
