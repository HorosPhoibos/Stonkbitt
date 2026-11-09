(function(){
const view=document.getElementById("view");
const T=window.T, L=window.L;
const mods=()=> window.LANG==="en" && window.MODULES_EN ? window.MODULES_EN : window.MODULES;
const allLessons=()=> mods().flatMap(m=>m.lessons.map(l=>({...l,mod:m})));
const prog=()=>{ try{return JSON.parse(localStorage.getItem("sb_prog")||"{}");}catch(e){return {};} };
const setProg=(id,v)=>{ const p=prog(); p[id]=v; try{ localStorage.setItem("sb_prog",JSON.stringify(p)); }catch(e){} };
let active=null;

/* ---------- Glosarium gabungan & istilah yang bisa diklik ---------- */
function glossary(){
  const en=window.GLOSSARY_EN||{};
  const base=(window.GLOSSARY||[]).map(([k,id])=>({k,id,en:en[k]||id}));
  const extra=(window.GLOSSARY_EXTRA||[]).map(([k,id,e])=>({k,id,en:e}));
  const seen=new Set(); return [...extra,...base].filter(g=>!seen.has(g.k.toLowerCase())&&seen.add(g.k.toLowerCase()));
}
const SKIP=new Set(["A","CODE","BUTTON","H1","H2","TH","INPUT","TEXTAREA","SELECT","OPTION","LABEL","SCRIPT","STYLE"]);
function linkTerms(root){
  const G=glossary().sort((a,b)=>b.k.length-a.k.length); const used=new Set();
  const esc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(n){
    for(let p=n.parentNode;p&&p!==root;p=p.parentNode){ if(SKIP.has(p.tagName)||(p.classList&&(p.classList.contains("term")||p.classList.contains("formula")||p.classList.contains("noterm")))||p.namespaceURI==="http://www.w3.org/2000/svg") return NodeFilter.FILTER_REJECT; }
    return n.nodeValue.trim().length>2?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT; }});
  const nodes=[]; while(walker.nextNode()) nodes.push(walker.currentNode);
  for(const g of G){
    if(used.size>60) break;
    const caps=g.k===g.k.toUpperCase();
    const re=new RegExp(`(^|[^\\p{L}\\p{N}])(${esc(g.k)})(?=$|[^\\p{L}\\p{N}])`, caps?"u":"iu");
    for(let i=0;i<nodes.length;i++){
      const n=nodes[i]; const m=re.exec(n.nodeValue); if(!m) continue;
      const start=m.index+m[1].length, word=m[2];
      const after=n.splitText(start); const rest=after.splitText(word.length);
      const span=document.createElement("span"); span.className="term"; span.dataset.k=g.k; span.textContent=word; span.tabIndex=0;
      after.parentNode.replaceChild(span,after);
      nodes.splice(i,1,n,rest); used.add(g.k); break;
    }
  }
}
let pop=null;
function showTerm(el){
  const g=glossary().find(x=>x.k===el.dataset.k); if(!g) return;
  if(!pop){ pop=document.createElement("div"); pop.className="termpop"; document.body.appendChild(pop); }
  pop.innerHTML=`<b>${g.k}</b><div>${T({id:g.id,en:g.en})}</div><a href="#/istilah?q=${encodeURIComponent(g.k)}">${T({id:"Buka kamus →",en:"Open glossary →"})}</a>`;
  const r=el.getBoundingClientRect(); pop.style.display="block";
  const w=Math.min(320,innerWidth-24); pop.style.width=w+"px";
  pop.style.left=Math.max(12,Math.min(r.left+scrollX,scrollX+innerWidth-w-12))+"px";
  pop.style.top=(r.bottom+scrollY+6)+"px";
}
document.addEventListener("click",e=>{ const t=e.target.closest&&e.target.closest(".term"); if(t){ showTerm(t); e.stopPropagation(); } else if(pop && !e.target.closest(".termpop")) pop.style.display="none"; });
document.addEventListener("keydown",e=>{ if(e.key==="Enter"&&e.target.classList&&e.target.classList.contains("term")) showTerm(e.target); if(e.key==="Escape"&&pop) pop.style.display="none"; });
window.linkTerms=linkTerms;

