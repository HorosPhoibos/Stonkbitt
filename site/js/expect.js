/* Ekspektasi Realistis + Riset & Metode (jurnal bereputasi). Ringkasan ditulis ulang dengan bahasa sendiri. */
(function(){
const T=o=>window.T(o);

const STUDIES=[
 {g:{id:"Seberapa banyak trader aktif yang untung?",en:"How many active traders make money?"}, items:[
  {c:"Barber & Odean (2000), Journal of Finance",
   f:{id:"Data ±66 ribu rumah tangga di broker AS (1991–1996): kelompok yang paling sering bertransaksi memperoleh ±11,4% per tahun, padahal pasar ±17,9%. Biaya & terlalu sering trading memakan hasil.",en:"About 66,000 US brokerage households (1991–1996): the most active traders earned ~11.4% a year versus ~17.9% for the market. Costs and overtrading ate the returns."},
   u:{id:"Jangan menilai diri dari 'untung', bandingkan dengan IHSG/LQ45 setelah biaya.",en:"Don't judge yourself by 'profit'; compare to the JCI/LQ45 after costs."}, s:3},
  {c:"Barber, Lee, Liu & Odean (2014), Journal of Financial Markets",
   f:{id:"Seluruh day trader Taiwan 1992–2006: kurang dari 1% yang mampu untung secara konsisten dan dapat diprediksi setelah biaya.",en:"All Taiwanese day traders 1992–2006: fewer than 1% could earn predictable, reliable profits net of fees."},
   u:{id:"Day trading murni adalah permainan dengan peluang sangat kecil. Swing/posisi lebih realistis.",en:"Pure day trading is a game with very low odds. Swing/position trading is more realistic."}, s:3},
  {c:"Chague, De-Losso & Giovannetti (2019), makalah kerja (SSRN)",
   f:{id:"Brasil: dari 1.551 orang yang day trading kontrak indeks lebih dari 300 hari, ±97% rugi setelah biaya; hanya sekitar 1% yang penghasilannya melampaui upah minimum.",en:"Brazil: of 1,551 people who day-traded index futures for over 300 days, ~97% lost money after fees; only about 1% earned more than the minimum wage."},
   u:{id:"Bertahan lama tidak otomatis membuat untung — kecuali metodenya diuji & dicatat.",en:"Persistence alone doesn't make you profitable — unless the method is tested and journaled."}, s:2},
 ]},
 {g:{id:"Analisis teknikal: apakah berhasil?",en:"Technical analysis: does it work?"}, items:[
  {c:"Brock, Lakonishok & LeBaron (1992), Journal of Finance",
   f:{id:"Aturan moving average & breakout range sederhana pada Dow Jones 1897–1986: hari sinyal beli memiliki return lebih tinggi dari hari sinyal jual.",en:"Simple moving-average and trading-range-break rules on the Dow Jones 1897–1986: buy-signal days had higher returns than sell-signal days."},
   u:{id:"MA & breakout layak dipelajari — lalu diuji di saham IDX dengan Lab Indikator.",en:"MAs & breakouts are worth learning — then test them on IDX stocks in the Indicator Lab."}, s:2},
  {c:"Sullivan, Timmermann & White (1999), Journal of Finance",
   f:{id:"Setelah dikoreksi untuk data snooping, aturan terbaik masih bagus di sampel lama, tetapi keunggulannya tidak berlanjut di 10 tahun berikutnya.",en:"After correcting for data snooping, the best rule still looked good in the old sample, but its edge did not continue in the following decade."},
   u:{id:"Selalu uji di periode yang tidak dipakai untuk mencari aturan (out-of-sample).",en:"Always test on a period not used to find the rule (out-of-sample)."}, s:3},
  {c:"Lo, Mamaysky & Wang (2000), Journal of Finance",
   f:{id:"Pola grafik (head & shoulders, double bottom, dll.) yang dideteksi otomatis memberi sedikit informasi tambahan tentang distribusi return, tetapi bukan jaminan arah.",en:"Chart patterns (head & shoulders, double bottoms, etc.) detected algorithmically carried some incremental information about return distributions, but no directional guarantee."},
   u:{id:"Pola grafik = petunjuk peluang, bukan ramalan.",en:"Chart patterns = probability hints, not forecasts."}, s:2},
  {c:"Park & Irwin (2007), Journal of Economic Surveys",
   f:{id:"Tinjauan 95 studi modern: 56 menemukan hasil positif, 20 negatif, 19 campuran — tetapi banyak yang lemah karena data snooping, pemilihan aturan setelah melihat hasil, serta biaya & risiko yang tidak dihitung dengan benar.",en:"A review of 95 modern studies: 56 positive, 20 negative, 19 mixed — but many suffer from data snooping, ex-post rule selection, and poorly estimated costs and risk."},
   u:{id:"Teknikal bisa membantu, tapi buktinya rapuh. Ukur sendiri dengan jurnal & backtest.",en:"Technicals can help, but the evidence is fragile. Measure it yourself with a journal and backtests."}, s:3},
 ]},
 {g:{id:"Momentum & faktor (yang paling kuat buktinya)",en:"Momentum & factors (the strongest evidence)"}, items:[
  {c:"Jegadeesh & Titman (1993), Journal of Finance",
   f:{id:"Membeli saham pemenang 3–12 bulan terakhir dan menjual pecundang menghasilkan sekitar 1% per bulan di saham AS (1965–1989).",en:"Buying the past 3–12-month winners and selling the losers earned about 1% a month in US stocks (1965–1989)."},
   u:{id:"Di IDX: prioritaskan saham LQ45/IDX80 dengan return 6–12 bulan terkuat, hindari yang terlemah. Uji dulu dengan biaya.",en:"On IDX: favour LQ45/IDX80 stocks with the strongest 6–12-month returns, avoid the weakest. Test with costs first."}, s:3},
  {c:"Asness, Moskowitz & Pedersen (2013), Journal of Finance",
   f:{id:"Premi value dan momentum muncul di banyak negara & kelas aset, dan keduanya cenderung berkorelasi negatif — menggabungkannya membuat hasil lebih stabil.",en:"Value and momentum premia appear across many countries and asset classes and tend to be negatively correlated — combining them smooths results."},
   u:{id:"Gabungkan 'murah' (PBV/PER rendah) dengan 'tren kuat'. Inilah dasar 'fundamental dulu, lalu timing'.",en:"Combine 'cheap' (low P/B, P/E) with 'strong trend'. This is the basis of 'fundamentals first, then timing'."}, s:3},
  {c:"Moskowitz, Ooi & Pedersen (2012), Journal of Financial Economics",
   f:{id:"Time-series momentum: return 12 bulan terakhir sebuah aset memprediksi arah berikutnya, di 58 kontrak berjangka.",en:"Time-series momentum: an asset's own past 12-month return predicts its next move, across 58 futures contracts."},
   u:{id:"Aturan sederhana: pegang saham/indeks saat di atas MA 200 hari (≈12 bulan), kurangi saat di bawahnya.",en:"Simple rule: hold a stock/index above its 200-day MA (≈12 months), reduce below it."}, s:3},
  {c:"Fama & French (1993, 2015), Journal of Financial Economics; Novy-Marx (2013), JFE",
   f:{id:"Return saham dijelaskan oleh faktor ukuran, value, profitabilitas, dan investasi. Perusahaan dengan laba kotor tinggi relatif terhadap aset cenderung berkinerja lebih baik.",en:"Stock returns are explained by size, value, profitability and investment factors. Companies with high gross profit relative to assets tend to outperform."},
   u:{id:"Saring saham dengan ROE/ROA tinggi & stabil sebelum melihat grafik.",en:"Screen for high, stable ROE/ROA before looking at charts."}, s:3},
 ]},
 {g:{id:"Order flow & mikrostruktur (dasar ilmiah bandarmologi)",en:"Order flow & microstructure (the science behind bandarmology)"}, items:[
  {c:"Kyle (1985), Econometrica",
   f:{id:"Model klasik: pemain yang punya informasi akan memecah ordernya sedikit-sedikit dan bersembunyi di antara transaksi orang lain agar harga tidak cepat bergerak.",en:"Classic model: an informed trader splits orders over time and hides among other people's trades so the price doesn't move too fast."},
   u:{id:"Inilah sebabnya akumulasi terlihat sebagai lot 'aneh' berulang & absorption, bukan satu order raksasa.",en:"This is why accumulation shows up as repeated 'odd' lot sizes and absorption, not one giant order."}, s:3},
  {c:"Cont, Kukanov & Stoikov (2014), Journal of Financial Econometrics",
   f:{id:"Perubahan harga jangka sangat pendek berhubungan hampir linier dengan order flow imbalance (selisih tambahan/penarikan antrian bid vs offer), dan efeknya makin kecil saat order book tebal.",en:"Very short-term price changes are roughly linear in order flow imbalance (net additions/cancellations at the best bid vs offer), with a smaller effect when the book is deep."},
   u:{id:"Yang menggerakkan harga detik demi detik adalah perubahan antrian & HAKA/HAKI, bukan tebal-tipisnya antrian saja. Persis yang dilatih di Lab Order Book.",en:"What moves prices second by second is the change in queues and aggressive buys/sells, not queue size alone — exactly what the Order Book Lab trains."}, s:3},
  {c:"Easley, López de Prado & O'Hara (2012), Review of Financial Studies",
   f:{id:"VPIN: ukuran 'toksisitas' order flow berbasis ketidakseimbangan volume beli/jual dalam keranjang volume; dipakai sebagai peringatan risiko likuiditas.",en:"VPIN: an order-flow 'toxicity' measure based on buy/sell volume imbalance in volume buckets; used as a liquidity-risk warning."},
   u:{id:"Ketidakseimbangan HAKA/HAKI yang ekstrem & bertahan = pemain berinformasi aktif — hati-hati jadi lawannya.",en:"Extreme, persistent buy/sell imbalance = informed players active — beware being on the other side."}, s:2},
 ]},
 {g:{id:"Khusus Indonesia & pasar Asia: asing vs domestik",en:"Indonesia & Asia specifically: foreign vs domestic"}, items:[
  {c:"Dvořák (2005), Journal of Finance — data BEI",
   f:{id:"Dengan data transaksi Bursa Jakarta: investor domestik lebih unggul dalam jangka pendek dibanding asing, tetapi nasabah broker global lebih unggul dalam jangka panjang; yang terbaik adalah investor domestik yang memakai broker global. Kesimpulannya, keunggulan lebih berasal dari keahlian/analisis daripada informasi lokal.",en:"Using Jakarta Stock Exchange trade data: domestic investors did better than foreigners in the short run, but clients of global brokers did better in the long run; domestic clients of global brokers did best — suggesting the edge comes from expertise rather than local information."},
   u:{id:"Konsistensi net buy broker institusi global (AK, BK, KZ, dll.) layak dipantau untuk horizon menengah — bukan untuk scalping.",en:"Persistent net buying by global institutional brokers (AK, BK, KZ, etc.) is worth tracking for medium horizons — not for scalping."}, s:3},
  {c:"Richards (2005), Journal of Financial and Quantitative Analysis",
   f:{id:"Di enam bursa Asia termasuk Indonesia, arus beli/jual asing berdampak besar pada harga, dan asing cenderung mengikuti return (membeli setelah harga naik, baik pasar lokal maupun global).",en:"Across six Asian markets including Indonesia, foreign net flows had a large price impact, and foreigners tended to chase returns (buying after local and global markets rose)."},
   u:{id:"Net foreign & sentimen global (S&P, DXY) memang penting untuk IHSG — lihat halaman Pengaruh Global.",en:"Net foreign flow & global sentiment (S&P, DXY) genuinely matter for the JCI — see the Global Drivers page."}, s:3},
 ]},
 {g:{id:"Sentimen, berita, dan machine learning",en:"Sentiment, news and machine learning"}, items:[
  {c:"Baker & Wurgler (2006), Journal of Finance",
   f:{id:"Saat sentimen investor tinggi, saham kecil, muda, volatil, dan belum untung cenderung berkinerja buruk sesudahnya — dan sebaliknya.",en:"When investor sentiment is high, small, young, volatile, unprofitable stocks tend to do poorly afterwards — and vice versa."},
   u:{id:"Saat grup & media sosial euforia soal saham lapis 3, itu tanda waspada.",en:"When groups and social media are euphoric about small caps, be cautious."}, s:3},
  {c:"Tetlock (2007), Journal of Finance",
   f:{id:"Pesimisme tinggi di kolom berita memprediksi tekanan turun jangka pendek yang kemudian cenderung pulih, serta volume yang tinggi.",en:"High pessimism in a news column predicted short-term downward pressure that tended to reverse, plus high volume."},
   u:{id:"Berita buruk berlebihan sering memberi pantulan; jangan panik di hari pertama.",en:"Overdone bad news often brings a rebound; don't panic on day one."}, s:2},
  {c:"Gu, Kelly & Xiu (2020), Review of Financial Studies",
   f:{id:"Machine learning (pohon keputusan & jaringan saraf) memprediksi return saham lebih baik dari model linier; sinyal terpenting adalah momentum, likuiditas, dan volatilitas.",en:"Machine learning (trees & neural networks) predicted stock returns better than linear models; the most important signals were momentum, liquidity and volatility."},
   u:{id:"Bahkan ML canggih bergantung pada sinyal sederhana: tren, likuiditas, volatilitas.",en:"Even sophisticated ML relies on simple signals: trend, liquidity, volatility."}, s:3},
  {c:"Fischer & Krauss (2018), European Journal of Operational Research",
   f:{id:"Jaringan LSTM pada saham S&P 500 menghasilkan return harian tinggi sebelum biaya, tetapi keunggulannya sebagian besar hilang setelah sekitar 2010.",en:"LSTM networks on S&P 500 stocks produced high daily returns before costs, but the edge largely disappeared after around 2010."},
   u:{id:"Keunggulan yang dipublikasikan cenderung memudar karena ditiru banyak orang.",en:"Published edges tend to fade as many people copy them."}, s:2},
 ]},
 {g:{id:"Peringatan replikasi",en:"Replication warnings"}, items:[
  {c:"Harvey, Liu & Zhu (2016), Review of Financial Studies",
   f:{id:"Ratusan 'faktor' telah dipublikasikan; karena terlalu banyak yang diuji, standar bukti seharusnya jauh lebih tinggi (t-stat di atas ±3), sehingga banyak temuan kemungkinan kebetulan.",en:"Hundreds of 'factors' have been published; because so many were tried, the evidence bar should be much higher (t-stat above ~3), so many findings are likely flukes."},
   u:{id:"Satu backtest yang bagus belum bukti. Butuh banyak transaksi & periode berbeda.",en:"One good backtest is not proof. You need many trades and different periods."}, s:3},
  {c:"Hou, Xue & Zhang (2020), Review of Financial Studies",
   f:{id:"Dari 452 anomali yang diuji ulang dengan metode lebih ketat, sebagian besar (sekitar dua pertiga) gagal direplikasi.",en:"Of 452 anomalies re-tested with stricter methods, most (about two-thirds) failed to replicate."},
   u:{id:"Curigai 'strategi rahasia' yang hanya diuji di satu saham atau satu tahun.",en:"Be suspicious of 'secret strategies' tested on one stock or one year."}, s:3},
 ]},
];

const BOOKSTEP=[
 ["Wyckoff — Studies in Tape Reading / Metode Wyckoff",{id:"5 langkah: (1) tentukan tren pasar (IHSG), (2) pilih saham yang lebih kuat dari pasar, (3) cari saham yang sudah selesai akumulasi (cause cukup untuk target), (4) pastikan siap naik lewat test/spring dengan volume kecil, (5) masuk saat IHSG juga berbalik naik.",en:"5 steps: (1) define the market trend (JCI), (2) pick stocks stronger than the market, (3) find stocks that completed accumulation (enough 'cause' for a target), (4) confirm readiness via a low-volume test/spring, (5) enter when the JCI also turns up."},{id:"Tidak ada angka win rate teruji.",en:"No tested win rate given."}],
 ["Tom Williams — Master the Markets (VSA)",{id:"Baca latar belakang (kekuatan/kelemahan), cari sinyal (stopping volume, no supply, upthrust), tunggu test dengan volume rendah sebagai konfirmasi, masuk searah latar belakang.",en:"Read the background (strength/weakness), look for signals (stopping volume, no supply, upthrust), wait for a low-volume test as confirmation, trade with the background."},{id:"Contoh grafik, tanpa statistik.",en:"Chart examples, no statistics."}],
 ["Anna Coulling — Volume Price Analysis",{id:"Setiap candle: apakah volume membenarkan pergerakan harga? Jika tidak (anomali), cari penyebabnya; gabungkan dengan support/resistance & beberapa timeframe.",en:"For each candle: does volume validate the price move? If not (an anomaly), find out why; combine with support/resistance and multiple timeframes."},{id:"Tanpa statistik.",en:"No statistics."}],
 ["David Weis — Trades About to Happen",{id:"Ukur volume per gelombang (Weis wave). Gelombang naik dengan volume makin kecil & dorongan makin pendek = permintaan melemah; sebaliknya untuk penawaran.",en:"Measure volume per wave (Weis wave). Up-waves on shrinking volume with shorter thrusts = weakening demand; the reverse for supply."},{id:"Studi kasus, tanpa statistik.",en:"Case studies, no statistics."}],
 ["Villahermosa — Wyckoff 2.0",{id:"Struktur Wyckoff + Volume Profile: area dengan volume terbesar (POC/value area) adalah 'harga adil'; breakout keluar value area dengan order flow searah = sinyal.",en:"Wyckoff structures + Volume Profile: the highest-volume area (POC/value area) is 'fair price'; breakouts from value with aligned order flow = signal."},{id:"Tanpa statistik.",en:"No statistics."}],
 ["Ryan Filbert — Bandarmology",{id:"Broker summary: cari konsentrasi pembeli, harga rata-rata bandar, akumulasi vs distribusi beberapa periode, lalu sinkronkan dengan grafik & volume.",en:"Broker summary: look for buyer concentration, the big player's average price, accumulation vs distribution over several periods, then align with the chart and volume."},{id:"Contoh kasus IDX, tanpa uji statistik.",en:"IDX case examples, no statistical test."}],
 ["Thomas Bulkowski — Encyclopedia of Chart Patterns",{id:"Untuk tiap pola: syarat identifikasi, tingkat kegagalan, rata-rata kenaikan/penurunan, dan aturan target — berdasarkan ribuan contoh saham AS.",en:"For each pattern: identification rules, failure rates, average rise/decline and target rules — based on thousands of US stock examples."},{id:"Ya — salah satu dari sedikit buku dengan statistik pola. Data AS, perlu diuji ulang untuk IDX.",en:"Yes — one of the few books with pattern statistics. US data; re-test for IDX."}],
 ["David Aronson — Evidence-Based Technical Analysis",{id:"Perlakukan setiap aturan teknikal sebagai hipotesis: uji di data, koreksi data-mining bias, uji out-of-sample. Banyak aturan populer gagal lolos.",en:"Treat every technical rule as a hypothesis: test on data, correct for data-mining bias, test out-of-sample. Many popular rules fail."},{id:"Ya — menguji ribuan aturan pada indeks AS.",en:"Yes — tests thousands of rules on a US index."}],
 ["J. Welles Wilder — New Concepts in Technical Trading Systems (RSI)",{id:"RSI 14 periode: >70 jenuh beli, <30 jenuh jual; Wilder juga menekankan divergensi & 'failure swing'.",en:"14-period RSI: >70 overbought, <30 oversold; Wilder also stressed divergences and 'failure swings'."},{id:"Tanpa uji statistik modern.",en:"No modern statistical test."}],
];

function mountExpect(el){
  el.innerHTML=`<div class="kicker">${T({id:"Mulai di sini",en:"Start here"})}</div>
  <h1>${T({id:"Ekspektasi realistis",en:"Realistic expectations"})}</h1>
  <p class="lead">${T({id:"Sebelum belajar bandarmologi & order book lebih dalam: apa yang benar-benar bisa kamu harapkan, apa yang tidak, dan bagaimana mengukur kemampuanmu sendiri dengan jujur.",en:"Before going deep on bandarmology and the order book: what you can really expect, what you can't, and how to measure your own skill honestly."})}</p>

  <div class="box inti"><h4>${T({id:"Adakah cara pasti tahu saham naik/turun dalam 3 detik?",en:"Is there a sure way to know up or down within 3 seconds?"})}</h4>
  ${T({id:"<b>Tidak ada.</b> Tidak ada buku, indikator, atau 'teknik bandar' yang terbukti bisa memastikan arah harga di detik tertentu. Order book bisa dipalsukan (spoofing), berita bisa datang kapan saja, dan pergerakan sangat jangka pendek sebagian besar acak. Yang ada adalah <b>membaca peluang</b> — sedikit memiringkan peluang ke pihakmu — lalu <b>membatasi kerugian</b> ketika salah. Siapa pun yang menjual 'cara pasti' sedang menjual mimpi.",en:"<b>No.</b> No book, indicator or 'smart-money technique' has been shown to guarantee the price direction at a given second. Order books can be faked (spoofing), news can hit any time, and very short-term moves are largely random. What exists is <b>reading probabilities</b> — tilting the odds slightly in your favour — and <b>capping losses</b> when wrong. Anyone selling a 'sure method' is selling a dream."})}</div>

  <h2>${T({id:"Langkah konkret membaca peluang (bukan kepastian)",en:"Concrete steps to read the odds (not certainty)"})}</h2>
  <ol class="steps prose">
   <li>${T({id:"<b>Konteks harian</b> (sebelum jam 9): tren harian di atas/bawah MA50 & MA200, posisi terhadap support/resistance, net foreign & broker summary 1–5 hari terakhir, S&P 500 & USD/IDR semalam.",en:"<b>Daily context</b> (before 9 am): daily trend vs the 50 & 200-day MAs, position vs support/resistance, net foreign & broker summary over the last 1–5 days, the S&P 500 & USD/IDR overnight."})}</li>
   <li>${T({id:"<b>Pemicu di tape</b>: HAKA lot besar yang menyapu offer, atau HAKI yang diserap tanpa harga turun (absorption).",en:"<b>Trigger on the tape</b>: large aggressive buys sweeping offers, or aggressive sells absorbed without the price dropping."})}</li>
   <li>${T({id:"<b>Konfirmasi</b>: harga bertahan di atas level yang baru ditembus 1–3 menit; antrian yang dimakan tidak muncul kembali (bukan iceberg); volume menit itu di atas rata-rata.",en:"<b>Confirmation</b>: price holds above the level it just broke for 1–3 minutes; the eaten queue doesn't reappear (no iceberg); that minute's volume is above average."})}</li>
   <li>${T({id:"<b>Stop</b>: tentukan di mana kamu salah (mis. 1 tick di bawah level absorption). Tanpa stop, jangan masuk.",en:"<b>Stop</b>: define where you're wrong (e.g. 1 tick below the absorption level). No stop, no trade."})}</li>
   <li>${T({id:"<b>Ukuran</b>: risiko maksimal 0,5–1% modal per trade (<a href='#/tools?t=size'>kalkulator</a>). Catat di jurnal.",en:"<b>Size</b>: risk at most 0.5–1% of capital per trade (<a href='#/tools?t=size'>calculator</a>). Log it in your journal."})}</li>
  </ol>

  <h2>${T({id:"Yang realistis bisa kamu dapatkan setelah menguasai ini",en:"What you can realistically gain after mastering this"})}</h2>
  <div class="grid g2">
   <div class="card"><b class="up">✓ ${T({id:"Bisa diharapkan",en:"Can expect"})}</b><ul class="prose">
    <li>${T({id:"Tidak lagi jadi 'pintu keluar' bandar: mengenali distribusi, bid palsu, dan gorengan.",en:"No longer being the big players' exit: spotting distribution, fake bids and pump-and-dumps."})}</li>
    <li>${T({id:"Harga masuk & keluar yang lebih baik untuk saham yang sudah kamu pilih secara fundamental.",en:"Better entry and exit prices for stocks you've already chosen on fundamentals."})}</li>
    <li>${T({id:"Disiplin risiko: kerugian kecil, tidak ada lagi posisi −30% yang dibiarkan.",en:"Risk discipline: small losses, no more −30% positions left to rot."})}</li>
    <li>${T({id:"Memahami kenapa IHSG bergerak (asing, rupiah, suku bunga, Wall Street).",en:"Understanding why the JCI moves (foreign flow, rupiah, rates, Wall Street)."})}</li></ul></div>
   <div class="card"><b class="down">✗ ${T({id:"Tidak bisa diharapkan",en:"Cannot expect"})}</b><ul class="prose">
    <li>${T({id:"Menebak arah setiap detik dengan akurat.",en:"Accurately calling the direction every second."})}</li>
    <li>${T({id:"Win rate 80–90% yang sering diiklankan.",en:"The 80–90% win rates often advertised."})}</li>
    <li>${T({id:"Kekayaan cepat dari modal kecil.",en:"Fast wealth from small capital."})}</li>
    <li>${T({id:"Satu metode yang bekerja di semua saham & semua kondisi pasar.",en:"One method that works on every stock in every market condition."})}</li></ul></div>
  </div>

  <h2>${T({id:"Apa kata data? (riset jurnal bereputasi)",en:"What does the data say? (peer-reviewed research)"})}</h2>
  <div class="tablewrap"><table><tr><th>${T({id:"Studi",en:"Study"})}</th><th>${T({id:"Temuan",en:"Finding"})}</th></tr>
   ${STUDIES[0].items.map(s=>`<tr><td><b>${s.c}</b></td><td>${T(s.f)}</td></tr>`).join("")}</table></div>
  <p class="hint">${T({id:"Riset lengkap (teknikal, momentum, order flow, studi Indonesia, ML) ada di halaman",en:"Full research (technicals, momentum, order flow, Indonesia studies, ML) is on the"})} <a href="#/riset">${T({id:"Riset & Metode",en:"Research & Methods"})}</a>.</p>

  <h2>${T({id:"Berapa persen keberhasilan menurut buku-buku itu?",en:"What success rate do the books claim?"})}</h2>
  <p class="prose">${T({id:"Jawaban jujurnya: <b>hampir semua buku bandarmologi, Wyckoff, dan VSA tidak memberi angka win rate yang teruji secara statistik</b>. Isinya metode & contoh grafik yang dipilih penulis (rawan bias seleksi). Pengecualian: Bulkowski (statistik pola grafik) dan Aronson (uji aturan teknikal). Jadi <b>angka persentase yang benar hanya bisa kamu dapat dari datamu sendiri</b>: backtest di <a href='#/indikator'>Lab Indikator</a> + jurnal trading minimal 50–100 transaksi.",en:"The honest answer: <b>almost no bandarmology, Wyckoff or VSA book gives a statistically tested win rate</b>. They contain methods and chart examples the author picked (prone to selection bias). Exceptions: Bulkowski (chart-pattern statistics) and Aronson (testing technical rules). So <b>the only reliable percentage comes from your own data</b>: backtests in the <a href='#/indikator'>Indicator Lab</a> + a trading journal of at least 50–100 trades."})}</p>
  <div class="tablewrap"><table><tr><th>${T({id:"Buku / metode",en:"Book / method"})}</th><th>${T({id:"Langkah konkret",en:"Concrete steps"})}</th><th>${T({id:"Ada statistik?",en:"Statistics?"})}</th></tr>
   ${BOOKSTEP.map(b=>`<tr><td><b>${b[0]}</b></td><td>${T(b[1])}</td><td class="hint">${T(b[2])}</td></tr>`).join("")}</table></div>

  <h2>${T({id:"Simulator: seperti apa hasil 'edge' kecil dalam setahun?",en:"Simulator: what does a small 'edge' look like over a year?"})}</h2>
  <p class="prose">${T({id:"Masukkan win rate dan rasio untung/rugi realistis. Simulator menjalankan 300 kemungkinan tahun trading secara acak, supaya kamu melihat bahwa bahkan sistem yang positif bisa rugi setahun penuh karena kebetulan.",en:"Enter a realistic win rate and win/loss ratio. The simulator runs 300 random trading years so you can see that even a positive system can lose for a whole year by chance."})}</p>
  <div class="card"><div class="form">
   <label>Win rate (%)<input type="number" id="mcW" value="45"></label>
   <label>${T({id:"Rata-rata untung (R)",en:"Average win (R)"})}<input type="number" id="mcA" value="1.8" step=".1"></label>
   <label>${T({id:"Rata-rata rugi (R)",en:"Average loss (R)"})}<input type="number" id="mcL" value="1" step=".1"></label>
   <label>${T({id:"Trade per tahun",en:"Trades per year"})}<input type="number" id="mcN" value="60"></label>
   <label>${T({id:"Risiko per trade (% modal)",en:"Risk per trade (% capital)"})}<input type="number" id="mcR" value="1" step=".5"></label>
  </div><div id="mcOut"></div></div>`;
  const run=()=>{ const g=id=>parseFloat(el.querySelector("#"+id).value)||0; const w=g("mcW")/100,a=g("mcA"),l=g("mcL"),n=Math.round(g("mcN")),r=g("mcR")/100;
    const paths=[],fin=[],dds=[]; for(let k=0;k<300;k++){ let eq=1,pk=1,dd=0; const p=[1]; for(let i=0;i<n;i++){ eq*= Math.random()<w ? 1+r*a : 1-r*l; pk=Math.max(pk,eq); dd=Math.max(dd,1-eq/pk); p.push(eq);} paths.push(p); fin.push(eq); dds.push(dd); }
    const s=[...fin].sort((x,y)=>x-y), med=s[150], lose=fin.filter(x=>x<1).length/3, exp=w*a-(1-w)*l, mdd=[...dds].sort((x,y)=>x-y)[150];
    const W=640,H=200, mn=Math.min(...paths.flat()), mx=Math.max(...paths.flat());
    const Y=v=>H-8-(v-mn)/(mx-mn||1)*(H-16), X=i=>i/n*W;
    const svg=`<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto"><line x1="0" x2="${W}" y1="${Y(1)}" y2="${Y(1)}" stroke="var(--muted)" stroke-dasharray="4 4"/>${paths.slice(0,40).map(p=>`<polyline fill="none" stroke="${p[n]>=1?"var(--up)":"var(--down)"}" stroke-opacity=".35" stroke-width="1.2" points="${p.map((v,i)=>X(i)+","+Y(v)).join(" ")}"/>`).join("")}</svg>`;
    el.querySelector("#mcOut").innerHTML=`<div class="grid g4" style="margin-bottom:12px">
     <div class="out"><div class="muted">Expectancy</div><div class="big ${exp>=0?"up":"down"}">${exp.toFixed(2)}R</div></div>
     <div class="out"><div class="muted">${T({id:"Median hasil setahun",en:"Median yearly result"})}</div><div class="big ${med>=1?"up":"down"}">${((med-1)*100).toFixed(1)}%</div></div>
     <div class="out"><div class="muted">${T({id:"Peluang rugi setahun",en:"Chance of a losing year"})}</div><div class="big">${lose.toFixed(0)}%</div></div>
     <div class="out"><div class="muted">${T({id:"Drawdown median",en:"Median drawdown"})}</div><div class="big down">−${(mdd*100).toFixed(1)}%</div></div></div>${svg}
     <p class="hint">${T({id:"40 dari 300 jalur ditampilkan. Hijau = akhir tahun untung, merah = rugi.",en:"40 of 300 paths shown. Green = year ended in profit, red = loss."})}</p>`; };
  el.querySelectorAll("#mcW,#mcA,#mcL,#mcN,#mcR").forEach(i=>i.oninput=run); run();
  window.linkTerms(el);
}

function mountResearch(el){
  const badge=s=>s===3?`<span class="pill up">${T({id:"Bukti kuat",en:"Strong evidence"})}</span>`:`<span class="pill gold">${T({id:"Bukti sedang / perlu hati-hati",en:"Moderate / handle with care"})}</span>`;
  el.innerHTML=`<div class="kicker">${T({id:"Lanjutan",en:"Advanced"})}</div>
  <h1>${T({id:"Riset & metode dari jurnal bereputasi",en:"Research & methods from top journals"})}</h1>
  <p class="lead">${T({id:"Temuan dari jurnal keuangan papan atas yang terindeks Scopus (Journal of Finance, Journal of Financial Economics, Review of Financial Studies, Econometrica, JFQA, dll.) dan cara memakainya di pasar Indonesia. Ringkasan ditulis ulang dengan bahasa sederhana — baca abstrak aslinya untuk detail.",en:"Findings from top, Scopus-indexed finance journals (Journal of Finance, Journal of Financial Economics, Review of Financial Studies, Econometrica, JFQA, etc.) and how to use them in Indonesia. Summaries are rewritten in plain language — read the original abstracts for detail."})}</p>
  <div class="note warn"><b>${T({id:"Cara membaca halaman ini.",en:"How to read this page."})}</b> ${T({id:"Temuan akademik berlaku rata-rata pada ribuan saham & puluhan tahun. Banyak keunggulan mengecil setelah dipublikasikan, dan sebagian diuji di pasar AS. Gunakan sebagai hipotesis yang kamu uji sendiri, bukan resep pasti.",en:"Academic findings hold on average across thousands of stocks and decades. Many edges shrink after publication, and some were tested on US markets. Use them as hypotheses to test yourself, not guaranteed recipes."})}</div>
  ${STUDIES.map(g=>`<h2>${T(g.g)}</h2><div class="grid g2">${g.items.map(s=>`<div class="card"><div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap"><b>${s.c}</b>${badge(s.s)}</div><p style="margin-top:8px">${T(s.f)}</p><div class="hint"><b>${T({id:"Pakai di IDX:",en:"Use on IDX:"})}</b> ${T(s.u)}</div></div>`).join("")}</div>`).join("")}
  <h2>${T({id:"Resep gabungan berbasis bukti untuk IDX",en:"An evidence-based combined recipe for IDX"})}</h2>
  <ol class="steps prose">
   <li>${T({id:"<b>Semesta</b>: saham LQ45/IDX80 (likuid, data asing bermakna).",en:"<b>Universe</b>: LQ45/IDX80 stocks (liquid, meaningful foreign data)."})}</li>
   <li>${T({id:"<b>Kualitas</b>: ROE tinggi & stabil, arus kas operasi ≈ laba (Novy-Marx; Fama-French).",en:"<b>Quality</b>: high, stable ROE, operating cash flow ≈ profit (Novy-Marx; Fama-French)."})}</li>
   <li>${T({id:"<b>Value + momentum</b>: dari yang berkualitas, pilih yang valuasinya wajar dan return 6–12 bulannya kuat (Asness dkk.; Jegadeesh-Titman).",en:"<b>Value + momentum</b>: among quality names, choose fair valuations with strong 6–12-month returns (Asness et al.; Jegadeesh-Titman)."})}</li>
   <li>${T({id:"<b>Filter tren</b>: hanya beli saat harga di atas MA200 (time-series momentum; Brock dkk.).",en:"<b>Trend filter</b>: only buy above the 200-day MA (time-series momentum; Brock et al.)."})}</li>
   <li>${T({id:"<b>Aliran dana</b>: lebih yakin bila net foreign / broker institusi global konsisten membeli (Dvořák; Richards).",en:"<b>Flows</b>: more conviction when net foreign / global institutional brokers buy persistently (Dvořák; Richards)."})}</li>
   <li>${T({id:"<b>Eksekusi</b>: masuk saat order flow mendukung — absorption atau HAKA yang menyapu offer (Kyle; Cont dkk.).",en:"<b>Execution</b>: enter when order flow agrees — absorption or aggressive buying sweeping offers (Kyle; Cont et al.)."})}</li>
   <li>${T({id:"<b>Uji & jurnal</b>: backtest out-of-sample, catat ≥50 transaksi sebelum menambah modal (Sullivan dkk.; Harvey dkk.).",en:"<b>Test & journal</b>: backtest out-of-sample, log ≥50 trades before scaling up (Sullivan et al.; Harvey et al.)."})}</li>
  </ol>`;
  window.linkTerms(el);
}
window.Expect={mount:mountExpect}; window.Research={mount:mountResearch};
})();
