/* Kurikulum Stonkbitt — semua materi ditulis ulang dengan bahasa sendiri.
   Struktur: modul → pelajaran { id, t (judul), m (menit), inti, body (HTML), trap, prak, ref } */
window.MODULES = [
/* ============================== A ============================== */
{ id:"A", t:"Dasar Bursa Efek Indonesia", d:"Cara kerja pasar: siapa pemainnya, satuan, aturan harga, jam, biaya, aksi korporasi.", lessons:[
{ id:"a1", t:"Ekosistem pasar modal: siapa mengerjakan apa", m:8,
inti:"Kamu beli saham lewat <b>broker (Anggota Bursa/AB)</b>, order dicocokkan di <b>BEI</b>, dijamin penyelesaiannya oleh <b>KPEI</b>, dan sahamnya disimpan di <b>KSEI</b> atas nama SID-mu. Semuanya diawasi <b>OJK</b>.",
body:`
<div class="tablewrap"><table><tr><th>Lembaga</th><th>Peran</th><th>Yang kamu rasakan</th></tr>
<tr><td><b>OJK</b></td><td>Regulator & pengawas (UU Pasar Modal, UU P2SK)</td><td>Izin broker, sanksi manipulasi, perlindungan investor</td></tr>
<tr><td><b>BEI / IDX</b></td><td>Menyelenggarakan perdagangan (JATS)</td><td>Jam bursa, fraksi harga, ARA/ARB, suspensi, UMA</td></tr>
<tr><td><b>KPEI</b></td><td>Kliring & penjaminan</td><td>Transaksi tetap selesai walau lawanmu gagal bayar</td></tr>
<tr><td><b>KSEI</b></td><td>Kustodian sentral</td><td>SID, rekening efek, AKSes (cek saldo sahammu langsung)</td></tr>
<tr><td><b>Anggota Bursa</b></td><td>Broker / perusahaan efek</td><td>Aplikasi trading, fee, kode broker 2 huruf (YP, PD, AK…)</td></tr>
<tr><td><b>Bank RDN</b></td><td>Rekening Dana Nasabah</td><td>Uangmu terpisah dari uang broker</td></tr></table></div>
<h3>Siklus penyelesaian T+2</h3>
<p>Transaksi di pasar reguler selesai (settlement) <b>2 hari bursa</b> setelah transaksi. Beli Senin → saham & kewajiban bayar efektif Rabu. Ini penting untuk: tanggal <i>cum</i> dividen, dan menghitung kapan dana jual bisa ditarik.</p>
<h3>SID vs Sub-Rekening</h3>
<p>Satu orang punya satu <b>SID</b> (Single Investor Identification), tapi bisa punya banyak sub-rekening efek di broker berbeda. Data SID inilah yang membuat bursa tahu sebuah transaksi dilakukan investor <b>domestik</b> atau <b>asing</b> — <u>bukan</u> dari broker-nya. (Ini kunci di modul F.)</p>`,
trap:"Mengira broker asing = investor asing. Broker seperti YP (Mirae) dimiliki grup Korea, tapi mayoritas nasabahnya ritel lokal. Status asing ditentukan oleh tipe investor, bukan kepemilikan broker.",
prak:"Login ke AKSes KSEI (akses.ksei.co.id) dan cocokkan saldo saham di sana dengan di aplikasimu. Biasakan ini setahun sekali.",
ref:"Situs OJK, IDX, KSEI. Buku Hukum Pasar Modal (UU No. 8/1995 jo. UU 4/2023 P2SK)." },

{ id:"a2", t:"Lot, fraksi harga, ARA & ARB, papan pencatatan", m:12,
inti:"1 lot = 100 lembar. Harga hanya bisa bergerak per <b>fraksi</b> tertentu. Dalam sehari harga dibatasi <b>ARA</b> (atas) dan <b>ARB</b> (bawah). Tiap papan pencatatan punya aturan sendiri.",
body:`
<h3>Fraksi harga (tick size)</h3>
<div class="tablewrap"><table><tr><th>Rentang harga</th><th>Fraksi</th><th>Contoh langkah</th></tr>
<tr><td>&lt; Rp200</td><td class="num">Rp1</td><td class="num">150 → 151</td></tr>
<tr><td>Rp200 – &lt; Rp500</td><td class="num">Rp2</td><td class="num">342 → 344</td></tr>
<tr><td>Rp500 – &lt; Rp2.000</td><td class="num">Rp5</td><td class="num">940 → 945</td></tr>
<tr><td>Rp2.000 – &lt; Rp5.000</td><td class="num">Rp10</td><td class="num">3.380 → 3.390</td></tr>
<tr><td>≥ Rp5.000</td><td class="num">Rp25</td><td class="num">5.325 → 5.350</td></tr></table></div>
<p>Kenapa penting? Persentase 1 tick berbeda. Di harga 5.000, 1 tick = 0,5%. Di harga 200, 1 tick = 1% (fraksi 2). Di harga 50, 1 tick = 2%. Saham murah "lompat"nya terasa lebih liar.</p>
<h3>Auto Rejection (ARA/ARB)</h3>
<p>Batas ARA umum (Papan Utama/Pengembangan/Ekonomi Baru) dihitung dari harga acuan (penutupan kemarin):</p>
<div class="tablewrap"><table><tr><th>Harga acuan</th><th>ARA</th></tr>
<tr><td>Rp50 – Rp200</td><td>35%</td></tr><tr><td>&gt; Rp200 – Rp5.000</td><td>25%</td></tr><tr><td>&gt; Rp5.000</td><td>20%</td></tr></table></div>
<div class="note warn"><b>Aturan 2026 sedang berubah-ubah.</b> Per 28 Sep 2026 BEI menurunkan harga minimum saham menjadi Rp1. Per 19 Okt 2026 BEI menerapkan <b>ARB asimetris 7%</b> (berlaku s.d. 31 Des 2026, akan dievaluasi), dan saham Rp11–Rp14 ARB-nya Rp1. BEI juga menyebut rencana kembali ke ARB simetris. Selalu cek SK terbaru di idx.co.id → Peraturan, atau lihat angka ARA/ARB yang ditampilkan aplikasimu (seperti kolom ARA/ARB di panel Stockbit).</div>
<h3>Papan pencatatan</h3>
<ul>
<li><b>Utama</b> — emiten besar & mapan (BBCA, ASII, TLKM).</li>
<li><b>Pengembangan</b> — emiten yang belum memenuhi syarat Utama.</li>
<li><b>Akselerasi</b> — aset kecil/menengah; aturan harga & AR berbeda.</li>
<li><b>Ekonomi Baru</b> — perusahaan teknologi dengan struktur khusus.</li>
<li><b>Pemantauan Khusus</b> — saham bermasalah (likuiditas sangat rendah, ekuitas negatif, notasi tertentu). Diperdagangkan dengan <b>Full Call Auction (FCA)</b>: order dikumpulkan dulu, lalu dicocokkan di satu harga. Order book FCA tidak bisa dibaca seperti saham biasa.</li></ul>
<h3>Notasi khusus & UMA</h3>
<p>Huruf di belakang kode (mis. <code>E</code> ekuitas negatif, <code>L</code> telat laporan keuangan, <code>X</code> pemantauan khusus) adalah peringatan. <b>UMA (Unusual Market Activity)</b> adalah pengumuman BEI kalau pergerakan harga/volume tidak wajar — sering mendahului <b>suspensi</b>. Banyak saham "gorengan" mendapat UMA.</p>`,
trap:"Pasang antrian di harga yang tidak sesuai fraksi — order ditolak. Atau mengira ARA 25% berlaku sama untuk semua papan & semua periode.",
prak:"Buka 5 saham di aplikasimu dengan harga di rentang berbeda. Hitung sendiri ARA-nya, lalu bandingkan dengan angka ARA di aplikasi. Pakai kalkulator di halaman Tools.",
ref:"Peraturan II-A BEI; pengumuman BEI 21 Sep & 19–20 Okt 2026." },

{ id:"a3", t:"Jam bursa, sesi, dan pasar reguler vs negosiasi", m:9,
inti:"Order book paling 'jujur' terjadi di sesi kontinu. Pre-opening & pre-closing memakai mekanisme lelang (call auction) — di situ banyak permainan antrian, makanya BEI menerapkan <b>non-cancellation period</b>.",
body:`
<div class="tablewrap"><table><tr><th>Fase</th><th>Senin–Kamis</th><th>Jumat</th><th>Catatan</th></tr>
<tr><td>Pre-opening</td><td class="num">08.45–08.58</td><td class="num">08.45–08.58</td><td>Order masuk; mulai 08.56 order tidak bisa diubah/dibatalkan</td></tr>
<tr><td>Sesi I</td><td class="num">09.00–12.00</td><td class="num">09.00–11.30</td><td>Continuous auction</td></tr>
<tr><td>Sesi II</td><td class="num">13.30–15.49</td><td class="num">14.00–15.49</td><td>Continuous auction</td></tr>
<tr><td>Pre-closing</td><td class="num">15.50–16.00</td><td class="num">15.50–16.00</td><td>Lelang penutupan; mulai 15.56 non-cancellation, closing acak</td></tr>
<tr><td>Post-trading</td><td class="num">16.01–16.15</td><td class="num">16.01–16.15</td><td>Transaksi di harga penutupan</td></tr></table></div>
<p class="hint">Jam diringkas dari Peraturan II-A (Kep-00003/BEI/04-2025) & aturan non-cancellation 15 Des 2025. BEI pernah mengkaji tambahan 30 menit — cek idx.co.id kalau ada perubahan.</p>
<h3>Pasar Reguler, Negosiasi, Tunai</h3>
<ul><li><b>Reguler</b>: order book biasa, harga harus sesuai fraksi & AR. Ini yang kamu baca di order book.</li>
<li><b>Negosiasi (nego/crossing)</b>: transaksi blok antar pihak yang sudah sepakat. Tidak lewat order book. Sering dipakai institusi, tutup sendiri (crossing), atau pengalihan saham. Bisa <b>mendistorsi data asing</b> — net foreign buy Rp1T bisa saja satu transaksi nego.</li>
<li><b>Tunai</b>: settlement T+0, dipakai khusus (mis. saat hak memesan).</li></ul>
<h3>IEP & IEV saat lelang</h3>
<p>Saat pre-opening/pre-closing, aplikasi menampilkan <b>IEP</b> (Indicative Equilibrium Price) dan <b>IEV</b> (volume). Harga ini bisa dimainkan dengan order besar yang ditarik sebelum 08.56 — itulah alasan non-cancellation period.</p>`,
trap:"Membaca 'asing net buy besar' tanpa memisahkan reguler vs nego. Selalu cek apakah ada transaksi nego besar hari itu.",
prak:"Besok pagi, amati IEP satu saham dari 08.45 sampai 08.58. Catat perubahannya sebelum dan sesudah 08.56.",
ref:"Peraturan II-A BEI; FAQ Non-Cancellation Period." },

{ id:"a4", t:"Jenis order, biaya, dan pajak transaksi", m:8,
inti:"Di BEI, semua order sebenarnya <b>limit order</b>. Fitur seperti auto-buy, take profit, stop loss, trailing adalah fasilitas aplikasi broker yang mengirim limit order saat syarat terpenuhi.",
body:`
<h3>Biaya umum (cek broker-mu)</h3>
<div class="tablewrap"><table><tr><th>Komponen</th><th>Beli</th><th>Jual</th></tr>
<tr><td>Fee broker + levy BEI/KPEI/KSEI + PPN</td><td>~0,15%</td><td>~0,15%</td></tr>
<tr><td>PPh final penjualan saham</td><td>–</td><td>0,10% dari nilai jual</td></tr>
<tr><td><b>Total kira-kira</b></td><td>~0,15%</td><td>~0,25%</td></tr></table></div>
<p>Artinya harga harus naik sekitar <b>0,4%</b> hanya untuk impas (BEP). Di saham Rp5.000, itu ~1 tick. Hitung presisi di <a href="#/tools?t=fee">kalkulator Fee & BEP</a>.</p>
<h3>HAKA & HAKI</h3>
<ul><li><b>HAKA</b> (Hajar Kanan): beli langsung di harga offer → transaksi tercatat sebagai <span class="up">Buy</span>. Tanda pembeli tidak sabar.</li>
<li><b>HAKI</b> (Hajar Kiri): jual langsung di harga bid → tercatat <span class="down">Sell</span>. Tanda penjual tidak sabar.</li>
<li><b>Antri</b>: pasang di bid (beli) atau offer (jual) dan menunggu. Antrian ini yang terlihat di order book.</li></ul>`,
trap:"Scalping 1 tick di saham Rp500–2.000 (fraksi 5) — fee ~0,4% bisa lebih besar dari 1 tick (0,25–1%). Hitung dulu.",
prak:"Lihat 'Trade History' di aplikasimu dan hitung total fee setahun terakhir. Banyak trader kaget.",
ref:"Daftar biaya broker masing-masing; PP 41/1994 (PPh transaksi saham)." },

{ id:"a5", t:"Aksi korporasi: dividen, right issue, split, buyback, IPO", m:12,
inti:"Aksi korporasi mengubah jumlah saham & harga teoritis. Bandar sering memanfaatkan momen ini (mis. right issue) — pahami tanggal & rumusnya.",
body:`
<h3>Dividen tunai</h3>
<ol><li><b>Cum date</b> — hari terakhir beli di pasar reguler untuk dapat dividen.</li>
<li><b>Ex date</b> — besoknya; harga biasanya turun kurang lebih sebesar dividen.</li>
<li><b>Recording date</b> — T+2 dari cum (karena settlement).</li>
<li><b>Payment date</b> — dana masuk RDN.</li></ol>
<p>Pajak dividen orang pribadi dalam negeri: <b>10% final</b>, atau <b>dibebaskan</b> bila diinvestasikan kembali di Indonesia sesuai ketentuan (UU HPP & PMK terkait). Banyak broker memotong 10% di awal.</p>
<h3>Right issue (HMETD)</h3>
<div class="formula">Harga teoritis = (N_lama × P_cum + N_baru × P_tebus) ÷ (N_lama + N_baru)</div>
<p>Contoh: rasio 2:1 (tiap 2 lama dapat 1 hak), harga cum 1.000, tebus 700 → (2×1.000 + 1×700)/3 = <b>900</b>. Kalau tidak menebus, kamu terdilusi.</p>
<h3>Stock split / reverse split</h3><p>Nilai total tidak berubah; jumlah lembar & harga per lembar berubah. Split biasanya menaikkan likuiditas & frekuensi.</p>
<h3>Buyback</h3><p>Emiten membeli sahamnya sendiri — sinyal manajemen menilai harga murah, juga menambah demand di order book.</p>
<h3>Tender offer & go private</h3><p>Pengendali menawarkan beli di harga tertentu. Biasanya harga menempel di bawah harga tender.</p>
<h3>IPO (e-IPO)</h3><p>Penjatahan pasti vs terpusat. Saham IPO kecil sering dimainkan pada hari-hari pertama (ARA berturut lalu ARB berturut) — order book dan broker summary sangat berguna di sini.</p>`,
trap:"Beli H-1 cum date demi dividen 3%, lalu harga turun 3% di ex date + kena pajak 10% + fee. Dividen bukan uang gratis.",
prak:"Cari satu saham yang akan ex-date bulan ini. Catat harga penutupan cum vs pembukaan ex.",
ref:"Berk & DeMarzo, Corporate Finance (bab payout policy); Peraturan KSEI; Kalkulator Right Issue di Tools." },
]},

/* ============================== B ============================== */
{ id:"B", t:"Analisis Fundamental", d:"Tahu APA yang dibeli: laporan keuangan, rasio, valuasi, kualitas laba, makro.", lessons:[
{ id:"b1", t:"Membaca 3 laporan keuangan dalam 15 menit", m:15,
inti:"Neraca = apa yang dimiliki & dari mana dananya. Laba rugi = performa selama periode. Arus kas = uang yang benar-benar keluar masuk. Laba boleh dipoles, <b>kas lebih susah dibohongi</b>.",
body:`
<h3>Urutan cepat yang kupakai</h3>
<ol><li><b>Laba rugi</b>: pendapatan tumbuh? margin kotor stabil? laba usaha vs laba bersih (ada pos lain-lain besar?).</li>
<li><b>Arus kas operasi (CFO)</b> vs laba bersih: CFO konsisten &lt; laba bersih bertahun-tahun = lampu kuning.</li>
<li><b>Capex & Free Cash Flow</b> (CFO − capex): bisa bayar dividen dari FCF atau dari utang?</li>
<li><b>Neraca</b>: utang berbunga, kas, piutang & persediaan (naik lebih cepat dari penjualan?), goodwill.</li>
<li><b>CALK</b> (Catatan atas LK): pihak berelasi, kebijakan pengakuan pendapatan, kontinjensi, segmen.</li></ol>
<h3>Untuk bank (BBCA, BBRI, BMRI, BBNI)</h3>
<p>Laporan bank berbeda. Pendapatan utamanya <b>pendapatan bunga bersih</b>. Lihat: NIM, CASA, NPL/LAR, Cost of Credit, LDR, CAR, BOPO. (Rumus di b2.)</p>`,
trap:"Menilai dari laba bersih saja. Laba bisa naik karena penjualan aset satu kali, kurs, atau revaluasi.",
prak:"Ambil laporan tahunan satu emiten (idx.co.id → Laporan Keuangan). Isi tabel: pendapatan, laba bersih, CFO, capex untuk 5 tahun.",
ref:"Berk & DeMarzo Bab 2; Koller et al., Valuation (McKinsey) bab reorganizing financial statements." },

{ id:"b2", t:"Rasio kunci (umum & khusus bank)", m:14,
inti:"Rasio adalah alat membandingkan — antar tahun dan antar emiten sejenis. Satu rasio sendirian tidak berarti apa-apa.",
body:`
<div class="tablewrap"><table><tr><th>Rasio</th><th>Rumus</th><th>Membaca</th></tr>
<tr><td>ROE</td><td class="mono">Laba bersih / Ekuitas rata-rata</td><td>Efisiensi modal pemegang saham. &gt;15% konsisten = bagus</td></tr>
<tr><td>ROA</td><td class="mono">Laba bersih / Total aset</td><td>Bank: &gt;1,5% bagus</td></tr>
<tr><td>NPM</td><td class="mono">Laba bersih / Pendapatan</td><td>Bandingkan dengan pesaing</td></tr>
<tr><td>DER</td><td class="mono">Utang berbunga / Ekuitas</td><td>Non-bank: &gt;1,5x waspada (tergantung sektor)</td></tr>
<tr><td>Current ratio</td><td class="mono">Aset lancar / Liabilitas lancar</td><td>&lt;1 berisiko likuiditas</td></tr>
<tr><td>Interest coverage</td><td class="mono">EBIT / Beban bunga</td><td>&lt;2x rawan saat suku bunga naik</td></tr>
<tr><td>FCF yield</td><td class="mono">FCF / Market cap</td><td>Mirip "imbal hasil kas" bisnis</td></tr></table></div>
<h3>DuPont (pecah ROE)</h3>
<div class="formula">ROE = NPM × Asset Turnover × Leverage (Aset/Ekuitas)</div>
<p>ROE tinggi karena leverage berbeda kualitasnya dengan ROE tinggi karena margin.</p>
<h3>Rasio bank</h3>
<div class="tablewrap"><table><tr><th>Rasio</th><th>Arti</th></tr>
<tr><td>NIM</td><td>Pendapatan bunga bersih / aset produktif rata-rata</td></tr>
<tr><td>CASA</td><td>(Giro + Tabungan) / DPK — makin tinggi, biaya dana makin murah (keunggulan BBCA)</td></tr>
<tr><td>NPL / LAR</td><td>Kredit bermasalah / kredit berisiko — kualitas aset</td></tr>
<tr><td>Cost of Credit</td><td>Beban pencadangan / kredit rata-rata</td></tr>
<tr><td>LDR</td><td>Kredit / DPK — ruang ekspansi kredit</td></tr>
<tr><td>CAR</td><td>Modal / ATMR — bantalan rugi</td></tr>
<tr><td>BOPO / CIR</td><td>Efisiensi biaya</td></tr></table></div>`,
trap:"Membandingkan DER bank dengan DER pabrik. Bank memang 'berutang' (DPK) sebagai bahan baku.",
prak:"Bandingkan NIM, CASA, NPL, ROE untuk BBCA, BBRI, BMRI, BBNI dari laporan kuartal terakhir.",
ref:"CFA L1 FSA; Damodaran, Investment Valuation (bab bank & financial service firms)." },

{ id:"b3", t:"Valuasi relatif: PER, PBV, EV/EBITDA, dividend yield", m:12,
inti:"Murah atau mahal itu relatif — terhadap sejarahnya sendiri (band PER/PBV), terhadap pesaing, dan terhadap pertumbuhannya.",
body:`
<div class="formula">PER = Harga / EPS        PBV = Harga / BVPS
EV  = Market cap + Utang berbunga − Kas
Dividend yield = DPS / Harga</div>
<h3>Band PER/PBV historis</h3>
<p>Hitung rata-rata PER 5–10 tahun dan simpangan bakunya. Harga di sekitar <b>−1 SD</b> sering jadi zona akumulasi untuk saham berkualitas — <i>kalau</i> tidak ada perubahan fundamental (mis. bank dengan NPL naik tajam memang pantas PBV turun).</p>
<h3>Kapan pakai yang mana</h3>
<ul><li><b>PBV</b>: bank, asuransi, properti (aset = basis nilai). Rumus pantas: PBV ≈ (ROE − g)/(COE − g).</li>
<li><b>PER</b>: perusahaan dengan laba stabil (consumer, telco).</li>
<li><b>EV/EBITDA</b>: padat modal, utang beragam (tambang, semen, telco), membandingkan lintas struktur modal.</li>
<li><b>Dividend yield</b>: saham defensif & BUMN dengan payout tinggi.</li></ul>
<h3>PEG</h3><p>PER ÷ pertumbuhan EPS (%). PER 20 dengan pertumbuhan 20% (PEG 1) bisa lebih murah dari PER 10 dengan pertumbuhan 2% (PEG 5).</p>`,
trap:"Value trap: PER 4 terlihat murah, tapi laba tahun ini puncak siklus (batu bara, CPO). Untuk saham siklikal, PER rendah sering justru sinyal jual.",
prak:"Gunakan Kalkulator Valuasi di Tools untuk menghitung PBV wajar sebuah bank dengan ROE, COE dan g pilihanmu.",
ref:"Damodaran, Investment Valuation (relative valuation); McKinsey, Value: The Four Cornerstones." },

{ id:"b4", t:"DCF, WACC, dan berpikir seperti analis", m:16,
inti:"Nilai sebuah bisnis = nilai sekarang dari seluruh arus kas bebas masa depan. DCF memaksamu jujur tentang asumsi pertumbuhan, margin, dan risiko.",
body:`
<div class="formula">Nilai firma = Σ FCFF_t/(1+WACC)^t + TV/(1+WACC)^n
TV (Gordon) = FCFF_(n+1) / (WACC − g)
WACC = E/V × Ke + D/V × Kd × (1 − pajak)
Ke (CAPM) = Rf + β × (ERP)</div>
<h3>Angka acuan Indonesia (isi sendiri, update berkala)</h3>
<ul><li><b>Rf</b>: yield SBN 10 tahun (lihat situs DJPPR/ bloomberg/ PHEI).</li>
<li><b>ERP</b>: equity risk premium Indonesia — Damodaran mempublikasikan per negara tiap Januari.</li>
<li><b>Pajak badan</b>: 22%.</li>
<li><b>g terminal</b>: tidak boleh lebih tinggi dari pertumbuhan nominal ekonomi jangka panjang.</li></ul>
<h3>Sensitivitas</h3><p>Ubah WACC ±1% dan g ±1% — nilai bisa bergeser 30–50%. Karena itu analis menyajikan <b>rentang</b>, bukan satu angka, dan menuntut <b>margin of safety</b> (Graham).</p>`,
trap:"Terminal value menyumbang 70–80% nilai DCF. Asumsi g sedikit saja terlalu optimis = valuasi meledak.",
prak:"Pakai kalkulator DCF sederhana di Tools. Lalu ulangi di Excel seperti di buku Benninga.",
ref:"Koller et al., Valuation; Benninga, Financial Modeling; Rosenbaum & Pearl, Investment Banking." },

{ id:"b5", t:"Kualitas laba & red flag akuntansi", m:12,
inti:"Sebelum percaya angka laba, tanyakan: apakah laba ini berubah jadi kas, berulang, dan diakui secara wajar?",
body:`
<h3>12 red flag yang kuperiksa</h3>
<ol><li>CFO jauh di bawah laba bersih bertahun-tahun.</li>
<li>Piutang tumbuh jauh lebih cepat dari penjualan (DSO naik).</li>
<li>Persediaan menumpuk (DIO naik) di bisnis yang tidak sedang ekspansi.</li>
<li>Kapitalisasi biaya yang seharusnya beban (biaya dikapitalisasi jadi aset).</li>
<li>Perubahan kebijakan akuntansi / umur ekonomis aset diperpanjang.</li>
<li>Pendapatan "lain-lain" atau keuntungan selisih kurs/revaluasi yang besar.</li>
<li>Transaksi pihak berelasi besar (penjualan ke/afiliasi, piutang afiliasi).</li>
<li>Ganti auditor mendadak, opini selain WTP, atau laporan telat (notasi L).</li>
<li>Utang naik tapi kas selalu "ada" — kas yang dibatasi penggunaannya?</li>
<li>Goodwill besar dari akuisisi afiliasi.</li>
<li>Dividen dibayar walau FCF negatif.</li>
<li>Penjelasan manajemen berubah-ubah; target tidak pernah tercapai.</li></ol>
<p>Dua buku di pustaka (Schilit & O'glove) membahas pola-pola ini lebih dalam dengan studi kasus.</p>`,
trap:"Fokus ke laba kuartal yang 'beat' konsensus tanpa membuka CALK.",
prak:"Pilih emiten yang pernah tersandung skandal di BEI. Cari red flag yang sudah terlihat 1–2 tahun sebelumnya di laporan arus kas.",
ref:"Schilit, Financial Shenanigans; O'glove, Quality of Earnings; CFA L2 FSA (earnings quality)." },

{ id:"b6", t:"Makro untuk saham Indonesia", m:12,
inti:"IHSG sangat dipengaruhi suku bunga (BI & The Fed), rupiah, dan harga komoditas. Asing bereaksi duluan terhadap makro — itu yang terlihat di foreign flow.",
body:`
<div class="tablewrap"><table><tr><th>Variabel</th><th>Kalau naik…</th><th>Sektor paling sensitif</th></tr>
<tr><td>BI Rate</td><td>Biaya dana naik, valuasi turun</td><td>Properti, bank (NIM bisa naik tapi kredit melambat), consumer berutang</td></tr>
<tr><td>Fed Funds / US10Y</td><td>Selisih yield menyempit → asing keluar EM</td><td>Big cap likuid (BBCA, BBRI, BMRI, TLKM)</td></tr>
<tr><td>USD/IDR (rupiah melemah)</td><td>Importir rugi kurs, eksportir untung</td><td>Rugi: farmasi, consumer impor bahan. Untung: batu bara, CPO, eksportir</td></tr>
<tr><td>Batu bara / nikel / CPO</td><td>Laba produsen naik</td><td>ADRO/AADI, PTBA, ITMG, INCO, ANTM, AALI</td></tr>
<tr><td>Inflasi</td><td>Daya beli turun, BI cenderung ketat</td><td>Ritel (AMRT, ACES), consumer</td></tr></table></div>
<h3>Siklus</h3><p>Ekspansi → puncak → kontraksi → pemulihan. Di awal pemulihan biasanya bank & siklikal memimpin; di akhir siklus defensif (consumer staples, telco) lebih tahan.</p>`,
trap:"Membeli saham bank 'karena suku bunga naik = NIM naik' tanpa melihat pertumbuhan kredit & biaya kredit.",
prak:"Buat catatan mingguan: BI rate, US10Y, USD/IDR, net foreign IHSG. Setelah 3 bulan, lihat polanya.",
ref:"Piros & Pinto, Economics for Investment Decision Makers; CFA L1 Economics." },
]},

/* ============================== C ============================== */
{ id:"C", t:"Analisis Teknikal", d:"Tahu KAPAN masuk & keluar: tren, level, candlestick, indikator, trading plan.", lessons:[
{ id:"c1", t:"Tren, struktur pasar, support & resistance", m:10,
inti:"Uptrend = higher high + higher low. Downtrend = lower high + lower low. Trading searah tren jauh lebih mudah daripada menebak titik balik.",
body:`
<ul><li><b>Support</b>: area di mana permintaan pernah cukup kuat menghentikan penurunan — sering bertepatan dengan bid tebal & akumulasi.</li>
<li><b>Resistance</b>: area suplai — banyak orang "nyangkut" di situ menunggu impas (offer tebal).</li>
<li><b>Role reversal</b>: resistance yang tembus jadi support.</li>
<li><b>Angka bulat</b> (5.000, 1.000, 500) dan perubahan fraksi (dari 25 ke 10 di bawah 5.000) sering jadi area antrian besar.</li></ul>
<p>Di screenshot BBCA kamu: harga turun dari ~9.000-an ke ~5.000-an — struktur <b>lower high, lower low</b>. Pantulan dari 5.175 belum mengubah tren sebelum ada higher high yang jelas.</p>`,
trap:"Menganggap setiap support pasti memantul. Support yang diuji berkali-kali justru makin lemah (antrian bid habis dimakan).",
prak:"Gambar struktur HH/HL atau LH/LL di 3 grafik harian. Tandai di mana tren berubah.",
ref:"Murphy, Technical Analysis of the Financial Markets; Wyckoff (lihat modul D)." },
{ id:"c2", t:"Candlestick + volume = cerita", m:10,
inti:"Candle memberi tahu siapa yang menang pada periode itu; volume memberi tahu seberapa serius mereka.",
body:`
<div class="tablewrap"><table><tr><th>Pola</th><th>Arti</th><th>Butuh konfirmasi</th></tr>
<tr><td>Hammer / pin bar bawah</td><td>Penjual mendorong turun, pembeli merebut kembali</td><td>Volume tinggi + candle hijau berikutnya</td></tr>
<tr><td>Shooting star</td><td>Pembeli gagal bertahan di atas</td><td>Di resistance + volume tinggi</td></tr>
<tr><td>Engulfing</td><td>Pergantian kendali</td><td>Volume lebih besar dari candle sebelumnya</td></tr>
<tr><td>Doji</td><td>Ragu-ragu</td><td>Konteks tren</td></tr>
<tr><td>Marubozu</td><td>Satu pihak dominan penuh</td><td>Lanjutan tren</td></tr></table></div>
<p>Aturan emas: <b>harga naik + volume naik</b> = sehat. <b>Harga naik + volume turun</b> = tenaga melemah. <b>Harga turun + volume besar di support + ekor bawah panjang</b> = kemungkinan ada yang menyerap (absorption). Detail di VSA (modul D).</p>`,
trap:"Membaca candle di saham tidak likuid. 1 transaksi 1 lot bisa membuat 'hammer'.",
prak:"Cari 5 candle dengan volume 3x rata-rata 20 hari. Apa yang terjadi 5 hari setelahnya?",
ref:"Nison, Japanese Candlestick Charting; Coulling, A Complete Guide to Volume Price Analysis." },
{ id:"c3", t:"Indikator: MA, RSI, MACD, Bollinger, Fibonacci", m:12,
inti:"Indikator adalah turunan harga & volume — tertinggal (lagging). Pakai untuk konfirmasi dan disiplin, bukan untuk ramalan. Latih langsung di <a href='#/indikator'>Lab Indikator</a> (termasuk Ichimoku & backtest).",
body:`
<ul><li><b>MA 20/50/200</b>: arah tren. Harga di atas MA200 naik = tren jangka panjang naik.</li>
<li><b>RSI(14)</b>: momentum. &gt;70 jenuh beli, &lt;30 jenuh jual — di tren kuat RSI bisa tinggal lama di zona ekstrem. <b>Divergensi</b> lebih berguna.</li>
<li><b>MACD</b>: selisih EMA12–EMA26; persilangan dengan signal line = perubahan momentum.</li>
<li><b>Bollinger Band</b>: MA20 ± 2SD. Band menyempit (squeeze) → sering diikuti pergerakan besar.</li>
<li><b>Fibonacci retracement</b> (seperti di grafik BBCA-mu: 23,6% · 38,2% · 50% · 61,8% · 78,6%): area pullback yang banyak diperhatikan orang — karena itu sering jadi area antrian.</li>
<li><b>Volume MA & OBV</b>: OBV naik saat harga datar = indikasi akumulasi.</li></ul>`,
trap:"Menumpuk 8 indikator yang semuanya dari data harga yang sama. Lebih banyak indikator ≠ lebih akurat.",
prak:"Pilih maksimal 3: satu tren (MA), satu momentum (RSI), satu volume (OBV/volume MA). Backtest 20 sinyal secara manual.",
ref:"Murphy; Hilpisch, Python for Finance (backtesting)." },
{ id:"c4", t:"Setup swing trading & trading plan tertulis", m:12,
inti:"Trading plan menjawab sebelum entry: kenapa masuk, di mana salah (cut loss), di mana ambil untung, berapa lot. Tanpa itu, keputusan diambil oleh emosi.",
body:`
<h3>Template trading plan</h3>
<div class="formula">Saham     : ____   Tanggal: ____
Tesis     : (fundamental/teknikal/bandarmologi singkat)
Setup     : breakout / pullback ke support / spring Wyckoff
Entry     : ____ (alasan)
Stop loss : ____ (di bawah struktur, bukan angka asal %)
Target 1/2: ____ / ____    Risk:Reward ≥ 1:2
Ukuran    : risiko 1% modal → ____ lot (pakai kalkulator)
Batal jika: asing net sell 3 hari berturut / broker akumulasi berbalik jual</div>
<h3>3 setup dasar</h3>
<ol><li><b>Pullback dalam uptrend</b> ke MA20/ support + volume mengecil saat turun.</li>
<li><b>Breakout</b> resistance dengan volume ≥2x rata-rata; offer tebal dimakan HAKA.</li>
<li><b>Spring</b> (Wyckoff): tembus support sebentar, langsung balik dengan volume — jebakan bagi yang cut loss.</li></ol>`,
trap:"Menggeser stop loss lebih jauh saat harga mendekatinya. Itu cara cut loss kecil berubah jadi 'nyangkut' -30%.",
prak:"Tulis plan untuk 10 trade berikutnya, termasuk yang tidak jadi dieksekusi. Simpan di jurnal.",
ref:"Elder, Trading for a Living; Pompian (bias perilaku)." },
]},

/* ============================== D ============================== */
{ id:"D", t:"Bandarmologi & Analisis Volume", d:"Membaca jejak 'smart money': Wyckoff, VSA, broker summary, pola akumulasi & distribusi.", lessons:[
{ id:"d1", t:"Apa itu bandarmologi (dan batasnya)", m:9,
inti:"Bandarmologi = membaca jejak pemain bermodal besar lewat volume, broker summary, dan order book. Versi globalnya: tape reading, order flow, VSA, Wyckoff.",
body:`
<h3>Siapa "bandar"?</h3>
<p>Bukan satu orang misterius. "Bandar" adalah sebutan untuk <b>pihak dengan dana cukup besar untuk menggerakkan harga</b>: fund manager lokal, institusi asing, pengendali/afiliasi emiten, kelompok investor kaya, atau market maker. Mereka tidak bisa membeli atau menjual jumlah besar sekaligus tanpa meninggalkan jejak — <b>itulah yang kita baca</b>.</p>
<h3>Kenapa bisa dibaca?</h3>
<ul><li>Dana besar butuh <b>waktu</b> untuk masuk/keluar (berhari-hari sampai berbulan).</li>
<li>Mereka butuh <b>lawan transaksi</b>: saat akumulasi, butuh ritel yang menjual; saat distribusi, butuh ritel yang membeli.</li>
<li>Jejaknya tercatat: konsentrasi broker, rata-rata harga beli, ukuran lot, volume tak wajar.</li></ul>
<h3>Batasnya (penting!)</h3>
<ul><li>Sejak 2021, <b>kode broker & tipe investor tidak tampil real-time</b> di running trade; baru tersedia di akhir sesi. BEI & OJK sempat mengkaji pembukaan kembali (2024–2026) tapi belum diputuskan. Jadi intraday kamu membaca <b>harga, lot, frekuensi, HAKA/HAKI, dan antrian</b>.</li>
<li>Satu pemain bisa memakai banyak broker, termasuk broker ritel, untuk menyamarkan.</li>
<li>Broker summary menunjukkan broker, bukan siapa nasabahnya.</li>
<li>Bandarmologi paling berguna di saham <b>lapis 2–3</b>; di big cap (BBCA) pemainnya terlalu banyak & dominan institusi/asing — di sini foreign flow lebih bermakna.</li></ul>`,
trap:"Ikut 'bandar' tanpa peduli fundamental. Bandar juga bisa salah, dan ritel adalah exit liquidity yang mereka butuhkan saat distribusi.",
prak:"Mulai jurnal bandarmologi: tiap hari catat top 3 buyer & seller untuk 3 saham yang kamu pantau.",
ref:"Ryan Filbert, Bandarmology; Wyckoff, Studies in Tape Reading." },

{ id:"d2", t:"Siklus Wyckoff: akumulasi → markup → distribusi → markdown", m:14,
inti:"Wyckoff membayangkan satu 'Composite Man' yang mengatur pasar. Ia membeli diam-diam saat semua takut, menaikkan harga, lalu menjual ke publik yang serakah.",
body:`
<div class="tablewrap"><table><tr><th>Fase</th><th>Harga</th><th>Volume & tape</th><th>Broker summary khas</th></tr>
<tr><td><b>Akumulasi</b></td><td>Sideways di bawah, range sempit</td><td>Volume besar di penurunan tapi harga tidak turun lagi; offer kecil dimakan pelan</td><td>Beberapa broker net buy konsisten, avg price naik pelan; seller tersebar (ritel)</td></tr>
<tr><td><b>Markup</b></td><td>Higher high, higher low</td><td>HAKA dominan, offer tipis, pullback volume kecil</td><td>Broker akumulator mulai sesekali jual (ambil profit kecil)</td></tr>
<tr><td><b>Distribusi</b></td><td>Sideways di atas, banyak "false breakout"</td><td>Volume besar tapi harga tidak naik lagi (effort tanpa result); bid tebal sebagai umpan</td><td>Akumulator kini top seller; buyer tersebar di broker ritel</td></tr>
<tr><td><b>Markdown</b></td><td>Lower high, lower low</td><td>HAKI dominan, bid ditarik</td><td>Ritel jadi top buyer ("menangkap pisau")</td></tr></table></div>
<h3>Titik-titik penting akumulasi</h3>
<ul><li><b>SC (Selling Climax)</b>: panic sell, volume ekstrem, harga memantul.</li>
<li><b>AR (Automatic Rally)</b>: pantulan — menentukan batas atas range.</li>
<li><b>ST (Secondary Test)</b>: uji ulang bawah dengan volume lebih kecil.</li>
<li><b>Spring</b>: tembus bawah sesaat untuk memancing stop loss, lalu kembali ke range — sering titik masuk terbaik.</li>
<li><b>SOS (Sign of Strength)</b> & <b>LPS (Last Point of Support)</b>: breakout lalu pullback yang tertahan.</li></ul>
<p>Distribusi adalah cermin: BC (buying climax), AR, ST, <b>UTAD (Upthrust After Distribution)</b>, SOW, LPSY.</p>`,
trap:"Menyebut setiap sideways 'akumulasi'. Sideways di bawah setelah downtrend bisa juga re-distribusi sebelum turun lagi. Butuh bukti volume & broker.",
prak:"Cari satu saham yang naik &gt;100% dalam setahun. Mundur ke grafik 6–12 bulan sebelumnya dan tandai fase Wyckoff-nya.",
ref:"Wyckoff, Studies in Tape Reading; Weis, Trades About to Happen; Villahermosa, Wyckoff 2.0." },

{ id:"d3", t:"Volume Spread Analysis (VSA)", m:12,
inti:"Bandingkan <b>usaha</b> (volume) dengan <b>hasil</b> (spread/jarak high-low dan posisi close). Kalau tidak sebanding, ada pihak besar yang melawan.",
body:`
<div class="tablewrap"><table><tr><th>Sinyal</th><th>Ciri candle</th><th>Arti</th></tr>
<tr><td><span class="up">Stopping volume</span></td><td>Turun, volume sangat besar, close di tengah/atas</td><td>Ada yang menyerap semua jualan</td></tr>
<tr><td><span class="up">No supply</span></td><td>Turun, spread sempit, volume kecil</td><td>Tidak ada lagi yang mau jual — siap naik</td></tr>
<tr><td><span class="up">Test</span></td><td>Turun ke area sebelumnya, volume rendah, close atas</td><td>Uji apakah penjual masih ada</td></tr>
<tr><td><span class="down">No demand</span></td><td>Naik, spread sempit, volume kecil</td><td>Kenaikan tanpa pembeli serius</td></tr>
<tr><td><span class="down">Upthrust</span></td><td>Tembus atas lalu close di bawah, volume besar</td><td>Jebakan beli — distribusi</td></tr>
<tr><td><span class="down">Effort no result</span></td><td>Volume besar, harga hampir tidak naik</td><td>Ada penjual besar menyuplai di atas</td></tr></table></div>
<p>Di level intraday, VSA terlihat di order book: HAKA besar terus-menerus tapi harga tidak naik = ada <b>offer yang di-refill</b> (penjual besar). HAKI besar tapi harga bertahan = ada <b>bid yang di-refill</b> (pembeli besar).</p>`,
trap:"Lupa konteks: no demand di tengah uptrend kuat berbeda maknanya dengan no demand setelah rally panjang.",
prak:"Di Lab Order Book, perhatikan statistik 'HAKA vs perubahan harga'. Itulah effort vs result versi intraday.",
ref:"Tom Williams, Master the Markets; Coulling, A Complete Guide to Volume Price Analysis." },

{ id:"d4", t:"Membaca broker summary", m:14,
inti:"Broker summary = rekap beli & jual tiap broker untuk satu saham pada periode tertentu (lot, nilai, harga rata-rata). Yang dicari: <b>konsentrasi</b>, <b>konsistensi</b>, dan <b>harga rata-rata</b>.",
body:`
<h3>Kolom yang dibaca</h3>
<ul><li><b>BLot / SLot</b>: lot dibeli/dijual per broker. <b>Net</b> = BLot − SLot.</li>
<li><b>BAvg / SAvg</b>: harga rata-rata — modal "bandar". Harga sekarang di bawah avg buy pemain besar = mereka sedang rugi kertas, cenderung dipertahankan/dinaikkan.</li>
<li><b>Tipe broker</b> (warna di banyak aplikasi): Asing / Lokal / Pemerintah(BUMN).</li></ul>
<h3>Indikator turunan</h3>
<div class="formula">Top3 Buyer % = (lot beli 3 broker teratas) / total lot
Top3 Seller % = (lot jual 3 broker teratas) / total lot
Bandar Accum/Dist ≈ Top3 Buyer % − Top3 Seller %
  &gt; +10%  → beli lebih terkonsentrasi (akumulasi)
  &lt; −10%  → jual lebih terkonsentrasi (distribusi)</div>
<h3>Pola klasik</h3>
<ul><li><b>Pembeli sedikit, penjual banyak</b> (1–3 broker menyerap dari puluhan broker ritel) → akumulasi.</li>
<li><b>Penjual sedikit, pembeli banyak</b> (barang dari 1–3 broker disebar ke banyak broker ritel: YP, PD, XC, XL, CC…) → distribusi.</li>
<li><b>Broker yang sama di buyer & seller</b> dengan lot mirip → kemungkinan transaksi internal/crossing atau market making (tektok). Bukan akumulasi.</li>
<li>Periode: lihat 1 hari, 1 minggu, 1 bulan. Akumulasi sungguhan konsisten di beberapa periode.</li></ul>`,
trap:"Melihat YP/PD/XC sebagai top buyer lalu menyimpulkan 'ritel beli, berarti distribusi'. Bandar juga bisa memakai broker ritel. Cek avg lot per transaksi & konsistensi.",
prak:"Latihan di Lab Broker Summary — ada skenario acak dan pembahasannya.",
ref:"Ryan Filbert, Bandarmology; Dormeier, Investing with Volume Analysis." },

{ id:"d5", t:"Pola permainan bandar & saham gorengan", m:12,
inti:"Kenali pola supaya tidak jadi korban — bukan untuk meniru. Spoofing, wash trade, dan pump & dump adalah <b>manipulasi pasar</b> yang dilarang UU Pasar Modal.",
body:`
<div class="tablewrap"><table><tr><th>Pola</th><th>Ciri</th><th>Tujuan</th></tr>
<tr><td>Tektok / wash trade</td><td>Transaksi bolak-balik, lot sama, harga sama, frekuensi tinggi, kepemilikan tidak berubah</td><td>Membuat saham terlihat ramai/likuid</td></tr>
<tr><td>Bid/offer palsu (spoofing)</td><td>Antrian raksasa muncul lalu hilang saat harga mendekat</td><td>Memberi kesan dukungan/tekanan palsu</td></tr>
<tr><td>Guyur</td><td>HAKI lot besar beruntun, bid ditarik</td><td>Menakut-nakuti ritel agar melepas murah (shakeout) — atau benar-benar keluar</td></tr>
<tr><td>Kunci ARA</td><td>Offer di ARA dimakan, bid ARA antri jutaan lot</td><td>Menarik FOMO untuk distribusi esok hari</td></tr>
<tr><td>Split order</td><td>Lot "aneh" yang sama berulang (mis. 1.234 lot terus-menerus) atau 1 lot berulang cepat</td><td>Algoritma/akumulasi yang disamarkan</td></tr>
<tr><td>Pom-pom</td><td>Ramai di grup/media sosial, target harga fantastis</td><td>Mencari pembeli untuk barang bandar</td></tr></table></div>
<h3>Red flag saham gorengan</h3>
<ul><li>Market cap kecil, free float kecil, fundamental lemah.</li><li>Naik ratusan persen tanpa berita, lalu UMA/suspensi.</li><li>Broker summary didominasi 1–2 broker kecil yang tidak biasa.</li><li>Volume melonjak dari hampir nol.</li></ul>`,
trap:"Merasa 'bisa keluar sebelum bandar'. Saat distribusi selesai, bid hilang dan ARB berhari-hari — kamu tidak bisa jual.",
prak:"Pelajari kasus saham yang pernah disuspensi BEI setelah naik tajam. Lihat broker summary-nya di fase naik vs fase turun.",
ref:"UU Pasar Modal Pasal 90–92 (penipuan, manipulasi, transaksi semu); Ryan Filbert." },
]},

/* ============================== E ============================== */
{ id:"E", t:"Order Book & Tape Reading", d:"Membaca 1–3 detik: antrian bid/offer, running trade, HAKA/HAKI, dan niat di baliknya.", lessons:[
{ id:"e1", t:"Anatomi order book", m:10,
inti:"Kiri = <b>Bid</b> (antrian beli), kanan = <b>Offer</b> (antrian jual). Kolom <b>Freq</b> = jumlah order, <b>Lot</b> = jumlah lot. <b>Lot ÷ Freq</b> = rata-rata ukuran order → petunjuk siapa yang antri.",
body:`
<p>Seperti panel kanan Stockbit di screenshot-mu: <code>Freq | Lot | Bid | Offer | Lot | Freq</code>.</p>
<h3>Contoh dari BBCA-mu</h3>
<div class="tablewrap"><table><tr><th>Level</th><th>Lot</th><th>Freq</th><th>Lot/Freq</th><th>Bacaan</th></tr>
<tr><td>Bid 5.250</td><td class="num">103.335</td><td class="num">687</td><td class="num">150</td><td>Antrian tebal & order rata-rata besar → minat beli serius di 5.250</td></tr>
<tr><td>Offer 5.400</td><td class="num">220.133</td><td class="num">2.557</td><td class="num">86</td><td>Tembok offer — tapi banyak order kecil (ritel/nyangkut ingin impas)</td></tr>
<tr><td>Offer 5.350</td><td class="num">159.780</td><td class="num">2.890</td><td class="num">55</td><td>Banyak orang jual dekat — resistance terdekat</td></tr></table></div>
<p>Total 10 level: bid 551.902 lot vs offer 895.086 lot. Offer lebih tebal 1,6x. Ini <b>bukan</b> otomatis bearish — sering justru di saham yang sedang diakumulasi, offer tebal adalah barang yang ingin "ditampung".</p>
<h3>5 angka yang selalu kulihat</h3>
<ol><li>Spread bid–offer best (1 tick = likuid).</li><li>Total bid vs total offer (10 level).</li><li>Lot/freq per level — order besar atau ritel?</li><li>Level dengan antrian paling tebal (tembok).</li><li>Perubahan antrian dari detik ke detik — tembok bertambah, berkurang karena dimakan, atau hilang karena ditarik?</li></ol>`,
trap:"Menganggap bid tebal = pasti naik. Antrian bisa ditarik kapan saja (kecuali saat non-cancellation period). Yang penting adalah transaksi yang benar-benar terjadi.",
prak:"Screenshot order book yang sama tiap 10 detik selama 2 menit. Bandingkan level mana yang berubah dan kenapa.",
ref:"Harris, Trading and Exchanges (mikrostruktur pasar); Wyckoff, Studies in Tape Reading." },

{ id:"e2", t:"Running trade: HAKA, HAKI, lot besar, dan ritme", m:10,
inti:"Order book adalah <b>niat</b>; running trade adalah <b>tindakan</b>. Yang dibaca: siapa yang agresif (HAKA vs HAKI), ukuran transaksi, dan kecepatannya.",
body:`
<ul><li><b>Buy (hijau)</b> = transaksi terjadi di harga offer → pembeli yang menghajar.</li>
<li><b>Sell (merah)</b> = terjadi di harga bid → penjual yang menghajar.</li>
<li><b>Lot besar</b> (di atas rata-rata biasa saham itu) yang muncul berulang = pemain besar aktif.</li>
<li><b>Lot sama berulang</b> (mis. 500, 500, 500 tiap beberapa detik) = algoritma/iceberg atau split order.</li>
<li><b>Ritme</b>: tiba-tiba frekuensi naik tajam → ada katalis/berita atau sedang dimainkan.</li></ul>
<h3>Rasio sederhana</h3>
<div class="formula">Buy pressure = Lot HAKA / (Lot HAKA + Lot HAKI)
&gt; 60% berkelanjutan + harga naik           = permintaan agresif
&gt; 60% tapi harga TIDAK naik               = ada penjual besar di offer (refill)
&lt; 40% tapi harga TIDAK turun              = ada pembeli besar di bid (absorption)</div>
<div class="note">Di Indonesia, kode broker & tipe investor (asing/domestik) <b>tidak tampil real-time</b> sejak 2021. Sebagian aplikasi menampilkan informasi tambahan sesuai data yang tersedia — cek apa yang benar-benar ditampilkan aplikasimu. Lab di website ini punya "mode X-ray" untuk melatih intuisi, dengan label jelas bahwa itu data simulasi.</div>`,
trap:"Terpaku pada satu transaksi besar. Satu HAKA 10.000 lot bisa saja crossing/tutup posisi. Yang penting pola berulang.",
prak:"Di Lab Order Book, nyalakan statistik dan tebak skenario sebelum timer habis.",
ref:"Weis, Trades About to Happen; Wyckoff." },

{ id:"e3", t:"Membaca niat: absorption, refill, spoofing, sweep", m:14,
inti:"Empat perilaku antrian yang paling sering menunjukkan pemain besar.",
body:`
<div class="tablewrap"><table><tr><th>Perilaku</th><th>Yang terlihat di order book</th><th>Kemungkinan arti</th></tr>
<tr><td><b>Absorption (penyerapan)</b></td><td>HAKI terus masuk ke bid 5.250, tapi lot di 5.250 tidak habis-habis / terus bertambah</td><td>Pembeli besar menampung barang → akumulasi</td></tr>
<tr><td><b>Refill / iceberg di offer</b></td><td>Offer 5.400 dimakan 20.000 lot, beberapa detik kemudian kembali tebal</td><td>Penjual besar menyuplai (distribusi) atau menahan harga agar tetap murah sambil akumulasi di bawah</td></tr>
<tr><td><b>Spoofing / bid palsu</b></td><td>Bid raksasa muncul 2–3 tick di bawah harga, hilang saat harga mendekat</td><td>Kesan dukungan palsu agar ritel berani beli; pelaku justru menjual</td></tr>
<tr><td><b>Sweep</b></td><td>Beberapa level offer habis dalam 1 detik oleh HAKA besar</td><td>Pembeli sangat ingin barang sekarang — sering awal markup / ada berita</td></tr>
<tr><td><b>Offer ditarik</b></td><td>Offer tebal tiba-tiba hilang tanpa transaksi</td><td>Penjual besar tidak mau jual murah lagi → potensi naik</td></tr>
<tr><td><b>Bid ditarik</b></td><td>Bid tebal hilang tanpa transaksi</td><td>Dukungan hilang → potensi turun cepat</td></tr></table></div>
<p>Kuncinya: bandingkan <b>perubahan antrian</b> dengan <b>transaksi yang terjadi</b>. Antrian yang berkurang karena transaksi = nyata. Antrian yang berkurang tanpa transaksi = ditarik.</p>`,
trap:"Spoofing itu manipulasi. Jangan ditiru — dan jangan percaya tembok yang belum pernah 'dimakan'.",
prak:"Di Lab, skenario 'Bid palsu (spoofing)' dan 'Akumulasi diam-diam' melatih bedanya.",
ref:"Harris, Trading and Exchanges; Villahermosa, Wyckoff 2.0 (order flow)." },

{ id:"e4", t:"Checklist 3 detik", m:8,
inti:"Urutan baca cepat sebelum klik beli/jual. Latih sampai otomatis.",
body:`
<ol>
<li><b>Konteks (sebelum buka order book)</b>: tren harian, posisi terhadap support/resistance, foreign flow & broker summary kemarin.</li>
<li><b>Detik 1 — Running trade</b>: hijau atau merah yang dominan? Lot besar atau kecil? Cepat atau sepi?</li>
<li><b>Detik 2 — Order book</b>: spread, tembok terdekat di bid & offer, lot/freq tembok itu.</li>
<li><b>Detik 3 — Effort vs result</b>: HAKA banyak tapi harga diam? HAKI banyak tapi harga bertahan? Tembok dimakan atau ditarik?</li>
<li><b>Keputusan</b>: sesuai plan? Kalau ragu → tidak masuk. Tidak ada transaksi juga posisi.</li></ol>
<div class="tablewrap"><table><tr><th>Kombinasi</th><th>Kesimpulan awal</th></tr>
<tr><td>HAKA dominan + offer dimakan + harga naik + lot besar</td><td class="up">Demand agresif (markup / akumulasi agresif)</td></tr>
<tr><td>HAKI dominan + bid tidak habis + harga bertahan</td><td class="up">Absorption — akumulasi pasif</td></tr>
<tr><td>HAKA dominan + offer refill + harga tidak naik</td><td class="down">Distribusi ke pembeli agresif</td></tr>
<tr><td>HAKI dominan + bid ditarik + harga turun cepat</td><td class="down">Markdown / guyur</td></tr>
<tr><td>Banyak 1–10 lot, freq sangat tinggi, harga naik cepat</td><td class="gold">FOMO ritel — rawan berbalik</td></tr></table></div>`,
trap:"Mengambil keputusan di 3 detik tanpa konteks harian. 3 detik untuk eksekusi, bukan untuk analisis dari nol.",
prak:"Mainkan Lab Order Book 20 ronde. Target akurasi ≥ 70%.",
ref:"—" },

{ id:"e5", t:"Pre-opening, pre-closing, dan ARA/ARB", m:9,
inti:"Fase lelang punya dinamika sendiri: lihat IEP & IEV, dan ingat non-cancellation period mulai 08.56 dan 15.56.",
body:`
<ul><li><b>IEP naik tinggi di pre-opening</b> lalu turun tajam menjelang 08.56: tanda order besar ditarik — antrian sebelumnya tidak jujur.</li>
<li><b>Pre-closing</b>: harga penutupan menentukan harga acuan besok, NAV reksa dana, dan valuasi portofolio. Institusi sering rebalancing di closing (terutama saat rebalancing indeks MSCI/FTSE) → volume besar di pre-closing.</li>
<li><b>Antri ARA</b>: bid jutaan lot di ARA dengan offer kosong. Besok pagi perhatikan apakah antrian itu bertahan di pre-opening. Antrian ARA yang mengecil cepat = bahan bakar habis.</li>
<li><b>ARB</b>: offer menumpuk di ARB, bid kosong. Dengan ARB asimetris (2026), saham bisa turun lebih pelan per hari tapi berhari-hari.</li></ul>`,
trap:"Ikut antri ARA di pre-opening — saat dapat barang, sering itu justru barang distribusi.",
prak:"Amati satu saham yang ARA kemarin: catat IEP 08.50, 08.55, 08.58, dan harga 09.05.",
ref:"Peraturan BEI tentang pre-opening & pre-closing; FAQ non-cancellation." },
]},

/* ============================== F ============================== */
{ id:"F", t:"Asing (Foreign Flow)", d:"Membaca dana asing: definisi data, penggerak, dan kombinasi asing vs lokal.", lessons:[
{ id:"f1", t:"Data asing: apa yang sebenarnya diukur", m:10,
inti:"<b>F Buy / F Sell</b> = nilai transaksi yang dilakukan investor bertipe <b>asing</b> (berdasarkan data investor/SID), bukan broker asing. <b>Net Foreign</b> = F Buy − F Sell.",
body:`
<p>Di screenshot-mu (panel BBCA): <code>F Buy 1,15T</code> dan <code>F Sell 631,18B</code> → <b>net foreign buy ≈ Rp519 miliar</b>. Itu angka besar untuk satu hari, tapi cek dulu:</p>
<ol><li><b>Reguler atau nego?</b> Transaksi nego blok bisa membuat net foreign lompat. Banyak aplikasi memisahkan "RG" dan "NG".</li>
<li><b>Satu hari atau tren?</b> Lihat net foreign 5, 20, 60 hari. Asing besar membangun posisi berminggu-minggu.</li>
<li><b>Proporsi</b>: (F Buy + F Sell) / (2 × nilai total). Di BBCA porsi asing bisa &gt;40%; di saham lapis 3 hampir 0 — net foreign tidak relevan.</li>
<li><b>Harga rata-rata asing</b>: kalau tersedia, bandingkan dengan harga sekarang.</li></ol>
<h3>Broker asing ≠ investor asing</h3>
<p>Investor asing biasanya bertransaksi melalui broker global (AK UBS, BK J.P. Morgan, ZP Maybank, KZ CLSA, dll.), tapi:</p>
<ul><li>Investor lokal juga bisa memakai broker asing (dana pensiun lokal via AK, misalnya).</li>
<li>Investor asing ritel bisa memakai broker lokal.</li>
<li>Jadi untuk "asing", data <b>F Buy/F Sell</b> lebih akurat daripada menebak dari kode broker.</li></ul>`,
trap:"Net foreign sell = jual semua. Kadang asing menjual saham A untuk membeli saham B di sektor sama (rotasi), atau jual karena redemption fund global, bukan karena fundamental.",
prak:"Untuk BBCA, BBRI, BMRI, TLKM, ASII: catat net foreign harian 20 hari dan perubahan harga. Hitung korelasinya.",
ref:"Statistik IDX; data aplikasi (Stockbit, RTI, IPOT)." },

{ id:"f2", t:"Penggerak dana asing", m:10,
inti:"Asing membeli 'Indonesia' sebagai satu negara dalam portofolio emerging market. Pertanyaan mereka: dibanding negara lain, apakah Indonesia menarik — setelah risiko kurs?",
body:`
<ul><li><b>Suku bunga AS & dolar</b>: The Fed ketat / DXY menguat → dana keluar EM. Fed longgar → masuk.</li>
<li><b>Rupiah</b>: investor asing menghitung dalam USD. Saham naik 5% tapi rupiah turun 6% = rugi bagi mereka. Rupiah stabil/menguat menarik inflow.</li>
<li><b>Rebalancing indeks</b> (MSCI, FTSE): perubahan bobot/konstituen memaksa dana pasif membeli/menjual di tanggal tertentu, biasanya di <b>pre-closing</b>. Pengumuman MSCI keluar ~2 minggu sebelumnya.</li>
<li><b>Valuasi relatif</b>: PER IHSG vs India, Thailand, Filipina, Vietnam.</li>
<li><b>Kebijakan & tata kelola</b>: kepastian regulasi, isu free float, pajak, stabilitas politik.</li>
<li><b>Komoditas</b>: harga batu bara/nikel memengaruhi saham tambang dan neraca berjalan (rupiah).</li></ul>
<h3>Saham favorit asing</h3><p>Big cap likuid dengan tata kelola baik: BBCA, BBRI, BMRI, BBNI, TLKM, ASII, plus emiten konstituen MSCI Indonesia lainnya. Di saham-saham ini net foreign sering sejalan dengan arah IHSG.</p>`,
trap:"Menyalahkan 'asing' untuk setiap penurunan. Kadang lokal (reksa dana, asuransi, dana pensiun) yang sedang menjual.",
prak:"Cari tanggal efektif rebalancing MSCI terakhir. Lihat volume & net foreign saham-saham yang masuk/keluar indeks di hari itu.",
ref:"Piros & Pinto, Economics for Investment Decision Makers; pengumuman MSCI Index Review." },

{ id:"f3", t:"Matriks harga × asing × broker lokal", m:10,
inti:"Gabungkan tiga data: arah harga, net foreign, dan siapa yang di sisi lawan. Hasilnya 6–8 kemungkinan cerita yang bisa dihafal.",
body:`<p>Lihat matriks lengkap dan latihan interaktifnya di halaman <a href="#/asing">Matriks Asing vs Lokal</a>.</p>
<div class="tablewrap"><table><tr><th>Harga</th><th>Net Foreign</th><th>Bacaan utama</th></tr>
<tr><td class="up">Naik</td><td class="up">Net buy</td><td>Asing memimpin — tren paling sehat di big cap</td></tr>
<tr><td class="up">Naik</td><td class="down">Net sell</td><td>Lokal yang mengangkat; asing memanfaatkan kenaikan untuk keluar. Hati-hati di big cap</td></tr>
<tr><td class="down">Turun</td><td class="up">Net buy</td><td>Asing akumulasi saat murah — sering mendahului pembalikan</td></tr>
<tr><td class="down">Turun</td><td class="down">Net sell</td><td>Tekanan asing — tunggu sampai jualan mereda</td></tr>
<tr><td>Datar</td><td class="up">Net buy besar</td><td>Ada yang menyuplai di atas (lokal distribusi) atau asing menampung pelan</td></tr></table></div>`,
trap:"Pakai matriks ini di saham yang porsi asingnya kecil. Tidak berlaku.",
prak:"Kerjakan kuis di halaman Matriks Asing vs Lokal.",
ref:"—" },
]},

/* ============================== G ============================== */
{ id:"G", t:"Risiko, Psikologi & Hukum", d:"Yang membedakan trader yang bertahan 10 tahun dengan yang tidak.", lessons:[
{ id:"g1", t:"Position sizing & cut loss", m:10,
inti:"Kamu tidak bisa mengontrol harga, tapi bisa mengontrol <b>berapa kerugian maksimal</b> per trade. Risiko 1% per trade = butuh 100 kesalahan beruntun untuk habis.",
body:`
<div class="formula">Lot = (Modal × Risiko%) ÷ ((Entry − Stop) × 100)</div>
<p>Modal 100 juta, risiko 1% = Rp1 juta. Entry 5.325, stop 5.175 (selisih 150). Lot = 1.000.000 ÷ (150 × 100) = <b>66 lot</b>.</p>
<h3>Matematika kerugian</h3>
<div class="tablewrap"><table><tr><th>Rugi</th><th>Naik yang dibutuhkan untuk impas</th></tr>
<tr><td>-10%</td><td>+11%</td></tr><tr><td>-20%</td><td>+25%</td></tr><tr><td>-30%</td><td>+43%</td></tr><tr><td>-50%</td><td>+100%</td></tr></table></div>
<p>Posisi -29% di portofoliomu butuh +41% hanya untuk kembali. Pertanyaan yang tepat bukan "kapan balik modal", tapi: <b>kalau hari ini aku punya uang tunai senilai posisi itu, apakah aku akan membeli saham ini?</b></p>
<h3>Expectancy</h3>
<div class="formula">E = (Win% × Avg Win) − (Loss% × Avg Loss)</div>
<p>Win rate 40% tetap menguntungkan kalau rata-rata untung 2,5x rata-rata rugi.</p>`,
trap:"Average down tanpa rencana. Average down hanya boleh kalau tesis fundamental masih utuh dan sudah direncanakan sejak awal, bukan karena berharap.",
prak:"Gunakan Kalkulator Position Size dan Expectancy di Tools untuk 10 trade terakhirmu.",
ref:"Van Tharp, Trade Your Way to Financial Freedom; Pompian." },
{ id:"g2", t:"Bias perilaku & jurnal trading", m:10,
inti:"Pasar memanfaatkan bias kita. Bandar butuh ritel yang FOMO saat distribusi dan panik saat akumulasi.",
body:`
<div class="tablewrap"><table><tr><th>Bias</th><th>Bentuk di saham</th><th>Penangkal</th></tr>
<tr><td>Loss aversion / disposition effect</td><td>Cepat jual yang untung, menahan yang rugi</td><td>Stop loss tertulis sebelum entry</td></tr>
<tr><td>Overconfidence</td><td>Ukuran posisi membesar setelah beberapa kali untung</td><td>Aturan ukuran tetap (1%)</td></tr>
<tr><td>Anchoring</td><td>"Dulu harganya 9.000, sekarang 5.000 pasti murah"</td><td>Valuasi berdasarkan fundamental, bukan harga lalu</td></tr>
<tr><td>Herding / FOMO</td><td>Ikut grup Telegram, beli di ARA</td><td>Checklist: siapa yang menjual ke saya?</td></tr>
<tr><td>Confirmation bias</td><td>Hanya membaca berita yang mendukung posisi</td><td>Tulis 3 alasan tesis bisa salah</td></tr>
<tr><td>Sunk cost</td><td>"Sudah rugi banyak, tanggung"</td><td>Pertanyaan uang-tunai di g1</td></tr></table></div>
<h3>Isi jurnal</h3><p>Tanggal, saham, setup, alasan, entry/stop/target, ukuran, hasil, <b>emosi saat entry & exit</b>, pelajaran. Review tiap akhir bulan: setup mana yang benar-benar menghasilkan?</p>`,
trap:"Jurnal hanya untuk trade yang untung.",
prak:"Mulai jurnal di spreadsheet hari ini. 30 trade pertama adalah data, bukan penghakiman.",
ref:"Pompian, Behavioral Finance and Wealth Management; CFA L3 Behavioral Finance." },
{ id:"g3", t:"Manipulasi, hukum, dan perlindungan diri", m:8,
inti:"UU Pasar Modal melarang penipuan, manipulasi pasar, transaksi semu, dan insider trading. Mengetahui polanya membuatmu tidak jadi korban — atau pelaku tanpa sadar.",
body:`
<ul><li><b>Pasal 90</b>: penipuan dan pernyataan menyesatkan dalam transaksi efek.</li>
<li><b>Pasal 91</b>: menciptakan gambaran semu tentang kegiatan perdagangan/harga.</li>
<li><b>Pasal 92</b>: rangkaian transaksi yang menyebabkan harga tetap, naik, atau turun untuk memengaruhi pihak lain.</li>
<li><b>Pasal 95–98</b>: perdagangan orang dalam (insider trading).</li></ul>
<p>Pom-pom saham di grup berbayar dengan memiliki posisi yang tidak diungkap juga berisiko hukum. Laporkan dugaan pelanggaran ke OJK (kontak 157).</p>
<h3>Perlindungan diri</h3><ul><li>Hindari saham dengan UMA berulang & notasi khusus kecuali paham risikonya.</li><li>Jangan titip akun/PIN ke orang lain.</li><li>Waspada "kelas bandar" yang menjanjikan profit pasti.</li></ul>`,
trap:"Mengira manipulasi 'hanya bandar besar'. Grup kecil yang serentak beli untuk mengangkat saham juga bisa termasuk.",
prak:"Baca satu putusan/sanksi OJK terkait manipulasi saham dan identifikasi polanya dengan tabel d5.",
ref:"UU No. 8/1995 tentang Pasar Modal jo. UU 4/2023 (P2SK)." },
]},
];

