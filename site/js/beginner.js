/* Kelas Pemula — Level 1 (Pengenalan) & Level 2 (Dasar Analisis). Bilingual, dengan grafik & soal. */
(function(){
const G=()=>window.Charts;
const T=o=>window.T(o);
const fmt=n=>Math.round(n).toLocaleString("id-ID");

/* contoh data deterministik */
const S={
  grow:()=>G().gen(11,1000,[[60,.25,1.6],[40,-.1,1.4],[80,.3,1.5]]),
  exdiv:()=>G().gen(21,3000,[[30,.08,1],[30,-.05,1,1,-3.2]]),
  crash:()=>G().gen(31,2000,[[30,.2,1.5],[90,-.9,2.4,1.6],[40,.05,1.8]]),
  candles:()=>G().gen(41,1300,[[24,.15,2.2]]),
  uptrend:()=>G().gen(51,800,[[25,.6,1.6],[10,-.7,1.3,.7],[25,.7,1.6],[10,-.6,1.2,.7],[25,.6,1.6]]),
  breakout:()=>G().gen(61,1500,[[60,0,1.2,.7],[12,1.3,1.8,2.8]]),
  pump:()=>G().gen(71,120,[[40,0,1,.3],[15,4.5,4,4],[8,0,5,3],[25,-4,4,1.2]]),
};

/* ---------- Konten ---------- */
const BEGINNER=[
{lvl:1, t:{id:"Level 1 — Pengenalan Pasar Modal",en:"Level 1 — Introduction to the Capital Market"},
 d:{id:"Untuk yang benar-benar baru. Pelan-pelan: apa itu saham, membuka rekening, membaca layar, sampai order pertama.",en:"For complete beginners. Step by step: what a stock is, opening an account, reading the screen, up to your first order."},
 lessons:[
 {id:"p1", t:{id:"Saham itu apa, dan kenapa harganya bergerak?",en:"What is a stock, and why does its price move?"},
  body:{id:`<p>Satu lembar <b>saham</b> = satu potong kecil kepemilikan sebuah perusahaan (<b>emiten</b>). Kalau kamu punya 100 lembar BBCA, kamu ikut memiliki sebagian kecil Bank Central Asia.</p>
<p>Kamu bisa mendapat untung dengan dua cara:</p>
<ol class="steps"><li><b>Capital gain</b> — menjual lebih mahal dari harga beli.</li><li><b>Dividen</b> — bagian laba yang dibagikan perusahaan kepada pemegang saham.</li></ol>
<p>Harga bergerak karena <b>permintaan dan penawaran</b> setiap detik. Dalam jangka panjang, harga cenderung mengikuti <b>laba perusahaan</b>: kalau laba tumbuh, saham cenderung naik. Dalam jangka pendek, harga juga digerakkan berita, sentimen, suku bunga, dan dana besar (asing maupun lokal).</p>`,
   en:`<p>One <b>share</b> = a small slice of ownership in a company (an <b>issuer</b>). Owning 100 BBCA shares makes you a tiny part-owner of Bank Central Asia.</p>
<p>You can profit in two ways:</p>
<ol class="steps"><li><b>Capital gain</b> — selling for more than you paid.</li><li><b>Dividend</b> — part of the profit the company pays out to shareholders.</li></ol>
<p>Prices move every second because of <b>supply and demand</b>. Over the long run, prices tend to follow <b>company earnings</b>: growing profits tend to lift the share price. In the short run, news, sentiment, interest rates and big money (foreign or local) also move prices.</p>`},
  chart:()=>G().fig(S.grow(),{type:"line",vol:false,h:220},T({id:"Contoh (fiktif): saham yang labanya tumbuh cenderung naik dalam jangka panjang, tapi tetap ada masa turun di tengah jalan.",en:"Example (fictional): a stock whose earnings grow tends to rise over time, yet still has down periods along the way."})),
  quiz:[{q:{id:"Kamu punya saham sebuah bank. Bank itu membagikan sebagian labanya ke pemegang saham. Ini disebut…",en:"You own shares of a bank. The bank pays part of its profit to shareholders. This is called…"},
    o:[{id:"Capital gain",en:"Capital gain"},{id:"Dividen",en:"Dividend"},{id:"Bunga deposito",en:"Deposit interest"}],a:1,
    ex:{id:"Dividen = pembagian laba. Capital gain adalah selisih harga jual dan beli.",en:"A dividend is a profit distribution. Capital gain is the difference between selling and buying price."}},
   {q:{id:"Dalam jangka panjang, apa penggerak utama harga saham?",en:"Over the long run, what mainly drives a stock's price?"},
    o:[{id:"Ramalan di grup Telegram",en:"Telegram group predictions"},{id:"Pertumbuhan laba perusahaan",en:"Growth of company earnings"},{id:"Jumlah iklan di TV",en:"Number of TV ads"}],a:1,
    ex:{id:"Harga jangka panjang mengikuti laba dan arus kas perusahaan.",en:"Long-run prices follow the company's earnings and cash flows."}}]},

 {id:"p2", t:{id:"Membuka rekening dengan aman",en:"Opening an account safely"},
  body:{id:`<p>Untuk membeli saham kamu butuh <b>rekening efek</b> di perusahaan sekuritas (broker) yang <b>berizin OJK</b> dan menjadi Anggota Bursa BEI.</p>
<ol class="steps"><li>Pilih broker berizin — cek daftar Anggota Bursa di idx.co.id dan izin di ojk.go.id.</li>
<li>Daftar online: KTP, NPWP (opsional), rekening bank, swafoto.</li>
<li>Kamu mendapat <b>SID</b> (nomor investor tunggal dari KSEI), <b>rekening efek</b>, dan <b>RDN</b> (rekening dana atas namamu di bank).</li>
<li>Setor dana ke RDN — bukan ke rekening pribadi orang lain.</li>
<li>Aktifkan akun <b>AKSes KSEI</b> untuk mengecek kepemilikan sahammu langsung dari KSEI.</li></ol>
<p>Uangmu di RDN terpisah dari uang broker, dan sahammu tercatat di KSEI atas namamu.</p>`,
   en:`<p>To buy shares you need a <b>securities account</b> at a brokerage that is <b>licensed by OJK</b> (Indonesia's Financial Services Authority) and is an IDX Exchange Member.</p>
<ol class="steps"><li>Choose a licensed broker — check the Exchange Member list at idx.co.id and the licence at ojk.go.id.</li>
<li>Sign up online: ID card (KTP), tax number (optional), bank account, selfie.</li>
<li>You receive an <b>SID</b> (single investor ID from KSEI), a <b>securities account</b> and an <b>RDN</b> (a cash account in your name at a bank).</li>
<li>Deposit money into your RDN — never into someone's personal account.</li>
<li>Activate <b>KSEI AKSes</b> to check your holdings directly at the central depository.</li></ol>
<p>Your RDN cash is separate from the broker's money, and your shares are recorded at KSEI in your name.</p>`},
  quiz:[{q:{id:"Seseorang menawarkan 'kelola akun saham' dan minta kamu transfer ke rekening pribadinya. Apa yang benar?",en:"Someone offers to 'manage your stock account' and asks you to transfer to their personal account. What is correct?"},
    o:[{id:"Aman kalau dia punya banyak follower",en:"Safe if they have many followers"},{id:"Jangan. Dana hanya disetor ke RDN atas namamu sendiri",en:"Don't. Money only goes into the RDN in your own name"},{id:"Aman kalau dijanjikan untung 10% per bulan",en:"Safe if 10% monthly profit is promised"}],a:1,
    ex:{id:"Dana investasi saham selalu masuk RDN atas namamu. Janji untung pasti adalah tanda penipuan.",en:"Stock-investment money always goes into an RDN in your name. Guaranteed returns are a fraud signal."}}]},

 {id:"p3", t:{id:"Membaca layar aplikasi",en:"Reading the trading screen"},
  body:{id:`<p>Ini angka-angka utama di panel saham (contoh dari BBCA pada tangkapan layar):</p>
<div class="tablewrap"><table><tr><th>Kolom</th><th>Contoh</th><th>Artinya</th></tr>
<tr><td>Last</td><td class="num">5.325</td><td>Harga transaksi terakhir</td></tr>
<tr><td>Prev</td><td class="num">5.200</td><td>Harga penutupan kemarin (acuan)</td></tr>
<tr><td>Change</td><td class="num up">+125 (+2,40%)</td><td>(5.325 − 5.200) ÷ 5.200</td></tr>
<tr><td>Open / High / Low</td><td class="num">5.300 / 5.350 / 5.250</td><td>Harga pembukaan, tertinggi, terendah hari ini</td></tr>
<tr><td>Lot / Volume</td><td class="num">2,81 jt lot</td><td>Jumlah yang diperdagangkan (1 lot = 100 lembar)</td></tr>
<tr><td>Value</td><td class="num">1,49 T</td><td>Nilai transaksi dalam rupiah</td></tr>
<tr><td>Freq</td><td class="num">43,11 rb</td><td>Berapa kali transaksi terjadi</td></tr>
<tr><td>Bid / Offer</td><td class="num">5.300 / 5.325</td><td>Antrian beli tertinggi / antrian jual terendah</td></tr></table></div>
<p>Rata-rata harga hari itu kira-kira <b>Value ÷ (Lot × 100)</b> = 1,49T ÷ 281 jt lembar ≈ Rp5.300 — cocok dengan kolom Avg.</p>`,
   en:`<p>These are the key numbers on a stock panel (example: BBCA from the screenshot):</p>
<div class="tablewrap"><table><tr><th>Field</th><th>Example</th><th>Meaning</th></tr>
<tr><td>Last</td><td class="num">5,325</td><td>Last traded price</td></tr>
<tr><td>Prev</td><td class="num">5,200</td><td>Yesterday's close (reference)</td></tr>
<tr><td>Change</td><td class="num up">+125 (+2.40%)</td><td>(5,325 − 5,200) ÷ 5,200</td></tr>
<tr><td>Open / High / Low</td><td class="num">5,300 / 5,350 / 5,250</td><td>Today's open, high, low</td></tr>
<tr><td>Lot / Volume</td><td class="num">2.81M lots</td><td>Quantity traded (1 lot = 100 shares)</td></tr>
<tr><td>Value</td><td class="num">1.49T</td><td>Traded value in rupiah</td></tr>
<tr><td>Freq</td><td class="num">43.11K</td><td>Number of trades</td></tr>
<tr><td>Bid / Offer</td><td class="num">5,300 / 5,325</td><td>Best buy queue / best sell queue</td></tr></table></div>
<p>The day's average price is roughly <b>Value ÷ (Lots × 100)</b> = 1.49T ÷ 281M shares ≈ Rp5,300 — matching the Avg field.</p>`},
  quiz:[{q:{id:"Prev 940, Last 912. Berapa perubahan persennya?",en:"Prev 940, Last 912. What is the percentage change?"},
    o:[{id:"−2,98%",en:"−2.98%"},{id:"−3,07%",en:"−3.07%"},{id:"+2,98%",en:"+2.98%"}],a:0,
    ex:{id:"(912 − 940) ÷ 940 = −28 ÷ 940 = −2,98%. Selalu bagi dengan harga acuan (Prev).",en:"(912 − 940) ÷ 940 = −28 ÷ 940 = −2.98%. Always divide by the reference price (Prev)."}},
   {q:{id:"1 lot berisi berapa lembar saham?",en:"How many shares are in 1 lot?"},o:[{id:"10",en:"10"},{id:"100",en:"100"},{id:"1.000",en:"1,000"}],a:1,ex:{id:"1 lot = 100 lembar.",en:"1 lot = 100 shares."}}]},

 {id:"p4", t:{id:"Order pertamamu: harga, lot, biaya",en:"Your first order: price, lots, fees"},
  body:{id:`<ol class="steps"><li>Tentukan harga — di BEI semua order adalah <b>limit order</b> (kamu menentukan harga maksimal beli / minimal jual).</li>
<li>Harga harus sesuai <b>fraksi</b>: di bawah Rp200 naik per Rp1, Rp200–500 per Rp2, Rp500–2.000 per Rp5, Rp2.000–5.000 per Rp10, di atas Rp5.000 per Rp25.</li>
<li>Tentukan jumlah <b>lot</b>.</li><li>Cek total: harga × lot × 100 + fee beli (~0,15%).</li>
<li>Kirim order. Kalau harga cocok dengan penjual, order <b>match</b>. Saham & uang selesai berpindah 2 hari bursa kemudian (<b>T+2</b>).</li></ol>
<div class="formula">Beli 10 lot di Rp940
Nilai  = 940 × 10 × 100      = Rp940.000
Fee    = 0,15% × 940.000     = Rp1.410
Total  =                       Rp941.410</div>`,
   en:`<ol class="steps"><li>Choose a price — on IDX every order is a <b>limit order</b> (you set the maximum buy / minimum sell price).</li>
<li>The price must fit the <b>tick size</b>: below Rp200 it moves by Rp1, Rp200–500 by Rp2, Rp500–2,000 by Rp5, Rp2,000–5,000 by Rp10, above Rp5,000 by Rp25.</li>
<li>Choose the number of <b>lots</b>.</li><li>Check the total: price × lots × 100 + buy fee (~0.15%).</li>
<li>Send the order. When it meets a seller's price it is <b>matched</b>. Shares and cash settle two trading days later (<b>T+2</b>).</li></ol>
<div class="formula">Buy 10 lots at Rp940
Value = 940 × 10 × 100       = Rp940,000
Fee   = 0.15% × 940,000      = Rp1,410
Total =                        Rp941,410</div>`},
  quiz:[{q:{id:"Harga saham Rp1.320. Mana harga order yang VALID?",en:"A stock trades at Rp1,320. Which order price is VALID?"},o:[{id:"1.322",en:"1,322"},{id:"1.325",en:"1,325"},{id:"1.321",en:"1,321"}],a:1,ex:{id:"Rp500–2.000 fraksinya Rp5, jadi 1.325 valid; 1.321 dan 1.322 ditolak.",en:"Between Rp500–2,000 the tick is Rp5, so 1,325 is valid; 1,321 and 1,322 are rejected."}},
   {q:{id:"Kamu beli hari Senin (bukan libur). Kapan settlement selesai?",en:"You buy on a Monday (no holiday). When does it settle?"},o:[{id:"Senin",en:"Monday"},{id:"Rabu",en:"Wednesday"},{id:"Jumat",en:"Friday"}],a:1,ex:{id:"T+2 = dua hari bursa setelah transaksi → Rabu.",en:"T+2 = two trading days after the trade → Wednesday."}}]},

 {id:"p5", t:{id:"Untung dari saham: capital gain & dividen",en:"Earning from stocks: capital gain & dividends"},
  body:{id:`<p><b>Capital gain</b>: beli 10 lot di 3.000, jual di 3.300 → (3.300 − 3.000) × 1.000 lembar = Rp300.000 sebelum biaya.</p>
<p><b>Dividen</b>: perusahaan mengumumkan dividen Rp100/lembar. Kamu harus memiliki saham sampai <b>cum date</b>. Besoknya (<b>ex date</b>) harga biasanya turun sekitar nilai dividen — lihat celah turun di grafik.</p>
<div class="formula">Dividen kotor = 100 × 1.000 lembar = Rp100.000
Pajak 10%     =                      Rp10.000
Diterima      =                      Rp90.000</div>`,
   en:`<p><b>Capital gain</b>: buy 10 lots at 3,000, sell at 3,300 → (3,300 − 3,000) × 1,000 shares = Rp300,000 before fees.</p>
<p><b>Dividend</b>: a company declares Rp100/share. You must hold the shares through the <b>cum date</b>. The next day (<b>ex date</b>) the price usually drops by about the dividend — see the gap down on the chart.</p>
<div class="formula">Gross dividend = 100 × 1,000 shares = Rp100,000
10% tax        =                     Rp10,000
Received       =                     Rp90,000</div>`},
  chart:()=>{ const D=S.exdiv(); return G().fig(D,{h:220,hl:[],marks:[{i:30,label:"ex date",pos:"above",col:"var(--gold)"}]},T({id:"Celah turun di hari ex-date: harga menyesuaikan setelah hak dividen lepas.",en:"The gap down on the ex-date: the price adjusts once the dividend right is detached."})); },
  quiz:[{q:{id:"Kalau kamu membeli saham pada ex date, apakah kamu mendapat dividen?",en:"If you buy on the ex date, do you get the dividend?"},o:[{id:"Ya",en:"Yes"},{id:"Tidak",en:"No"}],a:1,ex:{id:"Hak dividen hanya untuk yang membeli paling lambat di cum date.",en:"Only buyers on or before the cum date are entitled."}}]},

 {id:"p6", t:{id:"Risiko, rugi, dan diversifikasi",en:"Risk, losses and diversification"},
  body:{id:`<p>Harga saham bisa turun jauh — bahkan saham besar. Yang paling penting dipahami pemula adalah <b>matematika rugi</b>:</p>
<div class="tablewrap"><table><tr><th>Turun</th><th>Naik yang dibutuhkan untuk balik modal</th></tr><tr><td>−10%</td><td>+11%</td></tr><tr><td>−25%</td><td>+33%</td></tr><tr><td>−50%</td><td>+100%</td></tr><tr><td>−75%</td><td>+300%</td></tr></table></div>
<ul><li>Jangan taruh semua uang di satu saham. Mulai dengan 5–10 saham dari sektor berbeda, atau reksa dana indeks.</li>
<li>Gunakan <b>uang dingin</b> — uang yang tidak kamu butuhkan dalam 3–5 tahun.</li>
<li>Punya <b>dana darurat</b> 3–6 bulan pengeluaran sebelum berinvestasi saham.</li></ul>`,
   en:`<p>Stock prices can fall a long way — even big companies. The single most important thing for beginners is the <b>maths of losses</b>:</p>
<div class="tablewrap"><table><tr><th>Fall</th><th>Rise needed to break even</th></tr><tr><td>−10%</td><td>+11%</td></tr><tr><td>−25%</td><td>+33%</td></tr><tr><td>−50%</td><td>+100%</td></tr><tr><td>−75%</td><td>+300%</td></tr></table></div>
<ul><li>Don't put all your money in one stock. Start with 5–10 stocks from different sectors, or an index fund.</li>
<li>Use <b>spare money</b> — money you won't need for 3–5 years.</li>
<li>Have an <b>emergency fund</b> of 3–6 months of expenses before investing in stocks.</li></ul>`},
  chart:()=>G().fig(S.crash(),{type:"line",vol:false,h:220},T({id:"Contoh (fiktif): turun lebih dari 50% lalu datar. Dibutuhkan kenaikan +100% hanya untuk kembali ke harga awal.",en:"Example (fictional): a fall of more than 50% then sideways. It needs +100% just to get back to the start."})),
  quiz:[{q:{id:"Sahammu turun 50%. Berapa persen kenaikan yang dibutuhkan untuk balik modal?",en:"Your stock fell 50%. What rise is needed to break even?"},o:[{id:"50%",en:"50%"},{id:"75%",en:"75%"},{id:"100%",en:"100%"}],a:2,ex:{id:"Dari 100 ke 50 butuh naik 50 poin, yaitu 100% dari 50.",en:"From 100 to 50, you need +50 points, which is 100% of 50."}}]},

 {id:"p7", t:{id:"Membaca candlestick pertamamu",en:"Reading your first candlestick"},
  body:{id:`<p>Satu <b>candlestick</b> merangkum satu periode (mis. satu hari): harga <b>Open, High, Low, Close</b>.</p>
<ul><li><span class="up"><b>Candle naik</b></span> (berongga/hijau): Close &gt; Open.</li><li><span class="down"><b>Candle turun</b></span> (penuh/merah): Close &lt; Open.</li>
<li><b>Badan</b> = jarak Open–Close. <b>Ekor/sumbu</b> = High dan Low.</li>
<li>Ekor bawah panjang = harga sempat turun jauh tapi dibeli kembali (pembeli kuat).</li></ul>
<p>Batang di bawah grafik adalah <b>volume</b>: berapa banyak saham berpindah tangan. Pergerakan dengan volume besar lebih "serius".</p>`,
   en:`<p>One <b>candlestick</b> summarises one period (e.g. a day): <b>Open, High, Low, Close</b>.</p>
<ul><li><span class="up"><b>Up candle</b></span> (hollow/green): Close &gt; Open.</li><li><span class="down"><b>Down candle</b></span> (filled/red): Close &lt; Open.</li>
<li><b>Body</b> = distance Open–Close. <b>Wicks</b> = High and Low.</li>
<li>A long lower wick = price fell far but was bought back (strong buyers).</li></ul>
<p>The bars under the chart are <b>volume</b>: how many shares changed hands. Moves on high volume are more "serious".</p>`},
  chart:()=>G().fig(S.candles(),{h:240},T({id:"24 hari perdagangan. Hitung berapa candle naik dan turun, lalu perhatikan hari dengan volume terbesar.",en:"24 trading days. Count up and down candles, then look at the day with the largest volume."})),
  quiz:[{q:{id:"Candle hari ini: Open 1.300, Close 1.340, High 1.350, Low 1.260. Ini candle…",en:"Today's candle: Open 1,300, Close 1,340, High 1,350, Low 1,260. This is a…"},o:[{id:"Naik, dengan ekor bawah panjang",en:"Up candle with a long lower wick"},{id:"Turun",en:"Down candle"},{id:"Doji",en:"Doji"}],a:0,ex:{id:"Close > Open → naik. Low 1.260 jauh di bawah Open → ekor bawah panjang (40 poin).",en:"Close > Open → up. Low 1,260 is far below the Open → long lower wick (40 points)."}}]},

 {id:"p8", t:{id:"Saham, reksa dana, obligasi, deposito — pilih yang mana?",en:"Stocks, funds, bonds, deposits — which one?"},
  body:{id:`<div class="tablewrap"><table><tr><th>Instrumen</th><th>Potensi hasil</th><th>Risiko</th><th>Cocok untuk</th></tr>
<tr><td>Deposito</td><td>Rendah, pasti</td><td>Sangat rendah (dijamin LPS s.d. batas)</td><td>Dana darurat, &lt;1 tahun</td></tr>
<tr><td>Obligasi / SBN ritel</td><td>Menengah, kupon tetap</td><td>Rendah–menengah</td><td>1–5 tahun, pendapatan rutin</td></tr>
<tr><td>Reksa dana indeks / saham</td><td>Mengikuti pasar</td><td>Menengah–tinggi</td><td>&gt;5 tahun, tidak sempat memilih saham</td></tr>
<tr><td>Saham individual</td><td>Paling tinggi & paling lebar</td><td>Tinggi</td><td>&gt;5 tahun, mau belajar & memantau</td></tr></table></div>
<p>Banyak investor sukses menggabungkan semuanya. Hitung bunga bersih deposito & kupon obligasi di <a href="#/tools?t=deposito">Tools</a>.</p>`,
   en:`<div class="tablewrap"><table><tr><th>Instrument</th><th>Return potential</th><th>Risk</th><th>Suits</th></tr>
<tr><td>Deposit</td><td>Low, fixed</td><td>Very low (LPS-guaranteed up to limits)</td><td>Emergency fund, &lt;1 year</td></tr>
<tr><td>Bonds / retail government bonds</td><td>Medium, fixed coupon</td><td>Low–medium</td><td>1–5 years, regular income</td></tr>
<tr><td>Index / equity mutual funds</td><td>Follows the market</td><td>Medium–high</td><td>&gt;5 years, no time to pick stocks</td></tr>
<tr><td>Individual stocks</td><td>Highest & widest</td><td>High</td><td>&gt;5 years, willing to learn & monitor</td></tr></table></div>
<p>Many successful investors combine them. Calculate net deposit interest & bond coupons in <a href="#/tools?t=deposito">Tools</a>.</p>`},
  quiz:[{q:{id:"Uang untuk biaya kuliah adik tahun depan sebaiknya ditaruh di…",en:"Money for your sibling's tuition next year is best kept in…"},o:[{id:"Saham lapis 3",en:"Small-cap stocks"},{id:"Deposito / pasar uang",en:"Deposits / money market"},{id:"Saham yang sedang ARA",en:"A stock hitting its upper limit"}],a:1,ex:{id:"Dana jangka pendek tidak boleh berisiko turun besar.",en:"Short-term money should not be exposed to large drops."}}]},
 ]},

{lvl:2, t:{id:"Level 2 — Dasar Analisis & Strategi",en:"Level 2 — Analysis & Strategy Basics"},
 d:{id:"Setelah paham mekanisme: membaca laporan keuangan sederhana, valuasi, tren, volume, indeks, dan rencana investasi.",en:"Once you know the mechanics: simple financial statements, valuation, trends, volume, indices and an investment plan."},
 lessons:[
 {id:"q1", t:{id:"Laporan keuangan dalam 3 angka",en:"Financial statements in 3 numbers"},
  body:{id:`<p>Untuk pemula, mulai dari tiga angka saja, 5 tahun terakhir:</p>
<ol class="steps"><li><b>Pendapatan</b> — apakah bisnisnya tumbuh?</li><li><b>Laba bersih</b> — apakah pertumbuhan itu menghasilkan untung?</li><li><b>Arus kas operasi</b> — apakah untungnya benar-benar jadi uang tunai?</li></ol>
<div class="tablewrap"><table><tr><th>Tahun</th><th>Pendapatan</th><th>Laba bersih</th><th>Arus kas operasi</th></tr>
<tr><td>2022</td><td class="num">1.000</td><td class="num">100</td><td class="num">110</td></tr><tr><td>2023</td><td class="num">1.150</td><td class="num">120</td><td class="num">125</td></tr>
<tr><td>2024</td><td class="num">1.300</td><td class="num">140</td><td class="num">60</td></tr></table></div>
<p>Perhatikan 2024: laba naik tapi arus kas turun separuh. Ini pertanyaan pertama untuk dicari jawabannya (piutang menumpuk? persediaan?).</p>
<p><b>EPS</b> (laba per saham) = laba bersih ÷ jumlah saham beredar.</p>`,
   en:`<p>As a beginner, start with just three numbers over the last 5 years:</p>
<ol class="steps"><li><b>Revenue</b> — is the business growing?</li><li><b>Net profit</b> — does that growth produce profit?</li><li><b>Operating cash flow</b> — does the profit actually turn into cash?</li></ol>
<div class="tablewrap"><table><tr><th>Year</th><th>Revenue</th><th>Net profit</th><th>Operating cash flow</th></tr>
<tr><td>2022</td><td class="num">1,000</td><td class="num">100</td><td class="num">110</td></tr><tr><td>2023</td><td class="num">1,150</td><td class="num">120</td><td class="num">125</td></tr>
<tr><td>2024</td><td class="num">1,300</td><td class="num">140</td><td class="num">60</td></tr></table></div>
<p>Look at 2024: profit rose but cash flow halved. That is the first question to investigate (receivables piling up? inventory?).</p>
<p><b>EPS</b> (earnings per share) = net profit ÷ shares outstanding.</p>`},
  quiz:[{q:{id:"Laba bersih Rp500 miliar, saham beredar 2 miliar lembar. EPS = ?",en:"Net profit Rp500 billion, 2 billion shares outstanding. EPS = ?"},o:[{id:"Rp25",en:"Rp25"},{id:"Rp250",en:"Rp250"},{id:"Rp4",en:"Rp4"}],a:1,ex:{id:"500 miliar ÷ 2 miliar = Rp250 per lembar.",en:"500 billion ÷ 2 billion = Rp250 per share."}}]},

 {id:"q2", t:{id:"Murah atau mahal? PER & PBV",en:"Cheap or expensive? P/E & P/B"},
  body:{id:`<div class="formula">PER = Harga ÷ EPS        → berapa tahun laba untuk "balik modal"
PBV = Harga ÷ Nilai buku per saham</div>
<p>Harga 5.000, EPS 250 → PER 20x. Harga 5.000, nilai buku per saham 2.500 → PBV 2x.</p>
<ul><li>Bandingkan dengan <b>rata-rata historis</b> saham itu sendiri dan dengan <b>pesaing sejenis</b>.</li>
<li>PER rendah belum tentu murah: bisa jadi labanya sedang di puncak (batu bara, CPO) atau akan turun.</li>
<li>Bank lebih sering dinilai dengan PBV dan ROE.</li></ul>`,
   en:`<div class="formula">P/E = Price ÷ EPS          → years of earnings to "pay back" the price
P/B = Price ÷ Book value per share</div>
<p>Price 5,000, EPS 250 → P/E 20x. Price 5,000, book value per share 2,500 → P/B 2x.</p>
<ul><li>Compare with the stock's own <b>historical average</b> and with <b>similar peers</b>.</li>
<li>A low P/E is not automatically cheap: earnings may be at a cyclical peak (coal, palm oil) or about to fall.</li>
<li>Banks are usually valued with P/B and ROE.</li></ul>`},
  quiz:[{q:{id:"Harga Rp2.400, EPS Rp300. PER = ?",en:"Price Rp2,400, EPS Rp300. P/E = ?"},o:[{id:"8x",en:"8x"},{id:"12,5x",en:"12.5x"},{id:"0,125x",en:"0.125x"}],a:0,ex:{id:"2.400 ÷ 300 = 8x.",en:"2,400 ÷ 300 = 8x."}}]},

 {id:"q3", t:{id:"Tren, support, dan resistance",en:"Trend, support and resistance"},
  body:{id:`<p><b>Uptrend</b>: puncak dan lembah makin tinggi (higher high, higher low). <b>Downtrend</b> kebalikannya.</p>
<p><b>Support</b> adalah area di mana penurunan sering tertahan (banyak pembeli). <b>Resistance</b> adalah area di mana kenaikan sering tertahan (banyak penjual).</p>
<p>Aturan sederhana untuk pemula: <b>beli saham yang trennya naik, saat koreksi mendekati support</b> — bukan menangkap saham yang sedang jatuh.</p>`,
   en:`<p><b>Uptrend</b>: peaks and troughs get higher (higher highs, higher lows). <b>Downtrend</b> is the reverse.</p>
<p><b>Support</b> is an area where declines often stop (many buyers). <b>Resistance</b> is where rallies often stall (many sellers).</p>
<p>A simple beginner rule: <b>buy stocks in an uptrend on pullbacks towards support</b> — don't catch falling knives.</p>`},
  chart:()=>{ const D=S.uptrend(); const ma=G().sma(D.map(x=>x.c),20); return G().fig(D,{h:250,lines:[{a:ma,col:"var(--accent)",label:"MA20"}],marks:[{i:34,label:"HL",pos:"below",col:"var(--up)"},{i:69,label:"HL",pos:"below",col:"var(--up)"}]},T({id:"Uptrend: setiap koreksi (HL = higher low) berhenti lebih tinggi dari sebelumnya, sering di sekitar MA20.",en:"Uptrend: each pullback (HL = higher low) stops higher than the last, often near the 20-day MA."})); },
  quiz:[{q:{id:"Mana ciri uptrend?",en:"Which describes an uptrend?"},o:[{id:"Lower high, lower low",en:"Lower highs, lower lows"},{id:"Higher high, higher low",en:"Higher highs, higher lows"},{id:"Harga tidak bergerak",en:"Price doesn't move"}],a:1,ex:{id:"Uptrend = puncak & lembah makin tinggi.",en:"Uptrend = rising peaks and troughs."}}]},

 {id:"q4", t:{id:"Volume: tenaga di balik harga",en:"Volume: the force behind price"},
  body:{id:`<p>Harga menembus resistance dengan <b>volume 2–3× rata-rata</b> lebih bisa dipercaya daripada tembus dengan volume kecil. Volume besar artinya banyak pihak — sering termasuk pemain besar — ikut bertransaksi.</p>
<ul><li>Naik + volume naik = sehat.</li><li>Naik + volume makin kecil = tenaga melemah.</li><li>Turun + volume sangat besar di support = bisa jadi ada yang menampung (dibahas di Modul D: Bandarmologi).</li></ul>`,
   en:`<p>A break above resistance on <b>2–3× average volume</b> is more trustworthy than one on thin volume. High volume means many participants — often including big players — are involved.</p>
<ul><li>Up + rising volume = healthy.</li><li>Up + shrinking volume = weakening.</li><li>Down + very large volume at support = someone may be absorbing (Module D: Bandarmology).</li></ul>`},
  chart:()=>{ const D=S.breakout(); const hi=Math.max(...D.slice(0,60).map(x=>x.h)); return G().fig(D,{h:240,hl:[{p:hi,label:T({id:"resistance",en:"resistance"})}],zones:[{i0:60,i1:71,label:"breakout",col:"var(--up)"}]},T({id:"Sideways 3 bulan dengan volume kecil, lalu breakout dengan lonjakan volume.",en:"Three months sideways on low volume, then a breakout with a volume surge."})); },
  quiz:[{q:{id:"Breakout mana yang lebih bisa dipercaya?",en:"Which breakout is more trustworthy?"},o:[{id:"Tembus resistance dengan volume 3× rata-rata",en:"Breaks resistance on 3× average volume"},{id:"Tembus resistance dengan volume setengah rata-rata",en:"Breaks resistance on half average volume"}],a:0,ex:{id:"Volume besar menunjukkan partisipasi luas.",en:"High volume shows broad participation."}}]},

 {id:"q5", t:{id:"Indeks: IHSG, LQ45, dan teman-temannya",en:"Indices: JCI, LQ45 and friends"},
  body:{id:`<p><b>Indeks</b> adalah "keranjang" saham untuk mengukur pasar. <b>IHSG</b> berisi semua saham di BEI. <b>LQ45</b> berisi 45 saham paling likuid dengan fundamental baik, dievaluasi berkala. Ada juga IDX30, IDX80, IDXHIDIV20 (dividen tinggi), dan indeks syariah (JII, ISSI).</p>
<p>Kenapa penting? (1) Membandingkan hasilmu: kalau portofoliomu kalah dari IHSG/LQ45 bertahun-tahun, reksa dana indeks mungkin lebih baik. (2) Saham di LQ45 biasanya lebih likuid dan lebih diperhatikan asing.</p>
<p>Lihat daftar lengkap di <a href="#/indeks">Indeks & Daftar LQ45</a>.</p>`,
   en:`<p>An <b>index</b> is a "basket" of stocks that measures the market. The <b>JCI (IHSG)</b> contains every IDX stock. <b>LQ45</b> holds the 45 most liquid stocks with sound fundamentals, reviewed periodically. There are also IDX30, IDX80, IDXHIDIV20 (high dividend) and sharia indices (JII, ISSI).</p>
<p>Why it matters: (1) benchmark your results — if you lag the JCI/LQ45 for years, an index fund may be better; (2) LQ45 stocks are usually more liquid and more followed by foreign investors.</p>
<p>See the full list in <a href="#/indeks">Indices & LQ45 List</a>.</p>`},
  quiz:[{q:{id:"Portofoliomu naik 4% setahun, LQ45 naik 12%. Kesimpulan yang masuk akal?",en:"Your portfolio rose 4% in a year, LQ45 rose 12%. A sensible conclusion?"},o:[{id:"Aku hebat karena tetap untung",en:"I'm great because I still profited"},{id:"Strategiku kalah dari pasar; evaluasi atau pertimbangkan reksa dana indeks",en:"My strategy lagged the market; review it or consider an index fund"}],a:1,ex:{id:"Selalu bandingkan dengan benchmark, bukan hanya dengan nol.",en:"Always compare against a benchmark, not just against zero."}}]},

 {id:"q6", t:{id:"Aksi korporasi yang sering bikin bingung",en:"Corporate actions that confuse beginners"},
  body:{id:`<ul><li><b>Stock split 1:5</b>: 1 lembar jadi 5 lembar, harga dibagi 5. Nilai totalmu tetap sama.</li>
<li><b>Right issue</b>: kamu diberi hak membeli saham baru di harga tertentu. Kalau tidak ditebus, kepemilikanmu terdilusi. Hitung harga teoritis di <a href="#/tools?t=rights">Tools</a>.</li>
<li><b>Buyback</b>: perusahaan membeli sahamnya sendiri — biasanya sinyal manajemen menilai harga murah.</li>
<li><b>Suspensi</b>: perdagangan dihentikan sementara oleh BEI — uangmu "terkunci" sampai dibuka lagi.</li></ul>`,
   en:`<ul><li><b>1:5 stock split</b>: 1 share becomes 5, price divided by 5. Your total value is unchanged.</li>
<li><b>Rights issue</b>: you get the right to buy new shares at a set price. If you don't exercise, you're diluted. Compute the theoretical price in <a href="#/tools?t=rights">Tools</a>.</li>
<li><b>Buyback</b>: the company buys its own shares — often a sign management thinks the price is low.</li>
<li><b>Suspension</b>: IDX halts trading temporarily — your money is "locked" until it reopens.</li></ul>`},
  quiz:[{q:{id:"Kamu punya 10 lot di harga 5.000. Terjadi split 1:5. Sekarang kamu punya…",en:"You hold 10 lots at 5,000. A 1:5 split happens. You now have…"},o:[{id:"10 lot di 5.000",en:"10 lots at 5,000"},{id:"50 lot di 1.000",en:"50 lots at 1,000"},{id:"50 lot di 5.000",en:"50 lots at 5,000"}],a:1,ex:{id:"Jumlah lembar ×5, harga ÷5. Nilai tetap Rp5 juta.",en:"Shares ×5, price ÷5. Value stays Rp5 million."}}]},

 {id:"q7", t:{id:"Membuat rencana investasi pribadi",en:"Making your personal investment plan"},
  body:{id:`<ol class="steps"><li><b>Tujuan & waktu</b>: dana pensiun 20 tahun? DP rumah 5 tahun?</li>
<li><b>Alokasi</b>: mis. 60% saham/reksa dana saham, 30% obligasi, 10% kas. Makin pendek waktunya, makin kecil porsi saham.</li>
<li><b>Investasi rutin (DCA)</b>: setor tiap bulan, apa pun kondisi pasar. Simulasikan di <a href="#/tools?t=fv">kalkulator compounding</a>.</li>
<li><b>Aturan jual</b>: kapan cut loss, kapan ambil untung, kapan rebalancing (mis. setahun sekali).</li>
<li><b>Jurnal</b>: catat setiap keputusan & alasannya.</li></ol>`,
   en:`<ol class="steps"><li><b>Goal & horizon</b>: retirement in 20 years? House deposit in 5?</li>
<li><b>Allocation</b>: e.g. 60% stocks/equity funds, 30% bonds, 10% cash. The shorter the horizon, the smaller the stock share.</li>
<li><b>Regular investing (DCA)</b>: invest monthly whatever the market does. Simulate it in the <a href="#/tools?t=fv">compounding calculator</a>.</li>
<li><b>Selling rules</b>: when to cut losses, take profit, rebalance (e.g. yearly).</li>
<li><b>Journal</b>: record every decision and why.</li></ol>`},
  quiz:[{q:{id:"Apa itu DCA?",en:"What is DCA?"},o:[{id:"Membeli sekaligus saat harga paling rendah",en:"Buying all at once at the lowest price"},{id:"Berinvestasi jumlah tetap secara rutin",en:"Investing a fixed amount regularly"},{id:"Menjual saat rugi",en:"Selling at a loss"}],a:1,ex:{id:"Dollar/Rupiah Cost Averaging = setor rutin, mengurangi risiko salah waktu.",en:"Cost averaging = regular contributions, reducing timing risk."}}]},

 {id:"q8", t:{id:"Jangan dibohongi: gorengan, pom-pom, investasi bodong",en:"Don't get fooled: pump-and-dumps, shills, scams"},
  body:{id:`<p>Pola klasik <b>pump & dump</b>: saham kecil yang sepi tiba-tiba naik ratusan persen dengan volume meledak, ramai di media sosial, lalu jatuh berhari-hari. Yang membeli di atas menjadi "pintu keluar" bagi pemain yang sudah masuk lebih dulu.</p>
<h3>Tanda bahaya</h3>
<ul class="chk-list"><li>Dijanjikan untung pasti / "pasti ARA".</li><li>Diminta transfer ke rekening pribadi atau menitipkan akun & PIN.</li><li>Saham kecil, fundamental lemah, naik tanpa berita, ada UMA dari BEI.</li><li>Grup berbayar yang "membocorkan bandar".</li><li>Lembaga tidak terdaftar di OJK — cek di ojk.go.id atau hubungi kontak OJK 157.</li></ul>`,
   en:`<p>The classic <b>pump & dump</b>: a quiet small stock suddenly jumps hundreds of percent on exploding volume, gets hyped on social media, then falls for days. Late buyers become the "exit" for players who got in first.</p>
<h3>Red flags</h3>
<ul class="chk-list"><li>Guaranteed profits / "sure to hit the upper limit".</li><li>Asked to transfer to a personal account or hand over your login & PIN.</li><li>Small stock, weak fundamentals, rising with no news, IDX "Unusual Market Activity" notice.</li><li>Paid groups that "leak what the big players do".</li><li>Entity not registered with OJK — check ojk.go.id or call OJK at 157.</li></ul>`},
  chart:()=>{ const D=S.pump(); return G().fig(D,{h:240,zones:[{i0:40,i1:54,label:"pump",col:"var(--up)"},{i0:63,i1:87,label:"dump",col:"var(--down)"}]},T({id:"Pola pump & dump (fiktif): sepi → naik tajam dengan volume besar → distribusi → jatuh.",en:"Pump & dump pattern (fictional): quiet → sharp rise on huge volume → distribution → collapse."})); },
  quiz:[{q:{id:"Sebuah grup menjanjikan 'saham ini pasti ARA 5 hari'. Sikap terbaik?",en:"A group promises 'this stock will surely hit the upper limit for 5 days'. Best response?"},o:[{id:"Beli sebelum terlambat",en:"Buy before it's too late"},{id:"Abaikan; janji pasti adalah tanda manipulasi/penipuan",en:"Ignore it; guarantees signal manipulation/fraud"},{id:"Beli sedikit saja",en:"Buy just a little"}],a:1,ex:{id:"Tidak ada yang bisa menjamin harga. Janji pasti biasanya mencari pembeli untuk barang mereka.",en:"Nobody can guarantee prices. Guarantees usually mean they need buyers for their shares."}}]},
 ]},
];
window.BEGINNER=BEGINNER;
window.GLOSSARY_EXTRA=[
 ["Saham","Bukti kepemilikan sebagian perusahaan.","Stock / share: a unit of ownership in a company."],["Emiten","Perusahaan yang sahamnya tercatat di bursa.","Issuer: a company whose shares are listed."],
 ["Capital gain","Keuntungan dari selisih harga jual dan beli.","Profit from selling above the purchase price."],["Dividen","Pembagian laba perusahaan kepada pemegang saham.","Dividend: a distribution of company profit to shareholders."],
 ["IHSG","Indeks Harga Saham Gabungan — mencakup semua saham di BEI.","Jakarta Composite Index (JCI) — covers all IDX-listed stocks."],["LQ45","Indeks 45 saham paling likuid & berfundamental baik.","Index of the 45 most liquid, fundamentally sound IDX stocks."],
 ["Reksa dana","Wadah dana bersama yang dikelola manajer investasi.","Mutual fund: pooled money managed by an investment manager."],["Blue chip","Saham perusahaan besar, mapan, dan likuid.","Shares of large, established, liquid companies."],
 ["Gorengan","Saham yang harganya dimainkan secara tidak wajar.","'Fried stock': a share whose price is artificially pumped."],["Cut loss","Menjual rugi untuk membatasi kerugian lebih besar.","Selling at a loss to cap a bigger loss."],
 ["Take profit","Menjual untuk merealisasikan keuntungan.","Selling to lock in profit."],["Volume","Jumlah saham yang diperdagangkan.","Number of shares traded."],
 ["Candlestick","Grafik yang menunjukkan Open, High, Low, Close satu periode.","Chart bar showing Open, High, Low, Close for one period."],["Support","Area harga di mana penurunan cenderung tertahan.","Price area where declines tend to stop."],
 ["Resistance","Area harga di mana kenaikan cenderung tertahan.","Price area where rallies tend to stall."],["Market cap","Harga × jumlah saham beredar.","Price × shares outstanding."],
 ["EPS","Laba bersih per saham.","Earnings per share."],["BVPS","Nilai buku (ekuitas) per saham.","Book value per share."],["ROE","Laba bersih dibagi ekuitas.","Return on equity: net profit ÷ equity."],
 ["Bullish","Pandangan/tren naik.","Expecting or showing a rise."],["Bearish","Pandangan/tren turun.","Expecting or showing a fall."],
 ["Uptrend","Tren naik: puncak dan lembah makin tinggi.","Rising trend: higher highs and higher lows."],["Downtrend","Tren turun: puncak dan lembah makin rendah.","Falling trend: lower highs and lower lows."],
 ["Breakout","Harga menembus resistance (atau support).","Price breaking through resistance (or support)."],["DCA","Investasi rutin dengan jumlah tetap.","Dollar/rupiah-cost averaging: investing a fixed amount regularly."],
 ["Suspensi","Penghentian sementara perdagangan saham oleh BEI.","Suspension: IDX halts trading in a stock temporarily."],["Stock split","Pemecahan nilai nominal saham; jumlah lembar bertambah.","Splitting shares into more units at a lower price."],
 ["Buyback","Pembelian kembali saham oleh emiten.","Company repurchasing its own shares."],["Right issue","Penawaran saham baru kepada pemegang saham lama.","Rights issue: new shares offered to existing holders."],
 ["Pump and dump","Menaikkan harga secara artifisial lalu menjual ke publik.","Inflating a price artificially, then selling to the public."],
 ["RSI","Relative Strength Index — osilator momentum 0–100 (Wilder, 1978).","Relative Strength Index — a 0–100 momentum oscillator (Wilder, 1978)."],
 ["Ichimoku","Sistem indikator Jepang: Tenkan, Kijun, Senkou A/B (awan), Chikou.","Japanese indicator system: Tenkan, Kijun, Senkou A/B (cloud), Chikou."],
 ["Kumo","Awan Ichimoku, area antara Senkou Span A dan B.","The Ichimoku cloud, the area between Senkou Span A and B."],
 ["Fibonacci retracement","Level koreksi 23,6/38,2/50/61,8/78,6% dari sebuah gelombang.","Pullback levels at 23.6/38.2/50/61.8/78.6% of a swing."],
 ["MACD","Selisih EMA12 dan EMA26 beserta garis sinyal EMA9.","EMA12 minus EMA26 with an EMA9 signal line."],["Bollinger Band","MA20 ± 2 simpangan baku.","20-period MA ± 2 standard deviations."],
 ["Backtest","Menguji aturan trading pada data masa lalu.","Testing a trading rule on historical data."],["Win rate","Persentase transaksi yang untung.","Share of trades that are profitable."],
 ["Expectancy","Rata-rata hasil per transaksi (untung × peluang − rugi × peluang).","Average result per trade (win × prob − loss × prob)."],["Drawdown","Penurunan dari puncak nilai portofolio.","Decline from a portfolio's peak value."],
 ["Data snooping","Menemukan pola 'bagus' karena terlalu banyak mencoba di data yang sama.","Finding 'good' patterns by testing too many rules on the same data."],
 ["Momentum","Kecenderungan saham yang naik/turun untuk melanjutkan arahnya.","Tendency of winners/losers to keep going in the same direction."],
 ["DXY","Indeks dolar AS terhadap mata uang utama.","US dollar index against major currencies."],["US10Y","Imbal hasil obligasi pemerintah AS tenor 10 tahun.","Yield on the 10-year US Treasury note."],
 ["S&P 500","Indeks 500 perusahaan besar AS.","Index of 500 large US companies."],["EIDO","ETF iShares MSCI Indonesia yang diperdagangkan di AS.","iShares MSCI Indonesia ETF, traded in the US."],
 ["Beta","Sensitivitas saham terhadap pergerakan pasar.","A stock's sensitivity to market moves."],["Korelasi","Ukuran seberapa searah dua variabel bergerak (−1 s.d. +1).","Correlation: how closely two series move together (−1 to +1)."],
 ["Order flow imbalance","Selisih tekanan beli dan jual di order book.","Difference between buy and sell pressure in the order book."],
 ["Anggota Bursa","Perusahaan efek yang menjadi anggota BEI (broker).","Exchange Member: a brokerage that is a member of IDX."],
 ["OJK","Otoritas Jasa Keuangan — regulator sektor keuangan.","Financial Services Authority — Indonesia's financial regulator."],["KSEI","Kustodian Sentral Efek Indonesia.","Indonesia's central securities depository."],
];

/* ---------- UI ---------- */
const prog=()=>{ try{return JSON.parse(localStorage.getItem("sb_prog")||"{}");}catch(e){return {};} };
function mount(el,q,parts){ const id=parts&&parts[0]; id? lesson(el,id) : index(el); }
function index(el){
  const p=prog();
  el.innerHTML=`<div class="kicker">${T({id:"Mulai di sini",en:"Start here"})}</div>
  <h1>${T({id:"Kelas Pemula",en:"Beginner Class"})}</h1>
  <p class="lead">${T({id:"Dua level yang disusun pelan-pelan, setara materi sekolah pasar modal tingkat dasar dan lanjutan. Setiap pelajaran ±10 menit, dengan contoh grafik dan soal latihan. Selesaikan Level 1 sebelum Level 2.",en:"Two gently paced levels, comparable to introductory and intermediate capital-market school material. Each lesson takes about 10 minutes, with chart examples and practice questions. Finish Level 1 before Level 2."})}</p>
  ${BEGINNER.map(L=>`<div class="levelhead"><div class="node">${L.lvl}</div><div><h2>${T(L.t)}</h2><div class="hint">${T(L.d)}</div></div></div>
   <div class="grid g2" style="margin-top:14px">${L.lessons.map((x,i)=>`<a class="card" href="#/pemula/${x.id}"><div style="display:flex;justify-content:space-between;gap:8px"><span class="pill ${p["p_"+x.id]?"up":""}">${p["p_"+x.id]?"✓ ":""}${L.lvl}.${i+1}</span>${x.chart?`<span class="hint">📈 ${T({id:"grafik",en:"chart"})}</span>`:""}</div><h3 style="margin:10px 0 4px">${T(x.t)}</h3><div class="hint">${x.quiz.length} ${T({id:"soal",en:"questions"})}</div></a>`).join("")}</div>`).join("")}
  <div class="note" style="margin-top:28px">${T({id:"Setelah Level 2, lanjut ke Kurikulum A–G (mulai Modul A) dan latihan di Lab.",en:"After Level 2, continue to Curriculum A–G (start with Module A) and practise in the Labs."})}</div>`;
}
function lesson(el,id){
  const flat=BEGINNER.flatMap(L=>L.lessons.map((x,i)=>({...x,L,i})));
  const k=flat.findIndex(x=>x.id===id); if(k<0){ index(el); return; }
  const x=flat[k], prev=flat[k-1], next=flat[k+1], p=prog();
  el.innerHTML=`<article class="lesson">
   <div class="kicker"><a href="#/pemula">${T({id:"Kelas Pemula",en:"Beginner Class"})}</a> · Level ${x.L.lvl}.${x.i+1}</div>
   <h1>${T(x.t)}</h1>
   <p class="hint">💡 ${window.L("Ketuk istilah bergaris titik untuk melihat artinya.")}</p>
   ${window.ReadAloud.bar()}
   <div class="lbody">${T(x.body)}</div>
   ${x.chart?x.chart():""}
   <h2>${T({id:"Latihan soal",en:"Practice questions"})}</h2>
   ${x.quiz.map((qq,qi)=>`<div class="quiz" data-q="${qi}"><div class="qn">${T({id:"Soal",en:"Question"})} ${qi+1}</div><p>${T(qq.q)}</p><div class="guess">${qq.o.map((o,oi)=>`<button data-o="${oi}">${T(o)}</button>`).join("")}</div><div class="ex"></div></div>`).join("")}
   <label class="chk" style="margin-top:18px;font-size:15px;color:var(--text)"><input type="checkbox" id="done" ${p["p_"+x.id]?"checked":""}> ${window.L("Tandai pelajaran ini selesai")}</label>
   <div class="lessonnav">${prev?`<a class="btn sec" href="#/pemula/${prev.id}">← ${T(prev.t)}</a>`:`<a class="btn sec" href="#/pemula">← ${T({id:"Daftar kelas",en:"Class list"})}</a>`}${next?`<a class="btn" href="#/pemula/${next.id}">${T(next.t)} →</a>`:`<a class="btn" href="#/modul/A">${T({id:"Lanjut ke Modul A →",en:"Continue to Module A →"})}</a>`}</div>
  </article>`;
  el.querySelectorAll(".quiz").forEach(box=>{ const qq=x.quiz[+box.dataset.q];
    box.querySelectorAll("button").forEach(b=>b.onclick=()=>{ if(box.dataset.done) return; box.dataset.done=1; const ok=+b.dataset.o===qq.a;
      box.querySelectorAll("button").forEach(bb=>{ if(+bb.dataset.o===qq.a) bb.classList.add("right"); else if(bb===b) bb.classList.add("wrong"); });
      box.querySelector(".ex").innerHTML=`<b class="${ok?"up":"down"}">${ok?T({id:"Benar.",en:"Correct."}):T({id:"Belum tepat.",en:"Not quite."})}</b> ${T(qq.ex)}`; }); });
  el.querySelector("#done").onchange=e=>{ const pp=prog(); pp["p_"+x.id]=e.target.checked; localStorage.setItem("sb_prog",JSON.stringify(pp)); };
  window.ReadAloud.attach(el.querySelector(".readbar"),el.querySelector(".lbody"));
  window.linkTerms(el.querySelector("article"));
}
window.Beginner={mount};
})();
