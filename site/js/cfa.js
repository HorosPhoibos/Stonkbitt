/* Jalur CFA, Pustaka, Flashcard rumus */
(function(){
const TOPICS=[
 {k:"Ethics",id:"Etika & Standar Profesional",l1:"15–20%",l2:"10–15%",l3:"Inti",wppe:"Kode etik, larangan front running & insider trading, kewajiban kepada nasabah",site:["g3","d5"],book:"Standards of Practice Handbook"},
 {k:"Quant",id:"Metode Kuantitatif",l1:"6–9%",l2:"5–10%",l3:"—",wppe:"Time value of money, statistik dasar",site:["c3"],book:"Quantitative Investment Analysis (DeFusco)"},
 {k:"Econ",id:"Ekonomi",l1:"6–9%",l2:"5–10%",l3:"Capital market expectations",wppe:"Makro, kebijakan moneter BI",site:["b6","f2"],book:"Economics for Investment Decision Makers"},
 {k:"FSA",id:"Analisis Laporan Keuangan",l1:"11–14%",l2:"10–15%",l3:"—",wppe:"Laporan keuangan emiten, rasio",site:["b1","b2","b5"],book:"Financial Shenanigans; Quality of Earnings"},
 {k:"Corp",id:"Emiten (Corporate Issuers)",l1:"6–9%",l2:"5–10%",l3:"—",wppe:"Aksi korporasi, struktur modal, tata kelola",site:["a5","b4"],book:"Corporate Finance (Berk & DeMarzo)"},
 {k:"Equity",id:"Investasi Ekuitas",l1:"11–14%",l2:"10–15%",l3:"Strategi ekuitas",wppe:"Valuasi saham, mekanisme bursa",site:["a1","a2","b3","b4"],book:"Valuation (McKinsey); Investment Valuation (Damodaran)"},
 {k:"FI",id:"Pendapatan Tetap",l1:"11–14%",l2:"10–15%",l3:"Strategi fixed income",wppe:"Obligasi, SBN, yield, durasi (WMI)",site:["tools:ytm","tools:kupon"],book:"Fixed Income Analysis (Fabozzi/CFA)"},
 {k:"Deriv",id:"Derivatif",l1:"5–8%",l2:"5–10%",l3:"Derivatif & manajemen risiko",wppe:"Opsi, futures, waran (dasar)",site:[],book:"Options, Futures, and Other Derivatives (Hull)"},
 {k:"Alt",id:"Investasi Alternatif",l1:"7–10%",l2:"5–10%",l3:"Jalur Private Markets",wppe:"DIRE, KIK-EBA, reksa dana penyertaan terbatas (WMI)",site:[],book:"Alternative Investments (Chambers)"},
 {k:"PM",id:"Manajemen Portofolio & Wealth Planning",l1:"8–12%",l2:"10–15%",l3:"Inti + jalur Portfolio Mgmt / Private Wealth",wppe:"Reksa dana, IPS, alokasi aset (WMI)",site:["g1","g2"],book:"Managing Investment Portfolios (Maginn & Tuttle); Behavioral Finance (Pompian)"},
];
const CARDS=[
["FV majemuk","FV = PV × (1 + r)^n"],["PV anuitas","PV = PMT × [1 − (1+r)^−n] / r"],["EAR","EAR = (1 + r/m)^m − 1"],
["Sharpe ratio","(Rp − Rf) / σp"],["CAPM","E(R) = Rf + β[E(Rm) − Rf]"],["Beta","β = Cov(Ri,Rm) / Var(Rm)"],
["Varians 2 aset","σ² = w1²σ1² + w2²σ2² + 2w1w2ρσ1σ2"],["Gordon growth","V0 = D1 / (r − g)"],["Sustainable growth","g = ROE × (1 − payout)"],
["PBV wajar","P/B = (ROE − g) / (r − g)"],["DuPont 3 faktor","ROE = NPM × Asset turnover × Equity multiplier"],["FCFF","FCFF = EBIT(1−t) + D&A − Capex − ΔNWC"],
["FCFE","FCFE = FCFF − Bunga(1−t) + Pinjaman bersih"],["WACC","E/V·Re + D/V·Rd·(1−t)"],["Modified duration","ModDur = MacDur / (1 + y/m)"],
["Perubahan harga obligasi","%ΔP ≈ −ModDur·Δy + ½·Convexity·(Δy)²"],["Current yield","Kupon tahunan / Harga"],["Put–call parity","C + PV(X) = P + S"],
["Forward price","F0 = S0 × (1 + Rf)^T"],["Cost of goods sold (inventory)","Persediaan awal + Pembelian − Persediaan akhir"],["Cash conversion cycle","DSO + DIO − DPO"],
["Interest coverage","EBIT / Beban bunga"],["Degree of operating leverage","%ΔEBIT / %ΔPenjualan"],["Information ratio","(Rp − Rb) / Tracking error"],
["Treynor","(Rp − Rf) / βp"],["Jensen's alpha","Rp − [Rf + β(Rm − Rf)]"],["Fisher (aproks.)","Nominal ≈ Riil + Inflasi"],
["Covered interest parity","F/S = (1 + i_harga) / (1 + i_basis)"],["Harga teoritis right issue","(N_lama·P_cum + N_baru·P_tebus)/(N_lama+N_baru)"],["Lot sizing","Lot = Modal·Risiko% / ((Entry − SL)·100)"],
];
function mountCFA(el){
  const prog=JSON.parse(localStorage.getItem("sb_prog")||"{}");
  const plan=JSON.parse(localStorage.getItem("sb_cfaplan")||'{"age":35,"target":45}');
  el.innerHTML=`<div class="kicker">Jalur lanjutan</div><h1>Jalur CFA (Level I – III)</h1>
  <p class="lead">Kamu sudah punya WPPE & WMI — artinya etika, regulasi pasar modal Indonesia, reksa dana, dan dasar portofolio sudah pernah kamu pelajari. Halaman ini memetakan topik CFA ke materi website ini, ke buku di Pustaka, dan ke apa yang sudah kamu tahu dari WPPE/WMI, supaya refresh-nya terarah.</p>
  <div class="note">Bobot topik diringkas dari kurikulum CFA Institute terbaru (L3 kini punya jalur pilihan: Portfolio Management, Private Markets, Private Wealth). Bobot & format bisa berubah — cek <a href="https://www.cfainstitute.org" target="_blank" rel="noopener">cfainstitute.org</a> saat mendaftar.</div>
  <h2>Peta topik</h2>
  <div class="tablewrap"><table><tr><th>Topik</th><th>L1</th><th>L2</th><th>L3</th><th>Sudah dari WPPE/WMI</th><th>Materi di sini</th><th>Buku utama</th></tr>
  ${TOPICS.map(t=>`<tr><td><b>${t.id}</b><br><span class="hint">${t.k}</span></td><td class="num">${t.l1}</td><td class="num">${t.l2}</td><td>${t.l3}</td><td class="hint">${t.wppe}</td>
   <td>${t.site.map(s=>s.startsWith("tools:")?`<a href="#/tools?t=${s.slice(6)}">kalkulator</a>`:`<a href="#/pelajaran/${s}">${s.toUpperCase()}</a>${prog[s]?" ✓":""}`).join(", ")||"<span class='hint'>buku</span>"}</td><td class="hint">${t.book}</td></tr>`).join("")}
  </table></div>
  <h2>Rencana waktu menuju ujian</h2>
  <div class="card"><div class="form" style="max-width:420px"><label>Usia sekarang<input type="number" id="cfaAge" value="${plan.age}"></label><label>Target ujian L1 di usia<input type="number" id="cfaTgt" value="${plan.target}"></label></div><div id="cfaPlan"></div></div>
  <h2>Kebiasaan refresh yang realistis</h2>
  <div class="grid g3">
   <div class="card"><b>Harian · 15 menit</b><p class="hint">10 kartu rumus di bawah + 1 ronde Lab Order Book. Menjaga ingatan tetap hangat tanpa beban.</p></div>
   <div class="card"><b>Mingguan · 2 jam</b><p class="hint">1 pelajaran di modul A–G + baca 1 bab buku terkait. Tulis ringkasan 5 kalimat dengan bahasamu.</p></div>
   <div class="card"><b>Bulanan · ½ hari</b><p class="hint">Analisis lengkap 1 emiten: laporan keuangan, rasio, valuasi (tools DCF/PBV), broker summary, foreign flow. Ini latihan L2 yang sebenarnya.</p></div>
  </div>
  <h2>Flashcard rumus</h2>
  <p class="hint">Klik kartu (atau tekan Enter/Spasi) untuk membalik. "Hafal" menyembunyikan kartu selama 7 hari.</p>
  <button type="button" class="card flash-card" id="fc" aria-live="polite"></button>
  <div class="controls" style="justify-content:center"><button class="btn sec" id="fcAgain">↻ Ulangi</button><button class="btn up" id="fcOk">✓ Hafal</button><span class="hint" id="fcInfo"></span></div>`;
  const drawPlan=()=>{ const a=+el.querySelector("#cfaAge").value, t=+el.querySelector("#cfaTgt").value; localStorage.setItem("sb_cfaplan",JSON.stringify({age:a,target:t}));
    const y=Math.max(0,t-a);
    const phases=[
      ["Fondasi (sekarang)", "Selesaikan modul A–G di website ini; biasakan membaca laporan keuangan & membuat valuasi sederhana."],
      ["Akademik (2–3 tahun sebelum)", "Baca buku inti: Berk & DeMarzo, Damodaran, Fabozzi, Hull. Latih rumus dengan kalkulator finansial (BA II Plus / HP 12C)."],
      ["Persiapan L1 (6–9 bulan sebelum)", "Daftar ujian, pakai kurikulum resmi CFA Institute (didapat saat mendaftar) + mock exam. ±300 jam belajar."],
      ["L2 (±1 tahun setelah L1)", "Fokus FSA, ekuitas, fixed income, derivatif — gaya vignette. ±300–350 jam."],
      ["L3 (±1 tahun setelah L2)", "Portofolio & wealth management, pilih jalur. Banyak soal esai (constructed response)."],
    ];
    el.querySelector("#cfaPlan").innerHTML=`<p>Kamu punya <b>${y} tahun</b> sampai target. ${y>=5?"Cukup longgar — gunakan untuk membangun pemahaman, bukan menghafal.":y>=2?"Waktu ideal: mulai buku inti sekarang.":"Waktu mepet — langsung ke kurikulum resmi & mock exam."}</p>
    <ol>${phases.map(p=>`<li><b>${p[0]}</b> — ${p[1]}</li>`).join("")}</ol>`; };
  el.querySelectorAll("#cfaAge,#cfaTgt").forEach(i=>i.oninput=drawPlan); drawPlan();
  // flashcards
  /* Flashcard — machine "flashcards": front ⇄ back ; front|back --KNOW--> front (kartu berikutnya) atau empty ; AGAIN → kartu acak lain.
     Di "empty" kartu & tombol nonaktif, jadi "Hafal" tidak bisa lagi menandai kartu lama. */
  let st={}; try{ st=JSON.parse(localStorage.getItem("sb_fc")||"{}"); }catch(e){}
  const due=()=>CARDS.map((c,i)=>i).filter(i=>!st[i]||st[i]<Date.now());
  const box=el.querySelector("#fc"), bAgain=el.querySelector("#fcAgain"), bOk=el.querySelector("#fcOk"), info=el.querySelector("#fcInfo");
  const pickCard=c=>{ const d=due(); c.idx=d.length?d[Math.floor(Math.random()*d.length)]:-1; };
  const paint=()=>{ const c=fcM.context, s=fcM.state; info.textContent=`${due().length}/${CARDS.length} kartu jatuh tempo`;
    const empty=s==="empty"||c.idx<0; box.disabled=empty; bAgain.disabled=empty; bOk.disabled=empty;
    box.innerHTML= empty ? "🎉 Semua kartu hafal. Kembali minggu depan."
      : s==="back" ? `<div class="muted" style="font-size:13px">${CARDS[c.idx][0]}</div><span class="mono">${CARDS[c.idx][1]}</span>`
      : `<div class="muted" style="font-size:13px">Rumus</div><b>${CARDS[c.idx][0]}</b>`;
    box.setAttribute("aria-label", empty?"Semua kartu hafal": s==="back"?`Jawaban: ${CARDS[c.idx][1]}. Tekan untuk kembali ke pertanyaan.`:`Rumus: ${CARDS[c.idx][0]}. Tekan untuk melihat jawaban.`); };
  const next=c=>{ pickCard(c); return c.idx>=0; };
  const remember=c=>{ if(c.idx<0) return; st[c.idx]=Date.now()+7*864e5; try{ localStorage.setItem("sb_fc",JSON.stringify(st)); }catch(e){} };
  const fcM=window.Machines.create({ id:"flashcards", initial:"front", context:{idx:-1}, states:{
    front:{ enter:paint, on:{ FLIP:{ target:"back", guard:c=>c.idx>=0 }, AGAIN:{ action:(c)=>{ next(c); paint(); } },
      KNOW:{ target:"front", action:(c)=>{ remember(c); next(c); paint(); } }, EMPTY:"empty" } },
    back:{ enter:paint, on:{ FLIP:{ target:"front", guard:c=>c.idx>=0 }, AGAIN:{ target:"front", action:(c)=>next(c) },
      KNOW:{ target:"front", action:(c)=>{ remember(c); next(c); } }, EMPTY:"empty" } },
    empty:{ enter:paint, on:{} } } }).bind(box);
  const settle=()=>{ if(fcM.context.idx<0) fcM.send("EMPTY"); };
  box.onclick=()=>fcM.send("FLIP");
  bAgain.onclick=()=>{ fcM.send("AGAIN"); settle(); };
  bOk.onclick=()=>{ fcM.send("KNOW"); settle(); };
  if(next(fcM.context)) paint(); else fcM.send("EMPTY");
}

const BOOKS=[
 ["Valuasi & Corporate Finance",[
  ["Valuation: Measuring and Managing the Value of Companies","Koller, Goedhart, Wessels (McKinsey)","7th ed. 2020","B4, CFA Equity"],
  ["Investment Valuation","Aswath Damodaran","3rd ed. 2012","B3–B4, CFA Equity"],
  ["Corporate Finance","Jonathan Berk & Peter DeMarzo","6th ed. 2023","A5, B4, CFA Corporate Issuers"],
  ["Value: The Four Cornerstones of Corporate Finance","Koller, Dobbs, Huyett (McKinsey)","2010","B3 — pengantar yang ramah"],
  ["Investment Banking: Valuation, LBOs, M&A, and IPOs","Rosenbaum & Pearl","3rd ed. 2020","B4, aksi korporasi"],
  ["Financial Modeling","Simon Benninga","5th ed. 2022","B4 — praktik Excel"],
  ["Security Analysis","Graham & Dodd","6th ed. 2008","Filosofi margin of safety"]]],
 ["Akuntansi forensik",[
  ["Financial Shenanigans","Howard Schilit dkk.","4th ed. 2018","B5, CFA FSA"],
  ["Quality of Earnings","Thornton O'glove","1987","B5"]]],
 ["Kurikulum CFA Institute",[
  ["Quantitative Investment Analysis","DeFusco dkk.","3rd ed.","CFA Quant"],
  ["Economics for Investment Decision Makers","Piros & Pinto","2013","B6, F2, CFA Econ"],
  ["Fixed Income Analysis","Fabozzi / CFA Institute","5th ed. 2022","Tools obligasi, CFA FI"],
  ["Managing Investment Portfolios","Maginn & Tuttle dkk.","3rd ed. 2007","CFA L3"],
  ["Alternative Investments: A Primer","Donald Chambers dkk.","2020","CFA Alternatives"],
  ["Standards of Practice Handbook","CFA Institute","12th ed. 2024","CFA Ethics — wajib"]]],
 ["Derivatif, kuantitatif & perilaku",[
  ["Options, Futures, and Other Derivatives","John C. Hull","11th ed. 2021","CFA Derivatives"],
  ["Python for Finance","Yves Hilpisch","2nd ed. 2018","C3 — backtesting & data"],
  ["Behavioral Finance and Wealth Management","Michael Pompian","2nd ed. 2012","G2, CFA L3"],
  ["The McKinsey Way","Ethan Rasiel","1999","Cara berpikir terstruktur"],
  ["Kaplan SchweserNotes (L1–L3)","Kaplan Schweser","rilis tahunan","Ringkasan ujian — pakai edisi tahun ujianmu"]]],
 ["Teknikal & indikator (Fibonacci, RSI, Ichimoku)",[
  ["Technical Analysis of the Financial Markets","John J. Murphy","1999","C1–C3 — rujukan teknikal paling lengkap"],
  ["New Concepts in Technical Trading Systems","J. Welles Wilder Jr.","1978","Sumber asli RSI, ATR, Parabolic SAR"],
  ["Japanese Candlestick Charting Techniques","Steve Nison","2nd ed. 2001","C2 — candlestick"],
  ["Ichimoku Charts: An Introduction to Ichimoku Kinko Clouds","Nicole Elliott","2007","Lab Indikator — Ichimoku"],
  ["Trading with Ichimoku Clouds","Manesh Patel","2010","Lab Indikator — Ichimoku"],
  ["Fibonacci Analysis","Constance Brown","2008","Lab Indikator — Fibonacci"],
  ["Encyclopedia of Chart Patterns","Thomas N. Bulkowski","3rd ed. 2021","Statistik pola grafik"],
  ["Trading for a Living / The New Trading for a Living","Alexander Elder","2014","C4, G1 — sistem & manajemen uang"]]],
 ["Bukti ilmiah, sistematik & mikrostruktur",[
  ["Evidence-Based Technical Analysis","David Aronson","2006","Menguji aturan teknikal secara statistik"],
  ["Systematic Trading","Robert Carver","2015","Merancang sistem trading yang tidak overfit"],
  ["Expected Returns","Antti Ilmanen","2011","Bukti premi value, momentum, carry"],
  ["Trading and Exchanges: Market Microstructure for Practitioners","Larry Harris","2003","E1–E3 — order book & mikrostruktur"],
  ["Advances in Financial Machine Learning","Marcos López de Prado","2018","ML & backtest yang benar"],
  ["A Random Walk Down Wall Street","Burton Malkiel","edisi terbaru","Sisi skeptis — kenapa indeks sulit dikalahkan"],
  ["Adaptive Markets","Andrew W. Lo","2017","Kenapa keunggulan muncul lalu hilang"]]],
 ["Psikologi trading",[
  ["Trading in the Zone","Mark Douglas","2000","G2 — berpikir dalam probabilitas"],
  ["Thinking, Fast and Slow","Daniel Kahneman","2011","G2 — bias kognitif"],
  ["Trade Your Way to Financial Freedom","Van K. Tharp","2nd ed. 2006","G1 — expectancy & position sizing"]]],
 ["Bandarmologi, tape reading & volume",[
  ["Bandarmology","Ryan Filbert Wijaya","edisi terbaru","D1–D5 — konteks BEI"],
  ["Studies in Tape Reading","Richard D. Wyckoff","1910","D2, E2 — klasik (domain publik)"],
  ["Trades About to Happen","David H. Weis","2013","D2 — Weis Wave"],
  ["Master the Markets","Tom Williams","1993","D3 — VSA"],
  ["A Complete Guide to Volume Price Analysis","Anna Coulling","2013","C2, D3"],
  ["Wyckoff 2.0: Structures, Volume Profile and Order Flow","Rubén Villahermosa","2021","D2, E3"],
  ["Investing with Volume Analysis","Buff Pelz Dormeier","2011","D4 — jembatan ke CFA"]]],
];
function mountBooks(el){
  const rd=JSON.parse(localStorage.getItem("sb_books")||"{}"); const n=BOOKS.reduce((s,g)=>s+g[1].length,0);
  el.innerHTML=`<div class="kicker">Rujukan</div><h1>Pustaka ${n} Buku</h1>
  <p class="lead">Urutan belajar: fundamental & valuasi dulu (<i>apa</i> yang dibeli), lalu volume & bandarmologi (<i>kapan</i> membeli), lalu kurikulum CFA untuk merapikan semuanya. Centang buku yang sudah selesai.</p>
  <div class="note">Dapatkan lewat jalur resmi: toko buku/e-book, perpustakaan kampus (Untar), Perpustakaan Nasional (iPusnas), atau kurikulum resmi yang diberikan CFA Institute saat mendaftar ujian. Buku Wyckoff 1910 sudah domain publik.</div>
  ${BOOKS.map(([g,list])=>`<h2>${g}</h2><div class="tablewrap"><table><tr><th></th><th>Judul</th><th>Penulis</th><th>Edisi</th><th>Dipakai di</th></tr>${list.map(b=>{const k=b[0];return `<tr><td><input type="checkbox" data-k="${k}" ${rd[k]?"checked":""}></td><td><b>${b[0]}</b></td><td>${b[1]}</td><td class="hint">${b[2]}</td><td class="hint">${b[3]}</td></tr>`;}).join("")}</table></div>`).join("")}`;
  el.querySelectorAll("input[type=checkbox]").forEach(c=>c.onchange=()=>{ rd[c.dataset.k]=c.checked; localStorage.setItem("sb_books",JSON.stringify(rd)); });
}
window.CFA={mount:mountCFA}; window.Books={mount:mountBooks};
})();
