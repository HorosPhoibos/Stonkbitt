# Stonkbitt — Sekolah Saham Indonesia

Masterclass saham & trading Indonesia dari A sampai Z, dwibahasa (ID/EN), untuk dipakai sendiri dan dibagikan. Dibuat oleh **Horos Phoibos**. Tanpa build step, cukup HTML/CSS/JS statis. Progres, catatan, dan skor tersimpan di browser masing-masing (localStorage).

## Cara membuka

```bash
cd ~/Documents/websites/stonkbitt/site && python3 -m http.server 8770
```

Lalu buka **http://localhost:8770**. Dari HP di WiFi yang sama: `http://<IP-Mac>:8770`.

## Isi

| Bagian | Isi |
|---|---|
| Kelas Pemula (16 pelajaran) | Level 1 (pengenalan) & Level 2 (dasar analisis), tiap pelajaran dengan grafik & soal |
| Ekspektasi Realistis | "Adakah cara pasti?", langkah konkret membaca peluang, klaim buku vs statistik, simulator Monte Carlo |
| Riset & Metode | Temuan jurnal top (JF, JFE, RFS, Econometrica, JFQA…) termasuk studi data Indonesia, dengan resep gabungan berbasis bukti |
| Lab Indikator | Fibonacci, RSI, Ichimoku, MA, MACD, Bollinger + backtest (unggah CSV), win rate dengan rentang 95%, in-sample vs out-of-sample |
| Indeks & LQ45 | 45 konstituen periode 2 Nov 2026 – 29 Jan 2027, sektor & penggerak global |
| Pengaruh Global | Jalur USD/S&P/suku bunga/komoditas, simulasi skenario, checklist pagi, kalkulator korelasi & beta |
| Modul A–G (31 pelajaran) | Dasar BEI · Fundamental · Teknikal · Bandarmologi & volume (Wyckoff, VSA, broker summary) · Order book & tape reading · Foreign flow · Risiko & psikologi |
| Lab Order Book | Simulator order book + running trade (update 1/2/3 detik), 7 perilaku tersembunyi (akumulasi, markup, distribusi, guyur, spoofing, FOMO ritel, sideways), mode X-ray F/D & broker, ringkasan akhir sesi |
| Lab Broker Summary | Soal acak membaca konsentrasi broker, avg price, net foreign |
| Kamus Kode Broker | Kode broker yang sering muncul + kuis hafalan |
| Matriks Asing vs Lokal | Kombinasi harga × net foreign × broker lokal + kuis kasus |
| Jalur CFA | Peta topik L1–L3 ↔ WPPE/WMI ↔ materi & buku, rencana waktu, flashcard rumus |
| Tools (15 kalkulator) | Bunga bersih deposito (PPh 20% + cek LPS), kupon bersih obligasi/SBN (PPh 10%), harga/YTM/durasi obligasi, fee & BEP, ARA/ARB, position size, average down, expectancy, DCF, PBV/PER wajar, dividen, right issue, compounding/DCA, CAGR, CAPM/WACC |
| Pustaka | 45 buku, dipetakan ke modul |
| Kamus Istilah | Dwibahasa; istilah di dalam pelajaran bisa diketuk untuk melihat artinya |

## Catatan aturan (per November 2026)

- Kode broker & tipe investor tidak tampil real-time di running trade sejak 2021 (BEI/OJK masih mengkaji pembukaan kembali).
- ARB asimetris 7% berlaku sementara 19 Okt – 31 Des 2026; harga minimum saham Rp1 sejak 28 Sep 2026.
- Non-cancellation period pre-opening (08.56) & pre-closing (15.56) sejak 15 Des 2025.

Aturan bursa sering berubah: perbarui `site/js/lessons.js` (pelajaran A2, A3) bila ada SK baru.

Materi untuk edukasi, bukan rekomendasi investasi. Data di Lab adalah simulasi dengan ticker fiktif.

## Desain

Teks isi 17–18px, spasi baris 1,65, lebar baca ±68 karakter, font Atkinson Hyperlegible Next (isi), Fraunces (judul), JetBrains Mono (angka). Tema terang/gelap mengikuti sistem dan bisa diganti. Logo & favicon ada di `site/assets/`.
