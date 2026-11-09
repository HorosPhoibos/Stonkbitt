/* Grafik SVG + matematika indikator. Dipakai Kelas Pemula & Lab Indikator. */
(function(){
/* PRNG ber-seed agar grafik contoh selalu sama */
function rng(seed){ let s=seed>>>0||1; return ()=>{ s^=s<<13; s>>>=0; s^=s>>17; s^=s<<5; s>>>=0; return s/4294967296; }; }
const tick=p=>p<200?1:p<500?2:p<2000?5:p<5000?10:25;
const rt=p=>Math.max(1,Math.round(p/tick(p))*tick(p));

/* Buat OHLCV dari rangkaian "drift" per segmen: [[jumlah hari, drift%/hari, vol%, volMult], ...] */
function gen(seed, start, segs){
  const r=rng(seed); let p=start; const out=[]; let d=0;
  const nrm=()=>{ let u=0,v=0; while(!u)u=r(); while(!v)v=r(); return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v); };
  for(const [n,drift,vol,vm=1,gap=0] of segs){
    for(let i=0;i<n;i++){
      const o = i===0&&gap ? p*(1+gap/100) : p*(1+nrm()*vol/300);
      const c = o*(1+drift/100+nrm()*vol/100);
      const hi=Math.max(o,c)*(1+Math.abs(nrm())*vol/250), lo=Math.min(o,c)*(1-Math.abs(nrm())*vol/250);
      const v=Math.round((1+Math.abs(nrm())*.6)*vm*(1+Math.abs(c-o)/o*25)*1e5);
      out.push({d:d++,o:rt(o),h:rt(hi),l:rt(lo),c:rt(c),v}); p=c;
    }
  }
  return out;
}

/* ---------- indikator ---------- */
const sma=(a,n)=>a.map((_,i)=>i<n-1?null:a.slice(i-n+1,i+1).reduce((s,x)=>s+x,0)/n);
function ema(a,n){ const k=2/(n+1); let e=null; return a.map((x,i)=>{ if(i<n-1) return null; if(e===null){ e=a.slice(0,n).reduce((s,y)=>s+y,0)/n; return e; } e=x*k+e*(1-k); return e; }); }
function rsi(c,n=14){ // Wilder
  const out=Array(c.length).fill(null); let g=0,l=0;
  for(let i=1;i<c.length;i++){ const ch=c[i]-c[i-1]; const up=Math.max(ch,0), dn=Math.max(-ch,0);
    if(i<=n){ g+=up; l+=dn; if(i===n){ g/=n; l/=n; out[i]=l===0?100:100-100/(1+g/l);} }
    else { g=(g*(n-1)+up)/n; l=(l*(n-1)+dn)/n; out[i]=l===0?100:100-100/(1+g/l); } }
  return out; }
function macd(c,f=12,s=26,sg=9){ const a=ema(c,f), b=ema(c,s); const m=c.map((_,i)=>a[i]!=null&&b[i]!=null?a[i]-b[i]:null);
  const first=m.findIndex(x=>x!=null); const sigP=ema(m.slice(first),sg); const sig=m.map((_,i)=>i<first?null:sigP[i-first]);
  return {m,sig,h:m.map((x,i)=>x!=null&&sig[i]!=null?x-sig[i]:null)}; }
function boll(c,n=20,k=2){ const mid=sma(c,n); return {mid,up:mid.map((m,i)=>{ if(m==null) return null; const s=c.slice(i-n+1,i+1); const sd=Math.sqrt(s.reduce((a,x)=>a+(x-m)**2,0)/n); return m+k*sd; }),
  lo:mid.map((m,i)=>{ if(m==null) return null; const s=c.slice(i-n+1,i+1); const sd=Math.sqrt(s.reduce((a,x)=>a+(x-m)**2,0)/n); return m-k*sd; })}; }
function ichimoku(D,t=9,k=26,s=52){
  const mid=(i,n)=>{ if(i<n-1) return null; let hi=-1e18,lo=1e18; for(let j=i-n+1;j<=i;j++){ hi=Math.max(hi,D[j].h); lo=Math.min(lo,D[j].l);} return (hi+lo)/2; };
  const N=D.length; const tenkan=D.map((_,i)=>mid(i,t)), kijun=D.map((_,i)=>mid(i,k));
  // span A/B diproyeksikan 26 bar ke depan → nilai yang berlaku DI bar i berasal dari i-26
  const spanA=Array(N).fill(null), spanB=Array(N).fill(null);
  for(let i=0;i<N;i++){ const j=i-k; if(j>=0){ if(tenkan[j]!=null&&kijun[j]!=null) spanA[i]=(tenkan[j]+kijun[j])/2; spanB[i]=mid(j,s); } }
  const chikou=D.map((_,i)=> i+k<N ? D[i+k].c : null); // digambar 26 bar ke belakang
  return {tenkan,kijun,spanA,spanB,chikou}; }
function swing(D,from,to){ let hi=-1,lo=1e18,hiI=from,loI=from; for(let i=from;i<=to;i++){ if(D[i].h>hi){hi=D[i].h;hiI=i;} if(D[i].l<lo){lo=D[i].l;loI=i;} } return {hi,lo,hiI,loI}; }
function fibLevels(hi,lo,upTrend=true){ const r=[0,.236,.382,.5,.618,.786,1]; return r.map(x=>({r:x, p: upTrend? hi-(hi-lo)*x : lo+(hi-lo)*x})); }

/* ---------- renderer SVG ----------
 opts: {w,h, type:'candle'|'line', vol:true, lines:[{a:[...],col,w,dash,label}], bands:[{up,lo,col}], hl:[{p,label,col,dash}],
        marks:[{i,label,col,pos:'above'|'below'}], zones:[{i0,i1,label,col}], sub:{a:[...],min,max,levels:[30,70],label}, title} */
function draw(D, o={}){
  const css=getComputedStyle(document.documentElement);
  const C=n=>css.getPropertyValue(n).trim()||"#888";
  const W=o.w||760, subH=o.sub?110:0, volH=o.vol===false?0:70, mainH=o.h||300, H=mainH+volH+subH+30, padL=8, padR=58, n=D.length;
  const cw=(W-padL-padR)/n;
  const R=D.filter(x=>x&&x.c!=null); let mn=Math.min(...R.map(x=>x.l)), mx=Math.max(...R.map(x=>x.h));
  (o.lines||[]).forEach(L=>L.a.forEach(v=>{ if(v!=null){ mn=Math.min(mn,v); mx=Math.max(mx,v);} }));
  (o.bands||[]).forEach(B=>{ B.up.forEach(v=>v!=null&&(mx=Math.max(mx,v))); B.lo.forEach(v=>v!=null&&(mn=Math.min(mn,v))); });
  (o.hl||[]).forEach(h=>{ mn=Math.min(mn,h.p); mx=Math.max(mx,h.p); });
  const pad=(mx-mn)*.06; mn-=pad; mx+=pad;
  const X=i=>padL+cw*(i+.5), Y=p=>10+(mx-p)/(mx-mn)*(mainH-10);
  const up=C("--up"), dn=C("--down"), ln=C("--line"), mu=C("--muted"), tx=C("--text");
  let s=`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${(o.title||"grafik").replace(/"/g,"")}" font-family="JetBrains Mono, monospace" font-size="11">`;
  // grid
  for(let k=0;k<=4;k++){ const p=mn+(mx-mn)*k/4; s+=`<line x1="${padL}" x2="${W-padR}" y1="${Y(p)}" y2="${Y(p)}" stroke="${ln}" stroke-width="1"/><text x="${W-padR+6}" y="${Y(p)+4}" fill="${mu}">${Math.round(p).toLocaleString("id-ID")}</text>`; }
  (o.zones||[]).forEach(z=>{ s+=`<rect x="${X(z.i0)-cw/2}" y="10" width="${(z.i1-z.i0+1)*cw}" height="${mainH-10}" fill="${z.col||C("--brand")}" opacity=".09"/>${z.label?`<text x="${X(z.i0)}" y="24" fill="${z.col||C("--brand")}" font-weight="700">${z.label}</text>`:""}`; });
  (o.bands||[]).forEach(B=>{ let pts=[],pts2=[]; for(let i=0;i<n;i++){ if(B.up[i]!=null&&B.lo[i]!=null){ pts.push(`${X(i)},${Y(B.up[i])}`); pts2.unshift(`${X(i)},${Y(B.lo[i])}`);} }
    if(B.split){ // awan ichimoku: warna tergantung A>B
      for(let i=1;i<n;i++){ const a0=B.up[i-1],a1=B.up[i],b0=B.lo[i-1],b1=B.lo[i]; if([a0,a1,b0,b1].some(v=>v==null)) continue;
        s+=`<polygon points="${X(i-1)},${Y(a0)} ${X(i)},${Y(a1)} ${X(i)},${Y(b1)} ${X(i-1)},${Y(b0)}" fill="${a1>=b1?up:dn}" opacity=".16"/>`; } }
    else if(pts.length) s+=`<polygon points="${pts.join(" ")} ${pts2.join(" ")}" fill="${B.col||C("--accent")}" opacity=".1"/>`; });
  (o.hl||[]).forEach(h=>{ s+=`<line x1="${padL}" x2="${W-padR}" y1="${Y(h.p)}" y2="${Y(h.p)}" stroke="${h.col||C("--gold")}" stroke-width="1.3" ${h.dash!==false?'stroke-dasharray="5 4"':""}/>${h.label?`<text x="${padL+4}" y="${Y(h.p)-4}" fill="${h.col||C("--gold")}" font-weight="700">${h.label}</text>`:""}`; });
  // harga
  if(o.type==="line"){ s+=`<polyline fill="none" stroke="${tx}" stroke-width="1.8" points="${D.map((x,i)=>x.c==null?"":`${X(i)},${Y(x.c)}`).join(" ")}"/>`; }
  else D.forEach((x,i)=>{ if(x.c==null) return; const col=x.c>=x.o?up:dn; const bw=Math.max(1,cw*.62); s+=`<line x1="${X(i)}" x2="${X(i)}" y1="${Y(x.h)}" y2="${Y(x.l)}" stroke="${col}" stroke-width="1"/><rect x="${X(i)-bw/2}" y="${Y(Math.max(x.o,x.c))}" width="${bw}" height="${Math.max(1,Math.abs(Y(x.o)-Y(x.c)))}" fill="${x.c>=x.o?"none":col}" stroke="${col}" stroke-width="1"/>`; });
  (o.lines||[]).forEach(L=>{ let d="",pen=false; L.a.forEach((v,i)=>{ if(v==null){pen=false;return;} d+=(pen?"L":"M")+X(i)+","+Y(v); pen=true; });
    s+=`<path d="${d}" fill="none" stroke="${L.col||C("--accent")}" stroke-width="${L.w||1.6}" ${L.dash?`stroke-dasharray="${L.dash}"`:""}/>`; });
  (o.vl||[]).forEach(v=>{ s+=`<line x1="${X(v.i)}" x2="${X(v.i)}" y1="10" y2="${H-20}" stroke="${v.col||C("--gold")}" stroke-width="1.5" stroke-dasharray="4 3"/>${v.label?`<text x="${X(v.i)+4}" y="${H-24}" fill="${v.col||C("--gold")}" font-weight="700">${v.label}</text>`:""}`; });
  (o.marks||[]).forEach(m=>{ const x=D[m.i]; if(!x||x.c==null) return; const above=m.pos!=="below"; const y=above?Y(x.h)-8:Y(x.l)+16; const col=m.col||C("--accent");
    s+=`<text x="${X(m.i)}" y="${y}" text-anchor="middle" fill="${col}" font-weight="700" font-size="12">${above?"▼":"▲"} ${m.label||""}</text>`; });
  // legend
  const leg=(o.lines||[]).filter(L=>L.label); if(leg.length){ let lx=padL+6; leg.forEach(L=>{ s+=`<rect x="${lx}" y="${mainH-14}" width="12" height="3" fill="${L.col}"/><text x="${lx+16}" y="${mainH-9}" fill="${mu}">${L.label}</text>`; lx+=L.label.length*7+34; }); }
  // volume
  if(volH){ const vm=Math.max(...R.map(x=>x.v)); const vy=mainH+12; D.forEach((x,i)=>{ if(x.c==null) return; const hh=x.v/vm*(volH-12); s+=`<rect x="${X(i)-Math.max(1,cw*.62)/2}" y="${vy+volH-12-hh}" width="${Math.max(1,cw*.62)}" height="${hh}" fill="${x.c>=x.o?up:dn}" opacity=".45"/>`; });
    s+=`<text x="${W-padR+6}" y="${vy+12}" fill="${mu}">Vol</text>`; }
  // sub panel (RSI dll.)
  if(o.sub){ const top=mainH+volH+16, sh=subH-10, smin=o.sub.min??0, smax=o.sub.max??100; const SY=v=>top+(smax-v)/(smax-smin)*sh;
    s+=`<rect x="${padL}" y="${top}" width="${W-padL-padR}" height="${sh}" fill="none" stroke="${ln}"/>`;
    (o.sub.zones||[]).forEach(z=>{ s+=`<rect x="${padL}" y="${SY(z.hi)}" width="${W-padL-padR}" height="${SY(z.lo)-SY(z.hi)}" fill="${z.col}" opacity=".1"/>`; });
    (o.sub.levels||[]).forEach(l=>{ s+=`<line x1="${padL}" x2="${W-padR}" y1="${SY(l)}" y2="${SY(l)}" stroke="${mu}" stroke-dasharray="3 3" opacity=".6"/><text x="${W-padR+6}" y="${SY(l)+4}" fill="${mu}">${l}</text>`; });
    let d="",pen=false; o.sub.a.forEach((v,i)=>{ if(v==null){pen=false;return;} d+=(pen?"L":"M")+X(i)+","+SY(v); pen=true; });
    s+=`<path d="${d}" fill="none" stroke="${C("--violet")}" stroke-width="1.6"/><text x="${padL+4}" y="${top+12}" fill="${mu}">${o.sub.label||""}</text>`;
    if(o.sub.b){ let d2="",p2=false; o.sub.b.forEach((v,i)=>{ if(v==null){p2=false;return;} d2+=(p2?"L":"M")+X(i)+","+SY(v); p2=true; }); s+=`<path d="${d2}" fill="none" stroke="${C("--gold")}" stroke-width="1.3"/>`; } }
  return s+"</svg>";
}
function fig(D,o,cap){ return `<figure class="chartbox">${draw(D,o)}${cap?`<figcaption>${cap}</figcaption>`:""}</figure>`; }

window.Charts={gen,draw,fig,sma,ema,rsi,macd,boll,ichimoku,swing,fibLevels,rng,tick,rt};
})();
