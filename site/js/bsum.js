/* Lab Broker Summary, Kamus Kode Broker, Matriks Asing vs Lokal */
(function(){
const fmt = n => Math.round(n).toLocaleString("id-ID");
const R=(a,b)=>a+Math.random()*(b-a), pick=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>a.map(x=>[Math.random(),x]).sort((p,q)=>p[0]-q[0]).map(x=>x[1]);
const RITEL=["YP","PD","XC","XL","CC","SQ","NI","KK","EP","GR","OD","AG"];
const ASING=["AK","BK","ZP","KZ","MS","GW"];
const tag=c=>{ const b=window.brokerByCode(c); const g=b?b.g:"lokal"; const cls={asing:"F",ritel:"D",lokal:"D",bumn:"D"}[g]; return `<span class="tag ${cls}" title="${b?b.n:""}">${c}</span>`; };

/* ---------------- Broker summary lab ---------------- */
const BS = {
  akum_asing:{label:"Akumulasi oleh institusi asing", why:"Pembeli terkonsentrasi di broker institusi global (AK/BK/KZ dll.) dan net foreign buy, sementara penjual tersebar di banyak broker ritel. Harga turun/datar → asing menampung saat ritel melepas. Ini pola yang sering mendahului kenaikan di big cap."},
  dist_asing:{label:"Distribusi / keluarnya asing", why:"Penjual terkonsentrasi di broker institusi global dengan net foreign sell, pembeli tersebar di broker ritel. Harga naik/datar → asing memanfaatkan likuiditas ritel untuk keluar."},
  akum_lokal:{label:"Akumulasi bandar lokal (menyamar lewat broker ritel)", why:"Top buyer adalah kode broker ritel, TAPI lot-nya sangat besar & terkonsentrasi di 1–2 kode, avg price rendah, dan harga ditahan datar. Ritel sungguhan tersebar merata; konsentrasi ekstrem di satu kode ritel menandakan ada pemain besar yang memakai broker tersebut. Net foreign kecil — bukan cerita asing."},
  dist_lokal:{label:"Distribusi bandar lokal ke ritel (setelah naik)", why:"Harga sudah naik tajam, penjual terkonsentrasi di 2–3 broker non-ritel yang sebelumnya (minggu lalu) adalah pembeli, sementara pembeli tersebar di banyak broker ritel. Barang berpindah dari tangan kuat ke tangan lemah — waspada."},
  tektok:{label:"Transaksi semu / crossing (tektok)", why:"Broker yang sama muncul sebagai top buyer DAN top seller dengan lot hampir sama dan avg price nyaris identik. Kepemilikan tidak berubah — volume ini 'kosong'. Jangan dihitung sebagai akumulasi."},
  netral:{label:"Netral / tidak ada jejak dominan", why:"Pembeli dan penjual sama-sama tersebar, konsentrasi top-3 kedua sisi mirip, net foreign kecil. Tidak ada cerita bandar — gunakan analisis lain."},
};
function genBS(key){
  const base=pick([1320,2450,880,5325]); const T=Math.round(R(80000,300000));
  const spread = (codes,share)=>{ const w=codes.map(()=>R(.6,1.4)); const s=w.reduce((a,b)=>a+b,0); return codes.map((c,i)=>({c,lot:Math.round(T*share*w[i]/s)})); };
  const conc = (codes,share)=>{ const w=[R(.45,.6),R(.25,.35),R(.1,.2)].slice(0,codes.length); const s=w.reduce((a,b)=>a+b,0); return codes.map((c,i)=>({c,lot:Math.round(T*share*w[i]/s)})); };
  let B=[],S=[],chg=0,nf=0,period=pick(["1 minggu","5 hari","1 bulan"]),note="";
  const rit=shuffle(RITEL), as=shuffle(ASING);
  if(key==="akum_asing"){ B=[...conc(as.slice(0,3),.62),...spread(rit.slice(0,5),.38)]; S=spread(rit.slice(3,11),.9).concat(spread([as[4]],.1)); chg=R(-6,1); nf=1; }
  if(key==="dist_asing"){ S=[...conc(as.slice(0,3),.62),...spread(rit.slice(0,5),.38)]; B=spread(rit.slice(3,11),.9).concat(spread([as[4]],.1)); chg=R(-1,6); nf=-1; }
  if(key==="akum_lokal"){ const k=pick([["YP","PD"],["XC","YP"],["PD","CC"]]); B=[...conc(k,.6),...spread(rit.filter(c=>!k.includes(c)).slice(0,6),.4)]; S=spread(shuffle([...RITEL.filter(c=>!k.includes(c)),as[0],as[1]]).slice(0,9),1); chg=R(-2,1.5); nf=0; note="Lot rata-rata per transaksi di "+k[0]+" ≈ 8× rata-rata broker ritel lain."; }
  if(key==="dist_lokal"){ const k=pick([["MG","LG","AZ"],["DH","IF","KI"],["AZ","MG","BB"]]); S=[...conc(k,.65),...spread(rit.slice(0,4),.35)]; B=spread(rit.slice(2,12),1); chg=R(25,70); nf=0; note="Minggu sebelumnya, "+k.slice(0,2).join(" & ")+" adalah top buyer saham ini."; }
  if(key==="tektok"){ const k=pick(["MG","EP","DH","IF","HP"]); const L=Math.round(T*R(.35,.5)); B=[{c:k,lot:L},...spread(rit.slice(0,6),.5)]; S=[{c:k,lot:Math.round(L*R(.97,1.0))},...spread(rit.slice(4,11),.5)]; chg=R(-1,2); nf=0; note="Frekuensi tinggi, lot per transaksi seragam."; }
  if(key==="netral"){ B=spread(shuffle([...rit.slice(0,7),as[0]]),1); S=spread(shuffle([...rit.slice(3,10),as[1]]),1); chg=R(-2,2); nf=0; }
  const avgB = key.startsWith("akum")? base*.985 : key.startsWith("dist")? base*1.0 : base;
  const avgS = key.startsWith("dist")? base*1.015 : base*.995;
  const fix=(arr,av)=>arr.map(r=>({...r,avg:Math.round(av*R(.992,1.008))}));
  B=fix(B,avgB).sort((a,b)=>b.lot-a.lot).slice(0,8); S=fix(S,avgS).sort((a,b)=>b.lot-a.lot).slice(0,8);
  if(key==="tektok"){ const k=B.find(r=>window.brokerByCode(r.c)&&!RITEL.includes(r.c))||B[0]; const s=S.find(r=>r.c===k.c); if(s) s.avg=k.avg; }
  const val = T*base*100;
  const nfv = nf===1? val*R(.15,.3) : nf===-1? -val*R(.15,.3) : val*R(-.03,.03);
  return {key,B,S,T,chg,nfv,period,note,base};
}
let cur=null;
function mountBS(el){
  const sv=JSON.parse(localStorage.getItem("sb_bs")||'{"r":0,"c":0}');
  el.innerHTML=`<div class="kicker">Latihan · Modul D</div><h1>Lab Broker Summary</h1>
  <p class="lead">Data broker summary acak (simulasi) untuk saham fiktif. Baca konsentrasi, harga rata-rata, tipe broker, dan net foreign — lalu tentukan ceritanya.</p>
  <div class="controls"><button class="btn" id="bsNew">🎲 Soal baru</button><span class="hint">Skor: <b id="bsScore">${sv.c}/${sv.r}</b></span></div>
  <div id="bsBody"></div>`;
  el.querySelector("#bsNew").onclick=()=>newBS(el); newBS(el);
}
function newBS(el){
  cur=genBS(pick(Object.keys(BS))); const d=cur;
  const sumTop3=a=>a.slice(0,3).reduce((s,r)=>s+r.lot,0)/d.T*100;
  const row=(r,cls)=>`<tr><td>${tag(r.c)} <span class="muted" style="font-size:12px">${(window.brokerByCode(r.c)||{}).n||""}</span></td><td class="num ${cls}">${fmt(r.lot)}</td><td class="num">${fmt(r.avg)}</td></tr>`;
  el.querySelector("#bsBody").innerHTML=`
  <div class="card">
   <div class="grid g4">
    <div><div class="muted">Saham</div><b>XLTH (fiktif)</b></div>
    <div><div class="muted">Periode</div><b>${d.period}</b></div>
    <div><div class="muted">Perubahan harga</div><b class="${d.chg>=0?"up":"down"}">${d.chg>=0?"+":""}${d.chg.toFixed(1)}%</b></div>
    <div><div class="muted">Net foreign</div><b class="${d.nfv>=0?"up":"down"}">${d.nfv>=0?"+":"−"}Rp${(Math.abs(d.nfv)/1e9).toFixed(1)} M</b> <span class="hint">(miliar)</span></div>
   </div>
   ${d.note?`<p class="note" style="margin-top:12px">Info tambahan: ${d.note}</p>`:""}
  </div>
  <div class="grid g2" style="margin-top:12px">
   <div class="tablewrap"><table><tr><th>Buyer</th><th>B.Lot</th><th>B.Avg</th></tr>${d.B.map(r=>row(r,"up")).join("")}</table></div>
   <div class="tablewrap"><table><tr><th>Seller</th><th>S.Lot</th><th>S.Avg</th></tr>${d.S.map(r=>row(r,"down")).join("")}</table></div>
  </div>
  <p class="hint">Tag ungu = broker institusi asing, biru-muda = broker lokal/ritel. Top-3 buyer: <b>${sumTop3(d.B).toFixed(0)}%</b> · Top-3 seller: <b>${sumTop3(d.S).toFixed(0)}%</b> dari total ${fmt(d.T)} lot.</p>
  <h3>Cerita apa yang paling mungkin?</h3>
  <div class="guess">${Object.entries(BS).map(([k,s])=>`<button data-k="${k}">${s.label}</button>`).join("")}</div>
  <div id="bsRev" class="reveal"></div>`;
  el.querySelectorAll("#bsBody .guess button").forEach(b=>b.onclick=()=>{
    if(el.querySelector("#bsRev").innerHTML) return;
    const ok=b.dataset.k===d.key;
    el.querySelectorAll("#bsBody .guess button").forEach(x=>{ if(x.dataset.k===d.key) x.classList.add("right"); else if(x===b) x.classList.add("wrong"); });
    const sv=JSON.parse(localStorage.getItem("sb_bs")||'{"r":0,"c":0}'); sv.r++; if(ok) sv.c++; localStorage.setItem("sb_bs",JSON.stringify(sv));
    el.querySelector("#bsScore").textContent=`${sv.c}/${sv.r}`;
    el.querySelector("#bsRev").innerHTML=`<div class="card"><h3 style="margin-top:0">${ok?"✅ Tepat":"❌ Belum tepat"} — ${BS[d.key].label}</h3><p>${BS[d.key].why}</p><button class="btn" id="bsNext">Soal berikutnya →</button></div>`;
    el.querySelector("#bsNext").onclick=()=>{newBS(el); window.scrollTo({top:0,behavior:"smooth"});};
  });
}

/* ---------------- Kamus broker ---------------- */
function mountBroker(el){
  const G=window.BROKER_GROUP;
  el.innerHTML=`<div class="kicker">Hafalan</div><h1>Kamus Kode Broker</h1>
  <p class="lead">Kode 2 huruf yang paling sering muncul di broker summary, dikelompokkan supaya kamu cepat membaca "siapa di belakang transaksi". Ingat: <b>kode broker menunjukkan pintu, bukan orangnya</b>.</p>
  <div class="note warn"><b>Penting:</b> Status asing di data F Buy/F Sell berasal dari tipe investor, bukan broker. Broker asing (mis. YP Mirae) bisa didominasi ritel lokal; bandar lokal bisa memakai broker ritel. Daftar ini untuk belajar — kepemilikan/nama broker bisa berubah, cek daftar Anggota Bursa di idx.co.id.</div>
  <div class="controls"><input type="text" id="brQ" class="searchbox" placeholder="Cari kode atau nama… (mis. AK, Mirae)"><button class="btn sec" id="brQuiz">🧠 Kuis hafalan</button></div>
  <div id="brQuizBox"></div>
  <div id="brList"></div>
  <h2>Cara pakai saat membaca broker summary</h2>
  <div class="tablewrap"><table><tr><th>Yang terlihat</th><th>Bacaan awal</th></tr>
  <tr><td>AK, BK, KZ, MS, GW top buyer + net foreign buy</td><td>Institusi asing akumulasi</td></tr>
  <tr><td>YP, PD, XC, XL, CC tersebar sebagai top buyer saat harga turun</td><td>Ritel menampung — belum tentu dasar</td></tr>
  <tr><td>Satu kode ritel (mis. YP) mendominasi dengan lot sangat besar & konsisten</td><td>Kemungkinan pemain besar memakai broker ritel</td></tr>
  <tr><td>CC, OD, NI, DX besar di saham BUMN/big cap</td><td>Institusi domestik (dapen, asuransi, reksa dana) — bisa juga ritel grup</td></tr>
  <tr><td>Broker kecil yang jarang terlihat tiba-tiba mendominasi saham lapis 3</td><td>Waspada — cek UMA & fundamental</td></tr></table></div>`;
  const list=el.querySelector("#brList");
  const draw=q=>{ q=(q||"").toLowerCase();
    list.innerHTML=Object.entries(G).map(([g,meta])=>{ const items=window.BROKERS.filter(b=>b.g===g&&(!q||b.c.toLowerCase().includes(q)||b.n.toLowerCase().includes(q))); if(!items.length) return "";
      return `<h2><span class="pill ${meta.cls}">${meta.label}</span></h2><div class="grid g3">${items.map(b=>`<div class="card"><div style="display:flex;gap:10px;align-items:baseline"><b class="mono" style="font-size:22px">${b.c}</b><span>${b.n}</span></div><p class="hint" style="margin:6px 0 0">${b.k}</p></div>`).join("")}</div>`; }).join(""); };
  draw(); el.querySelector("#brQ").oninput=e=>draw(e.target.value);
  el.querySelector("#brQuiz").onclick=()=>quiz(el.querySelector("#brQuizBox"));
}
function quiz(box){
  const b=pick(window.BROKERS); const opts=shuffle([b,...shuffle(window.BROKERS.filter(x=>x!==b)).slice(0,3)]);
  box.innerHTML=`<div class="card" style="margin-bottom:16px"><p>Kode <b class="mono" style="font-size:24px">${b.c}</b> adalah…</p><div class="guess">${opts.map(o=>`<button data-c="${o.c}">${o.n}</button>`).join("")}</div><p id="qzR" class="hint"></p></div>`;
  box.querySelectorAll("button").forEach(x=>x.onclick=()=>{ const ok=x.dataset.c===b.c; box.querySelectorAll("button").forEach(y=>{ if(y.dataset.c===b.c) y.classList.add("right"); else if(y===x) y.classList.add("wrong"); });
    box.querySelector("#qzR").innerHTML=`${ok?"✅":"❌"} ${b.c} = ${b.n} · ${window.BROKER_GROUP[b.g].label}. ${b.k} <a href="javascript:void 0" id="qzN">Soal lagi →</a>`; box.querySelector("#qzN").onclick=()=>quiz(box); });
}

/* ---------------- Matriks asing ---------------- */
const CASES=[
 {q:"BBCA naik 2,4%, F Buy 1,15T vs F Sell 631B (net buy ±519M), transaksi reguler.", a:0},
 {q:"Saham bank big cap naik 3% hari ini, net foreign sell Rp300M, top buyer CC, YP, PD.", a:1},
 {q:"Saham telco turun 4% dalam seminggu, net foreign buy 5 hari berturut, top buyer AK & BK.", a:2},
 {q:"IHSG turun, saham big cap turun 2%, net foreign sell 10 hari berturut, rupiah melemah.", a:3},
 {q:"Net foreign buy Rp800M di satu saham, tapi hampir seluruhnya dari pasar negosiasi (NG) satu transaksi.", a:4},
 {q:"Saham lapis 3 naik 25%, net foreign buy Rp50 juta (porsi asing &lt;1%).", a:5},
];
const ANS=["Asing memimpin kenaikan — tren sehat","Lokal mengangkat, asing keluar — waspada di big cap","Asing akumulasi saat harga turun — calon pembalikan","Tekanan asing berlanjut — tunggu mereda","Distorsi pasar nego — abaikan untuk tren","Data asing tidak relevan — pakai bandarmologi lokal"];
function mountAsing(el){
  el.innerHTML=`<div class="kicker">Modul F</div><h1>Matriks Asing vs Lokal</h1>
  <p class="lead">Gabungkan arah harga, net foreign, dan siapa lawannya. Pakai untuk saham dengan porsi asing besar (big cap, konstituen MSCI). Untuk lapis 3, beralih ke broker summary.</p>
  <div class="tablewrap"><table>
  <tr><th>Harga</th><th>Net foreign</th><th>Broker lokal/ritel</th><th>Bacaan</th><th>Sikap</th></tr>
  <tr><td class="up">Naik</td><td class="up">Buy</td><td>Ritel jual (taking profit)</td><td>Asing memimpin, barang pindah ke tangan kuat</td><td>Ikut tren, beli saat pullback</td></tr>
  <tr><td class="up">Naik</td><td class="down">Sell</td><td>Ritel/lokal beli</td><td>Kenaikan dibiayai lokal; asing pakai momen untuk keluar</td><td>Hati-hati, perketat stop</td></tr>
  <tr><td class="up">Naik</td><td>≈0</td><td>Lokal institusi (CC, OD, LG) beli</td><td>Dana domestik (reksa dana/dapen) memimpin</td><td>Cek konsistensi beberapa hari</td></tr>
  <tr><td class="down">Turun</td><td class="up">Buy</td><td>Ritel panic sell</td><td>Asing menampung — akumulasi</td><td>Pantau tanda berhenti turun (stopping volume)</td></tr>
  <tr><td class="down">Turun</td><td class="down">Sell</td><td>Ritel beli ("serok")</td><td>Barang pindah ke tangan lemah</td><td>Jangan tangkap pisau</td></tr>
  <tr><td>Datar</td><td class="up">Buy besar</td><td>Lokal jual</td><td>Ada suplai lokal yang diserap asing</td><td>Breakout bila suplai habis</td></tr>
  <tr><td>Datar</td><td class="down">Sell besar</td><td>Lokal beli</td><td>Lokal menahan harga sambil asing keluar</td><td>Rawan turun saat lokal berhenti</td></tr>
  </table></div>
  <div class="note"><b>Cek 4 hal sebelum percaya angka asing:</b> (1) reguler vs nego, (2) satu hari vs tren 5/20 hari, (3) porsi asing di saham itu, (4) ada rebalancing indeks / aksi korporasi / crossing?</div>
  <h2>Kuis kasus</h2><div id="asQ"></div>`;
  let i=0; const box=el.querySelector("#asQ");
  const show=()=>{ const c=CASES[i%CASES.length];
    box.innerHTML=`<div class="card"><p class="hint">Kasus ${i%CASES.length+1}/${CASES.length}</p><p><b>${c.q}</b></p><div class="guess">${ANS.map((a,k)=>`<button data-k="${k}">${a}</button>`).join("")}</div><p id="asR" class="hint"></p></div>`;
    box.querySelectorAll("button").forEach(b=>b.onclick=()=>{ box.querySelectorAll("button").forEach(x=>{ if(+x.dataset.k===c.a) x.classList.add("right"); else if(x===b) x.classList.add("wrong"); });
      box.querySelector("#asR").innerHTML=`${+b.dataset.k===c.a?"✅ Tepat.":"❌ Jawaban: "+ANS[c.a]+"."} <a href="javascript:void 0" id="asN">Kasus berikutnya →</a>`; box.querySelector("#asN").onclick=()=>{i++;show();}; }); };
  show();
}

window.BSum={mount:mountBS}; window.BrokerDict={mount:mountBroker}; window.Asing={mount:mountAsing};
})();