/* ---------- Navigasi ---------- */
const NAV=[
 ["","◎","Peta Belajar A–Z"],
 ["#","Mulai di sini"],["pemula","🌱","Kelas Pemula (Level 1 & 2)"],["ekspektasi","⚖","Ekspektasi Realistis"],
 ["#","Kurikulum"],["modul/A","A","Dasar Bursa (BEI)"],["modul/B","B","Fundamental"],["modul/C","C","Teknikal"],["modul/D","D","Bandarmologi & Volume"],["modul/E","E","Order Book & Tape"],["modul/F","F","Asing (Foreign Flow)"],["modul/G","G","Risiko & Psikologi"],
 ["#","Latihan"],["lab","⚡","Lab Order Book (3 detik)"],["pelan","🐢","Belajar Pelan-pelan"],["indikator","∿","Lab Indikator (Fibo, RSI, Ichimoku)"],["bsum","▤","Lab Broker Summary"],["broker","#","Kamus Kode Broker"],["asing","🌏","Matriks Asing vs Lokal"],
 ["#","Lanjutan"],["indeks","≡","Indeks & Daftar LQ45"],["global","🌐","Pengaruh Global (USD, S&P)"],["riset","🔬","Riset & Metode (Jurnal)"],["cfa","★","Jalur CFA (L1–L3)"],["tools","∑","Tools & Kalkulator"],["pustaka","📚","Pustaka Buku"],["istilah","Aa","Kamus Istilah"],
];
function drawNav(){
  document.getElementById("nav").innerHTML=NAV.map(n=> n[0]==="#" ? `<div class="sec">${L(n[1])}</div>` : `<a href="#/${n[0]}" data-r="${n[0]||"home"}"><span class="ic">${n[1]}</span>${L(n[2])}</a>`).join("");
  document.getElementById("themeBtn").textContent=L("◐ Tema");
  document.getElementById("madeBy").textContent=T({id:"Dibuat oleh",en:"Created by"});
  document.querySelector(".brand small").textContent=T({id:"Sekolah Saham Indonesia",en:"Indonesian Stock School"});
  document.querySelectorAll("#langBtns button").forEach(b=>b.classList.toggle("on",b.dataset.l===window.LANG));
  document.getElementById("footNote").innerHTML=T({id:'Materi edukasi, bukan ajakan beli/jual. Aturan BEI sering berubah — cek <a href="https://www.idx.co.id" target="_blank" rel="noopener">idx.co.id</a>.',en:'Educational material, not a buy/sell recommendation. IDX rules change often — check <a href="https://www.idx.co.id" target="_blank" rel="noopener">idx.co.id</a>.'});
}

