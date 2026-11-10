/* Kelas Indikator Pelan-pelan: langkah demi langkah, grafik dipotong di satu titik, tebak, lalu lihat apa yang terjadi.
   + ReadAloud (🔊 bacakan) yang dipakai di seluruh situs. */
(function(){
const T=o=>window.T(o);
const C=()=>window.Charts;
const pct=x=>{ const s=(x>=0?"+":"")+(x*100).toFixed(1)+"%"; return window.LANG==="en"?s:s.replace(".",","); };
const fmt=n=>Math.round(n).toLocaleString(window.LANG==="en"?"en-US":"id-ID");

/* ---------- helper potong data ---------- */
function cutArr(a,s0,k,extra=0){ const out=a.slice(s0,k+1); for(let j=1;j<=extra;j++) out.push(a[k+j]??null); return out; }
function ghost(D,s0,k,extra){ const out=D.slice(s0,k+1); for(let j=0;j<extra;j++) out.push({c:null}); return out; }
function outcome(D,k,h){ const e=Math.min(D.length-1,k+h); let hi=-1e9,lo=1e9; for(let i=k+1;i<=e;i++){ hi=Math.max(hi,D[i].h); lo=Math.min(lo,D[i].l); }
  return {e, chg:D[e].c/D[k].c-1, maxUp:Math.max(0,hi/D[k].c-1), maxDn:Math.min(0,lo/D[k].c-1)}; }
function cls(chg){ return chg>0.03?"up":chg<-0.03?"down":"flat"; }

/* ================= ICHIMOKU ================= */
function ichiData(){ return C().gen(902,1500,[[70,-.38,1.3],[45,0,1.0,.8],[70,.45,1.3,1.3],[22,-.35,1.2],[55,.35,1.3],[65,-.55,1.5,1.3],[30,0,1.2]]); }
function ichiBuild(D){
  const I=C().ichimoku(D), n=D.length;
  const top=i=>Math.max(I.spanA[i]??-1e9,I.spanB[i]??-1e9), bot=i=>Math.min(I.spanA[i]??1e9,I.spanB[i]??1e9);
  const ok=i=>I.spanA[i]!=null&&I.spanB[i]!=null;
  // E1: close menembus ke atas awan (setelah ≥10 bar di bawah/di dalam awan)
  let E1=-1; for(let i=110;i<n-30;i++){ if(ok(i)&&D[i].c>top(i)&&D[i-1].c<=top(i-1)&&I.tenkan[i]>I.kijun[i]){ E1=i; break; } }
  if(E1<0) for(let i=110;i<n-30;i++){ if(ok(i)&&D[i].c>top(i)&&D[i-1].c<=top(i-1)){ E1=i; break; } }
  // E3: pullback menyentuh Kijun saat masih di atas awan
  let E3=-1; for(let i=E1+8;i<n-25;i++){ if(ok(i)&&D[i].c>top(i)&&D[i].l<=I.kijun[i]*1.005&&D[i].c>I.kijun[i]){ E3=i; break; } }
  // E4: close jatuh ke bawah awan
  let E4=-1; for(let i=Math.max(E3,E1)+10;i<n-20;i++){ if(ok(i)&&D[i].c<bot(i)&&D[i-1].c>=bot(i-1)){ E4=i; break; } }
  // zona di bawah awan (downtrend awal)
  let Z0=-1; for(let i=80;i<n;i++){ if(ok(i)&&D[i].c<bot(i)){ Z0=i; break; } }
  return {I,E1,E3,E4,Z0};
}
function ichiChart(D,X,k,opt={}){
  const I=X.I, s0=Math.max(0,(opt.s0??k-150)), ex=opt.future?Math.min(26,D.length-1-k):0;
  const DD=opt.reveal? D.slice(s0,opt.reveal+1) : ghost(D,s0,k,ex);
  const end=opt.reveal||k, add=opt.reveal?0:ex;
  const cut=a=>opt.reveal? a.slice(s0,end+1) : cutArr(a,s0,k,add);
  const chik=I.chikou.map((v,i)=> i+26<=end ? v : null);
  const show=opt.show||["tenkan","kijun","cloud","chikou"];
  const lines=[];
  if(show.includes("tenkan")) lines.push({a:cut(I.tenkan).map((v,i)=>s0+i<=end?v:null),col:"var(--accent)",label:"Tenkan (9)",w:1.4});
  if(show.includes("kijun")) lines.push({a:cut(I.kijun).map((v,i)=>s0+i<=end?v:null),col:"var(--down)",label:"Kijun (26)",w:1.6});
  if(show.includes("chikou")) lines.push({a:cut(chik),col:"var(--violet)",label:"Chikou",w:1.1,dash:"3 3"});
  const o={h:300,vol:false,lines,bands:show.includes("cloud")?[{up:cut(I.spanA),lo:cut(I.spanB),split:true}]:[],vl:[],zones:opt.zones||[],marks:opt.marks||[]};
  if(opt.here!=null) o.vl.push({i:opt.here-s0,label:T({id:"kamu di sini",en:"you are here"})});
  if(opt.reveal) o.zones=[...(o.zones||[]),{i0:k+1-s0,i1:opt.reveal-s0,col:D[opt.reveal].c>=D[k].c?"var(--up)":"var(--down)"}];
  return C().fig(DD,o,opt.cap||"");
}
const ICHI={
 key:"ichi", t:"Ichimoku Kinko Hyo (Cloud)", data:ichiData, build:ichiBuild,
 steps:(D,X)=>{ const I=X.I, last=D.length-1; const S=[];
  S.push({t:{id:"Langkah 1 · Apa yang sedang kamu lihat",en:"Step 1 · What you are looking at"},
   chart:()=>ichiChart(D,X,last,{s0:60,cap:T({id:"Ichimoku lengkap pada satu saham fiktif (±1 tahun data harian).",en:"Full Ichimoku on a fictional stock (~1 year of daily data)."})}),
   text:{id:`<p>Ichimoku Kinko Hyo artinya kira-kira "keseimbangan dalam sekali lihat". Dibuat oleh jurnalis Jepang Goichi Hosoda supaya satu grafik langsung menjawab tiga pertanyaan: <b>trennya ke mana, seberapa kuat, dan di mana support/resistance-nya</b>.</p>
<p>Grafik di atas terlihat ramai, dan itu wajar. Kita tidak akan membacanya sekaligus. Ada lima komponen, dan kita pelajari satu per satu:</p>
<ol><li><b>Tenkan-sen</b> (garis biru) — garis cepat.</li><li><b>Kijun-sen</b> (garis merah) — garis lambat.</li><li><b>Senkou Span A</b> dan <b>Senkou Span B</b> — dua garis yang membentuk <b>awan (kumo)</b> berwarna hijau/merah.</li><li><b>Chikou Span</b> (garis ungu putus-putus) — harga penutupan yang digeser ke belakang.</li></ol>
<p>Tidak perlu menghafal sekarang. Klik <b>Berikutnya</b>.</p>`,
   en:`<p>Ichimoku Kinko Hyo roughly means "equilibrium at a glance". Japanese journalist Goichi Hosoda designed it so one chart answers three questions: <b>which way is the trend, how strong is it, and where are support/resistance</b>.</p>
<p>The chart looks busy, and that's normal. We won't read it all at once. There are five parts, and we'll learn them one by one:</p>
<ol><li><b>Tenkan-sen</b> (blue line) — the fast line.</li><li><b>Kijun-sen</b> (red line) — the slow line.</li><li><b>Senkou Span A</b> and <b>Senkou Span B</b> — two lines forming the green/red <b>cloud (kumo)</b>.</li><li><b>Chikou Span</b> (dashed purple) — the close shifted backwards.</li></ol>
<p>No need to memorise yet. Click <b>Next</b>.</p>`}});
  S.push({t:{id:"Langkah 2 · Tenkan & Kijun: garis cepat dan garis lambat",en:"Step 2 · Tenkan & Kijun: the fast and slow lines"},
   chart:()=>ichiChart(D,X,last,{s0:60,show:["tenkan","kijun"]}),
   text:{id:`<p>Kedua garis ini <b>bukan rata-rata biasa</b>. Cara hitungnya sederhana:</p>
<div class="formula">Tenkan = (harga tertinggi 9 hari + harga terendah 9 hari) ÷ 2
Kijun  = (harga tertinggi 26 hari + harga terendah 26 hari) ÷ 2</div>
<p>Contoh: dalam 26 hari terakhir harga tertinggi 1.600 dan terendah 1.400 → Kijun = 1.500. Artinya Kijun adalah <b>titik tengah perjalanan harga sebulan terakhir</b> — semacam "harga wajar" jangka pendek.</p>
<ul><li>Harga <b>di atas Kijun</b> → pembeli sedang menguasai bulan ini.</li><li>Harga <b>di bawah Kijun</b> → penjual yang menguasai.</li>
<li><b>Tenkan memotong Kijun ke atas</b> (biru naik melewati merah) → momentum jangka pendek berbalik naik. Ke bawah → berbalik turun.</li>
<li>Kijun yang <b>datar</b> artinya rentang harga sebulan terakhir tidak berubah — harga sering "ditarik" kembali ke garis datar ini, seperti magnet.</li></ul>
<p>Perhatikan grafik: setiap kali harga naik kuat, garis biru naik lebih dulu dan berada di atas garis merah.</p>`,
   en:`<p>These two lines are <b>not ordinary averages</b>. The maths is simple:</p>
<div class="formula">Tenkan = (9-day high + 9-day low) ÷ 2
Kijun  = (26-day high + 26-day low) ÷ 2</div>
<p>Example: over 26 days the high was 1,600 and the low 1,400 → Kijun = 1,500. So Kijun is <b>the midpoint of the last month's price journey</b> — a short-term "fair price".</p>
<ul><li>Price <b>above Kijun</b> → buyers control this month.</li><li>Price <b>below Kijun</b> → sellers control it.</li>
<li><b>Tenkan crossing above Kijun</b> (blue over red) → short-term momentum turning up. Crossing below → turning down.</li>
<li>A <b>flat</b> Kijun means the month's range hasn't changed — price is often pulled back to it like a magnet.</li></ul>
<p>Look at the chart: whenever price rises strongly, the blue line rises first and sits above the red one.</p>`}});
  S.push({t:{id:"Langkah 3 · Awan (kumo): support dari masa depan",en:"Step 3 · The cloud (kumo): support projected into the future"},
   chart:()=>ichiChart(D,X,last-30,{s0:60,show:["cloud"],future:true,here:last-30,cap:T({id:"Garis putus-putus = hari terakhir. Awan di sebelah kanannya sudah bisa dilihat hari ini.",en:"Dashed line = the latest day. The cloud to its right is already visible today."})}),
   text:{id:`<p>Awan dibentuk oleh dua garis:</p>
<div class="formula">Senkou Span A = (Tenkan + Kijun) ÷ 2         → lalu digeser 26 hari ke DEPAN
Senkou Span B = (tertinggi 52 hari + terendah 52 hari) ÷ 2 → digeser 26 hari ke DEPAN</div>
<p>Inilah keunikan Ichimoku: awan <b>digambar 26 hari ke depan</b>. Lihat grafik — di kanan garis "kamu di sini" belum ada candle, tapi awannya sudah ada. Artinya hari ini kamu sudah tahu <b>di mana kira-kira support atau resistance bulan depan</b>.</p>
<ul><li><b>Awan hijau</b>: Span A di atas Span B → keseimbangan jangka pendek lebih tinggi dari jangka panjang (cenderung naik).</li>
<li><b>Awan merah</b>: Span A di bawah Span B → cenderung turun.</li>
<li><b>Awan tebal</b> = support/resistance kuat (sulit ditembus). <b>Awan tipis</b> = lemah, mudah ditembus.</li>
<li>Titik di mana awan berganti warna (<b>kumo twist</b>) sering menandai kemungkinan perubahan tren di masa depan.</li></ul>`,
   en:`<p>The cloud is made of two lines:</p>
<div class="formula">Senkou Span A = (Tenkan + Kijun) ÷ 2         → then shifted 26 days FORWARD
Senkou Span B = (52-day high + 52-day low) ÷ 2 → shifted 26 days FORWARD</div>
<p>This is Ichimoku's special trick: the cloud is <b>drawn 26 days ahead</b>. On the chart, right of "you are here" there are no candles yet, but the cloud already exists. So today you already know <b>roughly where next month's support or resistance sits</b>.</p>
<ul><li><b>Green cloud</b>: Span A above Span B → short-term equilibrium above long-term (leaning up).</li>
<li><b>Red cloud</b>: Span A below Span B → leaning down.</li>
<li><b>Thick cloud</b> = strong support/resistance (hard to break). <b>Thin cloud</b> = weak, easy to break.</li>
<li>Where the cloud changes colour (<b>kumo twist</b>) often hints at a possible future trend change.</li></ul>`}});
  S.push({t:{id:"Langkah 4 · Chikou: bandingkan hari ini dengan sebulan lalu",en:"Step 4 · Chikou: compare today with a month ago"},
   chart:()=>ichiChart(D,X,last,{s0:60,show:["chikou"]}),
   text:{id:`<p>Chikou Span adalah <b>harga penutupan hari ini, digambar 26 hari ke belakang</b>. Kedengarannya aneh, tapi fungsinya sederhana: menjawab "apakah harga hari ini lebih tinggi daripada harga 26 hari lalu?"</p>
<ul><li>Chikou <b>di atas</b> candle 26 hari lalu → yang membeli sebulan lalu sekarang untung → mereka cenderung tidak buru-buru menjual → mendukung kenaikan.</li>
<li>Chikou <b>di bawah</b> candle 26 hari lalu → pembeli sebulan lalu sedang rugi → banyak yang ingin "balik modal" → tekanan jual.</li></ul>
<p>Chikou adalah filter konfirmasi. Sinyal beli Ichimoku dianggap kuat kalau Chikou juga sudah di atas harga.</p>`,
   en:`<p>The Chikou Span is <b>today's close drawn 26 days back</b>. It sounds odd, but its job is simple: answering "is today's price higher than 26 days ago?"</p>
<ul><li>Chikou <b>above</b> the candle of 26 days ago → last month's buyers are in profit → they're in no rush to sell → supports a rise.</li>
<li>Chikou <b>below</b> it → last month's buyers are losing → many want to "get their money back" → selling pressure.</li></ul>
<p>Chikou is a confirmation filter. An Ichimoku buy signal is considered strong when Chikou is also above price.</p>`}});
  if(X.Z0>0) S.push({t:{id:"Langkah 5 · Tiga wilayah: di bawah, di dalam, di atas awan",en:"Step 5 · Three territories: below, inside, above the cloud"},
   chart:()=>ichiChart(D,X,last,{s0:60,show:["cloud"],zones:[{i0:X.Z0-60,i1:Math.min(X.Z0+25,X.E1-1)-60,label:T({id:"di bawah awan",en:"below cloud"}),col:"var(--down)"}]}),
   text:{id:`<p>Aturan paling penting Ichimoku — kalau kamu hanya ingat satu hal, ingat ini:</p>
<div class="tablewrap"><table><tr><th>Posisi harga</th><th>Artinya</th><th>Sikap</th></tr>
<tr><td class="down"><b>Di bawah awan</b></td><td>Downtrend. Awan di atas harga berfungsi sebagai <b>atap</b> (resistance).</td><td>Jangan beli. Kenaikan biasanya mentok di awan.</td></tr>
<tr><td><b>Di dalam awan</b></td><td>Netral, ragu-ragu, sering bolak-balik.</td><td>Tunggu. Banyak sinyal palsu di sini.</td></tr>
<tr><td class="up"><b>Di atas awan</b></td><td>Uptrend. Awan di bawah harga berfungsi sebagai <b>lantai</b> (support).</td><td>Cari kesempatan beli saat koreksi.</td></tr></table></div>
<p>Area merah di grafik adalah periode harga di bawah awan. Lihat bagaimana setiap kenaikan kecil berhenti saat menyentuh awan dari bawah.</p>`,
   en:`<p>The most important Ichimoku rule — if you remember only one thing, remember this:</p>
<div class="tablewrap"><table><tr><th>Price position</th><th>Meaning</th><th>Stance</th></tr>
<tr><td class="down"><b>Below the cloud</b></td><td>Downtrend. The cloud above acts as a <b>ceiling</b> (resistance).</td><td>Don't buy. Rallies usually stall at the cloud.</td></tr>
<tr><td><b>Inside the cloud</b></td><td>Neutral, indecisive, choppy.</td><td>Wait. Lots of false signals here.</td></tr>
<tr><td class="up"><b>Above the cloud</b></td><td>Uptrend. The cloud below acts as a <b>floor</b> (support).</td><td>Look to buy on pullbacks.</td></tr></table></div>
<p>The red area is a period when price was below the cloud. Notice how each small rally stops when it touches the cloud from below.</p>`}});
  if(X.E1>0) S.push({quiz:true,k:X.E1,h:25,exp:"up",t:{id:"Langkah 6 · Tebak: harga baru saja menembus ke atas awan",en:"Step 6 · Guess: price just broke above the cloud"},
   chart:(rev)=>ichiChart(D,X,X.E1,{s0:X.E1-120,future:!rev,here:X.E1,reveal:rev?Math.min(last,X.E1+25):null}),
   text:{id:`<p>Lihat garis "kamu di sini". Hari ini:</p><ul><li>Harga <b>menutup di atas awan</b> untuk pertama kalinya setelah lama di bawah/di dalamnya.</li><li>Tenkan (biru) berada di atas Kijun (merah).</li><li>Awan di depan (kanan) — perhatikan warnanya dan ketebalannya.</li></ul><p>Menurutmu, dalam ±25 hari bursa ke depan harga akan…</p>`,
    en:`<p>Look at the "you are here" line. Today:</p><ul><li>Price <b>closed above the cloud</b> for the first time after a long time below/inside it.</li><li>Tenkan (blue) is above Kijun (red).</li><li>The cloud ahead (right) — note its colour and thickness.</li></ul><p>Over the next ~25 trading days, price will…</p>`},
   why:{id:"Ini adalah sinyal beli klasik Ichimoku: keluar dari atas awan + Tenkan di atas Kijun. Awan yang tadinya atap berubah menjadi lantai. Stop loss yang lazim: di bawah Kijun, atau di bawah awan.",en:"This is the classic Ichimoku buy signal: breaking out above the cloud + Tenkan above Kijun. The cloud that was a ceiling becomes a floor. Common stop: below Kijun, or below the cloud."}});
  if(X.E3>0) S.push({quiz:true,k:X.E3,h:20,exp:"up",t:{id:"Langkah 7 · Tebak: koreksi menyentuh Kijun",en:"Step 7 · Guess: a pullback touches Kijun"},
   chart:(rev)=>ichiChart(D,X,X.E3,{s0:X.E3-110,future:!rev,here:X.E3,reveal:rev?Math.min(last,X.E3+20):null}),
   text:{id:`<p>Harga sudah beberapa minggu di atas awan, lalu turun (koreksi) sampai <b>menyentuh garis Kijun</b> (merah), tetapi menutup kembali di atasnya. Harga masih di atas awan.</p><p>Menurutmu, 20 hari ke depan…</p>`,
    en:`<p>Price has been above the cloud for weeks, then pulled back until it <b>touched Kijun</b> (red), but closed back above it. Price is still above the cloud.</p><p>Over the next 20 days…</p>`},
   why:{id:"Dalam uptrend, Kijun sering menjadi lantai pertama. Koreksi ke Kijun yang tertahan adalah titik masuk dengan risiko kecil: stop cukup sedikit di bawah Kijun. Kalau Kijun tembus, lantai kedua adalah awan.",en:"In an uptrend, Kijun is often the first floor. A pullback that holds at Kijun is a low-risk entry: the stop sits just below Kijun. If Kijun breaks, the second floor is the cloud."}});
  if(X.E4>0) S.push({quiz:true,k:X.E4,h:25,exp:"down",t:{id:"Langkah 8 · Tebak: harga jatuh ke bawah awan",en:"Step 8 · Guess: price falls below the cloud"},
   chart:(rev)=>ichiChart(D,X,X.E4,{s0:X.E4-120,future:!rev,here:X.E4,reveal:rev?Math.min(last,X.E4+25):null}),
   text:{id:`<p>Sekarang kebalikannya. Harga menembus <b>ke bawah awan</b>. Tenkan sudah di bawah Kijun, dan perhatikan warna awan di depan.</p><p>Kalau kamu masih memegang saham ini, menurutmu 25 hari ke depan…</p>`,
    en:`<p>Now the opposite. Price broke <b>below the cloud</b>. Tenkan is already under Kijun, and note the cloud colour ahead.</p><p>If you still held this stock, over the next 25 days…</p>`},
   why:{id:"Turun ke bawah awan = lantai sudah jebol; awan berubah jadi atap. Bagi pemegang saham, ini sinyal keluar (atau paling lambat saat Kijun tembus sebelumnya). Bagi calon pembeli: tunggu sampai harga kembali ke atas awan.",en:"Falling below the cloud = the floor has broken; the cloud becomes a ceiling. For holders it's an exit signal (or earlier, when Kijun broke). For would-be buyers: wait until price is back above the cloud."}});
  S.push({tf:"ichi",t:{id:"Langkah 9 · Harian, mingguan, atau per jam?",en:"Step 9 · Daily, weekly or hourly?"}});
  S.push({t:{id:"Langkah 10 · Ringkasan & checklist",en:"Step 10 · Summary & checklist"},
   text:{id:`<p>Urutan membaca Ichimoku setiap kali membuka grafik:</p>
<ol class="steps"><li><b>Posisi terhadap awan</b>: di atas, di dalam, atau di bawah? (menentukan boleh beli atau tidak)</li>
<li><b>Warna & tebal awan di depan</b>: hijau tebal = lantai kuat; merah = hati-hati.</li>
<li><b>Tenkan vs Kijun</b>: biru di atas merah = momentum naik.</li>
<li><b>Chikou</b>: di atas harga 26 hari lalu = konfirmasi.</li>
<li><b>Rencana</b>: masuk saat breakout atas awan atau koreksi ke Kijun; stop di bawah Kijun/awan.</li></ol>
<div class="box trap"><h4>Jebakan</h4>Saham IDX lapis 3 yang sepi dan sering "digoreng" membuat Ichimoku kacau. Pakai di saham likuid (LQ45/IDX80). Sinyal bisa gagal — contoh tebakan di atas yang meleset adalah pengingatnya.</div>
<p>Langkah selanjutnya: uji sinyal Ichimoku pada data saham sungguhan di <a href="#/indikator">Lab Indikator</a> (strategi "Ichimoku").</p>`,
   en:`<p>The order to read Ichimoku every time you open a chart:</p>
<ol class="steps"><li><b>Position vs the cloud</b>: above, inside or below? (decides whether buying is allowed)</li>
<li><b>Colour & thickness of the cloud ahead</b>: thick green = strong floor; red = caution.</li>
<li><b>Tenkan vs Kijun</b>: blue above red = upward momentum.</li>
<li><b>Chikou</b>: above price 26 days ago = confirmation.</li>
<li><b>Plan</b>: enter on a breakout above the cloud or a pullback to Kijun; stop below Kijun/the cloud.</li></ol>
<div class="box trap"><h4>Trap</h4>Quiet, frequently pumped IDX small caps make Ichimoku messy. Use it on liquid stocks (LQ45/IDX80). Signals can fail — any guess above that missed is the reminder.</div>
<p>Next: test Ichimoku signals on real stock data in the <a href="#/indikator">Indicator Lab</a> ("Ichimoku" strategy).</p>`}});
  return S; }
};

/* ================= RSI ================= */
function rsiData(){ return C().gen(300,2000,[[60,-.45,1.5],[90,0,1.7,.9],[70,.45,1.4,1.2],[14,-.55,1.3,.8],[50,.45,1.4,1.2],[30,-.1,1.6]]); }
function rsiBuild(D){ const r=C().rsi(D.map(x=>x.c),14), n=D.length; const ma=C().sma(D.map(x=>x.c),50);
  let R1=-1; for(let i=45;i<150&&i<n-20;i++){ if(r[i-1]<32&&r[i]>=32){ R1=i; break; } }
  let R2=-1; for(let i=160;i<n-20;i++){ if(r[i]>=72&&D[i].c>ma[i]){ R2=i; break; } }
  let R3=-1; for(let i=(R2>0?R2+5:170);i<n-20;i++){ if(r[i-1]<50&&r[i]>=50&&D[i].c>ma[i]){ R3=i; break; } }
  let Rd=-1; for(let i=20;i<70;i++){ if(r[i]!=null&&r[i]<30){ Rd=i; break; } }
  return {r,ma,R1,R2,R3,Rd}; }
function rsiChart(D,X,k,opt={}){ const s0=Math.max(0,opt.s0??k-150), end=opt.reveal||k; const DD=D.slice(s0,end+1);
  const o={h:230,vol:false,lines:opt.ma?[{a:X.ma.slice(s0,end+1),col:"var(--gold)",label:"MA50",w:1.3}]:[],sub:{a:X.r.slice(s0,end+1),levels:[30,50,70],label:"RSI 14",zones:[{hi:100,lo:70,col:"var(--down)"},{hi:30,lo:0,col:"var(--up)"}]},vl:[],zones:opt.zones||[]};
  if(opt.here!=null) o.vl.push({i:opt.here-s0,label:T({id:"kamu di sini",en:"you are here"})});
  if(opt.reveal) o.zones=[...o.zones,{i0:k+1-s0,i1:opt.reveal-s0,col:D[opt.reveal].c>=D[k].c?"var(--up)":"var(--down)"}];
  return C().fig(DD,o,opt.cap||""); }
const RSI={
 key:"rsi", t:"RSI (Relative Strength Index)", data:rsiData, build:rsiBuild,
 steps:(D,X)=>{ const last=D.length-1, S=[];
  S.push({t:{id:"Langkah 1 · RSI mengukur apa?",en:"Step 1 · What does RSI measure?"},
   chart:()=>rsiChart(D,X,last,{s0:20}),
   text:{id:`<p>RSI menjawab satu pertanyaan: <b>dalam 14 hari terakhir, mana yang lebih dominan — hari naik atau hari turun, dan seberapa besar?</b> Hasilnya angka 0 sampai 100 di panel bawah.</p>
<p>Contoh hitung yang disederhanakan:</p>
<div class="formula">Rata-rata kenaikan 14 hari  = 20 poin per hari
Rata-rata penurunan 14 hari = 10 poin per hari
RS  = 20 ÷ 10 = 2
RSI = 100 − 100 ÷ (1 + 2) = 100 − 33,3 = 66,7</div>
<p>Kalau kenaikan dan penurunan sama besar, RSI = 50. Kalau hampir semua hari naik, RSI mendekati 100. Kalau hampir semua turun, mendekati 0.</p>
<p>Dibuat oleh J. Welles Wilder (1978). Pengaturan standar: 14 periode.</p>`,
   en:`<p>RSI answers one question: <b>over the last 14 days, which dominated — up days or down days, and by how much?</b> The result is a 0–100 number in the lower panel.</p>
<p>A simplified example:</p>
<div class="formula">Average 14-day gain = 20 points per day
Average 14-day loss = 10 points per day
RS  = 20 ÷ 10 = 2
RSI = 100 − 100 ÷ (1 + 2) = 100 − 33.3 = 66.7</div>
<p>If gains and losses are equal, RSI = 50. If almost every day rises, RSI nears 100; if almost every day falls, it nears 0.</p>
<p>Created by J. Welles Wilder (1978). Standard setting: 14 periods.</p>`}});
  S.push({t:{id:"Langkah 2 · Garis 30, 50, 70 dan 'rezim'",en:"Step 2 · The 30, 50, 70 lines and 'regimes'"},
   chart:()=>rsiChart(D,X,last,{s0:20,ma:true}),
   text:{id:`<ul><li><b>Di atas 70</b> (area merah): "jenuh beli" — naik terlalu cepat dalam waktu singkat.</li><li><b>Di bawah 30</b> (area hijau): "jenuh jual" — turun terlalu cepat.</li><li><b>Garis 50</b>: pembatas. Di atas 50 pembeli lebih kuat; di bawah 50 penjual lebih kuat.</li></ul>
<p>Hal yang jarang dijelaskan: <b>RSI berperilaku berbeda tergantung tren</b>.</p>
<ul><li>Saat <b>downtrend</b> (awal grafik), RSI jarang bisa naik melewati 60 — setiap pantulan lemah.</li><li>Saat <b>sideways</b> (tengah), RSI bolak-balik 30–70 — di sinilah aturan "beli di 30, jual di 70" paling cocok.</li><li>Saat <b>uptrend</b> (akhir), RSI jarang turun di bawah 40 dan bisa lama di atas 70.</li></ul>
<p>Jadi selalu tanya dulu: saham ini sedang tren apa? Garis kuning (MA50) membantu menjawabnya.</p>`,
   en:`<ul><li><b>Above 70</b> (red area): "overbought" — rose too fast in a short time.</li><li><b>Below 30</b> (green area): "oversold" — fell too fast.</li><li><b>The 50 line</b>: the divider. Above 50 buyers are stronger; below 50 sellers are.</li></ul>
<p>What's rarely explained: <b>RSI behaves differently depending on the trend</b>.</p>
<ul><li>In a <b>downtrend</b> (start of the chart), RSI rarely gets above 60 — every bounce is weak.</li><li>In a <b>range</b> (middle), RSI swings 30–70 — this is where "buy at 30, sell at 70" fits best.</li><li>In an <b>uptrend</b> (end), RSI rarely drops below 40 and can stay above 70 for a long time.</li></ul>
<p>So always ask first: what trend is this stock in? The yellow line (MA50) helps answer that.</p>`}});
  if(X.Rd>0) S.push({t:{id:"Langkah 3 · Jebakan: 'oversold' di tengah downtrend",en:"Step 3 · Trap: 'oversold' in the middle of a downtrend"},
   chart:()=>rsiChart(D,X,Math.min(last,X.Rd+30),{s0:0,ma:true,zones:[{i0:X.Rd,i1:Math.min(last,X.Rd+30),col:"var(--down)"}]}),
   text:{id:`<p>Pada area merah, RSI sudah di bawah 30 — "oversold". Banyak pemula langsung membeli karena merasa "sudah murah". Tapi lihat: harga terus turun. Dalam downtrend kuat, RSI bisa tinggal lama di bawah 30.</p><p><b>Pelajaran:</b> RSI di bawah 30 bukan sinyal beli. Yang lebih aman adalah menunggu RSI <b>keluar kembali</b> ke atas 30 — dan lebih baik lagi kalau trennya sudah tidak turun.</p>`,
    en:`<p>In the red area RSI is already below 30 — "oversold". Many beginners buy immediately because it feels "cheap". But look: price keeps falling. In a strong downtrend RSI can stay below 30 for a long time.</p><p><b>Lesson:</b> RSI below 30 is not a buy signal. Safer is to wait for RSI to <b>climb back</b> above 30 — better still once the trend has stopped falling.</p>`}});
  if(X.R1>0) S.push({quiz:true,k:X.R1,h:20,exp:"up",t:{id:"Langkah 4 · Tebak: RSI naik kembali dari bawah 30 (pasar sideways)",en:"Step 4 · Guess: RSI climbs back from below 30 (ranging market)"},
   chart:(rev)=>rsiChart(D,X,X.R1,{s0:Math.max(0,X.R1-110),ma:true,here:X.R1,reveal:rev?Math.min(last,X.R1+20):null}),
   text:{id:`<p>Penurunan besar sudah berhenti dan harga mulai bergerak menyamping. Hari ini RSI baru saja <b>naik kembali melewati 30</b> dari bawah.</p><p>20 hari ke depan, harga akan…</p>`,en:`<p>The big decline has stopped and price is moving sideways. Today RSI just <b>climbed back above 30</b> from below.</p><p>Over the next 20 days, price will…</p>`},
   why:{id:"Dalam pasar sideways, RSI yang keluar dari area di bawah 30 menandakan tekanan jual mulai habis. Target wajar: RSI 50–70 atau batas atas range. Stop: di bawah low terakhir.",en:"In a ranging market, RSI leaving the sub-30 zone signals selling pressure is running out. A reasonable target: RSI 50–70 or the top of the range. Stop: below the latest low."}});
  if(X.R2>0) S.push({quiz:true,k:X.R2,h:20,exp:"up",t:{id:"Langkah 5 · Tebak: RSI di atas 70 dalam uptrend — jual?",en:"Step 5 · Guess: RSI above 70 in an uptrend — sell?"},
   chart:(rev)=>rsiChart(D,X,X.R2,{s0:Math.max(0,X.R2-110),ma:true,here:X.R2,reveal:rev?Math.min(last,X.R2+20):null}),
   text:{id:`<p>Harga di atas MA50 dan sedang naik. RSI baru saja <b>melewati 70</b> — "overbought". Apakah ini waktunya jual?</p><p>20 hari ke depan, harga akan…</p>`,en:`<p>Price is above the MA50 and rising. RSI just <b>crossed above 70</b> — "overbought". Is it time to sell?</p><p>Over the next 20 days, price will…</p>`},
   why:{id:"Dalam uptrend kuat, RSI di atas 70 lebih sering berarti 'momentum kuat' daripada 'harus jual'. Banyak kenaikan terbesar terjadi saat RSI tinggi. Gunakan trailing stop (mis. di bawah MA20) alih-alih menjual hanya karena RSI > 70.",en:"In a strong uptrend, RSI above 70 more often means 'strong momentum' than 'must sell'. Many of the biggest gains happen with RSI high. Use a trailing stop (e.g. below the MA20) instead of selling just because RSI > 70."}});
  if(X.R3>0) S.push({quiz:true,k:X.R3,h:20,exp:"up",t:{id:"Langkah 6 · Tebak: RSI kembali ke atas 50 setelah koreksi",en:"Step 6 · Guess: RSI back above 50 after a pullback"},
   chart:(rev)=>rsiChart(D,X,X.R3,{s0:Math.max(0,X.R3-110),ma:true,here:X.R3,reveal:rev?Math.min(last,X.R3+20):null}),
   text:{id:`<p>Saham dalam uptrend (di atas MA50) sempat koreksi, RSI turun ke 40-an, dan hari ini RSI <b>naik lagi melewati 50</b>.</p><p>20 hari ke depan…</p>`,en:`<p>A stock in an uptrend (above the MA50) pulled back, RSI dipped into the 40s, and today RSI <b>crossed back above 50</b>.</p><p>Over the next 20 days…</p>`},
   why:{id:"Ini cara pakai RSI yang cocok untuk tren: bukan menunggu 30, tapi menunggu momentum kembali ke atas 50 setelah koreksi. Stop di bawah low koreksi.",en:"This is the trend-friendly way to use RSI: not waiting for 30, but for momentum to return above 50 after a pullback. Stop below the pullback low."}});
  S.push({t:{id:"Langkah 7 · Divergensi (tanda tenaga melemah)",en:"Step 7 · Divergence (fading strength)"},
   text:{id:`<p><b>Divergensi bullish</b>: harga membuat titik terendah baru (lower low), tetapi RSI membuat titik terendah yang <b>lebih tinggi</b> dari sebelumnya. Artinya penurunan kedua terjadi dengan tenaga jual yang lebih kecil — penjual mulai lelah.</p>
<p><b>Divergensi bearish</b>: harga membuat puncak baru, tetapi puncak RSI lebih rendah — pembeli mulai lelah.</p>
<p>Divergensi adalah <b>peringatan</b>, bukan perintah. Tunggu konfirmasi dari harga (mis. tembus resistance terdekat, atau candle pembalikan dengan volume).</p>`,
   en:`<p><b>Bullish divergence</b>: price makes a lower low, but RSI makes a <b>higher</b> low than before. The second drop happened with less selling force — sellers are tiring.</p>
<p><b>Bearish divergence</b>: price makes a new high, but the RSI peak is lower — buyers are tiring.</p>
<p>A divergence is a <b>warning</b>, not an order. Wait for price confirmation (e.g. breaking the nearest resistance, or a reversal candle on volume).</p>`}});
  S.push({tf:"rsi",t:{id:"Langkah 8 · Timeframe yang cocok",en:"Step 8 · Which timeframe"}});
  return S; }
};

/* ================= BOLLINGER ================= */
function bbData(){ return C().gen(515,1200,[[50,.05,1.6],[45,0,.55,.6],[35,.7,1.5,1.8],[30,.05,1.8],[60,0,1.5]]); }
function bbBuild(D){ const c=D.map(x=>x.c), b=C().boll(c), n=D.length; const bw=b.mid.map((m,i)=>m==null?null:(b.up[i]-b.lo[i])/m);
  let Sq=-1, mn=1; for(let i=60;i<100;i++){ if(bw[i]!=null&&bw[i]<mn){ mn=bw[i]; Sq=i; } }
  let Wk=-1; for(let i=Sq+3;i<Math.min(n-15,Sq+40);i++){ if(D[i].c>=b.up[i]*0.995){ Wk=i; break; } }
  let MR=-1; for(let i=170;i<n-15;i++){ if(D[i-1].c<b.lo[i-1]&&D[i].c>=b.lo[i]){ MR=i; break; } }
  return {b,bw,Sq,Wk,MR}; }
function bbChart(D,X,k,opt={}){ const s0=Math.max(0,opt.s0??k-140), end=opt.reveal||k, cut=a=>a.slice(s0,end+1);
  const o={h:260,vol:opt.vol!==false,bands:[{up:cut(X.b.up),lo:cut(X.b.lo)}],lines:[{a:cut(X.b.mid),col:"var(--accent)",label:"MA20",w:1.3}],vl:[],zones:opt.zones||[]};
  if(opt.here!=null) o.vl.push({i:opt.here-s0,label:T({id:"kamu di sini",en:"you are here"})});
  if(opt.reveal) o.zones=[...o.zones,{i0:k+1-s0,i1:opt.reveal-s0,col:D[opt.reveal].c>=D[k].c?"var(--up)":"var(--down)"}];
  return C().fig(D.slice(s0,end+1),o,opt.cap||""); }
const BB={
 key:"bb", t:"Bollinger Bands", data:bbData, build:bbBuild,
 steps:(D,X)=>{ const last=D.length-1, S=[];
  S.push({t:{id:"Langkah 1 · Tiga garis Bollinger",en:"Step 1 · The three Bollinger lines"},
   chart:()=>bbChart(D,X,last,{s0:20}),
   text:{id:`<p>Bollinger Bands (John Bollinger, 1980-an) terdiri dari:</p>
<ul><li><b>Garis tengah</b>: rata-rata harga 20 hari (MA20).</li><li><b>Band atas</b>: MA20 + 2 × simpangan baku.</li><li><b>Band bawah</b>: MA20 − 2 × simpangan baku.</li></ul>
<p>"Simpangan baku" adalah ukuran seberapa liar harga bergerak. Kalau harga tenang, band menyempit. Kalau harga liar, band melebar. Secara statistik, sebagian besar harga penutupan berada di dalam band — tapi bukan berarti harga <i>harus</i> kembali ke dalam.</p>`,
   en:`<p>Bollinger Bands (John Bollinger, 1980s) consist of:</p>
<ul><li><b>Middle line</b>: the 20-day average (MA20).</li><li><b>Upper band</b>: MA20 + 2 × standard deviation.</li><li><b>Lower band</b>: MA20 − 2 × standard deviation.</li></ul>
<p>"Standard deviation" measures how wildly price moves. Calm price → bands narrow. Wild price → bands widen. Statistically most closes sit inside the bands — but that doesn't mean price <i>must</i> return inside.</p>`}});
  if(X.Sq>0) S.push({quiz:true,k:X.Sq,h:25,exp:"any",t:{id:"Langkah 2 · Squeeze: band menyempit — tebak arahnya",en:"Step 2 · Squeeze: the bands narrow — guess the direction"},
   chart:(rev)=>bbChart(D,X,X.Sq,{s0:Math.max(0,X.Sq-80),here:X.Sq,reveal:rev?Math.min(last,X.Sq+25):null}),
   text:{id:`<p>Perhatikan band yang <b>sangat sempit</b> dan volume yang kecil di dekat garis "kamu di sini". Ini disebut <b>squeeze</b>: pasar sedang "tidur". Squeeze biasanya diikuti pergerakan besar — tapi Bollinger sendiri <b>tidak memberi tahu arahnya</b>.</p><p>Menurutmu, 25 hari ke depan harga akan…</p>`,
    en:`<p>Notice the <b>very narrow</b> bands and low volume near "you are here". This is a <b>squeeze</b>: the market is "asleep". Squeezes are usually followed by big moves — but Bollinger alone <b>doesn't tell you the direction</b>.</p><p>Over the next 25 days, price will…</p>`},
   why:{id:"Squeeze = energi terkumpul. Cara bermainnya: jangan menebak, tunggu candle yang menutup di luar band dengan volume besar, lalu ikuti arahnya. Untuk menebak arah lebih awal, lihat broker summary & order book (Modul D & E).",en:"A squeeze = stored energy. How to play it: don't guess; wait for a candle closing outside the band on big volume, then follow it. To read the direction earlier, check the broker summary & order book (Modules D & E)."}});
  if(X.Wk>0) S.push({quiz:true,k:X.Wk,h:15,exp:"up",t:{id:"Langkah 3 · Tebak: harga menyentuh band atas setelah squeeze",en:"Step 3 · Guess: price tags the upper band after a squeeze"},
   chart:(rev)=>bbChart(D,X,X.Wk,{s0:Math.max(0,X.Wk-90),here:X.Wk,reveal:rev?Math.min(last,X.Wk+15):null}),
   text:{id:`<p>Squeeze baru saja pecah ke atas dengan volume besar, dan harga menutup <b>di band atas</b>. Banyak yang berpikir "sudah di atas band, pasti turun".</p><p>15 hari ke depan…</p>`,en:`<p>The squeeze just broke upward on big volume and price closed <b>at the upper band</b>. Many think "it's at the top band, it must fall".</p><p>Over the next 15 days…</p>`},
   why:{id:"Setelah squeeze pecah, harga sering 'berjalan di band atas' (walking the band) — band atas bukan tembok, melainkan tanda kekuatan. Keluar saat harga menutup di bawah MA20, bukan saat menyentuh band atas.",en:"After a squeeze breaks, price often 'walks the upper band' — the band is not a wall but a sign of strength. Exit when price closes below the MA20, not when it touches the upper band."}});
  if(X.MR>0) S.push({quiz:true,k:X.MR,h:15,exp:"up",t:{id:"Langkah 4 · Tebak: kembali ke dalam band bawah (pasar sideways)",en:"Step 4 · Guess: back inside the lower band (ranging market)"},
   chart:(rev)=>bbChart(D,X,X.MR,{s0:Math.max(0,X.MR-90),here:X.MR,reveal:rev?Math.min(last,X.MR+15):null}),
   text:{id:`<p>Pasar sedang menyamping. Kemarin harga menutup <b>di bawah band bawah</b>, hari ini menutup <b>kembali di dalam band</b>.</p><p>15 hari ke depan…</p>`,en:`<p>The market is ranging. Yesterday price closed <b>below the lower band</b>, today it closed <b>back inside</b>.</p><p>Over the next 15 days…</p>`},
   why:{id:"Di pasar sideways, keluar-lalu-kembali-ke-dalam band bawah sering diikuti gerakan kembali ke MA20 (mean reversion). Target: garis tengah. Stop: di bawah low hari kemarin. Jangan pakai cara ini saat downtrend kuat.",en:"In a range, closing outside then back inside the lower band is often followed by a move back to the MA20 (mean reversion). Target: the middle line. Stop: below yesterday's low. Don't use this in a strong downtrend."}});
  S.push({tf:"bb",t:{id:"Langkah 5 · Timeframe yang cocok",en:"Step 5 · Which timeframe"}});
  return S; }
};

/* ================= FIBONACCI ================= */
function fibData(){ return C().gen(778,1000,[[30,0,1.2],[45,.75,1.4,1.3],[22,-.85,1.3,.7],[45,.7,1.4,1.2],[20,-.4,1.3]]); }
function fibBuild(D){ const s=C().swing(D,25,80); const lv=C().fibLevels(s.hi,s.lo); const r=s.hi-s.lo;
  let F=-1; for(let i=s.hiI+3;i<D.length-20;i++){ if(D[i].l<=s.hi-r*.5){ F=i; break; } }
  return {s,lv,F}; }
function fibChart(D,X,k,opt={}){ const s0=opt.s0??0, end=opt.reveal||k;
  const o={h:270,vol:opt.vol!==false,hl:(opt.levels!==false)?X.lv.map(l=>({p:l.p,label:(l.r*100).toFixed(1)+"%",col:[.382,.5,.618].includes(l.r)?"var(--gold)":"var(--muted)"})):[],
   marks:opt.marks?[{i:X.s.loI-s0,label:"swing low",pos:"below",col:"var(--up)"},{i:X.s.hiI-s0,label:"swing high",pos:"above",col:"var(--down)"}]:[],vl:[],zones:opt.zones||[]};
  if(opt.here!=null) o.vl.push({i:opt.here-s0,label:T({id:"kamu di sini",en:"you are here"})});
  if(opt.reveal) o.zones=[...o.zones,{i0:k+1-s0,i1:opt.reveal-s0,col:D[opt.reveal].c>=D[k].c?"var(--up)":"var(--down)"}];
  return C().fig(D.slice(s0,end+1),o,opt.cap||""); }
const FIB={
 key:"fib", t:"Fibonacci Retracement", data:fibData, build:fibBuild,
 steps:(D,X)=>{ const last=D.length-1, S=[];
  S.push({t:{id:"Langkah 1 · Cari satu gelombang yang jelas",en:"Step 1 · Find one clear swing"},
   chart:()=>fibChart(D,X,X.s.hiI+2,{levels:false,marks:true}),
   text:{id:`<p>Fibonacci dimulai dari <b>satu gelombang naik</b> yang jelas: titik terendah (swing low) sampai titik tertinggi (swing high). Pilih gelombang yang terlihat jelas di grafik harian — jangan dari candle sembarangan.</p><p>Di grafik: swing low ditandai ▲ hijau, swing high ditandai ▼ merah.</p>`,
    en:`<p>Fibonacci starts from <b>one clear up-swing</b>: the lowest point (swing low) to the highest point (swing high). Pick a swing that is obvious on the daily chart — not from random candles.</p><p>On the chart: the swing low is marked ▲ green, the swing high ▼ red.</p>`}});
  S.push({t:{id:"Langkah 2 · Menarik level-levelnya",en:"Step 2 · Drawing the levels"},
   chart:()=>fibChart(D,X,X.s.hiI+2,{marks:true}),
   text:{id:`<p>Jarak swing low → swing high dianggap 100%. Level koreksi diukur turun dari puncak:</p>
<div class="formula">Level 38,2% = High − 0,382 × (High − Low)
Level 50%   = High − 0,500 × (High − Low)
Level 61,8% = High − 0,618 × (High − Low)</div>
<p>Contoh: low 1.000, high 1.500 (jarak 500). Level 50% = 1.500 − 250 = <b>1.250</b>. Level 61,8% = 1.500 − 309 = <b>1.191</b>.</p>
<p>Zona emas (kuning) adalah <b>38,2% – 61,8%</b>. Di sinilah koreksi sehat dalam uptrend paling sering berhenti. Kenapa? Sebagian karena banyak trader memasang antrian beli di sana — level ini bekerja karena dipercaya banyak orang.</p>`,
    en:`<p>The swing low → swing high distance counts as 100%. Pullback levels are measured down from the top:</p>
<div class="formula">38.2% level = High − 0.382 × (High − Low)
50% level   = High − 0.500 × (High − Low)
61.8% level = High − 0.618 × (High − Low)</div>
<p>Example: low 1,000, high 1,500 (range 500). 50% level = 1,500 − 250 = <b>1,250</b>. 61.8% = 1,500 − 309 = <b>1,191</b>.</p>
<p>The golden zone (yellow) is <b>38.2%–61.8%</b>. Healthy pullbacks in an uptrend most often stop here. Why? Partly because many traders queue buy orders there — the levels work because many people believe in them.</p>`}});
  if(X.F>0) S.push({quiz:true,k:X.F,h:25,exp:"up",t:{id:"Langkah 3 · Tebak: koreksi sampai level 50%",en:"Step 3 · Guess: the pullback reaches 50%"},
   chart:(rev)=>fibChart(D,X,X.F,{here:X.F,reveal:rev?Math.min(last,X.F+25):null}),
   text:{id:`<p>Setelah gelombang naik, harga koreksi dan hari ini menyentuh <b>level 50%</b>. Volume saat koreksi lebih kecil dibanding saat naik (lihat batang volume).</p><p>25 hari ke depan…</p>`,en:`<p>After the up-swing, price pulled back and today touched the <b>50% level</b>. Volume on the pullback is lower than on the rise (see the volume bars).</p><p>Over the next 25 days…</p>`},
   why:{id:"Koreksi ke zona 38,2–61,8% dengan volume mengecil adalah ciri koreksi sehat. Rencana: masuk saat ada candle naik di zona itu, stop di bawah 78,6%, target pertama swing high sebelumnya. Kalau 78,6% tembus, gelombang naiknya dianggap gagal.",en:"A pullback into 38.2–61.8% on shrinking volume is the mark of a healthy correction. Plan: enter on an up candle in the zone, stop below 78.6%, first target the prior swing high. If 78.6% breaks, the up-swing is considered failed."}});
  S.push({tf:"fib",t:{id:"Langkah 4 · Timeframe & kapan Fibonacci tidak berguna",en:"Step 4 · Timeframe & when Fibonacci is useless"}});
  return S; }
};

/* ================= MA & MACD (singkat) ================= */
function maData(){ return C().gen(1200,3000,[[80,-.3,1.4],[60,0,1.3],[120,.3,1.4,1.2],[60,-.35,1.6]]); }
function maBuild(D){ const c=D.map(x=>x.c), m20=C().sma(c,20), m50=C().sma(c,50), mc=C().macd(c); let GX=-1; for(let i=60;i<D.length-25;i++){ if(m20[i-1]<=m50[i-1]&&m20[i]>m50[i]){ GX=i; break; } } return {m20,m50,mc,GX}; }
function maChart(D,X,k,opt={}){ const s0=Math.max(0,opt.s0??k-150), end=opt.reveal||k, cut=a=>a.slice(s0,end+1);
  const o={h:240,vol:false,lines:[{a:cut(X.m20),col:"var(--accent)",label:"MA20"},{a:cut(X.m50),col:"var(--gold)",label:"MA50"}],sub:opt.macd?{a:cut(X.mc.m),b:cut(X.mc.sig),min:Math.min(...X.mc.m.filter(x=>x!=null))*1.1,max:Math.max(...X.mc.m.filter(x=>x!=null))*1.1,levels:[0],label:"MACD / signal"}:null,vl:[],zones:[]};
  if(!o.sub) delete o.sub;
  if(opt.here!=null) o.vl.push({i:opt.here-s0,label:T({id:"kamu di sini",en:"you are here"})});
  if(opt.reveal) o.zones=[{i0:k+1-s0,i1:opt.reveal-s0,col:D[opt.reveal].c>=D[k].c?"var(--up)":"var(--down)"}];
  return C().fig(D.slice(s0,end+1),o,opt.cap||""); }
const MA={
 key:"ma", t:"Moving Average & MACD", data:maData, build:maBuild,
 steps:(D,X)=>{ const last=D.length-1, S=[];
  S.push({t:{id:"Langkah 1 · Moving average = harga rata-rata",en:"Step 1 · A moving average = the average price"},
   chart:()=>maChart(D,X,last,{s0:0}),
   text:{id:`<p>MA20 adalah rata-rata harga penutupan 20 hari terakhir; setiap hari, hari tertua dibuang dan hari terbaru dimasukkan — makanya "bergerak". MA50 sama, tapi 50 hari.</p><ul><li>Harga di atas MA dan MA mengarah naik = uptrend.</li><li>MA20 memotong MA50 ke atas = tren jangka pendek menguat (sering disebut "golden cross" untuk MA50/MA200).</li><li>Di pasar sideways, persilangan MA sering palsu (whipsaw).</li></ul>`,
    en:`<p>The MA20 is the average close of the last 20 days; each day the oldest day drops out and the newest comes in — hence "moving". The MA50 is the same over 50 days.</p><ul><li>Price above a rising MA = uptrend.</li><li>MA20 crossing above MA50 = the short-term trend strengthening (the MA50/MA200 version is the "golden cross").</li><li>In ranges, MA crosses are often false (whipsaws).</li></ul>`}});
  if(X.GX>0) S.push({quiz:true,k:X.GX,h:25,exp:"up",t:{id:"Langkah 2 · Tebak: MA20 memotong MA50 ke atas",en:"Step 2 · Guess: MA20 crosses above MA50"},
   chart:(rev)=>maChart(D,X,X.GX,{here:X.GX,macd:true,reveal:rev?Math.min(last,X.GX+25):null}),
   text:{id:`<p>Hari ini garis biru (MA20) memotong garis kuning (MA50) ke atas. Di panel bawah, MACD juga sudah di atas garis sinyal.</p><p>25 hari ke depan…</p>`,en:`<p>Today the blue line (MA20) crossed above the yellow (MA50). In the lower panel, MACD is above its signal line too.</p><p>Over the next 25 days…</p>`},
   why:{id:"Persilangan MA + MACD positif menunjukkan momentum berbalik naik. Ini sinyal yang lambat (datang setelah harga sudah naik), tapi berguna sebagai filter: hanya cari posisi beli saat MA20 di atas MA50.",en:"An MA cross plus a positive MACD shows momentum turning up. It's a slow signal (arrives after price has already risen), but useful as a filter: only look to buy when MA20 is above MA50."}});
  S.push({tf:"ma",t:{id:"Langkah 3 · Timeframe yang cocok",en:"Step 3 · Which timeframe"}});
  return S; }
};

const GUIDES=[ICHI,RSI,BB,FIB,MA];

/* ---------- panduan timeframe ---------- */
const TF={
 ichi:{id:`<p>Ichimoku <b>dirancang untuk grafik harian</b>. Angka 9, 26, dan 52 berasal dari masa ketika bursa Jepang buka 6 hari seminggu: ±1,5 minggu, ±1 bulan, dan ±2 bulan perdagangan.</p>
<div class="tablewrap"><table><tr><th>Timeframe</th><th>Cocok untuk</th><th>Catatan di IDX</th></tr>
<tr><td><b>Harian</b> ⭐</td><td>Swing trading (beberapa hari–minggu)</td><td>Paling disarankan. Awan = support/resistance ±1 bulan ke depan.</td></tr>
<tr><td><b>Mingguan</b></td><td>Investor (beberapa bulan)</td><td>Bagus untuk memilih saham yang tren besarnya naik. Awan mingguan sangat kuat.</td></tr>
<tr><td><b>Per jam</b></td><td>Trader aktif, hanya saham LQ45 yang likuid</td><td>BEI berdagang ±5 jam sehari, jadi 26 bar per jam ≈ 5 hari bursa. Ichimoku per jam mengukur tren <b>1 minggu</b>, bukan 1 bulan. Lebih banyak sinyal palsu.</td></tr>
<tr><td><b>5–15 menit</b></td><td>Scalping</td><td>Tidak disarankan untuk pemula; sangat terpengaruh antrian & manipulasi order book.</td></tr></table></div>
<p><b>Cara terbaik:</b> gunakan dua timeframe. Mingguan/harian untuk menentukan arah ("boleh beli atau tidak"), lalu harian/per jam untuk mencari titik masuk.</p>`,
 en:`<p>Ichimoku was <b>designed for daily charts</b>. The 9, 26 and 52 settings come from a time when Japan traded 6 days a week: ~1.5 weeks, ~1 month and ~2 months of trading.</p>
<div class="tablewrap"><table><tr><th>Timeframe</th><th>Suits</th><th>Notes for IDX</th></tr>
<tr><td><b>Daily</b> ⭐</td><td>Swing trading (days–weeks)</td><td>Most recommended. The cloud = support/resistance ~1 month ahead.</td></tr>
<tr><td><b>Weekly</b></td><td>Investors (months)</td><td>Great for choosing stocks whose big trend is up. Weekly clouds are very strong.</td></tr>
<tr><td><b>Hourly</b></td><td>Active traders, liquid LQ45 stocks only</td><td>IDX trades ~5 hours a day, so 26 hourly bars ≈ 5 trading days. Hourly Ichimoku measures a <b>1-week</b> trend, not 1 month. More false signals.</td></tr>
<tr><td><b>5–15 min</b></td><td>Scalping</td><td>Not recommended for beginners; heavily affected by queue games and order-book manipulation.</td></tr></table></div>
<p><b>Best practice:</b> use two timeframes. Weekly/daily to decide direction ("may I buy at all"), then daily/hourly to find the entry.</p>`},
 rsi:{id:`<div class="tablewrap"><table><tr><th>Timeframe</th><th>Cara pakai</th></tr>
<tr><td><b>Harian</b> ⭐</td><td>RSI 14 standar. Untuk swing trading; sinyal 1–3 kali sebulan per saham.</td></tr>
<tr><td><b>Mingguan</b></td><td>RSI mingguan di bawah 30 jarang terjadi — biasanya hanya saat krisis/panik besar. Berguna untuk investor mencari saham bagus yang sedang "dibuang".</td></tr>
<tr><td><b>Per jam / 15 menit</b></td><td>Untuk masuk lebih presisi di saham likuid. Gunakan bersama arah RSI harian: kalau RSI harian di atas 50, cari RSI per jam yang turun ke 40–45 lalu naik lagi.</td></tr></table></div>
<p>Beberapa trader memakai RSI lebih pendek (7–9) untuk sinyal lebih cepat, atau lebih panjang (21) untuk lebih halus. Ubah sedikit saja, dan uji di Lab Indikator.</p>`,
 en:`<div class="tablewrap"><table><tr><th>Timeframe</th><th>How to use</th></tr>
<tr><td><b>Daily</b> ⭐</td><td>Standard RSI 14. For swing trading; 1–3 signals a month per stock.</td></tr>
<tr><td><b>Weekly</b></td><td>Weekly RSI below 30 is rare — usually only in crises/major panic. Useful for investors hunting good stocks being dumped.</td></tr>
<tr><td><b>Hourly / 15 min</b></td><td>For more precise entries in liquid stocks. Use with the daily direction: if daily RSI is above 50, look for hourly RSI dipping to 40–45 then turning up.</td></tr></table></div>
<p>Some traders use a shorter RSI (7–9) for faster signals or longer (21) for smoother ones. Change it a little, and test in the Indicator Lab.</p>`},
 bb:{id:`<div class="tablewrap"><table><tr><th>Timeframe</th><th>Cara pakai</th></tr>
<tr><td><b>Harian</b> ⭐</td><td>Bollinger (20, 2) standar. Squeeze harian = persiapan gerakan besar dalam hitungan hari–minggu.</td></tr>
<tr><td><b>Mingguan</b></td><td>Squeeze mingguan jarang tapi sangat kuat — sering mendahului tren berbulan-bulan.</td></tr>
<tr><td><b>Per jam</b></td><td>Untuk menangkap breakout intraday di saham likuid. Konfirmasi dengan volume & order book (HAKA menyapu offer).</td></tr></table></div>`,
 en:`<div class="tablewrap"><table><tr><th>Timeframe</th><th>How to use</th></tr>
<tr><td><b>Daily</b> ⭐</td><td>Standard Bollinger (20, 2). A daily squeeze = preparing for a big move within days–weeks.</td></tr>
<tr><td><b>Weekly</b></td><td>Weekly squeezes are rare but powerful — often preceding months-long trends.</td></tr>
<tr><td><b>Hourly</b></td><td>To catch intraday breakouts in liquid stocks. Confirm with volume & the order book (aggressive buys sweeping offers).</td></tr></table></div>`},
 fib:{id:`<p>Tarik Fibonacci di timeframe tempat <b>gelombangnya paling jelas</b>. Untuk swing trading biasanya harian; untuk investor, mingguan.</p>
<p>Fibonacci <b>tidak berguna</b> ketika: (1) tidak ada gelombang yang jelas (harga sideways acak), (2) saham sepi sehingga high/low ditentukan 1–2 transaksi kecil, (3) kamu memilih titik swing setelah melihat hasilnya — semua level akan terlihat "bekerja".</p>`,
 en:`<p>Draw Fibonacci on the timeframe where <b>the swing is clearest</b>. Usually daily for swing trading, weekly for investors.</p>
<p>Fibonacci is <b>useless</b> when: (1) there is no clear swing (random sideways), (2) the stock is so illiquid that 1–2 tiny trades set the high/low, (3) you pick the swing points after seeing the outcome — every level will look like it "worked".</p>`},
 ma:{id:`<ul><li><b>Harian</b>: MA20 (pendek), MA50 (menengah), MA200 (≈1 tahun, tren besar).</li><li><b>Mingguan</b>: MA40 mingguan ≈ MA200 harian.</li><li><b>Per jam</b>: MA20 per jam ≈ 4 hari bursa di IDX — berguna untuk timing masuk, bukan menentukan tren besar.</li></ul>`,
 en:`<ul><li><b>Daily</b>: MA20 (short), MA50 (medium), MA200 (~1 year, the big trend).</li><li><b>Weekly</b>: a 40-week MA ≈ the 200-day MA.</li><li><b>Hourly</b>: a 20-hour MA ≈ 4 IDX trading days — useful for entry timing, not for the big trend.</li></ul>`},
};

/* ---------- 🔊 Bacakan — machine "readAloud": unsupported | idle ⇄ speaking ----------
   PLAY (idle→speaking), STOP (speaking→idle), END (speaking→idle, hanya jika token pemutaran cocok).
   Token mencegah event "end" dari pemutaran lama mematikan pemutaran yang baru. */
const RA_SUPPORTED="speechSynthesis" in window;
let raBar=null, raTarget=null, raToken=0;
function voiceFor(){ const vs=speechSynthesis.getVoices(); const want=window.LANG==="en"?"en":"id"; return {any:vs.length>0, v:vs.find(v=>v.lang.toLowerCase().replace("_","-").startsWith(want))}; }
function raRender(){ if(!raBar||!raBar.isConnected) return; const play=raBar.querySelector(".rb-play"), stop=raBar.querySelector(".rb-stop");
  const st=raM.state; play.hidden=st==="speaking"; stop.hidden=st!=="speaking"; play.disabled=st==="unsupported";
  raBar.dataset.machine="readAloud"; raBar.dataset.state=st; }
const raM=window.Machines.create({ id:"readAloud", initial:RA_SUPPORTED?"idle":"unsupported", context:{token:0}, states:{
  unsupported:{ on:{} },
  idle:{ enter:()=>{ raToken++; if(RA_SUPPORTED) speechSynthesis.cancel(); raRender(); },
    on:{ PLAY:{ target:"speaking", guard:()=>!!raBar&&!!raTarget } } },
  speaking:{ enter:()=>{ const tok=++raToken; speechSynthesis.cancel();
      const msg=raBar.querySelector(".rb-msg"), rate=raBar.querySelector(".rb-rate");
      const el=typeof raTarget==="function"?raTarget():raTarget; const clone=el.cloneNode(true); clone.querySelectorAll("svg,.readbar,button,select,.formula,textarea,.quiz .guess").forEach(x=>x.remove());
      const text=clone.innerText.replace(/\s+/g," ").trim(); const parts=(text.match(/[^.!?…]+[.!?…]*/g)||[text]).map(x=>x.trim()).filter(Boolean);
      const {any,v}=voiceFor();
      msg.textContent = any&&!v ? T({id:"Suara Bahasa Indonesia belum terpasang — di Mac: System Settings › Accessibility › Spoken Content › System voice › Manage Voices › Indonesian.",en:"No matching voice installed on this device."}) : "";
      if(!parts.length){ raM.send("END",{token:tok}); return; }
      parts.forEach((p,i)=>{ const u=new SpeechSynthesisUtterance(p); u.lang=window.LANG==="en"?"en-US":"id-ID"; if(v) u.voice=v; u.rate=parseFloat(rate.value)||.9;
        if(i===parts.length-1){ u.onend=()=>raM.send("END",{token:tok}); }
        u.onerror=(e)=>{ if(e.error!=="interrupted"&&e.error!=="canceled") raM.send("END",{token:tok}); };
        speechSynthesis.speak(u); });
      raRender(); },
    on:{ STOP:"idle", END:{ target:"idle", guard:(c,p)=>!!p&&p.token===raToken } } } } });
function readBar(){ return `<div class="readbar"><button class="btn sec rb-play">🔊 ${T({id:"Bacakan",en:"Read aloud"})}</button><button class="btn sec rb-stop" hidden>⏹ ${T({id:"Berhenti",en:"Stop"})}</button>
 <label class="hint">${T({id:"Kecepatan",en:"Speed"})} <select class="rb-rate"><option value=".75">0,75×</option><option value=".9" selected>0,9×</option><option value="1">1×</option><option value="1.15">1,15×</option></select></label><span class="hint rb-msg" role="status" aria-live="polite"></span></div>`; }
function attachRead(bar, target){
  raM.send("STOP"); raBar=bar; raTarget=target;
  const play=bar.querySelector(".rb-play"), stop=bar.querySelector(".rb-stop"), rate=bar.querySelector(".rb-rate"), msg=bar.querySelector(".rb-msg");
  if(raM.is("unsupported")) msg.textContent=T({id:"Browser ini tidak mendukung fitur bacakan.",en:"This browser doesn't support read-aloud."});
  try{ const r=localStorage.getItem("sb_rate"); if(r) rate.value=r; }catch(e){}
  rate.onchange=()=>{ try{ localStorage.setItem("sb_rate",rate.value); }catch(e){} };
  play.onclick=()=>raM.send("PLAY"); stop.onclick=()=>raM.send("STOP");
  raRender();
}
window.ReadAloud={bar:readBar, attach:attachRead, stop:()=>raM.send("STOP")};

/* ---------- UI — machine "guide": list | step (context: key, i, total) ----------
   NEXT / PREV / GOTO(n) hanya berlaku di dalam batas langkah; tombol & tanda panah keyboard (← →) memakai event yang sama.
   Kuis tiap langkah memakai QuizUI (open → answered). */
let guideM=null, keyHandler=null;
function indexPage(el){
  el.innerHTML=`<div class="kicker">${T({id:"Belajar pelan-pelan",en:"Learn slowly"})}</div><h1>${T({id:"Belajar Pelan-pelan",en:"Learn Step by Step"})}</h1>
   <p class="lead">${T({id:"Setiap topik dijelaskan satu bagian per langkah. Di beberapa langkah grafik dipotong pada satu hari — kamu menebak dulu, lalu hari-hari berikutnya dibuka supaya kamu melihat sendiri apa yang terjadi setelah sinyal muncul, termasuk saat sinyalnya gagal.",en:"Each topic is explained one part per step. At some steps the chart is cut at a single day — you guess first, then the following days are revealed so you see for yourself what happened after the signal, including when it failed."})}</p>
   ${[["flow",{id:"Order book & bandarmologi",en:"Order book & bandarmology"}],["fund",{id:"Fundamental & valuasi",en:"Fundamentals & valuation"}],["ind",{id:"Indikator teknikal",en:"Technical indicators"}]].map(([c,lab])=>`<h2>${T(lab)}</h2><div class="grid g2">${GUIDES.filter(g=>(g.cat||"ind")===c).map(g=>`<a class="card" href="#/pelan/${g.key}"><h3 style="margin:0 0 6px">${T(g.t)}</h3><div class="hint">${g.sub?T(g.sub)+" · ":""}${T({id:"Mulai langkah demi langkah →",en:"Start step by step →"})}</div></a>`).join("")}</div>`).join("")}
   <div class="note">${T({id:"Grafik memakai data fiktif yang dibuat agar contoh tiap pola terlihat jelas. Di saham sungguhan pola jarang serapi ini — latih lagi dengan data asli di Lab Indikator.",en:"Charts use fictional data built so each pattern is clearly visible. Real stocks are rarely this tidy — practise again with real data in the Indicator Lab."})}</div>`;
}
function bindQuiz(el,s,D){
  const box=el.querySelector(".quiz"); if(!box) return;
  if(s.quiz){
    let o=null;
    window.QuizUI.bind(box,{ buttons:".guess button", correct:()=>{ o=outcome(D,s.k,s.h); return cls(o.chg); },
      onAnswer:(key,ok,real)=>{
        el.querySelector(".gbody .chartbox").outerHTML=s.chart(true);
        const days=o.e-s.k; const failed=s.exp!=="any"&&real!==s.exp;
        box.querySelector(".ex").innerHTML=`<p><b class="${ok?"up":"down"}">${ok?T({id:"Tebakanmu tepat.",en:"You got it."}):T({id:"Belum tepat.",en:"Not this time."})}</b> ${T({id:`Dalam ${days} hari bursa berikutnya harga berubah <b>${pct(o.chg)}</b> (naik paling tinggi ${pct(o.maxUp)}, turun paling dalam ${pct(o.maxDn)}). Area berwarna di grafik adalah hari-hari yang baru dibuka.`,en:`Over the next ${days} trading days price moved <b>${pct(o.chg)}</b> (highest ${pct(o.maxUp)}, deepest ${pct(o.maxDn)}). The shaded area is the newly revealed days.`})}</p>
         <p>${T(s.why)}</p>${failed?`<p class="note warn"><b>${T({id:"Sinyal gagal di contoh ini.",en:"The signal failed here."})}</b> ${T({id:"Inilah kenyataan indikator: ia memberi peluang, bukan kepastian. Karena itu setiap sinyal butuh stop loss.",en:"That's the reality of indicators: they give odds, not certainty. That's why every signal needs a stop loss."})}</p>`:""}`;
        window.linkTerms(box.querySelector(".ex")); } });
  } else if(s.opts){
    window.QuizUI.bind(box,{ buttons:".guess button", correct:s.ans,
      onAnswer:(key,ok)=>{
        if(s.reveal){ const r=document.createElement("div"); r.className="quiz-reveal"; r.innerHTML=s.reveal(); box.after(r); }
        box.querySelector(".ex").innerHTML=`<p><b class="${ok?"up":"down"}">${ok?T({id:"Tepat.",en:"Correct."}):T({id:"Belum tepat.",en:"Not quite."})}</b> ${T(s.why)}</p>`;
        window.linkTerms(box.querySelector(".ex")); } });
  }
}
function mount(el,q,parts){
  unmount();
  const key=parts&&parts[0];
  if(!key){ guideM=window.Machines.create({id:"guide",initial:"list",states:{list:{on:{}}}}).bind(el); indexPage(el); return; }
  const g=GUIDES.find(x=>x.key===key); if(!g){ location.hash="#/pelan"; return; }
  const D=g.data(), X=g.build(D), steps=g.steps(D,X), total=steps.length;
  let start=parseInt(q.s,10)-1; if(!(start>=0&&start<total)) start=0;
  const draw=(ctx)=>{ const i=ctx.i, s=steps[i]; window.ReadAloud.stop();
    el.innerHTML=`<article class="lesson guide" data-guide="${key}" data-step="${i+1}" data-total="${total}">
    <div class="kicker"><a href="#/pelan">${T({id:"Belajar Pelan-pelan",en:"Learn Step by Step"})}</a> · ${T(g.t)}</div>
    <nav class="dots" aria-label="${T({id:"Langkah",en:"Steps"})}">${steps.map((_,k)=>`<button class="${k===i?"on":k<i?"done":""}" data-k="${k}" aria-label="${T({id:"Langkah",en:"Step"})} ${k+1} / ${total}"${k===i?' aria-current="step"':""}>${k+1}</button>`).join("")}</nav>
    <h1 tabindex="-1">${T(s.t)}</h1>
    ${readBar()}
    <div class="gbody">${s.tf? T(TF[s.tf]) : ""}${s.chart? s.chart(false) : ""}${s.text? T(s.text):""}</div>
    ${s.opts?`<div class="quiz"><div class="qn">${T({id:"Tebakanmu",en:"Your guess"})}</div><p>${T(s.q)}</p><div class="guess">${s.opts.map(o=>`<button data-a="${o.a}">${T(o.l)}</button>`).join("")}</div><div class="ex"></div></div>`:""}${s.quiz?`<div class="quiz"><div class="qn">${T({id:"Tebakanmu",en:"Your guess"})}</div><div class="guess"><button data-a="up">▲ ${T({id:"Naik (lebih dari +3%)",en:"Rise (more than +3%)"})}</button><button data-a="flat">◆ ${T({id:"Datar (−3% s.d. +3%)",en:"Flat (−3% to +3%)"})}</button><button data-a="down">▼ ${T({id:"Turun (lebih dari −3%)",en:"Fall (more than −3%)"})}</button></div><div class="ex"></div></div>`:""}
    <div class="lessonnav">${i>0?`<button class="btn sec" id="gPrev">← ${T({id:"Sebelumnya",en:"Previous"})}</button>`:`<a class="btn sec" href="#/pelan">← ${T({id:"Daftar",en:"List"})}</a>`}
     ${i<total-1?`<button class="btn" id="gNext">${T({id:"Berikutnya",en:"Next"})} →</button>`:`<a class="btn" href="${g.endHref||"#/indikator"}">${T(g.endLabel||{id:"Uji di Lab Indikator →",en:"Test in the Indicator Lab →"})}</a>`}</div>
    <p class="hint kbdhint">${T({id:"Tip: tombol ← dan → di keyboard juga berpindah langkah.",en:"Tip: the ← and → keys also move between steps."})}</p></article>`;
    window.ReadAloud.attach(el.querySelector(".readbar"), ()=>el.querySelector(".gbody"));
    el.querySelectorAll(".dots button").forEach(b=>b.onclick=()=>guideM.send("GOTO",+b.dataset.k));
    const p=el.querySelector("#gPrev"), n=el.querySelector("#gNext"); if(p) p.onclick=()=>guideM.send("PREV"); if(n) n.onclick=()=>guideM.send("NEXT");
    bindQuiz(el,s,D);
    window.linkTerms(el.querySelector(".gbody"));
    if(window.Guide.afterDraw) window.Guide.afterDraw(el);
  };
  const go=(ctx)=>{ history.replaceState(null,"",`#/pelan/${key}?s=${ctx.i+1}`); draw(ctx); window.scrollTo(0,0); const h=el.querySelector("h1"); if(h) h.focus({preventScroll:true}); };
  guideM=window.Machines.create({ id:"guide", initial:"step", context:{key,i:start,total}, states:{ step:{ on:{
    NEXT:{ guard:c=>c.i<c.total-1, action:(c)=>{ c.i++; go(c); } },
    PREV:{ guard:c=>c.i>0, action:(c)=>{ c.i--; go(c); } },
    GOTO:{ guard:(c,n)=>Number.isInteger(n)&&n>=0&&n<c.total&&n!==c.i, action:(c,n)=>{ c.i=n; go(c); } } } } } }).bind(el);
  keyHandler=e=>{ if(e.altKey||e.ctrlKey||e.metaKey||e.shiftKey) return; const t=e.target; if(t&&(/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)||t.isContentEditable)) return;
    if(e.key==="ArrowRight"&&guideM.send("NEXT")) e.preventDefault(); else if(e.key==="ArrowLeft"&&guideM.send("PREV")) e.preventDefault(); };
  document.addEventListener("keydown",keyHandler);
  draw(guideM.context);
}
function unmount(){ window.ReadAloud.stop(); if(keyHandler){ document.removeEventListener("keydown",keyHandler); keyHandler=null; } }
window.Guide={mount, unmount, list:GUIDES};
})();