window.GLOSSARY = [
["ARA","Auto Rejection Atas — batas kenaikan harga harian."],["ARB","Auto Rejection Bawah — batas penurunan harian. Asimetris 7% per 19 Okt 2026 (sementara)."],
["Bid","Antrian beli; harga tertinggi yang mau dibayar pembeli."],["Offer / Ask","Antrian jual; harga terendah yang mau diterima penjual."],
["HAKA","Hajar kanan — beli langsung di harga offer."],["HAKI","Hajar kiri — jual langsung di harga bid."],
["Lot","100 lembar saham."],["Fraksi","Tick size, kelipatan perubahan harga."],["Freq","Jumlah order/transaksi."],
["Running trade","Daftar transaksi yang terjadi secara real-time."],["Broker summary","Rekap beli/jual per broker untuk satu saham."],
["Net foreign","F Buy − F Sell; transaksi investor bertipe asing."],["Nego / NG","Pasar negosiasi; transaksi blok di luar order book."],
["Crossing","Broker yang sama di sisi beli dan jual."],["Tektok","Transaksi bolak-balik untuk menciptakan kesan ramai."],
["Spoofing","Memasang order besar tanpa niat dieksekusi, untuk menipu pasar."],["Iceberg","Order besar yang ditampilkan sebagian; terus di-refill."],
["Absorption","Penyerapan jualan oleh antrian beli besar tanpa harga turun."],["Akumulasi","Fase pengumpulan barang oleh pemain besar."],
["Distribusi","Fase pelepasan barang oleh pemain besar ke publik."],["Markup","Fase kenaikan setelah akumulasi."],["Markdown","Fase penurunan setelah distribusi."],
["Spring","(Wyckoff) tembus support sesaat untuk memancing stop loss lalu kembali."],["UTAD","(Wyckoff) Upthrust After Distribution — breakout palsu di atas range."],
["VSA","Volume Spread Analysis — membandingkan volume dengan spread candle."],["IEP","Indicative Equilibrium Price saat lelang pre-opening/closing."],
["UMA","Unusual Market Activity — peringatan BEI atas pergerakan tidak wajar."],["FCA","Full Call Auction — mekanisme papan pemantauan khusus."],
["Cum date","Hari terakhir membeli untuk mendapat hak (dividen/HMETD)."],["Ex date","Hari pertama harga tanpa hak."],
["HMETD","Hak Memesan Efek Terlebih Dahulu (right issue)."],["Free float","Saham beredar yang tidak dipegang pengendali."],
["SID","Single Investor Identification dari KSEI."],["RDN","Rekening Dana Nasabah."],["T+2","Settlement 2 hari bursa setelah transaksi."],
["NIM","Net Interest Margin bank."],["CASA","Porsi giro + tabungan dalam dana pihak ketiga."],["NPL","Non-Performing Loan."],
["PBV","Price to Book Value."],["PER","Price to Earnings Ratio."],["WACC","Weighted Average Cost of Capital."],["DCF","Discounted Cash Flow."],
["YTM","Yield to Maturity obligasi."],["Duration","Sensitivitas harga obligasi terhadap perubahan yield."],["LPS","Lembaga Penjamin Simpanan; menjamin simpanan s.d. Rp2 miliar per nasabah per bank jika bunga ≤ tingkat bunga penjaminan."],
["MSCI rebalancing","Perubahan konstituen/bobot indeks MSCI yang memicu transaksi dana pasif."],["Composite Man","Konsep Wyckoff: bayangkan pasar dikendalikan satu pemain besar."],
];
