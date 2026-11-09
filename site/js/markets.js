/* Indeks & daftar LQ45 + Pengaruh global (USD, S&P, suku bunga, komoditas) */
(function(){
const T=o=>window.T(o);
/* LQ45 periode 2 Nov 2026 – 29 Jan 2027 (sumber: Kontan, 2 Nov 2026). Sektor disederhanakan dari IDX-IC.
   d = penggerak global utama */
const LQ45=[
 ["AADI","Adaro Andalan Indonesia","energi",["coal","china"]],["ADMR","Adaro Minerals Indonesia","energi",["coal","china"]],["ADRO","Adaro Energy Indonesia","energi",["coal"]],
 ["AKRA","AKR Corporindo","energi",["oil","idr"]],["AMMN","Amman Mineral Internasional","baku",["copper","gold"]],["AMRT","Sumber Alfaria Trijaya","primer",["infl","rate"]],
 ["ANTM","Aneka Tambang","baku",["gold","nickel"]],["ASII","Astra International","industri",["rate","coal","foreign"]],["BBCA","Bank Central Asia","keuangan",["rate","foreign","idr"]],
 ["BBNI","Bank Negara Indonesia","keuangan",["rate","foreign"]],["BBRI","Bank Rakyat Indonesia","keuangan",["rate","foreign"]],["BBTN","Bank Tabungan Negara","keuangan",["rate"]],
 ["BMRI","Bank Mandiri","keuangan",["rate","foreign"]],["BRPT","Barito Pacific","baku",["oil","sentiment"]],["BUMI","Bumi Resources","energi",["coal","sentiment"]],
 ["CPIN","Charoen Pokphand Indonesia","primer",["idr","infl"]],["CUAN","Petrindo Jaya Kreasi","energi",["coal","sentiment"]],["DEWA","Darma Henwa","energi",["coal","sentiment"]],
 ["EMTK","Elang Mahkota Teknologi","teknologi",["tech","rate"]],["ESSA","Surya Esa Perkasa","baku",["oil"]],["EXCL","XL Axiata","infra",["rate"]],
 ["GOTO","GoTo Gojek Tokopedia","teknologi",["tech","rate"]],["HRTA","Hartadinata Abadi","nonprimer",["gold"]],["ICBP","Indofood CBP Sukses Makmur","primer",["idr","infl"]],
 ["INCO","Vale Indonesia","baku",["nickel","china"]],["INDF","Indofood Sukses Makmur","primer",["idr","infl"]],["INDY","Indika Energy","energi",["coal"]],
 ["INKP","Indah Kiat Pulp & Paper","baku",["idr","china"]],["ISAT","Indosat","infra",["rate"]],["ITMG","Indo Tambangraya Megah","energi",["coal"]],
 ["JPFA","Japfa Comfeed Indonesia","primer",["idr","infl"]],["KLBF","Kalbe Farma","kesehatan",["idr"]],["MAPI","Mitra Adiperkasa","nonprimer",["infl","rate"]],
 ["MBMA","Merdeka Battery Materials","baku",["nickel","china"]],["MDKA","Merdeka Copper Gold","baku",["copper","gold","nickel"]],["MEDC","Medco Energi Internasional","energi",["oil"]],
 ["NCKL","Trimegah Bangun Persada","baku",["nickel","china"]],["PGAS","Perusahaan Gas Negara","energi",["oil","idr"]],["PGEO","Pertamina Geothermal Energy","infra",["rate"]],
 ["PTBA","Bukit Asam","energi",["coal"]],["SMGR","Semen Indonesia","baku",["rate","coal"]],["TLKM","Telkom Indonesia","infra",["rate","foreign"]],
 ["UNTR","United Tractors","industri",["coal","gold"]],["UNVR","Unilever Indonesia","primer",["infl","idr"]],["WIFI","Solusi Sinergi Digital","infra",["sentiment"]],
];
const SECT={keuangan:{id:"Keuangan",en:"Financials"},energi:{id:"Energi",en:"Energy"},baku:{id:"Barang Baku",en:"Basic Materials"},primer:{id:"Konsumen Primer",en:"Consumer Staples"},
 nonprimer:{id:"Konsumen Non-Primer",en:"Consumer Discretionary"},industri:{id:"Industri",en:"Industrials"},infra:{id:"Infrastruktur",en:"Infrastructure"},teknologi:{id:"Teknologi",en:"Technology"},kesehatan:{id:"Kesehatan",en:"Healthcare"}};
const DRV={
 rate:{id:"Suku bunga (BI rate, Fed)",en:"Interest rates (BI rate, Fed)"},foreign:{id:"Arus dana asing",en:"Foreign flows"},idr:{id:"Kurs USD/IDR",en:"USD/IDR exchange rate"},
 coal:{id:"Harga batu bara",en:"Coal price"},oil:{id:"Harga minyak/gas",en:"Oil/gas price"},nickel:{id:"Harga nikel (LME)",en:"Nickel price (LME)"},copper:{id:"Harga tembaga",en:"Copper price"},
 gold:{id:"Harga emas",en:"Gold price"},china:{id:"Ekonomi Tiongkok",en:"China's economy"},infl:{id:"Inflasi & daya beli",en:"Inflation & purchasing power"},
 tech:{id:"Sentimen teknologi global (Nasdaq)",en:"Global tech sentiment (Nasdaq)"},sentiment:{id:"Sentimen/likuiditas ritel",en:"Retail sentiment/liquidity"},
};
const OTHER=[
 ["IHSG / JCI",{id:"Semua saham tercatat, bobot kapitalisasi pasar. Barometer utama.",en:"All listed stocks, market-cap weighted. The main barometer."}],
 ["LQ45",{id:"45 saham paling likuid & berfundamental baik. Evaluasi mayor Januari & Juli (efektif Februari & Agustus), minor April & Oktober (efektif Mei & November).",en:"45 most liquid, fundamentally sound stocks. Major reviews January & July (effective February & August), minor April & October (effective May & November)."}],
 ["IDX30",{id:"30 saham pilihan dari LQ45.",en:"30 selected stocks from LQ45."}],["IDX80",{id:"80 saham likuid — semesta lebih luas untuk mencari second liner.",en:"80 liquid stocks — a wider universe for second liners."}],
 ["IDXHIDIV20",{id:"20 saham dengan dividen tinggi & konsisten.",en:"20 stocks with high, consistent dividends."}],["IDXBUMN20",{id:"20 saham BUMN & afiliasinya.",en:"20 state-owned enterprise stocks and affiliates."}],
 ["KOMPAS100",{id:"100 saham likuid, berkapitalisasi besar.",en:"100 liquid, large-cap stocks."}],["JII / ISSI",{id:"Indeks saham syariah (JII 30 saham; ISSI seluruh saham syariah).",en:"Sharia stock indices (JII: 30 stocks; ISSI: all sharia stocks)."}],
 ["SRI-KEHATI",{id:"Saham dengan kinerja ESG/keberlanjutan baik.",en:"Stocks with good ESG/sustainability performance."}],
 ["MSCI Indonesia",{id:"Indeks global yang diikuti dana asing pasif; rebalancing-nya memicu transaksi besar di pre-closing.",en:"Global index tracked by passive foreign funds; its rebalancing triggers large trades at the pre-close."}],
];

function mountIndices(el){
  el.innerHTML=`<div class="kicker">${T({id:"Referensi pasar",en:"Market reference"})}</div><h1>${T({id:"Indeks & daftar LQ45",en:"Indices & the LQ45 list"})}</h1>
  <p class="lead">${T({id:"Daftar saham LQ45 untuk periode <b>2 November 2026 – 29 Januari 2027</b>, lengkap dengan sektor dan penggerak global utamanya. Klik sektor untuk menyaring.",en:"LQ45 constituents for <b>2 November 2026 – 29 January 2027</b>, with sector and main global drivers. Click a sector to filter."})}</p>
  <div class="note warn"><b>${T({id:"Cek ulang.",en:"Double-check."})}</b> ${T({id:"Daftar diambil dari pemberitaan Kontan (2 Nov 2026). Sumber berita berbeda soal perubahan periode ini (SMGR & NCKL masuk; ada yang menyebut SCMA keluar, ada juga yang menyebut CUAN keluar & ELSA masuk). Konstituen berubah tiap evaluasi — selalu cocokkan dengan pengumuman resmi di idx.co.id.",en:"Taken from Kontan reporting (2 Nov 2026). Reports differ on this period's changes (SMGR & NCKL in; one says SCMA out, another says CUAN out & ELSA in). Constituents change every review — always check the official announcement at idx.co.id."})}</div>
  <div class="controls" id="lqF"><button class="btn sec" data-s="">${T({id:"Semua",en:"All"})} (45)</button>${Object.entries(SECT).map(([k,v])=>`<button class="btn sec" data-s="${k}">${T(v)} (${LQ45.filter(x=>x[2]===k).length})</button>`).join("")}</div>
  <div class="tablewrap"><table id="lqT"></table></div>
  <h2>${T({id:"Indeks lain yang perlu kamu kenal",en:"Other indices worth knowing"})}</h2>
  <div class="grid g2">${OTHER.map(o=>`<div class="card"><b>${o[0]}</b><p class="hint" style="margin:6px 0 0">${T(o[1])}</p></div>`).join("")}</div>`;
  const draw=s=>{ el.querySelector("#lqT").innerHTML=`<tr><th>${T({id:"Kode",en:"Code"})}</th><th>${T({id:"Emiten",en:"Company"})}</th><th>${T({id:"Sektor",en:"Sector"})}</th><th>${T({id:"Penggerak global utama",en:"Main global drivers"})}</th></tr>`+
    LQ45.filter(x=>!s||x[2]===s).map(x=>`<tr><td><b class="mono">${x[0]}</b></td><td>${x[1]}</td><td>${T(SECT[x[2]])}</td><td>${x[3].map(d=>`<span class="pill">${T(DRV[d])}</span>`).join("")}</td></tr>`).join("");
    el.querySelectorAll("#lqF button").forEach(b=>b.classList.toggle("on",b.dataset.s===s)); };
  el.querySelectorAll("#lqF button").forEach(b=>b.onclick=()=>draw(b.dataset.s)); draw("");
}

/* skenario: driver → arah per tag penggerak (+1 diuntungkan, −1 dirugikan) */
const SCN=[
 {k:"spx",l:{id:"S&P 500 / Nasdaq turun tajam semalam",en:"S&P 500 / Nasdaq fell sharply overnight"},eff:{foreign:-1,tech:-1,sentiment:-1},ihsg:-1,
  why:{id:"Risk-off global: dana asing cenderung mengurangi emerging market; saham big cap yang banyak dimiliki asing & saham teknologi paling terasa di pembukaan.",en:"Global risk-off: foreign funds tend to cut emerging-market exposure; foreign-held large caps and tech feel it most at the open."}},
 {k:"dxy",l:{id:"Dolar AS menguat (DXY naik, rupiah melemah)",en:"US dollar strengthens (DXY up, rupiah weakens)"},eff:{idr:-1,foreign:-1,coal:1,gold:0},ihsg:-1,
  why:{id:"Investor asing menghitung dalam USD, rupiah lemah menggerus return mereka → outflow. Importir bahan baku (pakan ternak, makanan, farmasi) tertekan; eksportir komoditas relatif diuntungkan.",en:"Foreign investors measure in USD; a weak rupiah erodes their returns → outflows. Importers of inputs (feed, food, pharma) suffer; commodity exporters benefit relatively."}},
 {k:"ust",l:{id:"Yield obligasi AS 10 tahun naik / Fed hawkish",en:"US 10-year yield rises / hawkish Fed"},eff:{rate:-1,foreign:-1,tech:-1},ihsg:-1,
  why:{id:"Selisih imbal hasil Indonesia vs AS menyempit; BI cenderung menahan atau menaikkan suku bunga untuk menjaga rupiah. Bank, properti, teknologi (valuasi jangka panjang) sensitif.",en:"The Indonesia–US yield gap narrows; BI tends to hold or raise rates to defend the rupiah. Banks, property and tech (long-duration valuations) are sensitive."}},
 {k:"bicut",l:{id:"BI memangkas suku bunga",en:"Bank Indonesia cuts rates"},eff:{rate:1,infl:1},ihsg:1,
  why:{id:"Biaya dana turun, kredit & konsumsi terdorong. Positif untuk bank, properti, ritel — selama rupiah tetap stabil.",en:"Funding costs fall, lending and consumption pick up. Positive for banks, property, retail — as long as the rupiah stays stable."}},
 {k:"coal",l:{id:"Harga batu bara naik",en:"Coal price rises"},eff:{coal:1},ihsg:0,
  why:{id:"Laba produsen batu bara naik; UNTR (alat berat & tambang) ikut. Efek ke IHSG kecil karena bobot terbesar ada di bank.",en:"Coal producers' earnings rise; UNTR (heavy equipment & mining) follows. Small JCI impact because banks carry the largest weight."}},
 {k:"nickel",l:{id:"Harga nikel naik / permintaan baterai EV kuat",en:"Nickel price rises / strong EV battery demand"},eff:{nickel:1,china:1},ihsg:0,
  why:{id:"Emiten nikel (INCO, NCKL, MBMA, ANTM) diuntungkan; sangat terkait permintaan Tiongkok.",en:"Nickel names (INCO, NCKL, MBMA, ANTM) benefit; closely tied to Chinese demand."}},
 {k:"gold",l:{id:"Harga emas naik",en:"Gold price rises"},eff:{gold:1},ihsg:0,
  why:{id:"ANTM, MDKA, AMMN, HRTA, dan UNTR (punya tambang emas) cenderung diuntungkan. Emas sering naik saat risk-off.",en:"ANTM, MDKA, AMMN, HRTA and UNTR (gold mining arm) tend to benefit. Gold often rises in risk-off periods."}},
 {k:"oil",l:{id:"Harga minyak naik",en:"Oil price rises"},eff:{oil:1,infl:-1},ihsg:0,
  why:{id:"MEDC & emiten migas diuntungkan; namun beban subsidi & inflasi naik, menekan konsumsi.",en:"MEDC and oil & gas names benefit; but subsidy costs and inflation rise, weighing on consumption."}},
 {k:"china",l:{id:"Data ekonomi Tiongkok melemah",en:"Chinese economic data weakens"},eff:{china:-1,coal:-1,nickel:-1,copper:-1},ihsg:-1,
  why:{id:"Tiongkok pembeli utama komoditas Indonesia. Permintaan batu bara, nikel, tembaga, pulp turun.",en:"China is a key buyer of Indonesian commodities. Demand for coal, nickel, copper and pulp falls."}},
];
function mountGlobal(el){
  el.innerHTML=`<div class="kicker">${T({id:"Makro & global",en:"Macro & global"})}</div><h1>${T({id:"Pengaruh global: USD, S&P 500, suku bunga, komoditas",en:"Global drivers: USD, S&P 500, rates, commodities"})}</h1>
  <p class="lead">${T({id:"IHSG tidak bergerak sendirian. Berikut jalur pengaruh pasar luar ke saham Indonesia, cara membacanya tiap pagi, dan alat untuk mengukur sendiri seberapa kuat hubungannya.",en:"The JCI doesn't move alone. Here are the channels through which global markets affect Indonesian stocks, how to read them each morning, and a tool to measure the strength of the link yourself."})}</p>
  <h2>${T({id:"Jalur pengaruh",en:"Transmission channels"})}</h2>
  <div class="tablewrap"><table><tr><th>${T({id:"Faktor",en:"Factor"})}</th><th>${T({id:"Jalur ke IHSG",en:"Channel to the JCI"})}</th><th>${T({id:"Paling sensitif",en:"Most sensitive"})}</th></tr>
   <tr><td><b>S&P 500 / Nasdaq</b></td><td>${T({id:"Sentimen risiko global → arus dana asing ke emerging market. Pembukaan IHSG sering mengikuti arah Wall Street semalam.",en:"Global risk sentiment → foreign flows into emerging markets. The JCI open often follows Wall Street's overnight direction."})}</td><td>BBCA, BBRI, BMRI, TLKM, GOTO</td></tr>
   <tr><td><b>DXY & USD/IDR</b></td><td>${T({id:"Dolar kuat → rupiah lemah → asing keluar; biaya impor naik.",en:"Strong dollar → weak rupiah → foreign outflows; import costs rise."})}</td><td>ICBP, INDF, CPIN, JPFA, KLBF (−) · ${T({id:"eksportir komoditas",en:"commodity exporters"})} (+)</td></tr>
   <tr><td><b>US10Y & Fed</b></td><td>${T({id:"Yield AS naik → selisih dengan SBN menyempit → tekanan rupiah → BI cenderung ketat.",en:"Higher US yields → narrower gap vs Indonesian bonds → rupiah pressure → BI tends to stay tight."})}</td><td>${T({id:"Bank, properti, teknologi",en:"Banks, property, tech"})}</td></tr>
   <tr><td><b>BI rate</b></td><td>${T({id:"Biaya dana, kredit, valuasi.",en:"Funding costs, lending, valuations."})}</td><td>BBTN, BBRI, ${T({id:"properti, ritel",en:"property, retail"})}</td></tr>
   <tr><td><b>${T({id:"Batu bara",en:"Coal"})}</b></td><td>${T({id:"Laba produsen & neraca dagang.",en:"Producer earnings & trade balance."})}</td><td>ADRO, AADI, PTBA, ITMG, INDY, BUMI, UNTR</td></tr>
   <tr><td><b>${T({id:"Nikel, tembaga, emas",en:"Nickel, copper, gold"})}</b></td><td>${T({id:"Laba emiten tambang; terkait Tiongkok & siklus EV.",en:"Miner earnings; tied to China & the EV cycle."})}</td><td>INCO, NCKL, MBMA, ANTM, MDKA, AMMN</td></tr>
   <tr><td><b>${T({id:"Minyak",en:"Oil"})}</b></td><td>${T({id:"Laba migas vs beban subsidi & inflasi.",en:"Oil & gas earnings vs subsidy burden & inflation."})}</td><td>MEDC, PGAS, AKRA</td></tr>
   <tr><td><b>${T({id:"Tiongkok",en:"China"})}</b></td><td>${T({id:"Permintaan komoditas Indonesia.",en:"Demand for Indonesian commodities."})}</td><td>${T({id:"Seluruh sektor tambang, INKP",en:"All mining names, INKP"})}</td></tr>
   <tr><td><b>MSCI / FTSE</b></td><td>${T({id:"Rebalancing indeks memaksa dana pasif beli/jual di tanggal tertentu (pre-closing).",en:"Index rebalancing forces passive funds to trade on set dates (pre-close)."})}</td><td>${T({id:"Konstituen MSCI Indonesia",en:"MSCI Indonesia constituents"})}</td></tr></table></div>
  <div class="note">${T({id:"Riset Richards (2005, JFQA) menemukan arus dana asing di bursa Asia termasuk Indonesia berdampak besar terhadap harga dan cenderung mengikuti return pasar global — dasar mengapa S&P 500 & dolar penting untuk IHSG. Tapi korelasi berubah-ubah dari waktu ke waktu; ukur sendiri dengan kalkulator di bawah.",en:"Richards (2005, JFQA) found foreign flows in Asian markets including Indonesia have a large price impact and tend to follow global returns — why the S&P 500 and the dollar matter for the JCI. But correlations shift over time; measure them yourself below."})}</div>

  <h2>${T({id:"Simulasi skenario: siapa yang terdampak?",en:"Scenario explorer: who is affected?"})}</h2>
  <p class="hint">${T({id:"Arah umum berdasarkan penggerak utama tiap saham LQ45 — bukan prediksi harga. Satu saham bisa dipengaruhi banyak faktor sekaligus.",en:"General direction based on each LQ45 stock's main drivers — not a price forecast. One stock can be hit by several factors at once."})}</p>
  <select id="scS" style="max-width:100%">${SCN.map(s=>`<option value="${s.k}">${T(s.l)}</option>`).join("")}</select>
  <div id="scOut" style="margin-top:12px"></div>

  <h2>${T({id:"Checklist pagi (sebelum 09.00 WIB)",en:"Morning checklist (before 09:00 WIB)"})}</h2>
  <ul class="chk-list prose">
   <li>${T({id:"Penutupan S&P 500, Nasdaq, Dow Jones semalam (%).",en:"Overnight close of the S&P 500, Nasdaq, Dow Jones (%)."})}</li>
   <li>${T({id:"EIDO (ETF MSCI Indonesia di bursa AS) — gambaran minat asing terhadap Indonesia semalam.",en:"EIDO (MSCI Indonesia ETF in the US) — a read on overnight foreign appetite for Indonesia."})}</li>
   <li>${T({id:"DXY & USD/IDR (termasuk kurs NDF offshore).",en:"DXY & USD/IDR (including the offshore NDF rate)."})}</li>
   <li>${T({id:"Yield US10Y & SBN 10 tahun.",en:"US10Y & 10-year Indonesian government bond yields."})}</li>
   <li>${T({id:"Batu bara, nikel, emas, minyak (Brent).",en:"Coal, nickel, gold, oil (Brent)."})}</li>
   <li>${T({id:"Bursa Asia yang buka lebih dulu: Nikkei, Kospi, ASX; indeks berjangka Tiongkok/Hong Kong.",en:"Asian markets that open earlier: Nikkei, Kospi, ASX; China/Hong Kong futures."})}</li>
   <li>${T({id:"Jadwal hari ini: rapat BI, data inflasi, pengumuman MSCI, ex-date dividen, rilis laporan keuangan.",en:"Today's calendar: BI meeting, inflation data, MSCI announcements, dividend ex-dates, earnings releases."})}</li>
   <li>${T({id:"Net foreign IHSG kemarin & 5 hari terakhir.",en:"JCI net foreign flow yesterday & over 5 days."})}</li></ul>

  <h2>${T({id:"Kalkulator korelasi & beta",en:"Correlation & beta calculator"})}</h2>
  <p class="hint">${T({id:"Tempel harga penutupan (satu per baris atau dipisah koma, urutan tanggal sama) dari dua seri, mis. IHSG dan S&P 500, atau BBCA dan USD/IDR. Kalkulator menghitung korelasi return harian & beta seri A terhadap seri B.",en:"Paste closing prices (one per line or comma-separated, same date order) for two series, e.g. JCI and S&P 500, or BBCA and USD/IDR. It computes the correlation of daily returns and the beta of A against B."})}</p>
  <div class="grid g2"><label class="hint">${T({id:"Seri A (mis. IHSG)",en:"Series A (e.g. JCI)"})}<textarea id="crA" class="notearea" placeholder="7100&#10;7125&#10;7080…"></textarea></label><label class="hint">${T({id:"Seri B (mis. S&P 500 hari sebelumnya)",en:"Series B (e.g. previous-day S&P 500)"})}<textarea id="crB" class="notearea" placeholder="5900&#10;5950&#10;5920…"></textarea></label></div>
  <div id="crOut" class="out" style="margin-top:10px"></div>
  <p class="hint">${T({id:"Tips: karena Wall Street tutup setelah BEI tutup, bandingkan return IHSG hari ini dengan return S&P 500 <b>hari sebelumnya</b>.",en:"Tip: since Wall Street closes after IDX, compare today's JCI return with the S&P 500's return from the <b>previous day</b>."})}</p>`;
  const sc=()=>{ const s=SCN.find(x=>x.k===el.querySelector("#scS").value);
    const hit=LQ45.map(x=>{ let v=0; x[3].forEach(d=>{ if(s.eff[d]) v+=s.eff[d]; }); return {x,v}; }).filter(o=>o.v!==0);
    const pos=hit.filter(o=>o.v>0), neg=hit.filter(o=>o.v<0);
    el.querySelector("#scOut").innerHTML=`<div class="card"><p>${T(s.why)}</p><p><b>IHSG:</b> ${s.ihsg>0?`<span class="up">▲ ${T({id:"cenderung positif",en:"tends positive"})}</span>`:s.ihsg<0?`<span class="down">▼ ${T({id:"cenderung negatif",en:"tends negative"})}</span>`:T({id:"efek kecil / campuran",en:"small / mixed effect"})}</p>
     <div class="grid g2"><div><b class="up">▲ ${T({id:"Cenderung diuntungkan",en:"Tend to benefit"})}</b><p>${pos.map(o=>`<span class="pill up">${o.x[0]}</span>`).join("")||"–"}</p></div><div><b class="down">▼ ${T({id:"Cenderung tertekan",en:"Tend to suffer"})}</b><p>${neg.map(o=>`<span class="pill down">${o.x[0]}</span>`).join("")||"–"}</p></div></div></div>`; };
  el.querySelector("#scS").onchange=sc; sc();
  const cr=()=>{ const p=id=>el.querySelector("#"+id).value.split(/[\s,;]+/).map(s=>parseFloat(s.replace(/\./g,"").replace(",","."))).filter(isFinite);
    let a=p("crA"), b=p("crB"); const n=Math.min(a.length,b.length); const out=el.querySelector("#crOut");
    if(n<6){ out.innerHTML=T({id:"Masukkan minimal 6 harga untuk tiap seri.",en:"Enter at least 6 prices for each series."}); return; }
    a=a.slice(0,n); b=b.slice(0,n); const ra=a.slice(1).map((x,i)=>x/a[i]-1), rb=b.slice(1).map((x,i)=>x/b[i]-1);
    const m=v=>v.reduce((s,x)=>s+x,0)/v.length, ma=m(ra), mb=m(rb); let cov=0,va=0,vb=0; ra.forEach((x,i)=>{ cov+=(x-ma)*(rb[i]-mb); va+=(x-ma)**2; vb+=(rb[i]-mb)**2; });
    const corr=cov/Math.sqrt(va*vb), beta=cov/vb;
    const lab=Math.abs(corr)>.6?T({id:"kuat",en:"strong"}):Math.abs(corr)>.3?T({id:"sedang",en:"moderate"}):T({id:"lemah",en:"weak"});
    out.innerHTML=`<div class="stat"><span>${T({id:"Jumlah return",en:"Number of returns"})}</span><b>${ra.length}</b></div><div class="stat"><span>${window.L("Korelasi")}</span><b>${corr.toFixed(2)} (${lab})</b></div><div class="stat"><span>Beta A ${T({id:"terhadap",en:"vs"})} B</span><b>${beta.toFixed(2)}</b></div>
     <p class="hint" style="margin:8px 0 0">${T({id:`Artinya: jika B bergerak 1%, A rata-rata bergerak ${beta.toFixed(2)}%. Korelasi ${corr.toFixed(2)} berarti sekitar ${(corr*corr*100).toFixed(0)}% variasi A searah dengan B.`,en:`Meaning: when B moves 1%, A moves ${beta.toFixed(2)}% on average. A correlation of ${corr.toFixed(2)} means about ${(corr*corr*100).toFixed(0)}% of A's variation lines up with B.`})}</p>`; };
  el.querySelectorAll("#crA,#crB").forEach(t=>t.oninput=cr); cr();
  window.linkTerms(el);
}
window.Indices={mount:mountIndices}; window.Global={mount:mountGlobal};
})();
