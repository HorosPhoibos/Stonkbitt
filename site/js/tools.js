/* Tools & kalkulator. Setiap tool: {id, t, d, f:[fields], calc(v)->html} */
(function(){
const fmt=(n,d=0)=>isFinite(n)? Number(n).toLocaleString("id-ID",{minimumFractionDigits:d,maximumFractionDigits:d}) : "-";
const rp=n=>"Rp"+fmt(n);
const pct=(n,d=2)=>fmt(n,d)+"%";
const tick=p=>p<200?1:p<500?2:p<2000?5:p<5000?10:25;
const roundTick=(p,dir)=>{ let t=tick(p); return dir>0? Math.ceil(p/t)*t : Math.floor(p/t)*t; };
const st=(k,v,cls="")=>`<div class="stat"><span>${k}</span><b class="${cls}">${v}</b></div>`;

const TOOLS=[
{ id:"deposito", g:"Pendapatan Tetap", t:"Bunga bersih deposito", d:"Bunga deposito kena PPh final 20% (WP dalam negeri). Cek juga apakah bunganya masih dijamin LPS.",
 f:[["pokok","Pokok (Rp)",100000000],["rate","Bunga p.a. (%)",5.5],["tenor","Tenor (bulan)",12],["tax","PPh final (%)",20],["lps","Tingkat bunga penjaminan LPS (%)",4.25],["roll","Diperpanjang (ARO) bunga ikut? 1=ya 0=tidak",0]],
 calc(v){
  const months=v.tenor; let pokok=v.pokok, totG=0,totN=0;
  if(v.roll){ for(let m=0;m<months;m++){ const g=pokok*v.rate/100/12; const n=g*(1-v.tax/100); totG+=g; totN+=n; pokok+=n; } }
  else { totG=v.pokok*v.rate/100*months/12; totN=totG*(1-v.tax/100); }
  const eff = totN/v.pokok/(months/12)*100;
  const lpsOK = v.rate<=v.lps && v.pokok<=2e9;
  return `<div class="big up">${rp(totN)}</div><div class="muted">bunga bersih selama ${months} bulan</div>`+
   st("Bunga kotor",rp(totG))+st("Pajak dipotong",rp(totG-totN),"down")+st("Per bulan (bersih, rata-rata)",rp(totN/months))+
   st("Imbal hasil bersih efektif p.a.",pct(eff))+st("Nilai akhir",rp(v.pokok+totN))+
   `<p class="note ${lpsOK?"":"warn"}" style="margin-top:10px">${lpsOK?"✅ Bunga ≤ tingkat penjaminan LPS dan pokok ≤ Rp2 miliar per bank → <b>dijamin LPS</b> (selama syarat lain terpenuhi).":"⚠️ <b>Tidak sepenuhnya dijamin LPS</b>: bunga di atas tingkat bunga penjaminan atau saldo &gt; Rp2 miliar per nasabah per bank."} Tingkat penjaminan berubah berkala — cek lps.go.id.</p>`; }},
{ id:"kupon", g:"Pendapatan Tetap", t:"Kupon bersih obligasi / SBN", d:"Kupon obligasi & SBN untuk WP dalam negeri dikenai PPh final 10% (PP 91/2021). Termasuk capital gain jika dijual di atas harga beli.",
 f:[["nominal","Nominal (Rp)",100000000],["kupon","Kupon p.a. (%)",6.4],["freq","Pembayaran per tahun",12],["tahun","Lama dipegang (tahun)",3],["tax","PPh final (%)",10],["beli","Harga beli (% dari nominal)",100],["jual","Harga jual / jatuh tempo (%)",100]],
 calc(v){
  const kg=v.nominal*v.kupon/100, kn=kg*(1-v.tax/100);
  const per=kn/v.freq, totK=kn*v.tahun;
  const modal=v.nominal*v.beli/100, hasil=v.nominal*v.jual/100;
  const cg=hasil-modal, cgTax= cg>0? cg*v.tax/100 : 0;
  const total=totK+cg-cgTax;
  const ann=(Math.pow((modal+total)/modal,1/v.tahun)-1)*100;
  return `<div class="big up">${rp(per)}</div><div class="muted">kupon bersih per pembayaran (${v.freq}×/tahun)</div>`+
   st("Kupon kotor per tahun",rp(kg))+st("Kupon bersih per tahun",rp(kn))+st("Total kupon bersih "+v.tahun+" th",rp(totK))+
   st("Capital gain/loss",rp(cg),cg>=0?"up":"down")+st("Pajak capital gain",rp(cgTax),"down")+st("Total keuntungan bersih",rp(total),"up")+
   st("Yield bersih atas modal (p.a., kira-kira)",pct(v.kupon*(1-v.tax/100)/v.beli*100))+st("Return tahunan total (CAGR)",pct(ann))+
   `<p class="hint">Bandingkan dengan deposito: kupon SBN 6,4% bersih ≈ ${pct(6.4*.9)}; deposito 5,5% bersih ≈ ${pct(5.5*.8)}.</p>`; }},
{ id:"ytm", g:"Pendapatan Tetap", t:"Harga obligasi, YTM & durasi", d:"Hitung harga wajar dari yield, atau YTM dari harga. Plus Macaulay & modified duration (CFA L1 Fixed Income).",
 f:[["fv","Nominal",100],["kupon","Kupon p.a. (%)",6.5],["n","Sisa tahun",10],["freq","Kupon per tahun",2],["y","Yield pasar (%) — untuk harga",7],["p","Harga pasar — untuk YTM",97.5]],
 calc(v){
  const m=v.freq, N=Math.round(v.n*m), c=v.fv*v.kupon/100/m;
  const price=y=>{ const r=y/100/m; let s=0; for(let t=1;t<=N;t++) s+=c/Math.pow(1+r,t); return s+v.fv/Math.pow(1+r,N); };
  const P=price(v.y);
  let lo=-5,hi=50; for(let i=0;i<100;i++){ const mid=(lo+hi)/2; price(mid)>v.p? lo=mid : hi=mid; } const ytm=(lo+hi)/2;
  const r=v.y/100/m; let w=0; for(let t=1;t<=N;t++) w+=t/m*c/Math.pow(1+r,t); w+=v.n*v.fv/Math.pow(1+r,N);
  const mac=w/P, mod=mac/(1+r);
  const dP=price(v.y+1)-P;
  return `<div class="big">${fmt(P,3)}</div><div class="muted">harga pada yield ${v.y}%</div>`+
   st("YTM pada harga "+v.p,pct(ytm,3))+st("Current yield",pct(v.kupon/v.p*v.fv))+st("Macaulay duration",fmt(mac,2)+" th")+st("Modified duration",fmt(mod,2))+
   st("Jika yield +1%, harga berubah",fmt(dP,2)+" ("+pct(dP/P*100)+")","down")+
   `<p class="hint">Aturan praktis: Δharga ≈ −ModDur × Δyield. Makin panjang tenor & makin kecil kupon, makin sensitif.</p>`; }},
{ id:"fee", g:"Trading", t:"Fee transaksi & harga impas (BEP)", d:"Fee beli/jual sudah termasuk levy & PPN; jual ditambah PPh final 0,1%. Sesuaikan dengan broker-mu.",
 f:[["harga","Harga beli",5325],["lot","Lot",10],["fb","Fee beli (%)",0.15],["fj","Fee jual total (%)",0.25],["hj","Harga jual rencana",5450]],
 calc(v){
  const sh=v.lot*100, nb=v.harga*sh, cb=nb*v.fb/100, modal=nb+cb;
  const bep=modal/(sh*(1-v.fj/100)), bepT=roundTick(bep,1);
  const nj=v.hj*sh, cj=nj*v.fj/100, pl=nj-cj-modal;
  return `<div class="big">${fmt(bepT)}</div><div class="muted">harga jual minimal untuk impas (BEP tepat ${fmt(bep,1)})</div>`+
   st("Nilai beli",rp(nb))+st("Fee beli",rp(cb))+st("Total modal",rp(modal))+st("Kenaikan perlu",pct((bepT/v.harga-1)*100)+` (${Math.round((bepT-v.harga)/tick(v.harga))} tick)`)+
   st("Jual di "+fmt(v.hj)+" → P/L bersih",rp(pl),pl>=0?"up":"down")+st("Return bersih",pct(pl/modal*100),pl>=0?"up":"down"); }},
{ id:"arb", g:"Trading", t:"Fraksi, ARA & ARB", d:"Masukkan harga acuan (penutupan kemarin). Persentase bisa diubah karena aturan BEI sering berubah (per 19 Okt 2026: ARB asimetris 7% sementara).",
 f:[["p","Harga acuan",1320],["ara","ARA (%) — kosongkan=otomatis",0],["arb","ARB (%)",7]],
 calc(v){
  const autoAra = v.p<=200?35 : v.p<=5000?25 : 20; const ara=v.ara||autoAra;
  const A=roundTick(v.p*(1+ara/100),-1), B=roundTick(v.p*(1-v.arb/100),1);
  return `<div class="grid g2"><div><div class="muted">ARA</div><div class="big up">${fmt(A)}</div></div><div><div class="muted">ARB</div><div class="big down">${fmt(B)}</div></div></div>`+
   st("Fraksi di harga ini","Rp"+tick(v.p))+st("1 tick = ",pct(tick(v.p)/v.p*100))+st("ARA dipakai",ara+"%")+st("Jumlah tick ke ARA",Math.round((A-v.p)/tick(v.p))+"+")+
   `<p class="hint">Pembulatan: ARA dibulatkan ke bawah, ARB ke atas sesuai fraksi. Selalu bandingkan dengan angka di aplikasi.</p>`; }},
{ id:"size", g:"Trading", t:"Position size (risiko per trade)", d:"Berapa lot supaya kalau stop loss kena, rugimu hanya X% modal.",
 f:[["modal","Modal (Rp)",100000000],["risk","Risiko per trade (%)",1],["entry","Harga entry",5325],["sl","Stop loss",5175],["tp","Target",5700]],
 calc(v){
  const riskRp=v.modal*v.risk/100, per=(v.entry-v.sl)*100; const lot=Math.floor(riskRp/per);
  const val=lot*100*v.entry, rr=(v.tp-v.entry)/(v.entry-v.sl);
  return `<div class="big">${fmt(lot)} lot</div><div class="muted">maksimal, dengan risiko ${rp(riskRp)}</div>`+
   st("Nilai posisi",rp(val))+st("Porsi dari modal",pct(val/v.modal*100))+st("Risk : Reward","1 : "+fmt(rr,2),rr>=2?"up":"down")+
   st("Potensi untung di target",rp(lot*100*(v.tp-v.entry)),"up")+(val>v.modal?`<p class="note warn">⚠️ Nilai posisi melebihi modal — stop loss terlalu dekat atau risiko terlalu besar.</p>`:""); }},
{ id:"avg", g:"Trading", t:"Average down / up", d:"Harga rata-rata baru setelah menambah posisi, dan kenaikan yang dibutuhkan untuk impas.",
 f:[["l1","Lot awal",66],["p1","Harga rata-rata awal",1330],["l2","Lot tambahan",40],["p2","Harga beli tambahan",940],["now","Harga sekarang",940]],
 calc(v){
  const L=v.l1+v.l2, avg=(v.l1*v.p1+v.l2*v.p2)/L;
  return `<div class="big">${fmt(avg,2)}</div><div class="muted">harga rata-rata baru (${fmt(L)} lot)</div>`+
   st("P/L sebelum tambah",pct((v.now/v.p1-1)*100),v.now>=v.p1?"up":"down")+st("P/L sesudah tambah",pct((v.now/avg-1)*100),v.now>=avg?"up":"down")+
   st("Kenaikan perlu untuk impas",pct((avg/v.now-1)*100))+st("Tambahan dana",rp(v.l2*100*v.p2))+
   `<p class="note">Average down mengurangi kenaikan yang dibutuhkan, tapi memperbesar eksposur ke saham yang sedang salah. Lakukan hanya jika tesis masih utuh & sudah direncanakan.</p>`; }},
{ id:"exp", g:"Trading", t:"Expectancy & win rate", d:"Apakah sistem trading-mu menguntungkan dalam jangka panjang?",
 f:[["wr","Win rate (%)",45],["aw","Rata-rata untung (%)",8],["al","Rata-rata rugi (%)",4],["n","Trade per tahun",40],["risk","Ukuran posisi (% modal)",20]],
 calc(v){
  const e=v.wr/100*v.aw-(1-v.wr/100)*v.al; const be= v.al/(v.aw+v.al)*100;
  const yr=(Math.pow(1+e/100*v.risk/100,v.n)-1)*100;
  return `<div class="big ${e>=0?"up":"down"}">${fmt(e,2)}% / trade</div>`+st("Win rate impas minimum",pct(be,1))+st("Payoff ratio",fmt(v.aw/v.al,2))+st("Perkiraan return modal / tahun",pct(yr,1),yr>=0?"up":"down"); }},
{ id:"dcf", g:"Valuasi", t:"DCF sederhana (2 tahap)", d:"Proyeksi FCF per saham tumbuh g1 selama n tahun, lalu g terminal.",
 f:[["fcf","FCF per saham saat ini",300],["g1","Pertumbuhan tahap 1 (%)",10],["n","Lama tahap 1 (tahun)",5],["gt","Pertumbuhan terminal (%)",5],["r","Discount rate / Ke (%)",11],["px","Harga pasar",5325]],
 calc(v){
  let pv=0,f=v.fcf; for(let t=1;t<=v.n;t++){ f*=1+v.g1/100; pv+=f/Math.pow(1+v.r/100,t); }
  if(v.r<=v.gt) return `<p class="down">Discount rate harus lebih besar dari pertumbuhan terminal.</p>`;
  const tv=f*(1+v.gt/100)/((v.r-v.gt)/100), pvtv=tv/Math.pow(1+v.r/100,v.n), val=pv+pvtv;
  return `<div class="big">${fmt(val)}</div><div class="muted">nilai intrinsik per saham</div>`+st("PV arus kas tahap 1",fmt(pv))+st("PV terminal value",fmt(pvtv)+` (${pct(pvtv/val*100,0)} dari nilai)`)+
   st("Margin of safety vs harga",pct((val/v.px-1)*100),val>=v.px?"up":"down")+`<p class="hint">Coba ubah r ±1% — lihat betapa sensitifnya.</p>`; }},
{ id:"pbv", g:"Valuasi", t:"PBV & PER wajar (Gordon)", d:"PBV wajar = (ROE − g)/(Ke − g). PER wajar = payout × (1+g)/(Ke − g). Cocok untuk bank & perusahaan stabil.",
 f:[["roe","ROE (%)",21],["ke","Cost of equity (%)",11],["g","Pertumbuhan jangka panjang (%)",6],["bvps","BVPS (Rp)",1300],["eps","EPS (Rp)",270],["px","Harga pasar",5325]],
 calc(v){
  const pbv=(v.roe-v.g)/(v.ke-v.g), payout=1-v.g/v.roe, per=payout*(1+v.g/100)/((v.ke-v.g)/100);
  return st("PBV wajar",fmt(pbv,2)+"x")+st("Nilai wajar (PBV × BVPS)",fmt(pbv*v.bvps),"up")+st("PBV saat ini",fmt(v.px/v.bvps,2)+"x")+
   st("Payout berkelanjutan (1 − g/ROE)",pct(payout*100,0))+st("PER wajar",fmt(per,1)+"x")+st("Nilai wajar (PER × EPS)",fmt(per*v.eps),"up")+st("PER saat ini",fmt(v.px/v.eps,1)+"x")+
   st("Graham number √(22,5×EPS×BVPS)",fmt(Math.sqrt(22.5*v.eps*v.bvps))); }},
{ id:"div", g:"Valuasi", t:"Dividen bersih & yield", d:"Dividen orang pribadi dalam negeri: PPh final 10%, atau 0% bila diinvestasikan kembali di Indonesia sesuai syarat.",
 f:[["dps","Dividen per saham (Rp)",270],["px","Harga beli",5325],["lot","Lot dimiliki",10],["tax","Pajak (%) 10 atau 0",10]],
 calc(v){
  const g=v.dps*v.lot*100, n=g*(1-v.tax/100);
  return `<div class="big up">${rp(n)}</div><div class="muted">dividen bersih diterima</div>`+st("Dividen kotor",rp(g))+st("Yield kotor",pct(v.dps/v.px*100))+st("Yield bersih",pct(v.dps*(1-v.tax/100)/v.px*100))+
   st("Perkiraan harga ex-date",fmt(roundTick(v.px-v.dps,1))); }},
{ id:"rights", g:"Aksi korporasi", t:"Right issue — harga teoritis", d:"Harga teoritis setelah HMETD dan nilai teoretis 1 hak.",
 f:[["old","Rasio lama (mis. 2)",2],["neu","Rasio baru (mis. 1)",1],["cum","Harga cum",1000],["ex","Harga pelaksanaan (tebus)",700],["lot","Lot dimiliki",50]],
 calc(v){
  const th=(v.old*v.cum+v.neu*v.ex)/(v.old+v.neu), hak=th-v.ex; const hakQty=Math.floor(v.lot*100*v.neu/v.old);
  return `<div class="big">${fmt(th,1)}</div><div class="muted">harga teoritis ex-right</div>`+st("Nilai teoretis 1 HMETD",fmt(hak,1))+st("Jumlah HMETD kamu",fmt(hakQty)+" lembar")+st("Dana untuk menebus semua",rp(hakQty*v.ex))+
   st("Dilusi jika tidak menebus",pct(v.neu/(v.old+v.neu)*100,1),"down"); }},
{ id:"fv", g:"Perencanaan", t:"Compounding & investasi rutin (DCA)", d:"Nilai masa depan dari modal awal + setoran bulanan.",
 f:[["pv","Modal awal (Rp)",10000000],["pmt","Setoran per bulan (Rp)",2000000],["r","Return p.a. (%)",10],["n","Lama (tahun)",15],["inf","Inflasi p.a. (%)",3]],
 calc(v){
  const i=v.r/100/12, N=v.n*12; const fv=v.pv*Math.pow(1+i,N)+v.pmt*(Math.pow(1+i,N)-1)/i; const setor=v.pv+v.pmt*N;
  const real=fv/Math.pow(1+v.inf/100,v.n);
  return `<div class="big up">${rp(fv)}</div><div class="muted">nilai setelah ${v.n} tahun</div>`+st("Total setoran",rp(setor))+st("Hasil investasi",rp(fv-setor),"up")+st("Nilai riil (daya beli hari ini)",rp(real)); }},
{ id:"cagr", g:"Perencanaan", t:"CAGR & rule of 72", d:"Pertumbuhan tahunan majemuk dari nilai awal ke nilai akhir.",
 f:[["a","Nilai awal",1000],["b","Nilai akhir",5325],["n","Tahun",10]],
 calc(v){ const c=(Math.pow(v.b/v.a,1/v.n)-1)*100; return `<div class="big">${pct(c)}</div><div class="muted">CAGR</div>`+st("Waktu untuk 2× (72/CAGR)",fmt(72/c,1)+" tahun")+st("Total return",pct((v.b/v.a-1)*100)); }},
{ id:"capm", g:"Valuasi", t:"CAPM & WACC", d:"Ke = Rf + β × ERP. WACC = E/V·Ke + D/V·Kd·(1−t).",
 f:[["rf","Risk-free (yield SBN 10th, %)",6.6],["beta","Beta",1.0],["erp","Equity risk premium (%)",7],["kd","Biaya utang (%)",8],["de","D/E (x)",0.5],["t","Pajak badan (%)",22]],
 calc(v){ const ke=v.rf+v.beta*v.erp, wE=1/(1+v.de), wD=v.de/(1+v.de), w=wE*ke+wD*v.kd*(1-v.t/100);
  return st("Cost of equity (Ke)",pct(ke),"up")+st("Bobot ekuitas / utang",pct(wE*100,0)+" / "+pct(wD*100,0))+st("Kd setelah pajak",pct(v.kd*(1-v.t/100)))+st("WACC",pct(w),"up"); }},
];

function mount(el, q){
  const groups=[...new Set(TOOLS.map(t=>t.g))];
  el.innerHTML=`<div class="kicker">Alat bantu</div><h1>Tools & Kalkulator</h1>
  <p class="lead">${TOOLS.length} kalkulator untuk investasi sehari-hari dan latihan CFA. Semua hitungan berjalan di browser-mu. Asumsi pajak mengikuti aturan umum WP orang pribadi dalam negeri — sesuaikan bila berbeda.</p>
  <div class="toolnav">${TOOLS.map(t=>`<a href="#/tools?t=${t.id}">${t.t}</a>`).join("")}</div>
  ${groups.map(g=>`<h2>${g}</h2><div class="grid g2">${TOOLS.filter(t=>t.g===g).map(t=>`
   <div class="card tool" id="tool-${t.id}"><h3>${t.t}</h3><p class="hint">${t.d}</p>
   <div class="form">${t.f.map(([k,l,d])=>`<label>${l}<input type="number" step="any" data-k="${k}" value="${d}"></label>`).join("")}</div>
   <div class="out" id="out-${t.id}"></div></div>`).join("")}</div>`).join("")}`;
  TOOLS.forEach(t=>{
    const card=el.querySelector("#tool-"+t.id); const inputs=card.querySelectorAll("input");
    const key="sb_tool_"+t.id; try{ const s=JSON.parse(localStorage.getItem(key)||"null"); if(s) inputs.forEach(i=>{ if(s[i.dataset.k]!=null) i.value=s[i.dataset.k]; }); }catch(e){}
    const run=()=>{ const v={}; inputs.forEach(i=>v[i.dataset.k]=parseFloat(i.value)||0); try{ localStorage.setItem(key,JSON.stringify(v)); }catch(e){}
      card.querySelector(".out").innerHTML=t.calc(v); };
    inputs.forEach(i=>i.oninput=run); run();
  });
  if(q && q.t){ const c=el.querySelector("#tool-"+q.t); if(c){ c.scrollIntoView({behavior:"smooth",block:"start"}); c.style.outline="2px solid var(--accent)"; } }
}
window.Tools={mount, list:TOOLS};
})();