/* ---------- Halaman ---------- */
function home(){
  const p=prog(), ALL=allLessons(), M=mods(); const done=ALL.filter(l=>p[l.id]).length;
  const lab=JSON.parse(localStorage.getItem("sb_lab")||'{"r":0,"c":0}');
  const next=ALL.find(l=>!p[l.id]);
  const bp=(window.BEGINNER||[]).flatMap(l=>l.lessons).filter(x=>p["p_"+x.id]).length, bt=(window.BEGINNER||[]).flatMap(l=>l.lessons).length;
  view.innerHTML=`
  <div class="kicker">Stonkbitt · ${T({id:"Sekolah Saham Indonesia",en:"Indonesian Stock School"})}</div>
  <h1>${T({id:'Dari "main saham sejak 2016" menjadi trader yang bisa membaca pasar.',en:'From "trading since 2016" to actually reading the market.'})}</h1>
  <p class="lead">${T({id:"Kurikulum A–Z untuk Bursa Efek Indonesia: mekanisme bursa, fundamental, teknikal, <b>bandarmologi</b>, <b>membaca order book dalam 3 detik</b>, <b>foreign flow</b>, risiko, sampai <b>jalur CFA</b>. Baru mulai? Ikuti <a href='#/pemula'>Kelas Pemula</a> dulu.",en:"An A–Z curriculum for the Indonesia Stock Exchange: market mechanics, fundamentals, technicals, <b>bandarmology</b> (smart-money tracking), <b>reading the order book in 3 seconds</b>, <b>foreign flow</b>, risk, and a <b>CFA path</b>. New to stocks? Start with the <a href='#/pemula'>Beginner Class</a>."})}</p>
  <div class="grid g4" style="margin:22px 0">
    <div class="card"><div class="muted">${T({id:"Kelas Pemula",en:"Beginner Class"})}</div><div class="mono" style="font-size:26px;font-weight:800">${bp}/${bt}</div><div class="bar"><i style="width:${bt?bp/bt*100:0}%"></i></div></div>
    <div class="card"><div class="muted">${T({id:"Kurikulum A–G",en:"Curriculum A–G"})}</div><div class="mono" style="font-size:26px;font-weight:800">${done}/${ALL.length}</div><div class="bar"><i style="width:${done/ALL.length*100}%"></i></div></div>
    <div class="card"><div class="muted">${T({id:"Akurasi Lab Order Book",en:"Order Book Lab accuracy"})}</div><div class="mono" style="font-size:26px;font-weight:800">${lab.r?Math.round(lab.c/lab.r*100):0}%</div><div class="hint">${lab.c}/${lab.r} · ${T({id:"target ≥70%",en:"target ≥70%"})}</div></div>
    <div class="card"><div class="muted">${T({id:"Lanjutkan",en:"Continue"})}</div>${next?`<a href="#/pelajaran/${next.id}" style="font-weight:700">${next.id.toUpperCase()} · ${next.t}</a>`:T({id:"Semua selesai 🎉",en:"All done 🎉"})}</div>
  </div>
  <h2>${T({id:"Peta belajar",en:"Learning map"})}</h2>
  <div class="track"><div class="node">🌱</div><div class="card"><a href="#/pemula"><b style="font-size:16px;color:var(--text)">${T({id:"Kelas Pemula — Level 1 & Level 2",en:"Beginner Class — Level 1 & Level 2"})}</b></a><div class="hint">${T({id:"Pelan-pelan dari nol: apa itu saham, buka rekening, membaca layar, order pertama, sampai rencana investasi. Tiap pelajaran ada grafik & soal.",en:"Slowly from zero: what a stock is, opening an account, reading the screen, first order, up to an investment plan. Every lesson has charts & questions."})}</div>
   <div class="lessons"><a href="#/pemula">${T({id:"Mulai Level 1",en:"Start Level 1"})}</a><a href="#/ekspektasi">${T({id:"Ekspektasi realistis",en:"Realistic expectations"})}</a><a href="#/indeks">LQ45</a></div></div></div>
  ${M.map(m=>{ const dn=m.lessons.filter(l=>p[l.id]).length; return `
   <div class="track"><div class="node ${dn===m.lessons.length?"done":""}">${m.id}</div>
   <div class="card"><div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap"><a href="#/modul/${m.id}"><b style="font-size:16px;color:var(--text)">${m.t}</b></a><span class="hint">${dn}/${m.lessons.length}</span></div>
   <div class="hint">${m.d}</div>
   <div class="lessons">${m.lessons.map(l=>`<a href="#/pelajaran/${l.id}" class="${p[l.id]?"done":""}">${l.id.toUpperCase()} · ${l.t}</a>`).join("")}</div></div></div>`; }).join("")}
  <div class="track"><div class="node">★</div><div class="card"><a href="#/cfa"><b style="font-size:16px;color:var(--text)">${L("Jalur CFA (L1–L3)")}</b></a><div class="hint">${T({id:"Peta topik CFA ↔ WPPE/WMI ↔ materi di sini, rencana waktu, flashcard rumus.",en:"CFA topics ↔ WPPE/WMI ↔ this site, a timeline planner, formula flashcards."})}</div><div class="lessons"><a href="#/cfa">CFA</a><a href="#/tools">${window.Tools.list.length} ${T({id:"kalkulator",en:"calculators"})}</a><a href="#/global">${L("Pengaruh Global (USD, S&P)")}</a><a href="#/pustaka">${T({id:"Pustaka",en:"Library"})}</a></div></div></div>
  <div class="card" style="margin-top:28px;display:flex;gap:16px;align-items:center;flex-wrap:wrap"><img src="assets/logo.svg" alt="" width="56" height="56" style="border-radius:14px"><div><b style="font-family:var(--serif);font-size:20px">Stonkbitt</b><div class="hint">${T({id:"Masterclass saham Indonesia — supaya tidak mudah dibohongi. Dibuat oleh",en:"An Indonesian stock masterclass — so nobody can fool you. Created by"})} <b>Horos Phoibos</b>.</div></div></div>
  <div class="note warn" style="margin-top:16px"><b>Disclaimer.</b> ${T({id:"Semua materi untuk edukasi, bukan rekomendasi beli/jual. Data di Lab adalah simulasi dengan ticker fiktif.",en:"All material is educational, not a buy/sell recommendation. Lab data is simulated with fictional tickers."})}</div>`;
}
function modul(id){
  const m=mods().find(x=>x.id===id); if(!m) return notFound(); const p=prog();
  view.innerHTML=`<div class="kicker">${L("Modul")} ${m.id}</div><h1>${m.t}</h1><p class="lead">${m.d}</p>
  <div class="grid g2" style="margin-top:20px">${m.lessons.map(l=>`<a class="card" href="#/pelajaran/${l.id}" style="color:var(--text);text-decoration:none">
   <div style="display:flex;justify-content:space-between"><span class="pill ${p[l.id]?"up":""}">${p[l.id]?"✓ "+L("selesai"):l.id.toUpperCase()}</span><span class="hint">${l.m} ${L("menit")}</span></div>
   <h3 style="margin:10px 0 6px">${l.t}</h3><div class="hint">${l.inti.replace(/<[^>]+>/g,"").slice(0,150)}…</div></a>`).join("")}</div>`;
}
function lesson(id){
  const ALL=allLessons(); const i=ALL.findIndex(l=>l.id===id); if(i<0) return notFound(); const l=ALL[i], p=prog();
  const prev=ALL[i-1], next=ALL[i+1];
  view.innerHTML=`<article class="lesson">
  <div class="kicker"><a href="#/modul/${l.mod.id}">${L("Modul")} ${l.mod.id} · ${l.mod.t}</a> · ${l.m} ${L("menit")}</div>
  <h1>${l.t}</h1>
  <p class="hint">💡 ${L("Ketuk istilah bergaris titik untuk melihat artinya.")}</p>
  ${window.ReadAloud.bar()}
  ${(()=>{ const m={B:["lapkeu","valuasi"],C:["ichi","rsi","bb","fib","ma"],D:["bandar"],E:["ob"],F:["asing"]}[l.mod.id]; if(!m||!window.Guide) return ""; const gs=m.map(k=>window.Guide.list.find(g=>g.key===k)).filter(Boolean); return `<div class="note">🐢 ${T({id:"Terasa terlalu cepat? Ada versi langkah demi langkah:",en:"Feels too fast? There's a step-by-step version:"})} ${gs.map(g=>`<a href="#/pelan/${g.key}">${T(g.t)}</a>`).join(" · ")}</div>`; })()}
  <div class="box inti"><h4>${L("Inti 30 detik")}</h4>${l.inti}</div>
  ${l.body}
  <div class="box trap"><h4>${L("Jebakan umum")}</h4>${l.trap}</div>
  <div class="box prak"><h4>${L("Praktik minggu ini")}</h4>${l.prak}</div>
  <p class="hint">📚 ${L("Rujukan")}: ${l.ref}</p>
  <h3>${L("Catatanku")}</h3>
  <textarea id="note" class="notearea" placeholder="${L("Tulis ringkasan dengan bahasamu sendiri…")}"></textarea>
  <label class="chk" style="margin-top:14px;font-size:15px;color:var(--text)"><input type="checkbox" id="done" ${p[l.id]?"checked":""}> ${L("Tandai pelajaran ini selesai")}</label>
  <div class="lessonnav">${prev?`<a class="btn sec" href="#/pelajaran/${prev.id}">← ${prev.id.toUpperCase()} ${prev.t}</a>`:"<span></span>"}${next?`<a class="btn" href="#/pelajaran/${next.id}">${next.id.toUpperCase()} ${next.t} →</a>`:`<a class="btn" href="#/cfa">${L("Lanjut ke Jalur CFA →")}</a>`}</div>
  </article>`;
  const nk="sb_note_"+l.id, ta=view.querySelector("#note"); ta.value=localStorage.getItem(nk)||""; ta.oninput=()=>localStorage.setItem(nk,ta.value);
  view.querySelector("#done").onchange=e=>setProg(l.id,e.target.checked);
  window.ReadAloud.attach(view.querySelector(".readbar"),view.querySelector("article"));
  linkTerms(view.querySelector("article"));
}
function glossaryPage(q){
  view.innerHTML=`<div class="kicker">${T({id:"Referensi",en:"Reference"})}</div><h1>${L("Kamus Istilah")}</h1>
  <p class="lead">${T({id:"Semua istilah dalam dua bahasa. Istilah yang sama bisa diketuk langsung di setiap pelajaran.",en:"Every term in both languages. The same terms can be tapped directly inside every lesson."})}</p>
  <input type="text" class="searchbox" id="gq" placeholder="${L("Cari istilah…")}" value="${q.q?q.q.replace(/"/g,""):""}"><div class="tablewrap"><table id="gt"></table></div>`;
  const draw=s=>{ s=(s||"").toLowerCase(); view.querySelector("#gt").innerHTML=`<tr><th>${L("Istilah")}</th><th>Bahasa Indonesia</th><th>English</th></tr>`+glossary().filter(g=>!s||(g.k+g.id+g.en).toLowerCase().includes(s)).sort((a,b)=>a.k.localeCompare(b.k)).map(g=>`<tr><td><b>${g.k}</b></td><td>${g.id}</td><td>${g.en}</td></tr>`).join(""); };
  draw(q.q); view.querySelector("#gq").oninput=e=>draw(e.target.value);
}
function notFound(){ view.innerHTML=`<h1>${L("Halaman tidak ditemukan")}</h1><a href="#/">${L("Kembali ke peta belajar")}</a>`; }

