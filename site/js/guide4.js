/* Belajar Pelan-pelan: Fundamental — (1) laporan keuangan & rasio, (2) valuasi. Perusahaan & angka fiktif. */
(function(){
const T=o=>window.T(o);
const C=()=>window.Charts;
const loc=()=>window.LANG==="en"?"en-US":"id-ID";
const f=(n,d=0)=>Number(n).toLocaleString(loc(),{minimumFractionDigits:d,maximumFractionDigits:d});
const P=(x,d=1)=>f(x*100,d)+"%";
const tbl=(head,rows,cap)=>`<div class="tablewrap"><table><tr>${head.map(h=>`<th>${T(h)}</th>`).join("")}</tr>${rows.map(r=>`<tr${r.cls?` class="${r.cls}"`:""}>${(r.c||r).map((c,i)=>`<td${i>0?' class="num"':""}>${typeof c==="object"?T(c):c}</td>`).join("")}</tr>`).join("")}</table></div>${cap?`<p class="hint">${T(cap)}</p>`:""}`;
const CO={id:"PT Kopi Nusantara (fiktif)",en:"PT Kopi Nusantara (fictional)"};

/* ================= 1. LAPORAN KEUANGAN ================= */
const FS={ key:"lapkeu", cat:"fund", t:{id:"Laporan keuangan & rasio, pelan-pelan",en:"Financial Statements & Ratios, Step by Step"}, sub:{id:"laba rugi, neraca, arus kas, tren, DuPont, bank",en:"income statement, balance sheet, cash flow, trends, DuPont, banks"},
 endHref:"#/pelan/valuasi", endLabel:{id:"Lanjut: Valuasi pelan-pelan →",en:"Next: Valuation step by step →"},
 data:()=>null, build:()=>({}),
 steps:()=>{ const S=[];
 S.push({t:{id:"Langkah 1 · Tiga laporan, satu cerita",en:"Step 1 · Three statements, one story"},
  text:{id:`<p>Bayangkan kamu membeli sebagian sebuah usaha kedai kopi. Kamu pasti ingin tahu tiga hal:</p>
<ol class="steps"><li><b>Apa yang dimiliki usaha ini, dan dari mana uangnya?</b> → <b>Neraca</b> (posisi pada satu tanggal: kas, mesin, stok, utang, modal).</li>
<li><b>Selama setahun, untung atau rugi?</b> → <b>Laba rugi</b> (pendapatan dikurangi semua biaya).</li>
<li><b>Uang tunainya benar-benar bertambah atau tidak?</b> → <b>Arus kas</b> (uang masuk dan keluar sungguhan).</li></ol>
<p>Ketiganya saling terhubung. Laba bersih dari laporan laba rugi menambah ekuitas di neraca. Arus kas menjelaskan kenapa saldo kas di neraca berubah. Kalau ketiganya tidak "bercerita" sama — misalnya laba besar tapi kas terus berkurang — di situlah pertanyaan pentingnya.</p>
<p>Sepanjang kelas ini kita memakai satu perusahaan contoh: <b>${T(CO)}</b>. Semua angka dalam miliar rupiah.</p>`,
   en:`<p>Imagine buying part of a coffee-shop business. You'd want to know three things:</p>
<ol class="steps"><li><b>What does it own, and where did the money come from?</b> → the <b>balance sheet</b> (a snapshot on one date: cash, machines, stock, debt, equity).</li>
<li><b>Over the year, did it make or lose money?</b> → the <b>income statement</b> (revenue minus all costs).</li>
<li><b>Did its cash actually grow?</b> → the <b>cash flow statement</b> (real money in and out).</li></ol>
<p>All three connect. Net profit from the income statement adds to equity on the balance sheet. The cash flow statement explains why the cash balance changed. When they don't tell the same story — say, big profits but shrinking cash — that's where the important questions are.</p>
<p>Throughout this class we use one example company: <b>${T(CO)}</b>. All figures in billions of rupiah.</p>`}});
 S.push({t:{id:"Langkah 2 · Laba rugi, baris demi baris",en:"Step 2 · The income statement, line by line"},
  chart:()=>tbl([{id:"Pos",en:"Line"},{id:"Rp miliar",en:"Rp bn"},{id:"% pendapatan",en:"% of revenue"}],[
   [{id:"Pendapatan",en:"Revenue"},f(1000),"100%"],[{id:"Harga pokok penjualan (HPP)",en:"Cost of goods sold (COGS)"},"(600)",""],
   {c:[{id:"<b>Laba kotor</b>",en:"<b>Gross profit</b>"},"<b>400</b>","<b>40%</b>"]},[{id:"Beban usaha (gaji, sewa, pemasaran)",en:"Operating expenses (wages, rent, marketing)"},"(220)",""],
   {c:[{id:"<b>Laba usaha</b>",en:"<b>Operating profit</b>"},"<b>180</b>","<b>18%</b>"]},[{id:"Beban bunga",en:"Interest expense"},"(30)",""],
   [{id:"Laba sebelum pajak",en:"Profit before tax"},"150",""],[{id:"Pajak 22%",en:"Tax 22%"},"(33)",""],
   {c:[{id:"<b>Laba bersih</b>",en:"<b>Net profit</b>"},"<b>117</b>","<b>11,7%</b>"]}],{id:"Laba rugi setahun "+T(CO),en:"One-year income statement, "+T(CO)}),
  text:{id:`<p>Baca dari atas ke bawah, seperti air yang mengalir dan tersaring di setiap tahap:</p>
<ul><li><b>Pendapatan 1.000</b>: semua kopi yang terjual.</li><li><b>HPP 600</b>: biaya biji kopi, susu, gelas — langsung terkait produk. Sisa 400 = <b>laba kotor</b>. <b>Margin kotor 40%</b> menunjukkan seberapa kuat "harga jual" dibanding bahan baku; kalau harga biji kopi naik dan perusahaan tidak bisa menaikkan harga, margin ini turun duluan.</li>
<li><b>Beban usaha 220</b>: biaya menjalankan bisnis. Sisa 180 = <b>laba usaha</b> (margin 18%) — inilah laba dari bisnis inti.</li>
<li><b>Bunga 30</b>: biaya utang. Perusahaan dengan utang besar terlihat di sini.</li><li><b>Pajak</b> badan 22%, lalu sisa <b>laba bersih 117</b> (margin bersih 11,7%).</li></ul>
<p>Kalau perusahaan punya 500 juta lembar saham:</p>
<div class="formula">EPS (laba per saham) = 117 miliar ÷ 0,5 miliar lembar = Rp234 per lembar</div>
<p>Angka EPS ini akan dipakai lagi di kelas Valuasi.</p>`,
   en:`<p>Read top to bottom, like water flowing and being filtered at each stage:</p>
<ul><li><b>Revenue 1,000</b>: all coffee sold.</li><li><b>COGS 600</b>: beans, milk, cups — tied directly to the product. What's left, 400, is <b>gross profit</b>. A <b>40% gross margin</b> shows pricing power versus inputs; if bean prices rise and the company can't raise prices, this margin falls first.</li>
<li><b>Operating expenses 220</b>: the cost of running the business. What's left, 180, is <b>operating profit</b> (18% margin) — profit from the core business.</li>
<li><b>Interest 30</b>: the cost of debt. Heavily indebted companies show it here.</li><li><b>Corporate tax</b> 22%, leaving <b>net profit 117</b> (11.7% net margin).</li></ul>
<p>If the company has 500 million shares:</p>
<div class="formula">EPS (earnings per share) = 117 bn ÷ 0.5 bn shares = Rp234 per share</div>
<p>We'll reuse this EPS in the Valuation class.</p>`}});
 S.push({t:{id:"Langkah 3 · Neraca: yang dimiliki = yang dipinjam + modal sendiri",en:"Step 3 · Balance sheet: what you own = what you borrowed + your own money"},
  chart:()=>`<div class="grid g2">${tbl([{id:"Aset",en:"Assets"},"Rp"],[[{id:"Kas",en:"Cash"},"120"],[{id:"Piutang usaha",en:"Receivables"},"150"],[{id:"Persediaan",en:"Inventory"},"130"],{c:[{id:"<b>Aset lancar</b>",en:"<b>Current assets</b>"},"<b>400</b>"]},[{id:"Aset tetap (mesin, gerai)",en:"Fixed assets (machines, outlets)"},"600"],{c:[{id:"<b>Total aset</b>",en:"<b>Total assets</b>"},"<b>1.000</b>"]}])}${tbl([{id:"Liabilitas & ekuitas",en:"Liabilities & equity"},"Rp"],[[{id:"Utang usaha (ke pemasok)",en:"Payables (to suppliers)"},"120"],[{id:"Utang bank jangka pendek",en:"Short-term bank debt"},"80"],{c:[{id:"<b>Liabilitas lancar</b>",en:"<b>Current liabilities</b>"},"<b>200</b>"]},[{id:"Utang bank jangka panjang",en:"Long-term bank debt"},"220"],[{id:"Ekuitas (modal pemegang saham)",en:"Equity (shareholders' capital)"},"580"],{c:[{id:"<b>Total</b>",en:"<b>Total</b>"},"<b>1.000</b>"]}])}</div>`,
  text:{id:`<p>Neraca selalu seimbang: <b>aset = liabilitas + ekuitas</b>. Kiri adalah apa yang dimiliki; kanan adalah dari mana uang untuk membelinya (pinjaman atau modal sendiri). 1.000 = 420 + 580.</p>
<p>Tiga rasio pertama yang bisa langsung dihitung:</p>
<div class="formula">Current ratio = aset lancar ÷ liabilitas lancar = 400 ÷ 200 = 2,0x
DER (utang berbunga ÷ ekuitas) = (80 + 220) ÷ 580 = 0,52x
BVPS (nilai buku per saham) = 580 miliar ÷ 0,5 miliar lembar = Rp1.160</div>
<ul><li><b>Current ratio 2,0x</b>: setiap Rp1 kewajiban jangka pendek dijamin Rp2 aset lancar → aman membayar tagihan dekat.</li><li><b>DER 0,52x</b>: utang bank sekitar setengah dari modal sendiri → tergolong moderat untuk perusahaan non-bank.</li><li><b>BVPS Rp1.160</b>: kalau semua aset dijual sesuai nilai buku dan utang dilunasi, kira-kira segini sisa per lembar. Dipakai untuk PBV.</li></ul>`,
   en:`<p>A balance sheet always balances: <b>assets = liabilities + equity</b>. The left is what's owned; the right is where the money came from (borrowed or own capital). 1,000 = 420 + 580.</p>
<p>Three ratios you can compute right away:</p>
<div class="formula">Current ratio = current assets ÷ current liabilities = 400 ÷ 200 = 2.0x
D/E (interest-bearing debt ÷ equity) = (80 + 220) ÷ 580 = 0.52x
BVPS (book value per share) = 580 bn ÷ 0.5 bn shares = Rp1,160</div>
<ul><li><b>Current ratio 2.0x</b>: each Rp1 of short-term obligations is covered by Rp2 of current assets → comfortable paying near-term bills.</li><li><b>D/E 0.52x</b>: bank debt about half of own capital → moderate for a non-bank.</li><li><b>BVPS Rp1,160</b>: if assets sold at book value and debts were repaid, roughly this would remain per share. Used for P/B.</li></ul>`}});
 S.push({t:{id:"Langkah 4 · Arus kas: kenapa laba ≠ uang tunai",en:"Step 4 · Cash flow: why profit ≠ cash"},
  chart:()=>tbl([{id:"Pos",en:"Line"},"Rp"],[[{id:"Laba bersih",en:"Net profit"},"117"],[{id:"+ Depresiasi (biaya tanpa keluar kas)",en:"+ Depreciation (non-cash cost)"},"50"],[{id:"− Piutang naik (penjualan belum dibayar)",en:"− Receivables up (sales not yet paid)"},"(40)"],[{id:"− Persediaan naik (uang tertahan di stok)",en:"− Inventory up (cash tied up in stock)"},"(20)"],[{id:"+ Utang usaha naik (belum bayar pemasok)",en:"+ Payables up (suppliers not yet paid)"},"10"],
   {c:[{id:"<b>Arus kas operasi (CFO)</b>",en:"<b>Operating cash flow (CFO)</b>"},"<b>117</b>"]},[{id:"− Belanja modal (capex: gerai & mesin baru)",en:"− Capital expenditure (new outlets & machines)"},"(90)"],
   {c:[{id:"<b>Free cash flow (FCF)</b>",en:"<b>Free cash flow (FCF)</b>"},"<b>27</b>"]},[{id:"− Dividen dibayar",en:"− Dividends paid"},"(40)"]]),
  text:{id:`<p>Laba bersih dihitung saat penjualan <i>terjadi</i>, bukan saat uangnya <i>diterima</i>. Contoh: kedai menjual kopi ke kantor dengan tempo 30 hari. Penjualannya sudah dicatat sebagai pendapatan & laba, tapi uangnya belum masuk — tercatat sebagai <b>piutang</b>.</p>
<ul><li><b>Depresiasi</b> dikurangkan di laba rugi, tapi tidak ada uang yang keluar tahun ini (mesin dibeli tahun lalu) → ditambahkan kembali.</li><li><b>Piutang & persediaan yang naik</b> berarti uang tertahan → mengurangi kas.</li><li><b>Utang usaha yang naik</b> berarti menunda bayar pemasok → menambah kas sementara.</li></ul>
<p>Hasilnya CFO 117. Setelah membeli mesin dan gerai baru (capex 90), <b>free cash flow hanya 27</b>. Tapi dividen yang dibayar 40 — <b>lebih besar dari FCF</b>. Selisihnya dibiayai dari kas lama atau utang. Sekali-sekali wajar (sedang ekspansi), tapi kalau terjadi bertahun-tahun, dividen itu tidak berkelanjutan.</p>`,
   en:`<p>Profit is recorded when a sale <i>happens</i>, not when the money <i>arrives</i>. Example: the shop sells coffee to an office on 30-day terms. The sale is booked as revenue & profit, but the cash hasn't come in — it sits as a <b>receivable</b>.</p>
<ul><li><b>Depreciation</b> is deducted in the income statement, but no cash left this year (the machine was bought earlier) → added back.</li><li><b>Rising receivables & inventory</b> mean cash tied up → reduces cash.</li><li><b>Rising payables</b> mean paying suppliers later → temporarily adds cash.</li></ul>
<p>The result is CFO of 117. After buying new machines and outlets (capex 90), <b>free cash flow is only 27</b>. Yet dividends paid were 40 — <b>more than FCF</b>. The gap came from old cash or debt. Fine occasionally (during expansion), but for years on end such a dividend isn't sustainable.</p>`}});
 S.push({t:{id:"Langkah 5 · Soal: laba sama, kas berbeda",en:"Step 5 · Question: same profit, different cash"},
  chart:()=>tbl(["",{id:"Perusahaan A",en:"Company A"},{id:"Perusahaan B",en:"Company B"}],[[{id:"Laba bersih",en:"Net profit"},"100","100"],[{id:"Arus kas operasi",en:"Operating cash flow"},"120","30"],[{id:"Piutang (perubahan setahun)",en:"Receivables (change in year)"},"+5","+80"]]),
  opts:[{a:"A",l:{id:"Perusahaan A",en:"Company A"}},{a:"B",l:{id:"Perusahaan B",en:"Company B"}},{a:"same",l:{id:"Sama saja, labanya sama",en:"Same — profits are equal"}}],ans:"A",
  q:{id:"Mana yang labanya lebih berkualitas?",en:"Whose profit is higher quality?"},
  text:{id:`<p>Dua perusahaan sama-sama melaporkan laba 100. Perhatikan arus kas operasinya dan perubahan piutangnya.</p>`,en:`<p>Both companies report a profit of 100. Look at their operating cash flow and the change in receivables.</p>`},
  why:{id:"Laba A berubah menjadi kas 120 (bahkan lebih, karena ada depresiasi). Laba B hanya menghasilkan kas 30, karena 80 tertahan sebagai piutang — pelanggan belum membayar. Kalau sebagian piutang itu tidak tertagih, laba B sebenarnya lebih kecil dari yang dilaporkan. Rasio sederhana: CFO ÷ laba bersih. Konsisten di atas 1 = baik; konsisten jauh di bawah 1 = lampu kuning.",en:"A's profit turned into 120 of cash (even more, thanks to depreciation). B's produced only 30 because 80 is stuck as receivables — customers haven't paid. If some of it is never collected, B's real profit is smaller than reported. A simple ratio: CFO ÷ net profit. Consistently above 1 = good; consistently far below 1 = amber light."}});
 S.push({t:{id:"Langkah 6 · Membaca tren 5 tahun",en:"Step 6 · Reading a 5-year trend"},
  chart:()=>tbl([{id:"Tahun",en:"Year"},"2021","2022","2023","2024","2025"],[[{id:"Pendapatan",en:"Revenue"},"800","880","950","1.000","1.050"],[{id:"Piutang",en:"Receivables"},"110","120","130","150","230"],[{id:"Laba bersih",en:"Net profit"},"90","98","108","117","125"],[{id:"Arus kas operasi",en:"Operating cash flow"},"95","100","112","117","60"]]),
  opts:[{a:"rec",l:{id:"Piutang melonjak jauh lebih cepat dari pendapatan, dan arus kas turun separuh",en:"Receivables jumped far faster than revenue, and cash flow halved"}},{a:"good",l:{id:"Tidak ada masalah — laba terus naik",en:"No problem — profit keeps rising"}},{a:"rev",l:{id:"Pendapatan turun",en:"Revenue fell"}}],ans:"rec",
  q:{id:"Apa lampu kuning di tahun 2025?",en:"What's the amber light in 2025?"},
  text:{id:`<p>Satu tahun data bisa menipu; lima tahun memperlihatkan arah. Hitung pertumbuhan rata-rata pendapatan:</p>
<div class="formula">CAGR pendapatan = (1.050 ÷ 800)^(1/4) − 1 ≈ 7,0% per tahun</div>
<p>Lalu bandingkan baris-baris lain dengan pertumbuhan itu.</p>`,
   en:`<p>One year of data can mislead; five years show direction. Compute average revenue growth:</p>
<div class="formula">Revenue CAGR = (1,050 ÷ 800)^(1/4) − 1 ≈ 7.0% a year</div>
<p>Then compare the other lines with that growth.</p>`},
  why:{id:"Pendapatan 2025 hanya naik 5%, tapi piutang naik 53% (150 → 230). Lama penagihan (DSO) memanjang dari ±55 hari (150 ÷ 1.000 × 365) menjadi ±80 hari (230 ÷ 1.050 × 365). Arus kas operasi turun dari 117 ke 60 walau laba naik. Kemungkinan: perusahaan melonggarkan syarat pembayaran untuk mendorong penjualan, ada pelanggan bermasalah, atau pengakuan pendapatan terlalu agresif. Cari penjelasannya di Catatan atas Laporan Keuangan (CALK).",en:"2025 revenue rose only 5%, but receivables rose 53% (150 → 230). Days sales outstanding stretched from ~55 days (150 ÷ 1,000 × 365) to ~80 days (230 ÷ 1,050 × 365). Operating cash flow fell from 117 to 60 even though profit rose. Possible causes: looser payment terms to push sales, troubled customers, or aggressive revenue recognition. Look for the explanation in the notes to the accounts."}});
 S.push({t:{id:"Langkah 7 · ROE dan rahasia di baliknya (DuPont)",en:"Step 7 · ROE and what's behind it (DuPont)"},
  chart:()=>tbl(["",{id:"Perusahaan A",en:"Company A"},{id:"Perusahaan B",en:"Company B"}],[[{id:"Margin bersih",en:"Net margin"},"20%","5%"],[{id:"Perputaran aset (pendapatan ÷ aset)",en:"Asset turnover (revenue ÷ assets)"},"0,8x","1,0x"],[{id:"Leverage (aset ÷ ekuitas)",en:"Leverage (assets ÷ equity)"},"1,25x","4,0x"],{c:[{id:"<b>ROE</b>",en:"<b>ROE</b>"},"<b>20%</b>","<b>20%</b>"]}]),
  opts:[{a:"A",l:{id:"A — ROE dari margin tinggi, utang kecil",en:"A — ROE from high margins, little debt"}},{a:"B",l:{id:"B — ROE dari utang besar",en:"B — ROE from heavy debt"}},{a:"same",l:{id:"Sama, ROE-nya sama 20%",en:"Same, both ROE 20%"}}],ans:"A",
  q:{id:"ROE keduanya 20%. Mana yang lebih berkualitas?",en:"Both have 20% ROE. Which is higher quality?"},
  text:{id:`<p><b>ROE</b> (laba bersih ÷ ekuitas) mengukur berapa laba yang dihasilkan dari setiap Rp1 modal pemegang saham. ${T(CO)}: 117 ÷ 580 = <b>20,2%</b>.</p>
<p>ROE bisa dipecah menjadi tiga "mesin" (rumus DuPont):</p>
<div class="formula">ROE = margin bersih × perputaran aset × leverage
A: 20% × 0,8 × 1,25 = 20%
B:  5% × 1,0 × 4,0  = 20%</div>`,
   en:`<p><b>ROE</b> (net profit ÷ equity) measures profit generated per Rp1 of shareholders' capital. ${T(CO)}: 117 ÷ 580 = <b>20.2%</b>.</p>
<p>ROE can be split into three "engines" (the DuPont formula):</p>
<div class="formula">ROE = net margin × asset turnover × leverage
A: 20% × 0.8 × 1.25 = 20%
B:  5% × 1.0 × 4.0  = 20%</div>`},
  why:{id:"A mendapat ROE 20% karena bisnisnya memang sangat menguntungkan (margin 20%) dengan utang kecil. B mendapat ROE yang sama karena memakai utang 4 kali modalnya. Kalau penjualan B turun sedikit saja atau bunga naik, margin 5% bisa habis dan utang menjadi beban berat. ROE dari margin lebih tahan banting daripada ROE dari utang.",en:"A earns a 20% ROE because the business is genuinely profitable (20% margin) with little debt. B gets the same ROE by borrowing 4× its equity. If B's sales dip slightly or rates rise, a 5% margin can vanish and the debt becomes a heavy burden. ROE from margins is far sturdier than ROE from leverage."}});
 S.push({t:{id:"Langkah 8 · Bank dibaca dengan cara berbeda",en:"Step 8 · Banks are read differently"},
  chart:()=>tbl(["",{id:"Bank Contoh A",en:"Sample Bank A"},{id:"Bank Contoh B",en:"Sample Bank B"}],[["NIM","5,8%","4,2%"],["CASA","80%","55%"],["NPL","1,8%","4,5%"],["CAR","28%","17%"],["ROE","21%","11%"]],{id:"Angka ilustrasi, bukan data bank tertentu.",en:"Illustrative figures, not any specific bank."}),
  opts:[{a:"A",l:{id:"Bank A",en:"Bank A"}},{a:"B",l:{id:"Bank B",en:"Bank B"}}],ans:"A",
  q:{id:"Bank mana yang wajar dihargai dengan PBV lebih tinggi?",en:"Which bank deserves a higher P/B?"},
  text:{id:`<p>Bagi bank, utang (simpanan nasabah) adalah bahan baku, jadi DER tidak dipakai. Yang dibaca:</p>
<ul><li><b>NIM</b>: selisih bunga yang diterima dari kredit dan bunga yang dibayar ke penyimpan, dibanding aset produktif. Makin tinggi makin untung.</li>
<li><b>CASA</b>: porsi giro + tabungan (dana murah) dalam total simpanan. Makin tinggi, biaya dana makin murah — keunggulan bank seperti BBCA.</li>
<li><b>NPL</b>: porsi kredit macet. Makin rendah makin sehat.</li><li><b>CAR</b>: bantalan modal untuk menyerap kerugian. Makin tinggi makin aman.</li><li><b>ROE</b>: hasil akhirnya.</li></ul>`,
   en:`<p>For banks, debt (customer deposits) is the raw material, so D/E isn't used. Read these instead:</p>
<ul><li><b>NIM</b>: the gap between interest earned on loans and interest paid to depositors, relative to earning assets. Higher = more profitable.</li>
<li><b>CASA</b>: share of current + savings accounts (cheap funding) in total deposits. Higher = cheaper funding — the edge of banks like BBCA.</li>
<li><b>NPL</b>: share of bad loans. Lower = healthier.</li><li><b>CAR</b>: the capital cushion to absorb losses. Higher = safer.</li><li><b>ROE</b>: the end result.</li></ul>`},
  why:{id:"Bank A unggul di semua aspek: dana murah (CASA 80%), selisih bunga lebar, kredit macet rendah, modal tebal, sehingga ROE 21%. Pasar wajar menghargainya dengan PBV jauh lebih tinggi (lihat rumus PBV wajar di kelas Valuasi). Bank B yang 'terlihat murah' dengan PBV rendah bisa jadi memang pantas murah.",en:"Bank A wins on everything: cheap funding (80% CASA), wide spreads, low bad loans, thick capital, hence a 21% ROE. The market rightly pays a much higher P/B (see the fair-P/B formula in the Valuation class). Bank B 'looking cheap' on a low P/B may deserve to be cheap."}});
 S.push({t:{id:"Langkah 9 · Di mana mencari laporan keuangan",en:"Step 9 · Where to find financial statements"},
  text:{id:`<ol class="steps"><li>Buka <b>idx.co.id</b> → Perusahaan Tercatat → Laporan Keuangan & Tahunan, lalu cari kode sahamnya.</li>
<li>Laporan <b>kuartalan</b> (Q1, semester, Q3) dan <b>tahunan</b> (diaudit). Laporan tahunan biasanya terbit paling lambat akhir Maret tahun berikutnya; laporan interim sekitar 1–3 bulan setelah periode, tergantung diaudit/ditelaah atau tidak (cek ketentuan OJK terbaru).</li>
<li>Bandingkan selalu dengan <b>periode yang sama tahun lalu</b> (Q3 2026 vs Q3 2025), karena banyak bisnis musiman.</li>
<li>Baca juga <b>Catatan atas Laporan Keuangan (CALK)</b> untuk piutang, utang, pihak berelasi, dan kebijakan akuntansi.</li>
<li>Laporan tahunan (annual report) berisi penjelasan manajemen, strategi, dan risiko — bagus untuk memahami bisnisnya.</li></ol>`,
   en:`<ol class="steps"><li>Go to <b>idx.co.id</b> → Listed Companies → Financial & Annual Reports, then search the ticker.</li>
<li><b>Quarterly</b> reports (Q1, half-year, Q3) and <b>annual</b> (audited). Annual reports usually appear by the end of March of the following year; interim reports roughly 1–3 months after the period, depending on audit/review status (check the latest OJK rules).</li>
<li>Always compare with the <b>same period last year</b> (Q3 2026 vs Q3 2025), since many businesses are seasonal.</li>
<li>Also read the <b>notes to the accounts</b> for receivables, debt, related parties and accounting policies.</li>
<li>The annual report contains management's discussion, strategy and risks — great for understanding the business.</li></ol>`}});
 S.push({t:{id:"Langkah 10 · Checklist 10 menit",en:"Step 10 · A 10-minute checklist"},
  text:{id:`<ul class="chk-list"><li>Pendapatan 5 tahun: tumbuh stabil? Hitung CAGR.</li><li>Margin kotor & margin usaha: stabil atau tergerus?</li><li>Laba bersih vs arus kas operasi: CFO ≈ atau &gt; laba?</li><li>Piutang & persediaan: tumbuh lebih cepat dari pendapatan?</li><li>Free cash flow positif? Cukup untuk dividen?</li><li>DER & beban bunga: aman jika suku bunga naik?</li><li>ROE: tinggi karena margin atau karena utang?</li><li>Bank: NIM, CASA, NPL, CAR, ROE.</li><li>CALK: pihak berelasi, perubahan kebijakan akuntansi, kontinjensi.</li><li>Opini auditor & ketepatan waktu laporan.</li></ul>
<p>Rumus-rumus ini juga ada di <a href="#/tools">Tools</a>, dan versi lengkapnya di Modul B (B1, B2, B5).</p>`,
   en:`<ul class="chk-list"><li>5-year revenue: steady growth? Compute the CAGR.</li><li>Gross & operating margins: stable or eroding?</li><li>Net profit vs operating cash flow: CFO ≈ or &gt; profit?</li><li>Receivables & inventory: growing faster than revenue?</li><li>Positive free cash flow? Enough for dividends?</li><li>D/E & interest expense: safe if rates rise?</li><li>ROE: high from margins or from debt?</li><li>Banks: NIM, CASA, NPL, CAR, ROE.</li><li>Notes: related parties, accounting-policy changes, contingencies.</li><li>Auditor's opinion & timely reporting.</li></ul>
<p>These formulas are also in <a href="#/tools">Tools</a>, with the full version in Module B (B1, B2, B5).</p>`}});
 return S; }
};

/* ================= 2. VALUASI ================= */
const VSEED=8819;
function vData(){ return C().gen(VSEED,2000,[[150,.12,1.4],[60,-.35,1.6,1.2],[120,.18,1.4],[50,-.3,1.5,1.1],[140,.15,1.4]]); }
function vBuild(D){ const c=D.map(x=>x.c), base=C().sma(c,120);
  const eps=base.map((v,i)=>v==null?null:v/12*(1+0.0004*i)); // EPS fiktif yang tumbuh perlahan
  const per=c.map((x,i)=>eps[i]?x/eps[i]:null).filter(x=>x!=null); const m=per.reduce((a,b)=>a+b,0)/per.length, sd=Math.sqrt(per.reduce((a,b)=>a+(b-m)**2,0)/per.length);
  const band=k=>eps.map(e=>e==null?null:e*(m+k*sd));
  let Q=-1; for(let i=200;i<D.length-60;i++){ if(eps[i]&&c[i]<band(-1)[i]&&c[i-1]>=band(-1)[i-1]){ Q=i; break; } }
  return {eps,m,sd,mid:band(0),up:band(1),lo:band(-1),Q}; }
function vChart(D,X,k,opt={}){ const s0=opt.s0??120, end=opt.reveal||k, cut=a=>a.slice(s0,end+1);
  const o={h:260,vol:false,type:"line",lines:[{a:cut(X.up),col:"var(--down)",label:"+1 SD",w:1.2,dash:"5 4"},{a:cut(X.mid),col:"var(--muted)",label:T({id:"PER rata-rata",en:"avg P/E"}),w:1.2},{a:cut(X.lo),col:"var(--up)",label:"−1 SD",w:1.2,dash:"5 4"}],vl:[],zones:[]};
  if(opt.here!=null) o.vl.push({i:opt.here-s0,label:T({id:"kamu di sini",en:"you are here"})});
  if(opt.reveal) o.zones=[{i0:k+1-s0,i1:opt.reveal-s0,col:D[opt.reveal].c>=D[k].c?"var(--up)":"var(--down)"}];
  return C().fig(D.slice(s0,end+1),o,opt.cap||""); }
function dcfWidget(){ return `<div class="card dcfw"><div class="form" style="max-width:520px"><label>${T({id:"FCF tahun depan (Rp miliar)",en:"Next year's FCF (Rp bn)"})}<input type="number" data-k="f" value="100"></label><label>${T({id:"Pertumbuhan 5 tahun (%)",en:"5-year growth (%)"})}<input type="number" data-k="g1" value="10"></label><label>${T({id:"Discount rate r (%)",en:"Discount rate r (%)"})}<input type="number" data-k="r" value="12"></label><label>${T({id:"Pertumbuhan terminal g (%)",en:"Terminal growth g (%)"})}<input type="number" data-k="g" value="5"></label></div><div class="dcfout"></div></div>`; }
function dcfCalc(v){ let pv=0,F=v.f; const rows=[]; for(let t=1;t<=5;t++){ if(t>1) F*=1+v.g1/100; const d=Math.pow(1+v.r/100,t); pv+=F/d; rows.push([t,F,F/d]); }
  if(v.r<=v.g) return {err:true}; const tv=F*(1+v.g/100)/((v.r-v.g)/100), ptv=tv/Math.pow(1+v.r/100,5); return {rows,pv,tv,ptv,tot:pv+ptv}; }
function dcfRender(box){ const g={}; box.querySelectorAll("input").forEach(i=>g[i.dataset.k]=parseFloat(i.value)||0); const o=box.querySelector(".dcfout"); const R=dcfCalc(g);
  if(R.err){ o.innerHTML=`<p class="down">${T({id:"r harus lebih besar dari g.",en:"r must exceed g."})}</p>`; return; }
  const sens=[g.r-1,g.r,g.r+1].map(r=>[g.g-1,g.g,g.g+1].map(gg=>{ const x=dcfCalc({...g,r,g:gg}); return x.err?"–":f(x.tot); }));
  o.innerHTML=tbl([{id:"Tahun",en:"Year"},"FCF",{id:"Nilai sekarang",en:"Present value"}],R.rows.map(r=>[r[0],f(r[1],1),f(r[2],1)]))+
   `<div class="formula">${T({id:"Jumlah PV 5 tahun",en:"Sum of 5-year PVs"})} = ${f(R.pv,1)}
Terminal value = FCF5 × (1 + g) ÷ (r − g) = ${f(R.tv,0)} → PV = ${f(R.ptv,1)}
${T({id:"Nilai perusahaan",en:"Firm value"})} = ${f(R.tot,0)}   (${T({id:"porsi terminal value",en:"terminal value share"})} ${P(R.ptv/R.tot,0)})</div>
   <b>${T({id:"Sensitivitas nilai (baris = r, kolom = g)",en:"Value sensitivity (rows = r, columns = g)"})}</b>`+
   tbl(["r \\ g",(g.g-1)+"%",g.g+"%",(g.g+1)+"%"],[g.r-1,g.r,g.r+1].map((r,i)=>[r+"%",...sens[i]])); }
const VAL={ key:"valuasi", cat:"fund", t:{id:"Valuasi pelan-pelan: murah atau mahal?",en:"Valuation Step by Step: Cheap or Expensive?"}, sub:{id:"PER, PBV, band PER, value trap, DCF, margin of safety",en:"P/E, P/B, P/E bands, value traps, DCF, margin of safety"},
 endHref:"#/tools?t=dcf", endLabel:{id:"Coba di kalkulator valuasi →",en:"Try the valuation calculators →"},
 data:vData, build:vBuild,
 steps:(D,X)=>{ const last=D.length-1, S=[];
 S.push({t:{id:"Langkah 1 · Harga vs nilai",en:"Step 1 · Price vs value"},
  text:{id:`<p><b>Harga</b> adalah angka di layar hari ini. <b>Nilai</b> adalah berapa sebenarnya bisnis itu layak dibayar, berdasarkan uang yang akan ia hasilkan di masa depan. Investor mencari saat harga berada <b>di bawah</b> nilai.</p>
<p>Analogi: sebuah kedai kopi menghasilkan laba bersih Rp117 juta setahun dan diperkirakan stabil. Berapa harga yang wajar untuk membelinya?</p>
<ul><li>Dibayar Rp585 juta → balik modal dari laba sekitar <b>5 tahun</b>.</li><li>Dibayar Rp1,17 miliar → <b>10 tahun</b>.</li><li>Dibayar Rp3,5 miliar → <b>30 tahun</b> — kecuali kamu yakin labanya akan tumbuh pesat.</li></ul>
<p>"Berapa tahun laba untuk menebus harga" itulah inti dari <b>PER</b>.</p>`,
   en:`<p><b>Price</b> is the number on the screen today. <b>Value</b> is what the business is truly worth, based on the money it will produce in future. Investors look for times when price is <b>below</b> value.</p>
<p>Analogy: a coffee shop earns Rp117 million net a year, expected to be stable. What's a fair price to buy it?</p>
<ul><li>Pay Rp585 million → earnings pay you back in about <b>5 years</b>.</li><li>Pay Rp1.17 billion → <b>10 years</b>.</li><li>Pay Rp3.5 billion → <b>30 years</b> — unless you're confident earnings will grow fast.</li></ul>
<p>"How many years of earnings to pay back the price" is the heart of the <b>P/E</b>.</p>`}});
 S.push({t:{id:"Langkah 2 · PER dan 'imbal hasil laba'",en:"Step 2 · P/E and the 'earnings yield'"},
  text:{id:`<p>Pakai ${T(CO)} dari kelas sebelumnya: EPS Rp234. Misalkan harga sahamnya Rp2.340.</p>
<div class="formula">PER = harga ÷ EPS = 2.340 ÷ 234 = 10x
Earnings yield = EPS ÷ harga = 1 ÷ PER = 10%</div>
<p>Earnings yield 10% bisa dibandingkan dengan alternatif lain: deposito 5,5% (bersih ±4,4% setelah pajak 20%), SBN 10 tahun ±6–7%. Saham berisiko lebih tinggi, jadi wajar menuntut imbal hasil lebih besar.</p>
<p>PER sendiri tidak bisa bilang murah atau mahal. Bandingkan dengan:</p><ol><li><b>PER historis saham itu sendiri</b> (langkah 4).</li><li><b>PER pesaing sejenis</b>.</li><li><b>Pertumbuhan laba</b>: PER 20x dengan laba tumbuh 20% per tahun bisa lebih murah dari PER 8x dengan laba yang menyusut.</li></ol>`,
   en:`<p>Use ${T(CO)} from the previous class: EPS Rp234. Suppose the share price is Rp2,340.</p>
<div class="formula">P/E = price ÷ EPS = 2,340 ÷ 234 = 10x
Earnings yield = EPS ÷ price = 1 ÷ P/E = 10%</div>
<p>A 10% earnings yield can be compared with alternatives: a 5.5% deposit (~4.4% net after 20% tax), 10-year government bonds ~6–7%. Stocks are riskier, so demanding a higher yield is reasonable.</p>
<p>P/E alone can't say cheap or expensive. Compare it with:</p><ol><li><b>The stock's own historical P/E</b> (step 4).</li><li><b>Similar peers' P/E</b>.</li><li><b>Earnings growth</b>: a 20x P/E with 20% annual growth can be cheaper than 8x with shrinking earnings.</li></ol>`}});
 S.push({t:{id:"Langkah 3 · PBV, dan kenapa ROE menentukannya",en:"Step 3 · P/B, and why ROE drives it"},
  text:{id:`<div class="formula">PBV = harga ÷ BVPS = 2.340 ÷ 1.160 = 2,0x</div>
<p>Artinya pasar membayar Rp2 untuk setiap Rp1 modal di buku. Wajarkah? Tergantung seberapa produktif modal itu (ROE) dibanding imbal hasil yang diminta investor (<b>cost of equity</b>, Ke):</p>
<div class="formula">PBV wajar ≈ (ROE − g) ÷ (Ke − g)
ROE 20%, Ke 12%, g 6% → (20 − 6) ÷ (12 − 6) = 14 ÷ 6 = 2,33x
Harga wajar ≈ 2,33 × 1.160 ≈ Rp2.700</div>
<p>Intuisinya: perusahaan yang menghasilkan 20% dari modalnya, padahal investor hanya menuntut 12%, pantas dihargai di atas nilai bukunya. Sebaliknya, perusahaan dengan ROE di bawah Ke pantas dihargai di bawah nilai buku (PBV &lt; 1) — bukan "murah", memang begitu nilainya.</p>
<p>Ini rumus yang paling sering dipakai untuk menilai <b>bank</b>.</p>`,
   en:`<div class="formula">P/B = price ÷ BVPS = 2,340 ÷ 1,160 = 2.0x</div>
<p>So the market pays Rp2 for each Rp1 of book capital. Fair? It depends on how productive that capital is (ROE) versus the return investors require (<b>cost of equity</b>, Ke):</p>
<div class="formula">Fair P/B ≈ (ROE − g) ÷ (Ke − g)
ROE 20%, Ke 12%, g 6% → (20 − 6) ÷ (12 − 6) = 14 ÷ 6 = 2.33x
Fair price ≈ 2.33 × 1,160 ≈ Rp2,700</div>
<p>Intuition: a company earning 20% on its capital when investors only require 12% deserves a price above book value. Conversely, a company with ROE below Ke deserves a P/B below 1 — not "cheap", that's simply its worth.</p>
<p>This is the formula most often used to value <b>banks</b>.</p>`}});
 S.push({t:{id:"Langkah 4 · Band PER: murah dibanding sejarahnya sendiri",en:"Step 4 · P/E bands: cheap versus its own history"},
  chart:()=>vChart(D,X,last,{cap:T({id:"Garis tengah = harga pada PER rata-rata historis. Putus-putus = ±1 simpangan baku. Data fiktif.",en:"Middle line = price at the historical average P/E. Dashed = ±1 standard deviation. Fictional data."})}),
  text:{id:`<p>Cara membuatnya: hitung PER setiap hari selama beberapa tahun, lalu cari rata-rata dan simpangan bakunya. Di contoh ini PER rata-rata ±${f(X.m,1)}x dengan simpangan baku ±${f(X.sd,1)}x. Lalu kalikan dengan EPS:</p>
<div class="formula">Garis tengah  = EPS × PER rata-rata
Garis atas    = EPS × (rata-rata + 1 SD)
Garis bawah   = EPS × (rata-rata − 1 SD)</div>
<ul><li>Harga di dekat <b>garis bawah</b> = saham ini sedang dihargai murah dibanding kebiasaannya sendiri.</li><li>Harga di dekat <b>garis atas</b> = sedang dihargai mahal; ekspektasi sudah tinggi.</li></ul>
<p>Syarat pentingnya: <b>fundamental tidak berubah</b>. Kalau bisnisnya memburuk, PER rendah adalah harga yang pantas, bukan diskon.</p>`,
   en:`<p>How it's built: compute the P/E each day over several years, then its average and standard deviation. Here the average P/E is ~${f(X.m,1)}x with a standard deviation of ~${f(X.sd,1)}x. Multiply by EPS:</p>
<div class="formula">Middle line = EPS × average P/E
Upper line  = EPS × (average + 1 SD)
Lower line  = EPS × (average − 1 SD)</div>
<ul><li>Price near the <b>lower line</b> = the stock is priced cheaply relative to its own habit.</li><li>Price near the <b>upper line</b> = priced richly; expectations are high.</li></ul>
<p>The key condition: <b>fundamentals unchanged</b>. If the business has deteriorated, a low P/E is the right price, not a discount.</p>`}});
 if(X.Q>0) S.push({quiz:true,k:X.Q,h:60,exp:"up",t:{id:"Langkah 5 · Tebak: harga jatuh ke bawah band −1 SD",en:"Step 5 · Guess: price drops below the −1 SD band"},
  chart:(rev)=>vChart(D,X,X.Q,{here:X.Q,reveal:rev?Math.min(last,X.Q+60):null}),
  text:{id:`<p>Laba perusahaan (EPS) masih tumbuh perlahan — tidak ada berita buruk tentang bisnisnya. Tapi pasar sedang lesu dan harga baru saja turun <b>ke bawah garis −1 SD</b>: PER-nya sekarang jauh di bawah rata-rata historis.</p><p>Sekitar 60 hari bursa (±3 bulan) ke depan, harga akan…</p>`,
   en:`<p>The company's EPS is still growing slowly — no bad news about the business. But the market is weak and price just fell <b>below the −1 SD line</b>: its P/E is now well below its historical average.</p><p>Over the next ~60 trading days (~3 months), price will…</p>`},
  why:{id:"Saat bisnis baik-baik saja tetapi harga turun karena sentimen, PER yang rendah cenderung kembali ke rata-rata (mean reversion) — harga naik bahkan tanpa laba melonjak. Inilah logika 'beli saat murah dibanding sejarahnya'. Tapi waktunya tidak pasti; bisa berbulan-bulan. Itulah sebabnya investor valuasi memadukan band PER dengan sinyal teknikal/aliran dana untuk menentukan kapan masuk.",en:"When the business is fine but price fell on sentiment, a low P/E tends to revert to its average — price rises even without an earnings jump. That's the logic of 'buy when cheap versus its own history'. But timing is uncertain; it can take months. That's why valuation investors pair P/E bands with technical/flow signals to time entries."}});
 S.push({t:{id:"Langkah 6 · Jebakan: PER rendah di puncak siklus",en:"Step 6 · Trap: a low P/E at the cycle peak"},
  chart:()=>tbl([{id:"Tahun",en:"Year"},"2021","2022","2023","2024"],[[{id:"Harga batu bara (indeks)",en:"Coal price (index)"},"100","280","160","120"],[{id:"Laba bersih (Rp miliar)",en:"Net profit (Rp bn)"},"500","2.400","1.100","650"],[{id:"Harga saham",en:"Share price"},"2.000","3.600","2.900","2.200"],[{id:"PER",en:"P/E"},"6,0x","2,2x","3,9x","5,0x"]],{id:"Emiten tambang fiktif, 600 juta lembar saham.",en:"Fictional miner, 600 million shares."}),
  opts:[{a:"no",l:{id:"Belum tentu — laba rekor itu kemungkinan tidak bertahan",en:"Not necessarily — that record profit likely won't last"}},{a:"yes",l:{id:"Ya, PER 2,2x sangat murah, pasti naik",en:"Yes, a 2.2x P/E is very cheap, it must rise"}}],ans:"no",
  q:{id:"Akhir 2022, PER saham ini hanya 2,2x. Apakah ini murah?",en:"At the end of 2022, this stock's P/E is only 2.2x. Is it cheap?"},
  text:{id:`<p>Ini emiten batu bara fiktif. Pada 2022 harga batu bara melonjak hampir 3 kali, sehingga laba melonjak hampir 5 kali. PER-nya terlihat sangat rendah.</p>`,en:`<p>A fictional coal miner. In 2022 coal prices nearly tripled, so profit jumped almost fivefold. Its P/E looks extremely low.</p>`},
  why:{id:"Untuk saham siklikal (batu bara, nikel, CPO, semen), laba di puncak siklus bersifat sementara. Pasar sudah tahu itu, sehingga memberi PER sangat rendah. Saat harga komoditas turun, laba anjlok dan harga saham ikut turun walau PER 'murah'. Untuk siklikal, pakai laba rata-rata beberapa tahun (normalized earnings) atau EV/EBITDA, dan perhatikan siklus komoditasnya. Paradoksnya: saham siklikal sering paling menarik dibeli saat PER-nya terlihat tinggi (laba di dasar siklus).",en:"For cyclical stocks (coal, nickel, palm oil, cement), peak-cycle profits are temporary. The market knows, so it pays a very low P/E. When commodity prices fall, earnings collapse and the share price follows despite the 'cheap' P/E. For cyclicals, use multi-year average (normalized) earnings or EV/EBITDA and watch the commodity cycle. The paradox: cyclicals are often best bought when their P/E looks high (earnings at the cycle bottom)."}});
 S.push({t:{id:"Langkah 7 · DCF: nilai uang masa depan hari ini",en:"Step 7 · DCF: what future money is worth today"},
  chart:()=>dcfWidget(),
  text:{id:`<p>Uang Rp100 tahun depan <b>lebih kecil nilainya</b> daripada Rp100 hari ini, karena kamu bisa mendapat imbal hasil kalau memegangnya sekarang. Kalau imbal hasil yang kamu tuntut 12% setahun:</p>
<div class="formula">Nilai sekarang Rp100 tahun depan = 100 ÷ 1,12 = 89,3
Rp100 dua tahun lagi           = 100 ÷ 1,12² = 79,7</div>
<p>DCF (discounted cash flow) menjumlahkan nilai sekarang dari semua <b>free cash flow</b> masa depan: 5 tahun yang diproyeksikan, lalu sisanya diringkas dalam <b>terminal value</b>. Ubah angka di atas dan perhatikan:</p>
<ul><li>Terminal value biasanya menyumbang <b>70–80%</b> nilai — artinya asumsi jangka panjang sangat menentukan.</li><li>Lihat tabel sensitivitas: mengubah r atau g hanya 1% bisa menggeser nilai puluhan persen.</li></ul>
<p>Karena itu analis menyajikan <b>rentang nilai</b>, bukan satu angka pasti.</p>`,
   en:`<p>Rp100 next year is <b>worth less</b> than Rp100 today, because you could earn a return if you held it now. If your required return is 12% a year:</p>
<div class="formula">Present value of Rp100 next year = 100 ÷ 1.12 = 89.3
Rp100 in two years              = 100 ÷ 1.12² = 79.7</div>
<p>A DCF (discounted cash flow) adds up the present value of all future <b>free cash flow</b>: 5 projected years, then the rest summarised as a <b>terminal value</b>. Change the inputs above and notice:</p>
<ul><li>The terminal value usually makes up <b>70–80%</b> of the total — so long-run assumptions dominate.</li><li>Check the sensitivity table: moving r or g by just 1% can shift value by tens of percent.</li></ul>
<p>That's why analysts present <b>a range of values</b>, not one precise number.</p>`}});
 S.push({t:{id:"Langkah 8 · Margin of safety",en:"Step 8 · Margin of safety"},
  text:{id:`<p>Karena semua valuasi berisi asumsi yang bisa salah, Benjamin Graham menyarankan membeli hanya bila harga jauh di bawah perkiraan nilai — selisih itu disebut <b>margin of safety</b>.</p>
<div class="formula">Nilai wajar (dari PBV/DCF)   : Rp2.700
Margin of safety yang diminta : 30%
Harga beli maksimal          : 2.700 × (1 − 0,30) = Rp1.890</div>
<ul><li>Bisnis stabil & mudah diprediksi (consumer staples, bank besar): margin 15–25% mungkin cukup.</li><li>Bisnis siklikal / berutang / sulit diprediksi: minta 30–50%.</li></ul>
<p>Margin of safety melindungi dari kesalahan analisis, bukan dari volatilitas harga. Saham yang dibeli dengan diskon 30% masih bisa turun 20% lagi dalam jangka pendek.</p>`,
   en:`<p>Because every valuation rests on assumptions that can be wrong, Benjamin Graham advised buying only when price is well below estimated value — the gap is the <b>margin of safety</b>.</p>
<div class="formula">Fair value (from P/B or DCF) : Rp2,700
Required margin of safety    : 30%
Maximum purchase price       : 2,700 × (1 − 0.30) = Rp1,890</div>
<ul><li>Stable, predictable businesses (staples, large banks): 15–25% may be enough.</li><li>Cyclical / indebted / hard-to-predict businesses: ask for 30–50%.</li></ul>
<p>A margin of safety protects against analytical error, not price volatility. A stock bought at a 30% discount can still fall another 20% in the short run.</p>`}});
 S.push({t:{id:"Langkah 9 · Dividen sebagai dasar nilai",en:"Step 9 · Dividends as the basis of value"},
  text:{id:`<p>Untuk perusahaan yang rutin membagikan sebagian besar labanya (banyak BUMN dan saham dividen), nilainya bisa diperkirakan dari dividen dengan <b>model Gordon</b>:</p>
<div class="formula">Nilai = dividen tahun depan ÷ (Ke − g)
Dividen Rp100, Ke 11%, g 6% → 100 ÷ (0,11 − 0,06) = 100 ÷ 0,05 = Rp2.000
Dividend yield di harga itu = 100 ÷ 2.000 = 5%</div>
<p>Pertumbuhan yang berkelanjutan dibatasi oleh ROE dan porsi laba yang ditahan: <b>g ≈ ROE × (1 − payout)</b>. ROE 20% dengan payout 70% → g ≈ 6%.</p>
<p>Dividend yield tinggi menarik, tapi cek: apakah dividen dibayar dari free cash flow (langkah 4 kelas Laporan Keuangan), dan apakah labanya sedang di puncak siklus (langkah 6)?</p>`,
   en:`<p>For companies that pay out most of their profit (many state-owned and dividend stocks), value can be estimated from dividends with the <b>Gordon model</b>:</p>
<div class="formula">Value = next year's dividend ÷ (Ke − g)
Dividend Rp100, Ke 11%, g 6% → 100 ÷ (0.11 − 0.06) = 100 ÷ 0.05 = Rp2,000
Dividend yield at that price = 100 ÷ 2,000 = 5%</div>
<p>Sustainable growth is capped by ROE and retained profit: <b>g ≈ ROE × (1 − payout)</b>. ROE 20% with a 70% payout → g ≈ 6%.</p>
<p>A high dividend yield is attractive, but check: is it paid from free cash flow (step 4 of the Financial Statements class), and are profits at a cycle peak (step 6)?</p>`}});
 S.push({t:{id:"Langkah 10 · Menggabungkan valuasi dengan timing",en:"Step 10 · Combining valuation with timing"},
  text:{id:`<p>Valuasi menjawab <b>apa</b> yang layak dibeli dan <b>di harga berapa</b>. Ia tidak menjawab <b>kapan</b> harga akan bergerak — saham murah bisa tetap murah berbulan-bulan. Riset Asness, Moskowitz & Pedersen (2013, Journal of Finance) menemukan bahwa menggabungkan <b>value</b> (murah) dan <b>momentum</b> (tren menguat) memberi hasil lebih stabil daripada salah satunya saja.</p>
<ol class="steps"><li><b>Saring kualitas</b>: ROE tinggi & stabil, arus kas ≈ laba, utang wajar.</li><li><b>Valuasi</b>: harga di bawah nilai wajar (PBV/PER band/DCF) dengan margin of safety.</li><li><b>Timing</b>: tunggu tanda tren mulai membaik (harga kembali di atas MA50/awan Ichimoku), atau jejak akumulasi (absorption, net foreign naik, broker terkonsentrasi).</li><li><b>Risiko</b>: tentukan stop dan ukuran posisi.</li></ol>
<p>Lanjutkan latihan: <a href="#/tools?t=pbv">kalkulator PBV & PER wajar</a>, <a href="#/tools?t=dcf">DCF</a>, dan <a href="#/pelan/ichi">Ichimoku pelan-pelan</a> untuk timing.</p>`,
   en:`<p>Valuation answers <b>what</b> is worth buying and <b>at what price</b>. It doesn't answer <b>when</b> price will move — cheap stocks can stay cheap for months. Asness, Moskowitz & Pedersen (2013, Journal of Finance) found that combining <b>value</b> (cheap) with <b>momentum</b> (strengthening trend) gives steadier results than either alone.</p>
<ol class="steps"><li><b>Screen for quality</b>: high, stable ROE, cash flow ≈ profit, sensible debt.</li><li><b>Valuation</b>: price below fair value (P/B, P/E bands, DCF) with a margin of safety.</li><li><b>Timing</b>: wait for the trend to improve (back above the MA50/Ichimoku cloud), or accumulation footprints (absorption, rising net foreign, concentrated brokers).</li><li><b>Risk</b>: set a stop and position size.</li></ol>
<p>Keep practising: the <a href="#/tools?t=pbv">fair P/B & P/E calculator</a>, <a href="#/tools?t=dcf">DCF</a>, and <a href="#/pelan/ichi">Ichimoku step by step</a> for timing.</p>`}});
 return S; }
};

const L=window.Guide.list; const at=L.findIndex(g=>g.key==="asing"); L.splice(at+1,0,FS,VAL);
window.Guide.afterDraw=(el)=>{ const w=el.querySelector(".dcfw"); if(w){ w.querySelectorAll("input").forEach(i=>i.oninput=()=>dcfRender(w)); dcfRender(w); } };
window.__VAL={vData,vBuild};
})();
