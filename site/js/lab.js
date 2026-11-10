/* Lab Order Book — simulator tape reading. Semua data simulasi; ticker fiktif. */
(function(){
const fmt = n => Math.round(n).toLocaleString("id-ID");
const fmtV = v => v>=1e12? (v/1e12).toFixed(2)+"T" : v>=1e9? (v/1e9).toFixed(2)+"B" : v>=1e6? (v/1e6).toFixed(1)+"M" : fmt(v);
const R = (a,b)=>a+Math.random()*(b-a);
const RI = (a,b)=>Math.floor(R(a,b+1));
const pick = a => a[Math.floor(Math.random()*a.length)];
function tick(p){ return p<200?1 : p<500?2 : p<2000?5 : p<5000?10 : 25; }
function up(p){ return p+tick(p); }
function dn(p){ const t=tick(p-1); return p-t; }
function retailLot(prof){ // distribusi lot ritel: banyak kecil, sedikit sedang
  const r=Math.random(); const base=prof.retail;
  return Math.max(1, Math.round(r<.55? R(1,base*.3) : r<.9? R(base*.3,base*1.2) : R(base*1.2,base*4)));
}

const PROFILES = {
  big:  {code:"XBNK", name:"Bank big cap (latihan)", px:5325, retail:60,  big:[1500,6000],  depth:[3000,15000], avgOrd:45},
  mid:  {code:"XAUT", name:"Second liner (latihan)", px:1320, retail:120, big:[1500,6000],  depth:[2000,12000], avgOrd:80},
  small:{code:"XGRN", name:"Saham kecil lapis 3 (latihan)", px:158, retail:600, big:[8000,40000], depth:[5000,60000], avgOrd:350},
};

/* Perilaku yang ditebak */
const SC = {
  akum:  {label:"Akumulasi (absorption di bid)", pBuy:.30, bigSide:"buy",  bigP:.10, passive:"bid", sameLot:true, retMul:2.2, thinB:1,  thinO:1.1, actor:["asing","lokal"]},
  markup:{label:"Markup agresif (HAKA sweep)",    pBuy:.66, bigSide:"buy",  bigP:.11, passive:null,  sameLot:false, thinB:1.1,thinO:.7, pullO:.15, actor:["asing","lokal"]},
  dist:  {label:"Distribusi (offer di-refill)",   pBuy:.70, bigSide:"sell", bigP:.10, passive:"offer",sameLot:true, retMul:2.2, thinB:1.6,thinO:1, actor:["asing","lokal"]},
  guyur: {label:"Markdown / guyur (HAKI sweep)",  pBuy:.34, bigSide:"sell", bigP:.11, passive:null,  sameLot:false, thinB:.7,thinO:1.1, pullB:.15, actor:["asing","lokal"]},
  spoof: {label:"Bid palsu (spoofing) sambil jual", pBuy:.45, bigSide:"sell", bigP:.06, passive:null, spoof:true, sameLot:false, thinB:1,thinO:1, actor:["lokal"]},
  fomo:  {label:"FOMO ritel (lot kecil, freq tinggi)", pBuy:.68, bigSide:null, bigP:0, passive:null, sameLot:false, thinB:.8,thinO:.55, burst:2.2, actor:["ritel"]},
  noise: {label:"Sideways / tidak ada pemain dominan", pBuy:.5, bigSide:null, bigP:0, passive:null, sameLot:false, thinB:1,thinO:1, actor:["campuran"]},
};

const POOLS = {
  asing:["AK","BK","ZP","KZ","MS","GW"],
  lokalBandar:[["MG","LG"],["AZ","KI"],["YP","PD"],["DH","IF"],["CC","OD"]],
  ritel:["YP","PD","XC","XL","CC","SQ","NI","KK","EP","GR","OD","AG"],
};

let S=null, timer=null, root=null;

function newRound(opts){
  const prof = PROFILES[opts.profile];
  const key = opts.scenario==="random" ? pick(Object.keys(SC)) : opts.scenario;
  const sc = SC[key];
  const actor = pick(sc.actor);
  const actorCodes = actor==="asing" ? [pick(POOLS.asing), pick(POOLS.asing)] : actor==="lokal" ? pick(POOLS.lokalBandar) : [];
  const px = prof.px;
  S = { prof, key, sc, actor, actorCodes, last:px, open:px, prev:px, t0:Date.now(), ticks:0,
    bids:[], offers:[], trades:[], hist:[px], haka:0, haki:0, n:0, lotSum:0, big:0,
    fBuy:0, fSell:0, val:0, brok:{}, refills:0, pulls:0, sameLot: Math.round(prof.retail*R(3,6)/10)*10+7,
    absorbP:null, ceilP:null, guessed:false, opts };
  // seed book
  let b=px, o=up(px);
  for(let i=0;i<10;i++){ S.bids.push(lvl(b,"B")); b=dn(b); S.offers.push(lvl(o,"O")); o=up(o); }
  if(sc.passive==="bid"){ S.bids[0].lot=Math.round(S.bids[0].lot*2.2); S.bids[0].wall=true; S.bids[0].orig=S.bids[0].lot; }
  if(sc.passive==="offer"){ S.offers[0].lot=Math.round(S.offers[0].lot*2.2); S.offers[0].wall=true; S.offers[0].orig=S.offers[0].lot; }
  if(sc.spoof) placeSpoof();
}
function lvl(p,side){
  const pr=S.prof, sc=S.sc; const thin = side==="B"? sc.thinB : sc.thinO;
  const lot = Math.round(R(pr.depth[0],pr.depth[1])*thin*R(.5,1.4));
  return {p, lot, freq: Math.max(1,Math.round(lot/pr.avgOrd*R(.6,1.4)))};
}
function placeSpoof(){
  const tgt = dn(dn(S.bids[0].p));
  const L = S.bids.find(x=>x.p===tgt);
  const add = Math.round(S.prof.depth[1]*R(4,7));
  if(L){ L.lot+=add; L.freq+=RI(1,3); L.spoof=add; }
}
function checkSpoof(){
  const L = S.bids.find(x=>x.spoof);
  if(!L) { placeSpoof(); return; }
  // harga mendekat (best bid hanya 1 tick di atas tembok) → tarik
  if(S.bids[0].p<=up(L.p)){
    L.lot=Math.max(1,L.lot-L.spoof); L.freq=Math.max(1,L.freq-2); delete L.spoof; S.pulls++;
    const round=S; setTimeout(()=>{ if(S===round && labM && labM.is("running")) placeSpoof(); }, 1200);
  }
}
function brokerFor(type){ // type: actor | retail
  if(type==="actor" && S.actorCodes.length) return {c:pick(S.actorCodes), f: S.actor==="asing"};
  const f = Math.random() < (S.prof.code==="XBNK"? .25 : S.prof.code==="XAUT"? .1 : .02);
  return {c: f? pick(["AK","BK","ZP","KZ","YU"]) : pick(POOLS.ritel), f};
}
function record(price, lot, side, buyer, seller){
  const v=price*lot*100;
  const row={tm:new Date(), p:price, lot, side, buyer, seller};
  S.trades.unshift(row); if(S.trades.length>60) S.trades.pop();
  S.n++; S.lotSum+=lot; S.val+=v;
  if(side==="B") S.haka+=lot; else S.haki+=lot;
  if(buyer.f) S.fBuy+=v; if(seller.f) S.fSell+=v;
  for(const [k,who] of [["b",buyer],["s",seller]]){
    const r=S.brok[who.c]||(S.brok[who.c]={c:who.c,bl:0,bv:0,sl:0,sv:0,f:who.f});
    if(k==="b"){r.bl+=lot;r.bv+=v;} else {r.sl+=lot;r.sv+=v;}
  }
  S.last=price;
  const big = lot >= S.prof.big[0]*.5; if(big) S.big++;
  row.big = lot>=S.prof.big[0]*.5 ? (lot>=S.prof.big[1]*.8?"huge":"big") : "";
}
function haka(lot, buyerType){
  const buyer = brokerFor(buyerType); let hops=0;
  while(lot>0 && S.offers.length && hops<3){
    const L=S.offers[0]; const take=Math.min(lot,L.lot);
    const seller = L.wall ? {c:S.actorCodes[0]||pick(POOLS.ritel), f:S.actor==="asing"} : brokerFor("retail");
    record(L.p, take, "B", buyer, seller);
    L.lot-=take; L.freq=Math.max(0,L.freq-Math.max(1,Math.round(take/S.prof.avgOrd)));
    lot-=take;
    if(L.lot<=0){
      if(L.wall && S.sc.passive==="offer"){ L.lot=L.orig||L.lot; L.freq=RI(3,9); S.refills++; break; }
      S.offers.shift(); hops++; if(hops>=2) break;
    }
  }
}
function haki(lot, sellerType){
  const seller = brokerFor(sellerType); let hops=0;
  while(lot>0 && S.bids.length && hops<3){
    const L=S.bids[0]; const take=Math.min(lot,L.lot);
    const buyer = L.wall ? {c:S.actorCodes[0]||pick(POOLS.ritel), f:S.actor==="asing"} : brokerFor("retail");
    record(L.p, take, "S", buyer, seller);
    L.lot-=take; L.freq=Math.max(0,L.freq-Math.max(1,Math.round(take/S.prof.avgOrd)));
    lot-=take;
    if(L.lot<=0){
      if(L.wall && S.sc.passive==="bid"){ L.lot=L.orig||L.lot; L.freq=RI(3,9); S.refills++; break; }
      if(L.spoof){ delete L.spoof; }
      S.bids.shift(); hops++; if(hops>=2) break;
    }
  }
}
function normalize(){
  const sc=S.sc;
  // jaga spread 1 tick
  if(!S.bids.length) S.bids.push(lvl(dn(S.offers[0].p),"B"));
  if(!S.offers.length) S.offers.push(lvl(up(S.bids[0].p),"O"));
  while(S.offers[0].p - S.bids[0].p > tick(S.bids[0].p)){
    const buyPress = S.sc.pBuy>.5;
    if(buyPress) S.bids.unshift({...lvl(up(S.bids[0].p),"B"), lot:Math.round(lvl(0,"B").lot*.3)});
    else S.offers.unshift({...lvl(dn(S.offers[0].p),"O"), lot:Math.round(lvl(0,"O").lot*.3)});
  }
  // tembok absorpsi ikut naik (akumulasi) / plafon distribusi ikut turun
  for(const [side,on] of [[S.bids,sc.passive==="bid"],[S.offers,sc.passive==="offer"]]){
    if(!on) continue;
    side.forEach(l=>{ if(l.wall && l!==side[0]) delete l.wall; });
    const L=side[0];
    if(!L.wall && Math.random()<.5){ L.wall=true; L.lot+=Math.round(S.prof.depth[1]*R(.8,1.5)); L.orig=L.lot; }
    // iceberg: antrian terkikis → diisi ulang diam-diam
    if(L.wall && L.lot < L.orig*.85){ L.lot=Math.round(L.orig*R(.9,1.1)); L.freq+=RI(1,4); S.refills++; }
  }
  // isi level jauh
  while(S.bids.length<10) S.bids.push(lvl(dn(S.bids[S.bids.length-1].p),"B"));
  while(S.offers.length<10) S.offers.push(lvl(up(S.offers[S.offers.length-1].p),"O"));
  S.bids.length=10; S.offers.length=10;
  // noise: order baru & cancel kecil
  for(let i=0;i<3;i++){
    const side = Math.random()<.5? S.bids : S.offers; const L=side[RI(1,9)];
    if(L.spoof||L.wall) continue;
    const d = Math.round(L.lot*R(-.12,.15)); L.lot=Math.max(1,L.lot+d); if(d>0) L.freq+=RI(0,2);
  }
  // penarikan antrian (markup tarik offer / guyur tarik bid)
  if(sc.pullO && Math.random()<sc.pullO){ const L=S.offers[RI(0,3)]; L.lot=Math.max(1,Math.round(L.lot*R(.2,.6))); L.freq=Math.max(1,Math.round(L.freq*.6)); }
  if(sc.pullB && Math.random()<sc.pullB){ const L=S.bids[RI(0,3)]; L.lot=Math.max(1,Math.round(L.lot*R(.2,.6))); L.freq=Math.max(1,Math.round(L.freq*.6)); }
  if(sc.spoof) checkSpoof();
}
function step(){
  const sc=S.sc, pr=S.prof;
  const nEv = Math.round(R(2,5)*(sc.burst||1));
  for(let i=0;i<nEv;i++){
    if(sc.bigSide && Math.random()<sc.bigP){
      const lot = sc.sameLot ? S.sameLot : RI(pr.big[0],pr.big[1]);
      sc.bigSide==="buy" ? haka(lot,"actor") : haki(lot,"actor");
    } else {
      const isBuy = Math.random()<sc.pBuy;
      let lot = S.key==="fomo" ? Math.max(1,Math.round(retailLot(pr)*.25)) : retailLot(pr);
      // sisi agresif yang "dilawan" pemain pasif cenderung ber-lot lebih besar
      if(sc.retMul && ((sc.passive==="bid" && !isBuy) || (sc.passive==="offer" && isBuy))) lot=Math.round(lot*sc.retMul);
      isBuy ? haka(lot,"retail") : haki(lot,"retail");
    }
    normalize();
  }
  S.ticks++; S.hist.push(S.last); if(S.hist.length>160) S.hist.shift();
  render();
}

/* ---------- UI ---------- */
function mount(el){
  root=el;
  const saved = JSON.parse(localStorage.getItem("sb_lab")||'{"r":0,"c":0}');
  el.innerHTML = `
  <div class="kicker">Latihan · Modul E</div>
  <h1>Lab Order Book — baca dalam 3 detik</h1>
  <p class="lead">Simulator tape reading. Order book & running trade bergerak setiap 1–3 detik mengikuti satu perilaku tersembunyi. Tebak perilakunya, lalu lihat "ringkasan akhir sesi" (broker summary & net foreign) untuk konfirmasi — persis alur nyata: <b>baca intraday → konfirmasi data sore</b>.</p>
  <div class="note warn"><b>Data simulasi, ticker fiktif.</b> Di bursa nyata kode broker & tipe investor tidak tampil real-time sejak 2021. "Mode X-ray" hanya untuk melatih intuisi; matikan untuk latihan realistis.</div>
  <div class="controls">
    <select id="lbProf">${Object.entries(PROFILES).map(([k,p])=>`<option value="${k}">${p.code} · ${p.name}</option>`).join("")}</select>
    <select id="lbSc"><option value="random">🎲 Tebak (perilaku acak)</option>${Object.entries(SC).map(([k,s])=>`<option value="${k}">Belajar: ${s.label}</option>`).join("")}</select>
    <select id="lbSpd"><option value="1000">Update tiap 1 detik</option><option value="2000" selected>Tiap 2 detik</option><option value="3000">Tiap 3 detik</option></select>
    <label class="chk"><input type="checkbox" id="lbX"> Mode X-ray (F/D & broker)</label>
    <button class="btn" id="lbStart">▶ Mulai ronde baru</button>
    <button class="btn sec" id="lbPause" aria-describedby="lbTimer">❚❚ Jeda</button>
    <span class="timer" id="lbTimer" aria-live="off"></span>
    <span class="hint">Skor: <b id="lbScore">${saved.c}/${saved.r}</b></span>
  </div>
  <div class="lab">
    <div class="card">
      <div class="quote"><span id="lbCode" style="font-weight:800"></span><span class="px" id="lbPx"></span><span id="lbChg"></span></div>
      <canvas id="lbCv" height="90"></canvas>
      <table class="ob" id="lbOB"></table>
    </div>
    <div class="card"><div style="display:flex;justify-content:space-between;align-items:center"><b>Running Trade</b><span class="hint">kuning = lot besar</span></div>
      <div class="rt" id="lbRT"></div></div>
    <div class="card c3"><b>Statistik tape</b>
      <div id="lbStats"></div>
      <div id="lbGuess"></div>
    </div>
  </div>
  <div id="lbReveal" class="reveal" role="status" aria-live="polite"></div>`;
  const $=id=>el.querySelector("#"+id);
  labM=makeLabMachine(); labM.bind(el);
  $("lbStart").onclick=()=>labM.send("START");
  $("lbPause").onclick=()=>labM.send(labM.is("running")?"PAUSE":"RESUME");
  $("lbX").onchange=()=>S&&render();
  $("lbSpd").onchange=()=>labM.send("SPEED");
  labM.send("START");
}
/* Ronde lab — machine "orderBookLab":
   idle --START--> running ⇄ (PAUSE/RESUME) paused ; running|paused --GUESS--> revealed ; * --START--> running (ronde baru) ; * --STOP--> idle.
   Timer hanya hidup di "running" (dibuat di enter, dibersihkan di exit) → tidak ada interval yatim. Waktu amatan hanya dihitung saat running. */
let labM=null;
function startTimer(){ clearInterval(timer); timer=setInterval(step, +root.querySelector("#lbSpd").value); }
function stopTimer(){ clearInterval(timer); timer=null; }
function activeSecs(){ const c=labM.context; return Math.round((c.active+(labM.is("running")?Date.now()-c.since:0))/1000); }
function renderControls(){ if(!root) return; const b=root.querySelector("#lbPause"); const st=labM.state;
  b.disabled=!(st==="running"||st==="paused"); b.textContent=st==="paused"?"▶ Lanjut":"❚❚ Jeda";
  b.setAttribute("aria-label", st==="paused"?"Lanjutkan ronde":"Jeda ronde"); render(); }
function newRoundAction(c){
  const q=id=>root.querySelector("#"+id);
  stopTimer(); c.active=0; c.since=Date.now();
  newRound({profile:q("lbProf").value, scenario:q("lbSc").value});
  q("lbReveal").innerHTML="";
  for(let i=0;i<3;i++) step();
  renderGuess(); startTimer(); }
function makeLabMachine(){
  return window.Machines.create({ id:"orderBookLab", initial:"idle", context:{active:0,since:0}, states:{
    idle:{ enter:()=>{ stopTimer(); }, on:{ START:{target:"running", action:newRoundAction} } },
    running:{ enter:(c)=>{ c.since=Date.now(); startTimer(); renderControls(); }, exit:(c)=>{ c.active+=Date.now()-c.since; stopTimer(); },
      on:{ PAUSE:"paused", GUESS:{target:"revealed", action:guessAction}, START:{target:"running", action:(c)=>{ newRoundAction(c); renderControls(); }},
           SPEED:{ action:()=>startTimer() }, STOP:"idle" } },
    paused:{ enter:()=>renderControls(), on:{ RESUME:"running", GUESS:{target:"revealed", action:guessAction}, START:{target:"running", action:newRoundAction}, STOP:"idle" } },
    revealed:{ enter:()=>renderControls(), on:{ START:{target:"running", action:newRoundAction}, STOP:"idle" } } } });
}
function unmount(){ if(labM) labM.send("STOP"); stopTimer(); root=null; }

function render(){
  if(!root||!S) return;
  const q=id=>root.querySelector("#"+id); const xr=q("lbX").checked;
  const chg=(S.last-S.open)/S.open*100;
  q("lbCode").textContent=S.prof.code; q("lbPx").textContent=fmt(S.last);
  q("lbPx").className="px "+(chg>0?"up":chg<0?"down":"");
  q("lbChg").innerHTML=`<span class="${chg>=0?"up":"down"}">${chg>=0?"+":""}${fmt(S.last-S.open)} (${chg.toFixed(2)}%)</span>`;
  const secs=labM?activeSecs():0; q("lbTimer").textContent=labM&&labM.is("revealed")? "" : `⏱ ${secs}s${labM&&labM.is("paused")?" (dijeda)":""} ${secs<25?"— amati dulu…":"— silakan tebak"}`;
  // order book
  const mx=Math.max(...S.bids.map(b=>b.lot),...S.offers.map(o=>o.lot));
  let h=`<tr><th>Freq</th><th>Lot</th><th>Bid</th><th>Offer</th><th>Lot</th><th>Freq</th></tr>`;
  let tb=0,to=0;
  for(let i=0;i<10;i++){
    const b=S.bids[i], o=S.offers[i]; tb+=b.lot; to+=o.lot;
    h+=`<tr><td class="muted">${fmt(b.freq)}</td><td><i class="bgb" style="width:${b.lot/mx*100}%"></i><span>${fmt(b.lot)}</span></td><td class="bid">${fmt(b.p)}</td>
    <td class="off" style="text-align:left">${fmt(o.p)}</td><td style="text-align:left"><i class="bgo" style="width:${o.lot/mx*100}%"></i><span>${fmt(o.lot)}</span></td><td class="muted" style="text-align:left">${fmt(o.freq)}</td></tr>`;
  }
  h+=`<tr><td colspan="2"><b>${fmt(tb)}</b></td><td colspan="2" class="muted" style="text-align:center">total 10 level</td><td style="text-align:left"><b>${fmt(to)}</b></td><td></td></tr>`;
  q("lbOB").innerHTML=h;
  // running trade
  q("lbRT").innerHTML = `<div class="row muted" style="font-size:11px"><span>Waktu</span><span>Harga</span><span>Aksi</span><span style="text-align:right">Lot</span><span>${xr?"Buyer ⇄ Seller (simulasi)":""}</span></div>`+
   S.trades.slice(0,22).map(t=>`<div class="row ${t.big}"><span class="muted">${t.tm.toTimeString().slice(0,8)}</span><span class="${t.side==="B"?"up":"down"}">${fmt(t.p)}</span><span class="${t.side==="B"?"up":"down"}">${t.side==="B"?"Buy":"Sell"}</span><span style="text-align:right">${fmt(t.lot)}</span><span>${xr?`<span class="tag ${t.buyer.f?"F":"D"}">${t.buyer.c}</span> ⇄ <span class="tag ${t.seller.f?"F":"D"}">${t.seller.c}</span>`:""}</span></div>`).join("");
  // stats
  const bp = S.haka/(S.haka+S.haki||1)*100; const avg = S.lotSum/(S.n||1);
  q("lbStats").innerHTML = `
   <div class="stat"><span>HAKA (Buy) lot</span><b class="up">${fmt(S.haka)}</b></div>
   <div class="stat"><span>HAKI (Sell) lot</span><b class="down">${fmt(S.haki)}</b></div>
   <div class="meter"><i style="width:${bp}%"></i></div>
   <div class="stat"><span>Buy pressure</span><b>${bp.toFixed(0)}%</b></div>
   <div class="stat"><span>Perubahan harga</span><b class="${chg>=0?"up":"down"}">${chg.toFixed(2)}% (${Math.round((S.last-S.open)/tick(S.open))} tick)</b></div>
   <div class="stat"><span>Rata-rata lot / transaksi</span><b>${fmt(avg)}</b></div>
   <div class="stat"><span>Transaksi lot besar</span><b class="gold">${S.big}</b></div>
   <div class="stat"><span>Total bid : offer</span><b>${(tb/(to||1)).toFixed(2)}x</b></div>
   <div class="stat"><span>Frekuensi</span><b>${fmt(S.n)}</b></div>
   ${xr?`<div class="stat"><span>F Buy / F Sell (simulasi)</span><b><span class="violet">${fmtV(S.fBuy)}</span> / <span class="violet">${fmtV(S.fSell)}</span></b></div>`:""}`;
  drawSpark(q("lbCv"));
}
function drawSpark(cv){
  const dpr=window.devicePixelRatio||1, w=cv.clientWidth, hh=90; cv.width=w*dpr; cv.height=hh*dpr;
  const c=cv.getContext("2d"); c.scale(dpr,dpr); const H=S.hist;
  const mn=Math.min(...H), mx=Math.max(...H), rg=Math.max(mx-mn, tick(S.open)*4);
  const y=v=>hh-8-(v-mn+(rg-(mx-mn))/2)/rg*(hh-16);
  c.strokeStyle="rgba(139,152,167,.3)"; c.setLineDash([3,3]); c.beginPath(); c.moveTo(0,y(S.open)); c.lineTo(w,y(S.open)); c.stroke(); c.setLineDash([]);
  c.strokeStyle= S.last>=S.open? "#22c55e":"#f04452"; c.lineWidth=2; c.beginPath();
  H.forEach((v,i)=>{ const x=i/(Math.max(H.length-1,1))*w; i?c.lineTo(x,y(v)):c.moveTo(x,y(v)); }); c.stroke();
}
function renderGuess(){
  const g=root.querySelector("#lbGuess");
  g.innerHTML=`<h3 style="margin-top:14px">Apa yang sedang terjadi?</h3><div class="guess">${Object.entries(SC).map(([k,s])=>`<button data-k="${k}">${s.label}</button>`).join("")}</div>`;
  window.QuizUI.bind(g,{ buttons:".guess button", key:b=>b.dataset.k, correct:()=>S.key, onAnswer:(k)=>labM.send("GUESS",{k}) });
}
function guessAction(c,p){
  const ok = p.k===S.key;
  let sv={r:0,c:0}; try{ sv=JSON.parse(localStorage.getItem("sb_lab")||'{"r":0,"c":0}'); }catch(e){} sv.r++; if(ok) sv.c++;
  try{ localStorage.setItem("sb_lab", JSON.stringify(sv)); }catch(e){} root.querySelector("#lbScore").textContent=`${sv.c}/${sv.r}`;
  reveal(ok);
}
const WHY = {
  akum:"Penjual (HAKI) terus menghantam bid, tapi bid terbaik tidak habis — antriannya di-refill. Buy pressure rendah, namun harga tidak turun: <b>effort tanpa result di sisi jual</b>. Ada lot 'aneh' yang sama berulang (algoritma/split order). Di broker summary: buyer terkonsentrasi di 1–2 broker, seller tersebar ke banyak broker ritel.",
  markup:"HAKA lot besar menyapu 2–3 level offer sekaligus (sweep), offer tipis & sebagian ditarik, harga naik beberapa tick dengan buy pressure tinggi. Pullback kecil dengan volume rendah. Ini <b>demand agresif</b>: pemain besar mau barang sekarang.",
  dist:"Buy pressure tinggi (banyak HAKA) tetapi harga tidak naik — offer terbaik di-refill terus (iceberg). Bid terlihat tebal untuk memberi rasa aman. Ini <b>effort tanpa result di sisi beli</b>: barang dilepas ke pembeli yang agresif. Broker summary: seller terkonsentrasi, buyer tersebar di broker ritel.",
  guyur:"HAKI lot besar menyapu beberapa level bid, bid tipis & ditarik, harga turun bertahap dengan buy pressure rendah. Ini <b>supply agresif</b> — bisa shakeout, bisa memang keluar. Konfirmasi dengan broker summary & net foreign sore hari.",
  spoof:"Muncul tembok bid raksasa 2 tick di bawah harga. Setiap kali harga mendekat, tembok itu <b>hilang tanpa pernah dimakan</b>, lalu muncul lagi lebih rendah. Sementara itu ada HAKI lot besar. Tembok hanya umpan agar ritel berani menampung jualan.",
  fomo:"Frekuensi sangat tinggi, rata-rata lot per transaksi kecil, hampir tidak ada transaksi besar, harga naik cepat. Ini kerumunan ritel. Tanpa pemain besar yang menopang, kenaikan seperti ini rawan berbalik saat yang telat beli mulai jual.",
  noise:"Buy pressure sekitar 50%, tidak ada lot besar dominan, tembok tidak di-refill atau ditarik secara sistematis, harga bolak-balik 1–2 tick. Tidak ada jejak pemain dominan — <b>tidak ada trade juga keputusan</b>.",
};
function reveal(ok){
  const sc=S.sc, bp=S.haka/(S.haka+S.haki||1)*100, chg=(S.last-S.open)/S.open*100;
  const actorTxt = S.actor==="asing"? `<span class="pill violet">Pelaku: institusi asing (${S.actorCodes.join(", ")})</span>` :
    S.actor==="lokal"? `<span class="pill gold">Pelaku: bandar lokal via ${S.actorCodes.join(" & ")}${S.actorCodes.includes("YP")?" — sengaja memakai broker ritel untuk menyamar!":""}</span>` :
    S.actor==="ritel"? `<span class="pill blue">Pelaku: kerumunan ritel</span>` : `<span class="pill">Campuran</span>`;
  const rows=Object.values(S.brok).map(r=>({...r,net:r.bl-r.sl}));
  const tb=rows.filter(r=>r.net>0).sort((a,b)=>b.net-a.net).slice(0,5);
  const ts=rows.filter(r=>r.net<0).sort((a,b)=>a.net-b.net).slice(0,5);
  const tot = S.lotSum||1;
  const c3b = rows.slice().sort((a,b)=>b.bl-a.bl).slice(0,3).reduce((s,r)=>s+r.bl,0)/tot*100;
  const c3s = rows.slice().sort((a,b)=>b.sl-a.sl).slice(0,3).reduce((s,r)=>s+r.sl,0)/tot*100;
  const tr=(r,side)=>{ const b=window.brokerByCode(r.c); const avg= side==="b"? r.bv/r.bl/100 : r.sv/r.sl/100;
    return `<tr><td><span class="tag ${r.f?"F":"D"}">${r.c}</span> <span class="muted" style="font-size:12px">${b?b.n:""}</span></td><td class="num ${side==="b"?"up":"down"}">${fmt(Math.abs(r.net))}</td><td class="num">${isFinite(avg)?fmt(avg):"-"}</td></tr>`; };
  root.querySelector("#lbReveal").innerHTML=`
  <div class="card">
    <h2 style="margin-top:0">${ok?"✅ Tepat!":"❌ Belum tepat."} Jawaban: ${sc.label}</h2>
    <p>${actorTxt}</p>
    <p>${WHY[S.key]}</p>
    <div class="grid g4" style="margin:12px 0">
      <div class="out"><div class="muted">Buy pressure</div><div class="big">${bp.toFixed(0)}%</div></div>
      <div class="out"><div class="muted">Harga</div><div class="big ${chg>=0?"up":"down"}">${chg.toFixed(2)}%</div></div>
      <div class="out"><div class="muted">Tembok di-refill</div><div class="big">${S.refills}×</div></div>
      <div class="out"><div class="muted">Antrian palsu ditarik</div><div class="big">${S.pulls}×</div></div>
    </div>
    <h3>Ringkasan akhir sesi (simulasi) — yang baru bisa kamu lihat sore hari</h3>
    <p class="hint">Net foreign: <b class="${S.fBuy-S.fSell>=0?"up":"down"}">${fmtV(Math.abs(S.fBuy-S.fSell))} ${S.fBuy-S.fSell>=0?"net buy":"net sell"}</b> · Top-3 buyer ${c3b.toFixed(0)}% vs top-3 seller ${c3s.toFixed(0)}% → selisih <b>${(c3b-c3s).toFixed(0)}%</b> ${c3b-c3s>10?"(akumulasi)":c3b-c3s<-10?"(distribusi)":"(netral)"}</p>
    <div class="grid g2">
      <div class="tablewrap"><table><tr><th>Top net buyer</th><th>Net lot</th><th>Avg</th></tr>${tb.map(r=>tr(r,"b")).join("")}</table></div>
      <div class="tablewrap"><table><tr><th>Top net seller</th><th>Net lot</th><th>Avg</th></tr>${ts.map(r=>tr(r,"s")).join("")}</table></div>
    </div>
    <button class="btn" onclick="document.getElementById('lbStart').click();window.scrollTo({top:0,behavior:'smooth'})">▶ Ronde berikutnya</button>
    <a class="btn sec" href="#/pelajaran/e4" style="margin-left:6px">Baca checklist 3 detik</a>
  </div>`;
  render();
}

window.Lab = {mount, unmount, _sim(profile, scenario, n){ // dipakai untuk kalibrasi
  const keep=root, keepS=S; root=null; newRound({profile, scenario}); for(let i=0;i<n;i++) step(); const r={chg:(S.last-S.open)/S.open*100, bp:S.haka/(S.haka+S.haki)*100, avg:S.lotSum/S.n, big:S.big, refills:S.refills, pulls:S.pulls}; root=keep; S=keepS; return r; }};
})();