function route(){
  if(active&&active.unmount) active.unmount(); active=null; window.ReadAloud&&window.ReadAloud.stop();
  if(pop) pop.style.display="none";
  const h=location.hash.replace(/^#\/?/,""); const [path,qs]=h.split("?"); const q=Object.fromEntries(new URLSearchParams(qs||""));
  const parts=path.split("/");
  document.querySelectorAll("#nav a").forEach(a=>a.classList.toggle("on", a.dataset.r===(path||"home") || a.dataset.r===parts[0] || (parts[0]==="pelajaran" && a.dataset.r==="modul/"+(parts[1]||"").charAt(0).toUpperCase())));
  document.getElementById("side").classList.remove("open");
  const pages={lab:window.Lab,bsum:window.BSum,broker:window.BrokerDict,asing:window.Asing,cfa:window.CFA,tools:window.Tools,pustaka:window.Books,
    pemula:window.Beginner,ekspektasi:window.Expect,indeks:window.Indices,global:window.Global,riset:window.Research,indikator:window.Indicators,pelan:window.Guide};
  if(!path) home();
  else if(parts[0]==="modul") modul(parts[1]);
  else if(parts[0]==="pelajaran") lesson(parts[1]);
  else if(parts[0]==="istilah") glossaryPage(q);
  else if(pages[parts[0]]){ active=pages[parts[0]]; active.mount(view,q,parts.slice(1)); }
  else notFound();
  if(!(parts[0]==="tools"&&q.t)) window.scrollTo(0,0);
}
window.addEventListener("hashchange",route);
window.addEventListener("langchange",()=>{ drawNav(); route(); });
document.getElementById("menuBtn").onclick=()=>document.getElementById("side").classList.toggle("open");
const th=localStorage.getItem("sb_theme"); if(th) document.documentElement.dataset.theme=th;
document.getElementById("themeBtn").onclick=()=>{ const n=document.documentElement.dataset.theme==="light"?"dark":"light"; document.documentElement.dataset.theme=n; localStorage.setItem("sb_theme",n); };
document.querySelectorAll("#langBtns button").forEach(b=>b.onclick=()=>window.setLang(b.dataset.l));
drawNav(); route();
})();
