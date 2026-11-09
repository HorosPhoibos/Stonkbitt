/* Belajar Pelan-pelan: Foreign Flow (F). Data fiktif kecuali angka BBCA dari tangkapan layar pengguna. */
(function(){
const T=o=>window.T(o);
const C=()=>window.Charts;
const loc=()=>window.LANG==="en"?"en-US":"id-ID";
const f=(n,d=0)=>Number(n).toLocaleString(loc(),{minimumFractionDigits:d,maximumFractionDigits:d});

/* harga + arus asing harian (Rp miliar) per segmen */
const SEG=[[40,-.3,1.4],[50,-.05,1.2],[60,.45,1.3],[40,.05,1.4],[40,-.35,1.5]];
const FLOW=[-20,35,15,-32,-10];
const SEED=6103;
function ffData(){ return C().gen(SEED,5000,SEG); }
function ffBuild(D){ const r=C().rng(SEED*7+1); const net=[]; let k=0;
  SEG.forEach(([n],si)=>{ for(let i=0;i<n;i++){ const u=(r()+r()+r()-1.5)*40; net.push(FLOW[si]+u); k++; } });
  let c=0; const cum=net.map(x=>c+=x);
  const b=[0]; SEG.forEach(([n])=>b.push(b[b.length-1]+n));
  return {net,cum,b}; }
function ffChart(D,X,k,opt={}){ const s0=opt.s0??0, end=opt.reveal||k; const cum=X.cum.slice(s0,end+1);
  const mn=Math.min(...X.cum.slice(s0,end+1)), mx=Math.max(...X.cum.slice(s0,end+1)), pad=(mx-mn)*.1||10;
  const o={h:230,vol:false,sub:{a:cum,min:mn-pad,max:mx+pad,levels:[0],label:T({id:"Akumulasi net foreign (Rp miliar)",en:"Cumulative net foreign (Rp bn)"})},vl:[],zones:opt.zones||[]};
  if(opt.here!=null) o.vl.push({i:opt.here-s0,label:T({id:"kamu di sini",en:"you are here"})});
  if(opt.reveal) o.zones=[...o.zones,{i0:k+1-s0,i1:opt.reveal-s0,col:D[opt.reveal].c>=D[k].c?"var(--up)":"var(--down)"}];
  return C().fig(D.slice(s0,end+1),o,opt.cap||""); }
function flowBox(rows,cap){ return `<div class="tablewrap"><table><tr><th></th><th>F Buy</th><th>F Sell</th><th>Net</th></tr>${rows.map(r=>`<tr><td><b>${T(r[0])}</b></td><td class="num">${r[1]}</td><td class="num">${r[2]}</td><td class="num ${r[4]||""}">${r[3]}</td></tr>`).join("")}</table></div>${cap?`<p class="hint">${cap}</p>`:""}`; }

const FF={ key:"asing", cat:"flow", t:{id:"Foreign flow langkah demi langkah",en:"Foreign Flow Step by Step"}, sub:{id:"F Buy/F Sell, porsi asing, nego, tren, rupiah, MSCI",en:"F Buy/F Sell, foreign share, block deals, trends, rupiah, MSCI"},
 endHref:"#/asing", endLabel:{id:"Latihan di Matriks Asing vs Lokal →",en:"Practise in the Foreign vs Local Matrix →"},
 data:ffData, build:ffBuild,
 steps:(D,X)=>{ const last=D.length-1, S=[]; const b=X.b;
 S.push({t:{id:"Langkah 1 · Apa itu F Buy, F Sell, dan net foreign",en:"Step 1 · What F Buy, F Sell and net foreign mean"},
  chart:()=>flowBox([[{id:"BBCA (dari screenshot-mu)",en:"BBCA (from your screenshot)"},"1,15 T","631,18 M","+519 M","up"]],T({id:"T = triliun, M = miliar rupiah. Angka dari panel Stockbit pada tangkapan layar.",en:"T = trillion, M (B) = billion rupiah. Figures from the Stockbit panel in the screenshot."})),
  text:{id:`<p>Setiap investor di BEI punya <b>SID</b> yang mencatat apakah ia investor <b>domestik</b> atau <b>asing</b>. Dari situ bursa bisa menjumlahkan:</p>
<ul><li><b>F Buy</b> = total nilai saham yang <b>dibeli</b> investor asing hari itu.</li><li><b>F Sell</b> = total nilai yang <b>dijual</b> investor asing.</li><li><b>Net foreign</b> = F Buy − F Sell.</li></ul>
<div class="formula">BBCA: 1,15 T − 0,631 T = +0,519 T  → net foreign buy ±Rp519 miliar</div>
<p>Artinya hari itu investor asing secara bersih <b>menambah</b> kepemilikan BBCA sekitar Rp519 miliar, dan investor domestik secara bersih <b>mengurangi</b> sebesar itu (setiap lembar yang dibeli pasti ada yang menjual).</p>
<p><b>Penting:</b> yang dihitung adalah <b>tipe investornya</b>, bukan broker-nya. Investor asing bisa membeli lewat broker lokal, dan investor lokal bisa memakai broker asing.</p>`,
   en:`<p>Every IDX investor has an <b>SID</b> recording whether they are a <b>domestic</b> or <b>foreign</b> investor. So the exchange can total:</p>
<ul><li><b>F Buy</b> = total value <b>bought</b> by foreign investors that day.</li><li><b>F Sell</b> = total value <b>sold</b> by foreign investors.</li><li><b>Net foreign</b> = F Buy − F Sell.</li></ul>
<div class="formula">BBCA: 1.15T − 0.631T = +0.519T  → net foreign buy of ~Rp519 billion</div>
<p>So that day foreign investors, on balance, <b>added</b> ~Rp519 billion of BBCA, and domestic investors on balance <b>reduced</b> by the same amount (every share bought was sold by someone).</p>
<p><b>Important:</b> what's counted is the <b>investor type</b>, not the broker. Foreigners can buy through local brokers, and locals can use foreign brokers.</p>`}});
 S.push({t:{id:"Langkah 2 · Hitung porsi asing dulu",en:"Step 2 · Compute the foreign share first"},
  chart:()=>flowBox([[{id:"BBCA",en:"BBCA"},"1,15 T","631 M","+519 M","up"],[{id:"Saham lapis 3 (fiktif)",en:"Small cap (fictional)"},"40 jt","10 jt","+30 jt","up"]]),
  text:{id:`<p>Sebelum menilai net foreign, tanya: <b>seberapa besar peran asing di saham ini?</b></p>
<div class="formula">Porsi asing = (F Buy + F Sell) ÷ (2 × nilai transaksi total)

BBCA      : (1,15 T + 0,631 T) ÷ (2 × 1,49 T) = 1,781 ÷ 2,98 ≈ 60%
Lapis 3   : (40 jt + 10 jt) ÷ (2 × 20 miliar)  = 50 jt ÷ 40 miliar ≈ 0,1%</div>
<p>Di BBCA, sekitar 60% transaksi hari itu melibatkan asing — net foreign <b>sangat bermakna</b>. Di saham lapis 3, net foreign "+30 juta" terlihat positif, tapi porsinya cuma 0,1% — <b>tidak berarti apa-apa</b>. Di saham seperti ini, gunakan bandarmologi lokal (broker summary).</p>`,
   en:`<p>Before judging net foreign, ask: <b>how big a role do foreigners play in this stock?</b></p>
<div class="formula">Foreign share = (F Buy + F Sell) ÷ (2 × total traded value)

BBCA      : (1.15T + 0.631T) ÷ (2 × 1.49T) = 1.781 ÷ 2.98 ≈ 60%
Small cap : (40M + 10M) ÷ (2 × 20B)          = 50M ÷ 40B ≈ 0.1%</div>
<p>In BBCA about 60% of that day's trading involved foreigners — net foreign is <b>highly meaningful</b>. In the small cap, "+30 million" looks positive but the share is 0.1% — <b>it means nothing</b>. For stocks like that, use local bandarmology (the broker summary).</p>`}});
 S.push({t:{id:"Langkah 3 · Jebakan transaksi nego (crossing)",en:"Step 3 · The block-deal (negotiated) trap"},
  chart:()=>flowBox([[{id:"Pasar reguler (RG)",en:"Regular market (RG)"},"420 M","450 M","−30 M","down"],[{id:"Pasar negosiasi (NG)",en:"Negotiated market (NG)"},"830 M","0","+830 M","up"],[{id:"Total",en:"Total"},"1,25 T","450 M","+800 M","up"]],T({id:"Contoh fiktif satu hari di saham big cap.",en:"Fictional one-day example in a large cap."})),
  opts:[{a:"no",l:{id:"Belum tentu — hampir semuanya dari satu transaksi nego",en:"Not necessarily — almost all of it came from one block deal"}},{a:"yes",l:{id:"Ya, asing sedang memborong besar-besaran",en:"Yes, foreigners are buying aggressively"}}],ans:"no",
  q:{id:"Aplikasi menampilkan net foreign buy +Rp800 miliar. Apakah ini sinyal asing sedang akumulasi?",en:"The app shows net foreign buy of +Rp800 billion. Is this a sign of foreign accumulation?"},
  text:{id:`<p>Transaksi di BEI terjadi di dua tempat utama: <b>pasar reguler</b> (order book yang kamu lihat) dan <b>pasar negosiasi</b> (transaksi blok yang sudah disepakati kedua pihak sebelumnya, di luar order book).</p><p>Lihat tabel: di pasar reguler asing justru net <b>jual</b> 30 miliar. Hampir seluruh angka +800 miliar berasal dari <b>satu</b> transaksi nego.</p>`,
   en:`<p>IDX trades happen in two main places: the <b>regular market</b> (the order book you see) and the <b>negotiated market</b> (pre-agreed block trades outside the book).</p><p>Look at the table: in the regular market foreigners were actually net <b>sellers</b> of 30 billion. Almost all of the +800 billion came from <b>one</b> block deal.</p>`},
  why:{id:"Transaksi nego bisa berupa pengalihan saham antar-afiliasi, penempatan oleh pemegang saham besar, atau crossing antar-fund. Ia tidak mencerminkan tekanan beli di pasar. Untuk membaca tren, lihat net foreign di pasar reguler (banyak aplikasi menampilkan RG dan NG terpisah).",en:"Block deals can be transfers between affiliates, placements by major holders or crossings between funds. They don't reflect buying pressure in the market. To read the trend, use regular-market net foreign (many apps split RG and NG)."}});
 S.push({t:{id:"Langkah 4 · Satu hari tidak cukup — lihat akumulasinya",en:"Step 4 · One day isn't enough — look at the cumulative line"},
  chart:()=>ffChart(D,X,last,{zones:[{i0:b[1],i1:b[2]-1,label:"A",col:"var(--up)"},{i0:b[3],i1:b[4]-1,label:"B",col:"var(--gold)"}],cap:T({id:"Atas: harga. Bawah: akumulasi net foreign (dijumlah dari hari pertama). Data fiktif.",en:"Top: price. Bottom: cumulative net foreign (summed from day one). Fictional data."})}),
  text:{id:`<p>Net foreign harian sangat berisik: hari ini +50 miliar, besok −40 miliar. Investor asing besar membangun posisi selama <b>berminggu-minggu</b>, jadi yang lebih berguna adalah <b>akumulasinya</b> — jumlahkan net foreign setiap hari:</p>
<div class="formula">Hari 1: +20  → total +20
Hari 2: −15  → total +5
Hari 3: +40  → total +45   ...dan seterusnya</div>
<p>Garis di panel bawah adalah total itu. Yang dibaca adalah <b>arah garisnya</b>:</p>
<ul><li><b>Zona A</b>: harga hampir datar, tetapi garis asing naik tajam → asing menampung diam-diam.</li><li><b>Zona B</b>: harga masih naik/datar di atas, tetapi garis asing turun → asing memanfaatkan kenaikan untuk keluar; yang membeli adalah investor lokal.</li></ul>
<p>Perbedaan arah antara harga dan garis asing (divergensi) sering lebih informatif daripada angka satu hari.</p>`,
   en:`<p>Daily net foreign is very noisy: +50 billion today, −40 tomorrow. Big foreign investors build positions over <b>weeks</b>, so the <b>cumulative total</b> is more useful — add up each day's net foreign:</p>
<div class="formula">Day 1: +20  → total +20
Day 2: −15  → total +5
Day 3: +40  → total +45   ...and so on</div>
<p>The lower-panel line is that total. Read <b>its direction</b>:</p>
<ul><li><b>Zone A</b>: price nearly flat, but the foreign line rises steeply → foreigners quietly absorbing.</li><li><b>Zone B</b>: price still up/flat at the top, but the foreign line falls → foreigners using the rally to exit; local investors are the buyers.</li></ul>
<p>A divergence between price and the foreign line is often more informative than any single day.</p>`}});
 S.push({quiz:true,k:b[2]-1,h:30,exp:"up",t:{id:"Langkah 5 · Tebak: harga datar, asing terus menampung",en:"Step 5 · Guess: price flat, foreigners keep absorbing"},
  chart:(rev)=>ffChart(D,X,b[2]-1,{here:b[2]-1,reveal:rev?Math.min(last,b[2]-1+30):null}),
  text:{id:`<p>Harga turun lalu bergerak datar selama ±2 bulan. Di panel bawah, akumulasi net foreign naik terus hampir setiap minggu.</p><p>30 hari bursa ke depan, harga akan…</p>`,en:`<p>Price fell then moved sideways for ~2 months. In the lower panel, cumulative net foreign rose almost every week.</p><p>Over the next 30 trading days, price will…</p>`},
  why:{id:"Asing membeli saat harga datar = barang berpindah dari investor yang bosan ke investor yang sabar. Ketika penjual habis, harga cenderung naik. Ini konsisten dengan riset Richards (2005, JFQA) bahwa arus asing di bursa Asia termasuk Indonesia punya dampak harga yang besar.",en:"Foreigners buying while price is flat = stock moving from bored holders to patient ones. Once sellers run out, price tends to rise. Consistent with Richards (2005, JFQA): foreign flows in Asian markets including Indonesia have a large price impact."}});
 S.push({quiz:true,k:b[3]+22,h:35,exp:"down",t:{id:"Langkah 6 · Tebak: harga masih tinggi, asing mulai keluar",en:"Step 6 · Guess: price still high, foreigners leaving"},
  chart:(rev)=>ffChart(D,X,b[3]+22,{s0:40,here:b[3]+22,reveal:rev?Math.min(last,b[3]+22+35):null}),
  text:{id:`<p>Setelah kenaikan besar, harga bergerak datar di atas. Tapi garis akumulasi net foreign <b>berbalik turun</b> dan terus menurun selama ±3 minggu. Yang membeli adalah investor lokal.</p><p>35 hari ke depan…</p>`,en:`<p>After a big rise, price moves sideways near the top. But the cumulative foreign line has <b>turned down</b> and kept falling for ~3 weeks. Locals are the buyers.</p><p>Over the next 35 days…</p>`},
  why:{id:"Kenaikan yang hanya ditopang pembeli lokal sementara asing terus keluar biasanya rapuh di saham big cap. Ini bukan jaminan turun (kadang dana domestik seperti reksa dana & asuransi cukup kuat), tapi tanda untuk memperketat stop dan tidak menambah posisi.",en:"A rally held up only by local buyers while foreigners keep exiting is usually fragile in large caps. Not a guaranteed fall (sometimes domestic funds and insurers are strong enough), but a sign to tighten stops and not add."}});
 S.push({t:{id:"Langkah 7 · Kenapa rupiah sangat penting bagi asing",en:"Step 7 · Why the rupiah matters so much to foreigners"},
  text:{id:`<p>Investor asing menghitung untung-rugi dalam <b>dolar AS</b>, bukan rupiah. Contoh:</p>
<div class="formula">Harga saham naik           : +5%
Rupiah melemah (USD/IDR)   : dari 16.000 ke 16.960 (+6%)
Hasil dalam dolar          : 1,05 ÷ 1,06 − 1 = −0,9%</div>
<p>Saham naik 5%, tapi investor asing <b>rugi</b>. Karena itu:</p>
<ul><li>Saat rupiah melemah cepat, asing cenderung <b>menjual</b> untuk membatasi kerugian kurs — dan penjualan itu menekan IHSG serta rupiah lagi.</li><li>Saat rupiah stabil atau menguat, saham Indonesia lebih menarik bagi asing.</li><li>Rupiah sering dipengaruhi suku bunga AS (Fed), indeks dolar (DXY), dan selisih suku bunga BI vs AS.</li></ul>
<p>Lihat jalur lengkapnya di halaman <a href="#/global">Pengaruh Global</a>.</p>`,
   en:`<p>Foreign investors measure profit and loss in <b>US dollars</b>, not rupiah. Example:</p>
<div class="formula">Share price rises         : +5%
Rupiah weakens (USD/IDR)  : from 16,000 to 16,960 (+6%)
Result in dollars         : 1.05 ÷ 1.06 − 1 = −0.9%</div>
<p>The stock rose 5%, but the foreign investor <b>lost</b>. Hence:</p>
<ul><li>When the rupiah weakens fast, foreigners tend to <b>sell</b> to limit currency losses — which pressures the JCI and the rupiah further.</li><li>When the rupiah is stable or stronger, Indonesian stocks look more attractive.</li><li>The rupiah is often driven by US rates (the Fed), the dollar index (DXY) and the BI–US rate gap.</li></ul>
<p>See the full channels on the <a href="#/global">Global Drivers</a> page.</p>`}});
 S.push({t:{id:"Langkah 8 · Rebalancing indeks MSCI",en:"Step 8 · MSCI index rebalancing"},
  opts:[{a:"mech",l:{id:"Mekanis — dana pasif wajib menjual karena keluar indeks, bukan karena fundamental",en:"Mechanical — passive funds must sell because of the index exit, not fundamentals"}},{a:"bad",l:{id:"Fundamental perusahaan pasti memburuk",en:"The company's fundamentals must have worsened"}}],ans:"mech",
  q:{id:"Pada hari efektif rebalancing, saham yang dikeluarkan dari indeks MSCI mencatat net foreign sell Rp600 miliar di pre-closing. Penyebab utamanya?",en:"On the rebalancing effective day, a stock removed from the MSCI index shows Rp600bn net foreign selling in the pre-close. The main cause?"},
  text:{id:`<p>Banyak dana asing adalah <b>dana pasif</b> yang wajib meniru isi indeks seperti MSCI Indonesia. Ketika MSCI menambah atau mengeluarkan saham (atau mengubah bobotnya), dana-dana ini <b>harus</b> membeli atau menjual — biasanya pada <b>harga penutupan hari efektif</b>.</p>
<ol class="steps"><li><b>Pengumuman</b>: sekitar 2 minggu sebelum tanggal efektif (review utama tiap Februari, Mei, Agustus, November).</li><li><b>Antara pengumuman & efektif</b>: trader aktif sering sudah mengantisipasi.</li><li><b>Hari efektif</b>: volume sangat besar di pre-closing; net foreign bisa ekstrem.</li><li><b>Setelahnya</b>: tekanan mekanis selesai; harga kadang berbalik.</li></ol>`,
   en:`<p>Many foreign funds are <b>passive</b> and must mirror indices like MSCI Indonesia. When MSCI adds or removes a stock (or changes weights), these funds <b>must</b> buy or sell — usually at the <b>effective-day close</b>.</p>
<ol class="steps"><li><b>Announcement</b>: about 2 weeks before the effective date (main reviews each February, May, August, November).</li><li><b>Between announcement & effective date</b>: active traders often front-run.</li><li><b>Effective day</b>: very large pre-close volume; net foreign can be extreme.</li><li><b>Afterwards</b>: mechanical pressure ends; price sometimes reverses.</li></ol>`},
  why:{id:"Arus asing pada hari rebalancing adalah 'wajib', bukan pendapat tentang perusahaan. Jangan menyimpulkan tren dari hari itu saja. Sebaliknya, hari itu sering memberi likuiditas besar bagi investor yang ingin masuk/keluar.",en:"Foreign flow on rebalancing day is 'compulsory', not an opinion about the company. Don't infer a trend from that day alone. If anything, it offers big liquidity for investors who want in or out."}});
 S.push({t:{id:"Langkah 9 · Merangkai semuanya: checklist asing",en:"Step 9 · Putting it together: a foreign-flow checklist"},
  text:{id:`<ol class="steps"><li><b>Porsi asing</b> di saham ini besar? (&gt;±20% transaksi) Kalau kecil, abaikan data asing.</li>
<li><b>Reguler atau nego?</b> Pisahkan RG dan NG.</li>
<li><b>Tren 5–20 hari</b>: arah akumulasi net foreign naik, datar, atau turun?</li>
<li><b>Dibanding harga</b>: searah (sehat) atau berlawanan (divergensi)?</li>
<li><b>Ada peristiwa khusus?</b> Rebalancing MSCI/FTSE, aksi korporasi, pembagian dividen besar (asing kadang keluar setelah cum date).</li>
<li><b>Konteks global</b>: rupiah, DXY, US10Y, S&P 500 semalam.</li>
<li><b>Konfirmasi broker</b>: broker institusi global (AK, BK, KZ, MS, GW) konsisten di sisi beli/jual?</li></ol>
<p>Kombinasi harga × net foreign juga bisa dilatih lewat kuis kasus di <a href="#/asing">Matriks Asing vs Lokal</a>.</p>`,
   en:`<ol class="steps"><li><b>Foreign share</b> in this stock large? (&gt;~20% of trading) If small, ignore foreign data.</li>
<li><b>Regular or negotiated?</b> Separate RG and NG.</li>
<li><b>5–20-day trend</b>: is cumulative net foreign rising, flat or falling?</li>
<li><b>Versus price</b>: aligned (healthy) or opposite (divergence)?</li>
<li><b>Special events?</b> MSCI/FTSE rebalancing, corporate actions, large dividends (foreigners sometimes exit after the cum date).</li>
<li><b>Global context</b>: rupiah, DXY, US10Y, the S&P 500 overnight.</li>
<li><b>Broker confirmation</b>: are global institutional brokers (AK, BK, KZ, MS, GW) consistently on the buy/sell side?</li></ol>
<p>Practise price × net foreign combinations in the case quiz on the <a href="#/asing">Foreign vs Local Matrix</a>.</p>`}});
 S.push({t:{id:"Langkah 10 · Batasan data asing",en:"Step 10 · Limits of foreign data"},
  text:{id:`<ul><li><b>Asing bukan satu pihak.</b> Ada dana pasif, hedge fund, dana pensiun global, dan investor ritel asing — tujuannya berbeda-beda.</li>
<li><b>Asing juga bisa salah</b> dan sering mengikuti return (membeli setelah harga naik). Riset Richards (2005) menemukan pola "mengejar return" ini di bursa Asia.</li>
<li><b>Waktu tampil data</b>: tipe investor tidak ditampilkan real-time di running trade sejak 2021; angka F Buy/F Sell di aplikasi bergantung pada data yang tersedia — cek kapan aplikasimu memperbaruinya.</li>
<li><b>Horizon</b>: riset Dvořák (2005, data BEI) menemukan nasabah broker global unggul untuk horizon lebih panjang, sementara investor domestik unggul di jangka pendek. Jadi data asing lebih cocok untuk swing & posisi, bukan scalping.</li>
<li><b>Tetap mulai dari fundamental.</b> Data asing paling berguna untuk menentukan <i>kapan</i>, bukan <i>apa</i> yang dibeli.</li></ul>`,
   en:`<ul><li><b>Foreigners aren't one party.</b> Passive funds, hedge funds, global pension funds and foreign retail all have different goals.</li>
<li><b>Foreigners can be wrong too</b> and often chase returns (buying after prices rise). Richards (2005) found this return-chasing pattern in Asian markets.</li>
<li><b>Data timing</b>: investor type hasn't been shown in real time on the running trade since 2021; F Buy/F Sell in apps depends on available data — check when your app updates it.</li>
<li><b>Horizon</b>: Dvořák (2005, IDX data) found global-broker clients did better over longer horizons while domestic investors did better short-term. So foreign data suits swing & position trading, not scalping.</li>
<li><b>Still start with fundamentals.</b> Foreign data is most useful for deciding <i>when</i>, not <i>what</i>, to buy.</li></ul>`}});
 return S; }
};
const L=window.Guide.list; const at=L.findIndex(g=>g.key==="bandar"); L.splice(at+1,0,FF);
window.__FF={SEG,FLOW,ffData,ffBuild};
})();
