/* Lab Indikator: penjelasan + grafik + backtest (Fibonacci, RSI, Ichimoku, MA, MACD, Bollinger, kombinasi). */
(function(){
const T=o=>window.T(o);
const C=()=>window.Charts;
let DATA=null, NAME="";

const IND={
 fib:{t:"Fibonacci Retracement",
  what:{id:"Setelah satu gelombang naik (dari swing low ke swing high), harga sering koreksi ke level 23,6%, 38,2%, 50%, 61,8%, atau 78,6% sebelum melanjutkan tren. Level ini populer karena banyak orang memakainya — antrian beli menumpuk di sana, sehingga ia bekerja sebagian karena 'self-fulfilling'.",en:"After an up-swing (swing low to swing high), price often pulls back to 23.6%, 38.2%, 50%, 61.8% or 78.6% before resuming. The levels are popular because many people use them — buy orders cluster there, so they work partly as a self-fulfilling effect."},
  how:{id:["Pastikan tren utama naik (harga di atas MA50/MA200).","Tarik Fibonacci dari swing low ke swing high yang jelas (bukan sembarang candle).","Zona utama: 38,2%–61,8%. Tunggu harga masuk zona dengan volume mengecil.","Pemicu: candle naik / ekor bawah panjang / absorption di order book di zona itu.","Stop: di bawah 78,6%. Target: swing high sebelumnya, lalu ekstensi 127,2%/161,8%."],en:["Make sure the main trend is up (price above the 50/200-day MA).","Draw from a clear swing low to swing high (not any random candle).","Key zone: 38.2%–61.8%. Wait for price to enter it on shrinking volume.","Trigger: an up candle / long lower wick / absorption in the order book inside the zone.","Stop: below 78.6%. Target: the prior swing high, then 127.2%/161.8% extensions."]},
  trap:{id:"Swing yang dipilih setelah melihat grafik membuat semua level 'terlihat' bekerja. Uji dengan aturan tetap (mis. swing 60 hari terakhir).",en:"Choosing the swing after seeing the chart makes every level 'look' like it works. Test with a fixed rule (e.g. the last 60-day swing)."}},
 rsi:{t:"RSI (Relative Strength Index)",
  what:{id:"Osilator momentum 0–100 dari J. Welles Wilder (1978): membandingkan rata-rata kenaikan dan penurunan 14 periode. RSI tinggi = kenaikan mendominasi; rendah = penurunan mendominasi.",en:"A 0–100 momentum oscillator by J. Welles Wilder (1978): compares average gains and losses over 14 periods. High RSI = gains dominate; low = losses dominate."},
  how:{id:["Di uptrend, RSI biasanya bergerak 40–80; di downtrend 20–60. Kenali rezimnya dulu.","Mode reversal (sideways): beli saat RSI keluar dari bawah 30, jual di 50–70.","Mode momentum (tren): beli saat RSI naik kembali di atas 50 setelah pullback, selama harga di atas MA200.","Divergensi: harga lower low tapi RSI higher low = tenaga jual melemah (butuh konfirmasi).","Jangan jual hanya karena RSI > 70 di tren kuat — RSI bisa tinggal lama di sana."],en:["In uptrends RSI usually ranges 40–80; in downtrends 20–60. Identify the regime first.","Reversal mode (sideways): buy when RSI climbs back above 30, sell at 50–70.","Momentum mode (trend): buy when RSI recrosses 50 after a pullback, while price is above the 200-day MA.","Divergence: price makes a lower low but RSI a higher low = selling pressure fading (needs confirmation).","Don't sell just because RSI > 70 in a strong trend — it can stay there for weeks."]},
  trap:{id:"Membeli 'karena RSI oversold' di saham yang sedang downtrend kuat (menangkap pisau).",en:"Buying 'because RSI is oversold' in a stock in a strong downtrend (catching a falling knife)."}},
 ichi:{t:"Ichimoku Kinko Hyo (Cloud)",
  what:{id:"Sistem Jepang (Goichi Hosoda) yang menampilkan tren, momentum, dan support/resistance sekaligus: Tenkan-sen (tengah high-low 9 periode), Kijun-sen (26), Senkou Span A & B (awan/kumo, diproyeksikan 26 periode ke depan), dan Chikou Span (close digeser 26 periode ke belakang).",en:"A Japanese system (Goichi Hosoda) showing trend, momentum and support/resistance at once: Tenkan-sen (9-period high-low midpoint), Kijun-sen (26), Senkou Span A & B (the cloud/kumo, projected 26 periods ahead) and the Chikou Span (close shifted 26 periods back)."},
  how:{id:["Tren: harga di atas awan = naik, di bawah = turun, di dalam = netral/hindari.","Awan hijau (Span A > Span B) dan tebal = support kuat.","Sinyal beli kuat: harga di atas awan + Tenkan memotong Kijun ke atas + Chikou di atas harga 26 hari lalu.","Kijun-sen berfungsi sebagai trailing stop: keluar bila close di bawah Kijun.","Untuk saham IDX yang sering bergerak liar, pakai di timeframe harian/mingguan, bukan menit."],en:["Trend: price above the cloud = up, below = down, inside = neutral/avoid.","A green (Span A > Span B) and thick cloud = strong support.","Strong buy: price above the cloud + Tenkan crosses above Kijun + Chikou above the price 26 days ago.","Kijun-sen works as a trailing stop: exit on a close below Kijun.","For jumpy IDX stocks, use daily/weekly, not minute charts."]},
  trap:{id:"Banyak sinyal palsu saat harga di dalam awan atau saham sideways. Ichimoku paling berguna di saham yang sedang tren.",en:"Lots of false signals when price is inside the cloud or ranging. Ichimoku is most useful in trending stocks."}},
 ma:{t:"Moving Average (MA20/50/200)",
  what:{id:"Rata-rata harga N hari. MA200 ≈ tren 1 tahun; MA50 tren menengah; MA20 tren pendek. Basis riset time-series momentum & aturan Brock dkk. (1992).",en:"Average price over N days. The 200-day ≈ one-year trend; 50-day the medium trend; 20-day the short trend. Basis of time-series momentum research and the Brock et al. (1992) rules."},
  how:{id:["Filter: hanya posisi beli bila close > MA200.","Golden cross: MA50 memotong MA200 ke atas (lambat tapi kuat).","Pullback ke MA20/MA50 dalam uptrend = area beli; tembus ke bawah dengan volume = waspada."],en:["Filter: only long when close > 200-day MA.","Golden cross: 50-day crosses above 200-day (slow but robust).","Pullbacks to the 20/50-day in an uptrend = buy zones; breaking below on volume = caution."]},
  trap:{id:"Di pasar sideways, persilangan MA menghasilkan banyak rugi kecil (whipsaw).",en:"In sideways markets, MA crosses produce many small losses (whipsaws)."}},
 macd:{t:"MACD",
  what:{id:"EMA12 − EMA26 (garis MACD), dengan EMA9 dari MACD sebagai garis sinyal. Histogram = jarak keduanya. Mengukur perubahan momentum.",en:"EMA12 − EMA26 (MACD line), with an EMA9 of MACD as the signal line. Histogram = the gap between them. Measures changes in momentum."},
  how:{id:["Beli saat MACD memotong sinyal ke atas, lebih kuat bila di atas nol.","Histogram mengecil = momentum melemah sebelum harga berbalik.","Divergensi seperti RSI."],en:["Buy when MACD crosses above the signal, stronger above zero.","A shrinking histogram = momentum fading before price turns.","Divergences as with RSI."]},
  trap:{id:"Lagging — sinyal sering datang setelah sebagian besar pergerakan selesai.",en:"Lagging — signals often arrive after much of the move is done."}},
 bb:{t:"Bollinger Bands",
  what:{id:"MA20 ± 2 simpangan baku. Band melebar saat volatil, menyempit (squeeze) saat tenang.",en:"20-day MA ± 2 standard deviations. Bands widen when volatile, squeeze when calm."},
  how:{id:["Squeeze → tunggu breakout dengan volume; arah breakout menentukan posisi.","Di sideways: sentuh band bawah lalu close kembali di dalam = peluang mean-reversion ke MA20.","Di tren kuat harga bisa 'berjalan' di band atas."],en:["Squeeze → wait for a breakout on volume; its direction sets the trade.","In ranges: touch the lower band then close back inside = mean-reversion towards the MA20.","In strong trends price can 'walk' the upper band."]},
  trap:{id:"Menjual hanya karena menyentuh band atas di tren kuat.",en:"Selling just because price touched the upper band in a strong trend."}},
};

/* ---------- strategi ---------- */
const STRATS={
 ma200:{n:{id:"Filter tren: close > MA200",en:"Trend filter: close > 200-day MA"}},
 macross:{n:{id:"MA20 memotong MA50",en:"20-day crosses 50-day MA"}},
 rsirev:{n:{id:"RSI reversal (keluar dari <30, jual ≥55)",en:"RSI reversal (exit <30, sell ≥55)"}},
 rsimom:{n:{id:"RSI momentum (>50 & di atas MA200)",en:"RSI momentum (>50 & above 200-day MA)"}},
 macd:{n:{id:"MACD memotong sinyal",en:"MACD signal cross"}},
 bb:{n:{id:"Bollinger mean-reversion",en:"Bollinger mean reversion"}},
 ichi:{n:{id:"Ichimoku: atas awan + Tenkan>Kijun + Chikou",en:"Ichimoku: above cloud + Tenkan>Kijun + Chikou"}},
 fib:{n:{id:"Fibonacci pullback 38,2–61,8% dalam uptrend",en:"Fibonacci 38.2–61.8% pullback in uptrend"}},
 combo:{n:{id:"Kombinasi: Ichimoku + RSI + Fibonacci",en:"Combo: Ichimoku + RSI + Fibonacci"}},
};
function prep(D){
  const c=D.map(x=>x.c); const I={c,ma20:C().sma(c,20),ma50:C().sma(c,50),ma200:C().sma(c,200),rsi:C().rsi(c,14),macd:C().macd(c),bb:C().boll(c),ich:C().ichimoku(D)};
  // fib: swing 60 bar sebelumnya
  I.fib=D.map((_,i)=>{ if(i<61) return null; const s=C().swing(D,i-60,i-1); if(s.loI>=s.hiI) return null; const r=s.hi-s.lo; return {hi:s.hi,lo:s.lo,f382:s.hi-r*.382,f618:s.hi-r*.618,f786:s.hi-r*.786}; });
  return I;
}
function signals(key,D,I){
  const n=D.length, sig=Array(n).fill(0); // 1 masuk, -1 keluar
  const above=(i)=>I.ich.spanA[i]!=null&&I.ich.spanB[i]!=null&&D[i].c>Math.max(I.ich.spanA[i],I.ich.spanB[i]);
  const ichiOK=i=>above(i)&&I.ich.tenkan[i]>I.ich.kijun[i]&&(i<26||D[i].c>D[i-26].c);
  const inFib=i=>{ const f=I.fib[i]; return f && D[i].l<=f.f382 && D[i].l>=f.f786; };
  for(let i=1;i<n;i++){
    const r=I.rsi[i], rp=I.rsi[i-1];
    switch(key){
     case"ma200": if(I.ma200[i]!=null){ if(D[i].c>I.ma200[i]&&D[i-1].c<=I.ma200[i-1]) sig[i]=1; else if(D[i].c<I.ma200[i]) sig[i]=-1; } break;
     case"macross": if(I.ma50[i]!=null&&I.ma50[i-1]!=null){ if(I.ma20[i]>I.ma50[i]&&I.ma20[i-1]<=I.ma50[i-1]) sig[i]=1; else if(I.ma20[i]<I.ma50[i]) sig[i]=-1; } break;
     case"rsirev": if(r!=null&&rp!=null){ if(rp<30&&r>=30) sig[i]=1; else if(r>=55) sig[i]=-1; } break;
     case"rsimom": if(r!=null&&rp!=null&&I.ma200[i]!=null){ if(rp<50&&r>=50&&D[i].c>I.ma200[i]) sig[i]=1; else if(r<40) sig[i]=-1; } break;
     case"macd": { const m=I.macd.m,s=I.macd.sig; if(m[i]!=null&&s[i]!=null&&m[i-1]!=null&&s[i-1]!=null){ if(m[i]>s[i]&&m[i-1]<=s[i-1]) sig[i]=1; else if(m[i]<s[i]) sig[i]=-1; } } break;
     case"bb": { const b=I.bb; if(b.lo[i]!=null&&b.lo[i-1]!=null){ if(D[i-1].c<b.lo[i-1]&&D[i].c>=b.lo[i]) sig[i]=1; else if(D[i].c>=b.mid[i]) sig[i]=-1; } } break;
     case"ichi": if(I.ich.kijun[i]!=null){ if(ichiOK(i)&&!ichiOK(i-1)) sig[i]=1; else if(D[i].c<I.ich.kijun[i]) sig[i]=-1; } break;
     case"fib": { const f=I.fib[i]; if(f&&I.ma50[i]!=null&&D[i].c>I.ma50[i]*0.97&&inFib(i)&&D[i].c>D[i].o) sig[i]=1; else if(f&&(D[i].c<f.f786||D[i].h>=f.hi)) sig[i]=-1; } break;
     case"combo": { const f=I.fib[i]; const recentFib=[0,1,2,3,4].some(k=>i-k>0&&inFib(i-k));
       if(f&&I.ich.kijun[i]!=null&&r!=null){ if(above(i)&&r>45&&rp<=r&&recentFib&&D[i].c>D[i].o) sig[i]=1; else if(D[i].c<I.ich.kijun[i]||D[i].c<f.f786) sig[i]=-1; } } break;
    }
  }
  return sig;
}
function backtest(D,sig,opt){
  const fb=opt.fb/100, fs=opt.fs/100, sl=opt.sl/100, tp=opt.tp/100; const trades=[]; let pos=null;
  for(let i=0;i<D.length;i++){
    if(pos){ const stop=pos.p*(1-sl), tgt=tp>0?pos.p*(1+tp):Infinity; let exit=null, why="";
      if(sl>0&&D[i].l<=stop){ exit=Math.min(D[i].o,stop); why="SL"; }
      else if(D[i].h>=tgt){ exit=Math.max(D[i].o,tgt); why="TP"; }
      else if(sig[i]===-1){ exit=D[i].c; why="sig"; }
      else if(i-pos.i>=opt.max){ exit=D[i].c; why="time"; }
      if(exit!=null){ const ret=(exit*(1-fs))/(pos.p*(1+fb))-1; trades.push({i0:pos.i,i1:i,p0:pos.p,p1:exit,ret,why}); pos=null; continue; } }
    if(!pos&&sig[i]===1&&i+1<D.length){ pos={i:i+1,p:D[i+1].o}; }
  }
  return trades;
}
function stats(tr,D,i0=0,i1=D.length-1){
  const t=tr.filter(x=>x.i0>=i0&&x.i0<=i1); const n=t.length; const w=t.filter(x=>x.ret>0);
  const wr=n?w.length/n:0; const z=1.96, lo=n?((wr+z*z/(2*n))-z*Math.sqrt(wr*(1-wr)/n+z*z/(4*n*n)))/(1+z*z/n):0, hi=n?((wr+z*z/(2*n))+z*Math.sqrt(wr*(1-wr)/n+z*z/(4*n*n)))/(1+z*z/n):0;
  const aw=w.length?w.reduce((s,x)=>s+x.ret,0)/w.length:0, ls=t.filter(x=>x.ret<=0), al=ls.length?ls.reduce((s,x)=>s+x.ret,0)/ls.length:0;
  let eq=1,pk=1,dd=0; t.forEach(x=>{ eq*=1+x.ret; pk=Math.max(pk,eq); dd=Math.max(dd,1-eq/pk); });
  const bh=D[i1].c/D[i0].c-1; const days=t.reduce((s,x)=>s+(x.i1-x.i0),0);
  return {n,wr,lo,hi,aw,al,exp:n?t.reduce((s,x)=>s+x.ret,0)/n:0,tot:eq-1,dd,bh,exposure:days/(i1-i0+1)};
}

/* ---------- data ---------- */
function demo(seed){ return C().gen(seed,2400,[[120,.12,1.6],[80,-.25,2.0,1.3],[60,0,1.2,.8],[150,.18,1.5],[90,-.05,1.8],[120,.1,1.4],[90,-.3,2.2,1.4],[50,.2,1.7]]); }
function parseCSV(txt){
  const lines=txt.trim().split(/\r?\n/); const sep=lines[0].includes(";")&&!lines[0].includes(",")?";":",";
  const h=lines[0].split(sep).map(s=>s.trim().toLowerCase().replace(/"/g,""));
  const col=names=>h.findIndex(x=>names.some(n=>x===n||x.startsWith(n)));
  const id=col(["date","tanggal","time"]), io=col(["open","pembukaan"]), ih=col(["high","tertinggi"]), il=col(["low","terendah"]), ic=h.findIndex(x=>x==="close"||x==="penutupan"||x==="terakhir"||x==="price"), iv=col(["volume","vol"]);
  if([io,ih,il,ic].some(x=>x<0)) throw new Error(T({id:"Kolom Open/High/Low/Close tidak ditemukan.",en:"Open/High/Low/Close columns not found."}));
  const num=s=>parseFloat(String(s).replace(/"/g,"").replace(/,/g,""));
  let D=lines.slice(1).map(l=>l.split(sep)).map(a=>({t:a[id],o:num(a[io]),h:num(a[ih]),l:num(a[il]),c:num(a[ic]),v:iv>=0?num(a[iv]):0})).filter(x=>[x.o,x.h,x.l,x.c].every(isFinite)&&x.c>0);
  if(D.length>1 && new Date(D[0].t)>new Date(D[D.length-1].t)) D.reverse();
  return D.map((x,i)=>({...x,d:i}));
}

/* ---------- Sumber data — machine "indicatorData": ready | loading | error ----------
   LOAD(file) → loading; LOADED/FAIL hanya diterima bila token cocok dengan berkas terakhir (berkas lama yang selesai belakangan diabaikan).
   Halaman hanya digambar ulang bila Lab Indikator masih terbuka — pindah halaman saat memuat tidak lagi menimpa halaman lain. */
let mountedEl=null;
const demoName=()=>T({id:"Data demo (acak, fiktif)",en:"Demo data (random, fictional)"});
function setStatus(){ const st=mountedEl&&mountedEl.querySelector("#ilStatus"); if(!st) return; const c=dataM.context;
  st.className="hint il-status "+dataM.state;
  st.textContent = dataM.is("loading") ? T({id:`Memuat ${c.file}…`,en:`Loading ${c.file}…`}) : dataM.is("error") ? "⚠️ "+c.msg : "";
  const up=mountedEl.querySelector("#ilFile"); if(up) up.disabled=dataM.is("loading"); }
function readFile(c,f){ const tok=c.token; const rd=new FileReader();
  rd.onload=()=>{ try{ const D=parseCSV(rd.result); if(D.length<260) throw new Error(T({id:"Butuh minimal ±260 baris harian (1 tahun).",en:"Need at least ~260 daily rows (1 year)."})); dataM.send("LOADED",{token:tok,D,name:f.name}); }catch(err){ dataM.send("FAIL",{token:tok,msg:err.message}); } };
  rd.onerror=()=>dataM.send("FAIL",{token:tok,msg:T({id:"Berkas tidak bisa dibaca.",en:"The file could not be read."})});
  rd.readAsText(f); }
const dataM=window.Machines.create({ id:"indicatorData", initial:"ready", context:{token:0,file:"",msg:""}, states:{
  ready:{ enter:()=>{ if(mountedEl&&mountedEl.isConnected) mount(mountedEl); }, on:{
    LOAD:{ target:"loading", action:(c,f)=>{ c.token++; c.file=f.name; } },
    DEMO:{ action:()=>{ DATA=demo(Math.floor(Math.random()*1e6)); NAME=demoName(); if(mountedEl&&mountedEl.isConnected) mount(mountedEl); } } } },
  loading:{ enter:(c,f)=>{ setStatus(); readFile(c,f); },
    on:{ LOADED:{ target:"ready", guard:(c,p)=>p.token===c.token, action:(c,p)=>{ DATA=p.D; NAME=p.name; } },
      FAIL:{ target:"error", guard:(c,p)=>p.token===c.token, action:(c,p)=>{ c.msg=p.msg; } },
      LOAD:{ target:"loading", action:(c,f)=>{ c.token++; c.file=f.name; setStatus(); readFile(c,f); } } } },
  error:{ enter:()=>setStatus(), on:{
    LOAD:{ target:"loading", action:(c,f)=>{ c.token++; c.file=f.name; } },
    DEMO:{ target:"ready", action:()=>{ DATA=demo(Math.floor(Math.random()*1e6)); NAME=demoName(); } },
    DISMISS:"ready" } } } });

/* ---------- UI ---------- */
function mount(el){
  mountedEl=el;
  if(!DATA){ DATA=demo(7); NAME=demoName(); }
  el.innerHTML=`<div class="kicker">${T({id:"Latihan · Teknikal",en:"Practice · Technicals"})}</div>
  <h1>${T({id:"Lab Indikator: Fibonacci, RSI, Ichimoku & lainnya",en:"Indicator Lab: Fibonacci, RSI, Ichimoku & more"})}</h1>
  <p class="lead">${T({id:"Pelajari cara kerja tiap indikator, lihat di grafik, lalu <b>ukur sendiri peluangnya</b> lewat backtest — termasuk gabungan beberapa indikator. Unggah data harga saham IDX (CSV) untuk hasil nyata.",en:"Learn how each indicator works, see it on a chart, then <b>measure its odds yourself</b> with a backtest — including combinations. Upload IDX price data (CSV) for real results."})}</p>
  <div class="note warn"><b>${T({id:"Tentang 'probabilitas'.",en:"About 'probability'."})}</b> ${T({id:"Tidak ada angka win rate universal untuk RSI, Fibonacci, atau Ichimoku. Hasil berbeda per saham, periode, dan biaya. Itulah sebabnya lab ini menghitung win rate beserta <b>rentang keyakinan 95%</b> dan membandingkan periode <b>in-sample</b> (70% awal) dengan <b>out-of-sample</b> (30% akhir). Data demo adalah harga acak — kalau strategi 'untung' di sana, itu kebetulan, bukan keahlian.",en:"There is no universal win rate for RSI, Fibonacci or Ichimoku. Results differ by stock, period and costs. That's why this lab reports the win rate with a <b>95% confidence range</b> and compares the <b>in-sample</b> (first 70%) with the <b>out-of-sample</b> (last 30%) period. Demo data is a random walk — if a strategy 'profits' there, that's luck, not skill."})}</div>
  <div class="card">
   <div class="controls" style="margin-top:0"><b>${T({id:"Data:",en:"Data:"})}</b> <span id="ilName">${NAME}</span> · <span class="hint" id="ilBars">${DATA.length} bar</span></div>
   <div class="controls"><label class="btn sec" style="cursor:pointer">📄 ${T({id:"Unggah CSV",en:"Upload CSV"})}<input type="file" id="ilFile" accept=".csv,text/csv" hidden></label>
    <button class="btn sec" id="ilDemo">🎲 ${T({id:"Data demo baru",en:"New demo data"})}</button></div>
   <p id="ilStatus" class="hint il-status" role="status" aria-live="polite"></p>
   <p class="hint">${T({id:"Format: kolom Date, Open, High, Low, Close, Volume (harian). Contoh sumber: unduh 'Historical Data' saham berakhiran <code>.JK</code> (mis. BBCA.JK, ASII.JK) dari situs data pasar, atau ekspor dari aplikasi broker-mu. Data hanya diproses di browser-mu.",en:"Format: columns Date, Open, High, Low, Close, Volume (daily). Example source: download 'Historical Data' for tickers ending in <code>.JK</code> (e.g. BBCA.JK, ASII.JK) from a market-data site, or export from your broker app. Data is processed only in your browser."})}</p>
  </div>
  <h2>${T({id:"1 · Pahami indikatornya",en:"1 · Understand the indicator"})}</h2>
  <div class="toolnav" id="ilTabs" role="group" aria-label="${T({id:"Pilih indikator",en:"Choose an indicator"})}">${Object.entries(IND).map(([k,v],i)=>`<button type="button" data-k="${k}" class="${i===0?"on":""}" aria-pressed="${i===0}">${v.t}</button>`).join("")}</div>
  <div id="ilInd"></div>
  <h2>${T({id:"2 · Backtest: berapa peluangnya di saham ini?",en:"2 · Backtest: what are the odds on this stock?"})}</h2>
  <div class="card"><div class="form">
    <label>${T({id:"Strategi",en:"Strategy"})}<select id="btS">${Object.entries(STRATS).map(([k,v])=>`<option value="${k}" ${k==="combo"?"selected":""}>${T(v.n)}</option>`).join("")}</select></label>
    <label>${T({id:"Stop loss (%) · 0 = tanpa",en:"Stop loss (%) · 0 = none"})}<input type="number" id="btSL" value="7" step=".5"></label>
    <label>${T({id:"Take profit (%) · 0 = tanpa",en:"Take profit (%) · 0 = none"})}<input type="number" id="btTP" value="0" step=".5"></label>
    <label>${T({id:"Maks. hari pegang",en:"Max holding days"})}<input type="number" id="btMax" value="40"></label>
    <label>${T({id:"Fee beli (%)",en:"Buy fee (%)"})}<input type="number" id="btFB" value="0.15" step=".01"></label>
    <label>${T({id:"Fee jual (%)",en:"Sell fee (%)"})}<input type="number" id="btFS" value="0.25" step=".01"></label>
   </div>
   <div class="controls"><button class="btn" id="btRun">▶ ${T({id:"Jalankan backtest",en:"Run backtest"})}</button><button class="btn sec" id="btAll">⚖ ${T({id:"Bandingkan semua strategi",en:"Compare all strategies"})}</button></div>
   <div id="btOut"></div></div>
  <h2>${T({id:"3 · Kapan pakai satu, kapan gabungkan?",en:"3 · When to use one, when to combine?"})}</h2>
  <div class="tablewrap"><table><tr><th>${T({id:"Kondisi saham",en:"Stock condition"})}</th><th>${T({id:"Alat utama",en:"Main tool"})}</th><th>${T({id:"Pelengkap",en:"Complement"})}</th></tr>
   <tr><td>${T({id:"Tren naik jelas (di atas MA200, awan hijau)",en:"Clear uptrend (above 200-day MA, green cloud)"})}</td><td>Ichimoku / MA</td><td>${T({id:"Fibonacci untuk titik masuk saat pullback; RSI>50 untuk konfirmasi momentum",en:"Fibonacci for pullback entries; RSI>50 to confirm momentum"})}</td></tr>
   <tr><td>${T({id:"Sideways (harga bolak-balik di range)",en:"Sideways (range-bound)"})}</td><td>RSI reversal / Bollinger</td><td>${T({id:"Support/resistance & order book",en:"Support/resistance & order book"})}</td></tr>
   <tr><td>${T({id:"Downtrend",en:"Downtrend"})}</td><td>${T({id:"Tidak beli — tunggu harga kembali di atas awan/MA200",en:"Don't buy — wait for price back above the cloud/200-day MA"})}</td><td>${T({id:"Bandarmologi untuk mendeteksi akumulasi",en:"Bandarmology to detect accumulation"})}</td></tr>
   <tr><td>${T({id:"Squeeze (volatilitas sangat rendah)",en:"Squeeze (very low volatility)"})}</td><td>Bollinger</td><td>${T({id:"Volume & broker summary untuk arah breakout",en:"Volume & broker summary for breakout direction"})}</td></tr></table></div>
  <p class="prose">${T({id:"Menggabungkan indikator yang <b>mengukur hal berbeda</b> (tren = Ichimoku/MA, momentum = RSI, level harga = Fibonacci, aliran dana = volume/broker) lebih berguna daripada menumpuk indikator yang sama-sama dari harga penutupan. Tapi setiap syarat tambahan juga mengurangi jumlah sinyal — dengan transaksi sedikit, win rate tinggi bisa jadi hanya kebetulan. Perhatikan rentang keyakinan di hasil backtest.",en:"Combining indicators that <b>measure different things</b> (trend = Ichimoku/MA, momentum = RSI, price level = Fibonacci, flows = volume/broker) beats stacking several that all derive from the close. But every extra condition also reduces the number of signals — with few trades, a high win rate may be luck. Watch the confidence range in the backtest results."})}</p>`;
  const showInd=k=>{ el.querySelectorAll("#ilTabs button").forEach(a=>{ const on=a.dataset.k===k; a.classList.toggle("on",on); a.setAttribute("aria-pressed",on?"true":"false"); }); const v=IND[k];
    el.querySelector("#ilInd").innerHTML=`<div class="grid g2"><div class="prose"><h3 style="margin-top:0">${v.t}</h3><p>${T(v.what)}</p><ol class="steps">${T(v.how).map(s=>`<li>${s}</li>`).join("")}</ol><div class="box trap"><h4>${window.L("Jebakan umum")}</h4>${T(v.trap)}</div>${({fib:1,rsi:1,ichi:1,bb:1,ma:1,macd:1})[k]?`<a class="btn" href="#/pelan/${k==="macd"?"ma":k}">🐢 ${T({id:"Pelajari pelan-pelan, langkah demi langkah",en:"Learn it slowly, step by step"})}</a>`:""}</div><div>${chartFor(k)}</div></div>`; window.linkTerms(el.querySelector("#ilInd")); };
  el.querySelectorAll("#ilTabs button").forEach(a=>a.onclick=()=>showInd(a.dataset.k)); showInd("fib");
  el.querySelector("#ilFile").onchange=e=>{ const f=e.target.files[0]; e.target.value=""; if(f) dataM.send("LOAD",f); };
  el.querySelector("#ilDemo").onclick=()=>dataM.send("DEMO");
  dataM.bind(el.querySelector("#ilStatus")); setStatus();
  const opt=()=>{ const g=id=>parseFloat(el.querySelector("#"+id).value)||0; return {sl:g("btSL"),tp:g("btTP"),max:g("btMax")||9999,fb:g("btFB"),fs:g("btFS")}; };
  el.querySelector("#btRun").onclick=()=>runOne(el,el.querySelector("#btS").value,opt());
  el.querySelector("#btAll").onclick=()=>runAll(el,opt());
  runOne(el,"combo",opt());
}
function chartFor(k){
  const D=DATA.slice(-160), I=prep(DATA), off=DATA.length-160, cut=a=>a.slice(off);
  if(k==="fib"){ const s=C().swing(D,40,159); const lv=C().fibLevels(s.hi,s.lo); return C().fig(D,{h:260,vol:false,hl:lv.map(l=>({p:l.p,label:(l.r*100).toFixed(1)+"%",col:[.382,.5,.618].includes(l.r)?"var(--gold)":"var(--muted)"}))},T({id:"Fibonacci dari swing low ke swing high 120 hari terakhir.",en:"Fibonacci from the swing low to swing high of the last 120 days."})); }
  if(k==="rsi") return C().fig(D,{h:220,vol:false,lines:[{a:cut(I.ma50),col:"var(--accent)",label:"MA50"}],sub:{a:cut(I.rsi),levels:[30,50,70],label:"RSI 14"}},T({id:"Panel bawah: RSI 14 dengan garis 30/50/70.",en:"Lower panel: 14-period RSI with 30/50/70 lines."}));
  if(k==="ichi") return C().fig(D,{h:260,vol:false,bands:[{up:cut(I.ich.spanA),lo:cut(I.ich.spanB),split:true}],lines:[{a:cut(I.ich.tenkan),col:"var(--accent)",label:"Tenkan",w:1.3},{a:cut(I.ich.kijun),col:"var(--down)",label:"Kijun",w:1.3},{a:cut(I.ich.chikou),col:"var(--violet)",label:"Chikou",w:1,dash:"3 3"}]},T({id:"Awan hijau: Span A di atas Span B; merah: sebaliknya.",en:"Green cloud: Span A above Span B; red: the reverse."}));
  if(k==="ma") return C().fig(D,{h:250,lines:[{a:cut(I.ma20),col:"var(--accent)",label:"MA20"},{a:cut(I.ma50),col:"var(--gold)",label:"MA50"},{a:cut(I.ma200),col:"var(--violet)",label:"MA200"}]},"MA20 / MA50 / MA200");
  if(k==="macd") return C().fig(D,{h:220,vol:false,sub:{a:cut(I.macd.m),b:cut(I.macd.sig),min:Math.min(...cut(I.macd.m).filter(x=>x!=null))*1.1,max:Math.max(...cut(I.macd.m).filter(x=>x!=null))*1.1,levels:[0],label:"MACD / signal"}},"MACD (12,26,9)");
  if(k==="bb") return C().fig(D,{h:250,vol:false,bands:[{up:cut(I.bb.up),lo:cut(I.bb.lo)}],lines:[{a:cut(I.bb.mid),col:"var(--accent)",label:"MA20"}]},"Bollinger (20, 2)");
  return "";
}
function runOne(el,key,opt){
  const I=prep(DATA), sig=signals(key,DATA,I), tr=backtest(DATA,sig,opt);
  const split=Math.floor(DATA.length*.7); const all=stats(tr,DATA), ins=stats(tr,DATA,0,split-1), oos=stats(tr,DATA,split,DATA.length-1);
  const pct=x=>(x*100).toFixed(1)+"%";
  const row=(lbl,s)=>`<tr><td><b>${lbl}</b></td><td class="num">${s.n}</td><td class="num">${pct(s.wr)} <span class="hint">(${pct(s.lo)}–${pct(s.hi)})</span></td><td class="num up">${pct(s.aw)}</td><td class="num down">${pct(s.al)}</td><td class="num ${s.exp>=0?"up":"down"}">${pct(s.exp)}</td><td class="num ${s.tot>=0?"up":"down"}">${pct(s.tot)}</td><td class="num">${pct(s.bh)}</td><td class="num down">−${pct(s.dd)}</td></tr>`;
  const D=DATA.slice(-250), off=DATA.length-250; const marks=[]; tr.filter(t=>t.i0>=off).forEach(t=>{ marks.push({i:t.i0-off,label:"B",pos:"below",col:"var(--up)"}); if(t.i1-off<250) marks.push({i:t.i1-off,label:t.ret>0?"S+":"S−",pos:"above",col:t.ret>0?"var(--up)":"var(--down)"}); });
  const warn = all.n<30 ? `<p class="note warn"><b>${T({id:"Sampel kecil.",en:"Small sample."})}</b> ${T({id:`Hanya ${all.n} transaksi — rentang win rate sangat lebar. Jangan simpulkan apa-apa sebelum ±30+ transaksi.`,en:`Only ${all.n} trades — the win-rate range is very wide. Don't conclude anything before ~30+ trades.`})}</p>`:"";
  const verdict = oos.n>=10 ? (oos.exp>0 && ins.exp>0 ? T({id:"Positif di dua periode — kandidat untuk diuji di saham lain & dicatat di jurnal.",en:"Positive in both periods — a candidate to test on other stocks and log in your journal."}) : ins.exp>0 ? T({id:"Bagus di in-sample tapi gagal di out-of-sample: tanda overfitting/kebetulan.",en:"Good in-sample but fails out-of-sample: a sign of overfitting/luck."}) : T({id:"Tidak menunjukkan keunggulan pada data ini.",en:"Shows no edge on this data."})) : T({id:"Transaksi out-of-sample terlalu sedikit untuk dinilai.",en:"Too few out-of-sample trades to judge."});
  el.querySelector("#btOut").innerHTML=`${warn}<div class="tablewrap"><table><tr><th></th><th>${T({id:"Trade",en:"Trades"})}</th><th>Win rate (95%)</th><th>${T({id:"Rata² untung",en:"Avg win"})}</th><th>${T({id:"Rata² rugi",en:"Avg loss"})}</th><th>Expectancy</th><th>${T({id:"Total",en:"Total"})}</th><th>Buy & hold</th><th>Max DD</th></tr>
   ${row(T({id:"Semua",en:"All"}),all)}${row("In-sample 70%",ins)}${row("Out-of-sample 30%",oos)}</table></div>
   <p><b>${T({id:"Kesimpulan:",en:"Verdict:"})}</b> ${verdict} <span class="hint">${T({id:"Waktu di pasar",en:"Time in market"})}: ${pct(all.exposure)}.</span></p>
   ${C().fig(D,{h:240,vol:false,marks},T({id:"250 hari terakhir. B = beli, S+ / S− = jual untung / rugi.",en:"Last 250 days. B = buy, S+ / S− = sell at profit / loss."}))}`;
}
function runAll(el,opt){
  const I=prep(DATA); const split=Math.floor(DATA.length*.7); const pct=x=>(x*100).toFixed(1)+"%";
  const rows=Object.keys(STRATS).map(k=>{ const tr=backtest(DATA,signals(k,DATA,I),opt); return {k,a:stats(tr,DATA),o:stats(tr,DATA,split,DATA.length-1)}; }).sort((x,y)=>y.a.exp-x.a.exp);
  el.querySelector("#btOut").innerHTML=`<div class="tablewrap"><table><tr><th>${T({id:"Strategi",en:"Strategy"})}</th><th>${T({id:"Trade",en:"Trades"})}</th><th>Win rate (95%)</th><th>Expectancy</th><th>Total</th><th>OOS expectancy</th><th>Max DD</th></tr>
  ${rows.map(r=>`<tr><td>${T(STRATS[r.k].n)}</td><td class="num">${r.a.n}</td><td class="num">${pct(r.a.wr)} <span class="hint">(${pct(r.a.lo)}–${pct(r.a.hi)})</span></td><td class="num ${r.a.exp>=0?"up":"down"}">${pct(r.a.exp)}</td><td class="num ${r.a.tot>=0?"up":"down"}">${pct(r.a.tot)}</td><td class="num ${r.o.exp>=0?"up":"down"}">${r.o.n?pct(r.o.exp):"–"}</td><td class="num down">−${pct(r.a.dd)}</td></tr>`).join("")}</table></div>
  <p class="hint">${T({id:"Buy & hold periode ini:",en:"Buy & hold over this period:"})} <b>${pct(DATA[DATA.length-1].c/DATA[0].c-1)}</b>. ${T({id:"Memilih strategi teratas dari tabel ini lalu menganggapnya 'terbukti' adalah contoh data snooping — uji lagi di saham & periode lain.",en:"Picking the top row and calling it 'proven' is data snooping — re-test it on other stocks and periods."})}</p>`;
}
window.Indicators={mount, unmount:()=>{ mountedEl=null; }};
})();
