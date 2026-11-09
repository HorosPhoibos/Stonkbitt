/* Belajar Pelan-pelan: Order Book (detik demi detik) & Bandarmologi (broker summary, Wyckoff). Data fiktif. */
(function(){
const T=o=>window.T(o);
const C=()=>window.Charts;
const f=n=>Math.round(n).toLocaleString(window.LANG==="en"?"en-US":"id-ID");

/* ---------- renderer order book ----------
   snap: {t:label, last, bids:[[p,lot,freq,flag]], offers:[[p,lot,freq,flag]], trades:[[jam,p,"B"|"S",lot]]}
   flag: "eat" dimakan, "pull" ditarik, "add" bertambah, "wall" tembok, "new" level baru */
const SYM={eat:"●",pull:"✕",add:"+",wall:"▮",refill:"↻","new":"+"};
const FL={eat:{id:"dimakan",en:"eaten"},pull:{id:"ditarik",en:"pulled"},add:{id:"ditambah",en:"added"},wall:{id:"tembok",en:"wall"},refill:{id:"diisi ulang",en:"refilled"},"new":{id:"baru",en:"new"}};
function obTable(s,opt={}){
  const rows=Math.max(s.bids.length,s.offers.length);
  const cell=(x,side)=>{ if(!x) return `<td></td><td></td>${opt.avg?"<td></td>":""}<td></td>`;
    const [p,lot,fr,fl]=x; const tag=fl?`<span class="obtag ${fl}" title="${T(FL[fl])}">${SYM[fl]}</span>`:"";
    const avg=opt.avg?`<td class="muted">${f(lot/fr)}</td>`:"";
    return side==="b" ? `<td class="muted">${f(fr)}</td>${avg}<td class="${fl||""}">${tag}${f(lot)}</td><td class="bid">${f(p)}</td>`
                     : `<td class="off">${f(p)}</td><td class="${fl||""}" style="text-align:left">${f(lot)}${tag}</td>${avg}<td class="muted" style="text-align:left">${f(fr)}</td>`; };
  let h=`<table class="ob obg"><tr><th>Freq</th>${opt.avg?"<th>Lot/F</th>":""}<th>Lot</th><th>Bid</th><th style="text-align:left">Offer</th><th style="text-align:left">Lot</th>${opt.avg?"<th>Lot/F</th>":""}<th style="text-align:left">Freq</th></tr>`;
  for(let i=0;i<rows;i++) h+=`<tr>${cell(s.bids[i],"b")}${cell(s.offers[i],"o")}</tr>`;
  if(opt.total){ const tb=s.bids.reduce((a,x)=>a+x[1],0), to=s.offers.reduce((a,x)=>a+x[1],0); h+=`<tr><td colspan="${opt.avg?3:2}"><b>${f(tb)}</b></td><td colspan="2" class="muted" style="text-align:center">total</td><td colspan="${opt.avg?3:2}" style="text-align:left"><b>${f(to)}</b></td></tr>`; }
  h+="</table>";
  if(s.trades&&s.trades.length) h+=`<div class="rt obrt">${s.trades.map(t=>`<div class="row ${t[3]>=5000?"big":""}"><span class="muted">${t[0]}</span><span class="${t[2]==="B"?"up":"down"}">${f(t[1])}</span><span class="${t[2]==="B"?"up":"down"}">${t[2]==="B"?"Buy":"Sell"}</span><span style="text-align:right">${f(t[3])}</span><span></span></div>`).join("")}</div>`;
  else if(s.trades) h+=`<div class="hint" style="padding:6px">${T({id:"(tidak ada transaksi)",en:"(no trades)"})}</div>`;
  return `<div class="obcard"><div class="obhead"><b>${T(s.t)}</b>${s.last?`<span class="mono">Last ${f(s.last)}</span>`:""}</div>${h}</div>`;
}
const frames=(arr,opt)=>{ const used=[...new Set(arr.flatMap(s=>[...s.bids,...s.offers].map(x=>x[3]).filter(Boolean)))];
  return `<div class="obframes">${arr.map(s=>obTable(s,opt)).join("")}</div>${used.length?`<p class="hint oblegend">${used.map(k=>`<span class="obtag ${k}">${SYM[k]}</span> ${T(FL[k])}`).join(" &nbsp; ")}</p>`:""}`; };
function bsTable(b,s,cap){ const row=(r,cls)=>`<tr><td><span class="tag ${r[3]?"F":"D"}">${r[0]}</span> <span class="hint">${(window.brokerByCode(r[0])||{}).n||""}</span></td><td class="num ${cls}">${f(r[1])}</td><td class="num">${f(r[2])}</td></tr>`;
  return `<div class="grid g2"><div class="tablewrap"><table><tr><th>Buyer</th><th>B.Lot</th><th>B.Avg</th></tr>${b.map(r=>row(r,"up")).join("")}</table></div><div class="tablewrap"><table><tr><th>Seller</th><th>S.Lot</th><th>S.Avg</th></tr>${s.map(r=>row(r,"down")).join("")}</table></div></div>${cap?`<p class="hint">${cap}</p>`:""}`; }

/* snapshot dasar saham fiktif XAUT (fraksi Rp5) */
const S0=()=>({t:{id:"Detik 1",en:"Second 1"},last:1325,
 bids:[[1325,4200,38],[1320,9800,61],[1315,15400,90],[1310,21000,120],[1305,8000,55]],
 offers:[[1330,5100,44],[1335,12000,80],[1340,26000,310],[1345,9000,60],[1350,30000,400]]});

/* ================= ORDER BOOK ================= */
const OB={ key:"ob", cat:"flow", t:{id:"Order Book detik demi detik",en:"The Order Book, Second by Second"}, sub:{id:"antrian, dimakan vs ditarik, absorption, iceberg, sweep",en:"queues, eaten vs pulled, absorption, icebergs, sweeps"},
 endHref:"#/lab", endLabel:{id:"Latihan di Lab Order Book →",en:"Practise in the Order Book Lab →"},
 data:()=>null, build:()=>({}),
 steps:()=>{ const S=[];
 S.push({t:{id:"Langkah 1 · Order book adalah dua antrian",en:"Step 1 · The order book is two queues"},
  chart:()=>frames([{...S0(),t:{id:"Order book XAUT (fiktif)",en:"XAUT order book (fictional)"}}]),
  text:{id:`<p>Bayangkan pasar tradisional. Di <b>kiri</b> ada orang-orang yang antre <b>ingin membeli</b> (Bid), masing-masing menyebut harga maksimal yang mau dibayar. Di <b>kanan</b> ada yang antre <b>ingin menjual</b> (Offer), masing-masing menyebut harga minimal.</p>
<ul><li>Baris paling atas di kiri (1.325) adalah <b>bid terbaik</b>: pembeli yang mau membayar paling mahal.</li><li>Baris paling atas di kanan (1.330) adalah <b>offer terbaik</b>: penjual yang mau menjual paling murah.</li><li>Jaraknya (1.325 → 1.330) adalah <b>spread</b>. Di sini 1 fraksi (Rp5) — tanda saham yang likuid.</li></ul>
<p>Selama tidak ada yang "mengalah", <b>tidak ada transaksi</b>. Transaksi baru terjadi kalau seseorang mau langsung membeli di harga offer (HAKA) atau langsung menjual di harga bid (HAKI).</p>`,
  en:`<p>Picture a traditional market. On the <b>left</b> people queue <b>to buy</b> (Bid), each naming the most they'll pay. On the <b>right</b> people queue <b>to sell</b> (Offer), each naming the least they'll accept.</p>
<ul><li>The top-left row (1,325) is the <b>best bid</b>: the buyer willing to pay the most.</li><li>The top-right row (1,330) is the <b>best offer</b>: the seller willing to sell cheapest.</li><li>The gap (1,325 → 1,330) is the <b>spread</b>. Here it's 1 tick (Rp5) — a sign of a liquid stock.</li></ul>
<p>As long as nobody "gives in", <b>no trade happens</b>. A trade only happens when someone buys straight at the offer (aggressive buy) or sells straight into the bid (aggressive sell).</p>`}});
 S.push({t:{id:"Langkah 2 · Lot, Freq, dan siapa yang antre",en:"Step 2 · Lots, Freq, and who is queueing"},
  chart:()=>frames([{...S0(),t:{id:"Dengan kolom Lot ÷ Freq",en:"With a Lot ÷ Freq column"}}],{avg:true}),
  text:{id:`<p><b>Lot</b> = jumlah lot yang antre di harga itu. <b>Freq</b> = berapa banyak order yang membentuk antrian itu. Kalau dibagi, kita dapat <b>rata-rata ukuran satu order</b>:</p>
<div class="formula">Bid 1.310 : 21.000 lot ÷ 120 order  = 175 lot per order  (± Rp23 juta per order)
Offer 1.350: 30.000 lot ÷ 400 order = 75 lot per order   (± Rp10 juta per order)</div>
<p>Artinya antrian beli di 1.310 terdiri dari order yang rata-rata <b>lebih besar</b> — kemungkinan ada pemain bermodal besar yang menunggu di sana. Antrian jual di 1.350 terdiri dari banyak order kecil — ciri ritel, mungkin orang yang "nyangkut" dan menunggu harga bulat untuk balik modal.</p>
<p>Ini bukan bukti, tapi petunjuk pertama: <b>antrian dengan Lot/Freq besar lebih serius daripada antrian yang sekadar tebal</b>.</p>`,
  en:`<p><b>Lot</b> = lots queued at that price. <b>Freq</b> = how many orders make up that queue. Divide them to get the <b>average size of one order</b>:</p>
<div class="formula">Bid 1,310  : 21,000 lots ÷ 120 orders = 175 lots per order (~Rp23M each)
Offer 1,350: 30,000 lots ÷ 400 orders = 75 lots per order  (~Rp10M each)</div>
<p>So the buy queue at 1,310 is made of <b>larger</b> orders on average — possibly a well-funded player waiting there. The sell queue at 1,350 is many small orders — a retail signature, maybe holders "stuck" waiting for a round number to break even.</p>
<p>Not proof, but a first clue: <b>a queue with a large Lot/Freq is more serious than a queue that is merely thick</b>.</p>`}});
 S.push({t:{id:"Langkah 3 · Offer lebih tebal = pasti turun?",en:"Step 3 · Thicker offers = it must fall?"},
  chart:()=>frames([{...S0(),t:{id:"Total 5 level",en:"5-level totals"}}],{total:true}),
  text:{id:`<p>Total antrian beli 58.400 lot, total antrian jual 82.100 lot. Banyak pemula langsung menyimpulkan "penjual lebih banyak, pasti turun". <b>Kesimpulan itu sering salah</b>, karena:</p>
<ol><li><b>Antrian bukan transaksi.</b> Orang bisa memasang lalu menarik ordernya kapan saja.</li><li>Pemain besar yang ingin <b>membeli banyak</b> justru butuh offer yang tebal — itu barang yang ingin ia tampung. Offer tipis malah membuatnya harus membeli lebih mahal.</li><li>Pemain besar jarang memperlihatkan seluruh niatnya. Order besar sering dipecah atau disembunyikan (iceberg).</li></ol>
<p>Karena itu yang penting bukan <i>tebal-tipisnya</i>, melainkan <b>apa yang terjadi pada antrian dari detik ke detik</b>. Itu yang kita pelajari mulai langkah berikutnya.</p>`,
  en:`<p>Total bids 58,400 lots, total offers 82,100 lots. Many beginners conclude "more sellers, it must fall". <b>That's often wrong</b>, because:</p>
<ol><li><b>Queues are not trades.</b> People can place and pull orders any time.</li><li>A big player who wants to <b>buy a lot</b> actually needs thick offers — that's the supply they want to absorb. Thin offers would force them to pay up.</li><li>Big players rarely show their full intent. Large orders are split or hidden (iceberg).</li></ol>
<p>So what matters isn't how thick queues are but <b>what happens to them second by second</b>. That's what we study from the next step.</p>`}});
 S.push({t:{id:"Langkah 4 · Antrian yang 'dimakan'",en:"Step 4 · A queue being 'eaten'"},
  chart:()=>frames([
   {...S0()},
   {t:{id:"Detik 2",en:"Second 2"},last:1330,bids:[[1325,4200,38],[1320,9800,61],[1315,15400,90],[1310,21000,120],[1305,8000,55]],offers:[[1335,12000,80],[1340,26000,310],[1345,9000,60],[1350,30000,400],[1355,7000,50]],trades:[["09:31:02",1330,"B",3000],["09:31:02",1330,"B",2100]]},
   {t:{id:"Detik 3",en:"Second 3"},last:1335,bids:[[1330,600,4,"new"],[1325,4200,38],[1320,9800,61],[1315,15400,90],[1310,21000,120]],offers:[[1335,8000,52,"eat"],[1340,26000,310],[1345,9000,60],[1350,30000,400],[1355,7000,50]],trades:[["09:31:03",1335,"B",4000]]}]),
  text:{id:`<p>Ikuti dari kiri ke kanan:</p>
<ol class="steps"><li><b>Detik 1</b>: offer terbaik 1.330 berisi 5.100 lot.</li><li><b>Detik 2</b>: running trade mencatat dua transaksi <span class="up">Buy</span> di 1.330 (3.000 + 2.100 = 5.100 lot). Seluruh antrian 1.330 habis, sehingga offer terbaik naik ke 1.335 dan <b>harga terakhir naik ke 1.330</b>.</li><li><b>Detik 3</b>: pembeli lain HAKA 4.000 lot di 1.335 → antrian 1.335 berkurang dari 12.000 menjadi 8.000. Lalu ada pembeli baru yang antre di 1.330.</li></ol>
<p>Inilah antrian yang <b>dimakan</b>: lotnya berkurang <b>dan</b> ada transaksi di running trade dengan jumlah yang cocok. Ini nyata — ada pembeli yang benar-benar membayar. Harga naik karena pembeli tidak sabar menunggu di bid.</p>`,
  en:`<p>Follow left to right:</p>
<ol class="steps"><li><b>Second 1</b>: the best offer at 1,330 holds 5,100 lots.</li><li><b>Second 2</b>: the running trade shows two <span class="up">Buy</span> trades at 1,330 (3,000 + 2,100 = 5,100 lots). The whole 1,330 queue is gone, the best offer moves up to 1,335 and <b>the last price rises to 1,330</b>.</li><li><b>Second 3</b>: another buyer hits 4,000 lots at 1,335 → that queue drops from 12,000 to 8,000. A new buyer then queues at 1,330.</li></ol>
<p>This is a queue being <b>eaten</b>: the lots shrink <b>and</b> the running trade shows matching trades. It's real — someone actually paid. Price rises because buyers wouldn't wait on the bid.</p>`}});
 S.push({t:{id:"Langkah 5 · Antrian yang 'ditarik' (bid palsu)",en:"Step 5 · A queue being 'pulled' (fake bid)"},
  chart:()=>frames([
   {t:{id:"Detik 1",en:"Second 1"},last:1325,bids:[[1325,4200,38],[1320,9800,61],[1315,85000,6,"wall"],[1310,21000,120],[1305,8000,55]],offers:[[1330,5100,44],[1335,12000,80],[1340,26000,310],[1345,9000,60],[1350,30000,400]]},
   {t:{id:"Detik 2",en:"Second 2"},last:1325,bids:[[1320,9800,61],[1315,85000,6,"wall"],[1310,21000,120],[1305,8000,55],[1300,12000,90]],offers:[[1325,2000,9,"new"],[1330,5100,44],[1335,12000,80],[1340,26000,310],[1345,9000,60]],trades:[["10:02:11",1325,"S",4200]]},
   {t:{id:"Detik 3",en:"Second 3"},last:1320,bids:[[1320,6300,40],[1315,15400,90,"pull"],[1310,21000,120],[1305,8000,55],[1300,12000,90]],offers:[[1325,2000,9],[1330,5100,44],[1335,12000,80],[1340,26000,310],[1345,9000,60]],trades:[["10:02:12",1320,"S",3500]]}]),
  opts:[{a:"eat",l:{id:"Dimakan oleh penjual",en:"Eaten by sellers"}},{a:"pull",l:{id:"Ditarik / dibatalkan pemiliknya",en:"Pulled / cancelled by its owner"}},{a:"err",l:{id:"Data aplikasi error",en:"An app data error"}}],ans:"pull",
  q:{id:"Antrian di 1.315 turun dari 85.000 menjadi 15.400 lot (berkurang 69.600). Apa yang terjadi?",en:"The 1,315 queue fell from 85,000 to 15,400 lots (−69,600). What happened?"},
  text:{id:`<p>Detik 1: ada <b>tembok bid</b> 85.000 lot di 1.315 — hanya 6 order (≈14.000 lot per order!). Banyak orang melihatnya dan merasa aman: "ada yang menahan di 1.315".</p><p>Detik 2–3: harga turun mendekati tembok itu. Perhatikan running trade: transaksi hanya terjadi di 1.325 dan 1.320, <b>tidak ada satu pun di 1.315</b>.</p>`,
   en:`<p>Second 1: a <b>bid wall</b> of 85,000 lots at 1,315 — just 6 orders (~14,000 lots each!). Many people see it and feel safe: "someone is holding 1,315".</p><p>Seconds 2–3: price falls towards the wall. Check the running trade: trades only happened at 1,325 and 1,320, <b>none at 1,315</b>.</p>`},
  why:{id:"Lot berkurang tanpa transaksi di harga itu = ditarik. Tembok itu kemungkinan besar hanya umpan (spoofing): dipasang agar pembeli lain berani membeli, lalu ditarik saat harga mendekat. Pelajaran: jangan percaya tembok yang belum pernah 'dimakan'. Spoofing adalah manipulasi yang dilarang; sejak 15 Des 2025, BEI juga melarang pembatalan order di menit-menit akhir pre-opening & pre-closing untuk mengurangi praktik ini.",en:"Lots disappearing with no trades at that price = pulled. The wall was most likely bait (spoofing): placed so others dare to buy, then pulled as price approached. Lesson: never trust a wall that has never been 'eaten'. Spoofing is banned manipulation; since 15 Dec 2025 IDX also blocks cancellations in the final minutes of pre-opening & pre-closing to reduce it."}});
 const absF=[
   {t:{id:"Detik 1",en:"Second 1"},last:1320,bids:[[1320,10000,22,"wall"],[1315,15400,90],[1310,21000,120]],offers:[[1325,3000,30],[1330,5100,44],[1335,12000,80]],trades:[["11:15:40",1320,"S",3000]]},
   {t:{id:"Detik 2",en:"Second 2"},last:1320,bids:[[1320,9600,25,"refill"],[1315,15400,90],[1310,21000,120]],offers:[[1325,3000,30],[1330,5100,44],[1335,12000,80]],trades:[["11:15:41",1320,"S",2500],["11:15:41",1320,"S",1000]]},
   {t:{id:"Detik 3",en:"Second 3"},last:1320,bids:[[1320,10200,27,"refill"],[1315,15400,90],[1310,21000,120]],offers:[[1325,2600,27],[1330,5100,44],[1335,12000,80]],trades:[["11:15:42",1320,"S",3000]]}];
 S.push({t:{id:"Langkah 6 · Absorption: dihantam terus tapi tidak habis",en:"Step 6 · Absorption: hit again and again, never empty"},
  chart:()=>frames(absF),
  opts:[{a:"abs",l:{id:"Ada pembeli besar yang terus mengisi ulang antrian 1.320 (menampung)",en:"A big buyer keeps refilling the 1,320 queue (absorbing)"}},{a:"fake",l:{id:"Antrian palsu, sebentar lagi ditarik",en:"A fake queue, about to be pulled"}},{a:"weak",l:{id:"Penjual menang, harga pasti jebol",en:"Sellers win, price will surely break"}}],ans:"abs",
  q:{id:"Dalam 3 detik penjual menghantam 1.320 sebanyak 9.500 lot, tapi antrian 1.320 tetap ±10.000 lot. Artinya?",en:"In 3 seconds sellers hit 1,320 for 9,500 lots, yet the 1,320 queue stays ~10,000. What does it mean?"},
  text:{id:`<p>Perhatikan kolom running trade: semua transaksi <span class="down">Sell</span> di 1.320 — penjual sedang agresif. Total 3.000 + 2.500 + 1.000 + 3.000 = <b>9.500 lot</b> terjual ke antrian 1.320.</p><p>Tapi lihat lot di 1.320: 10.000 → 9.600 → 10.200. Seharusnya habis, tapi justru <b>diisi ulang</b>.</p>`,
   en:`<p>Look at the running trade: every trade is a <span class="down">Sell</span> at 1,320 — sellers are aggressive. In total 3,000 + 2,500 + 1,000 + 3,000 = <b>9,500 lots</b> sold into the 1,320 queue.</p><p>Yet the lots at 1,320 go 10,000 → 9,600 → 10,200. It should have emptied, but it is being <b>refilled</b>.</p>`},
  reveal:()=>frames([{t:{id:"5 menit kemudian",en:"5 minutes later"},last:1335,bids:[[1335,6000,40],[1330,9000,55],[1325,8000,50]],offers:[[1340,4000,35,"eat"],[1345,9000,60],[1350,30000,400]],trades:[["11:20:05",1340,"B",2500],["11:20:05",1340,"B",1800]]}]),
  why:{id:"Inilah absorption (penyerapan) — jejak akumulasi yang paling sering terlihat. Ada pembeli besar yang tidak mau menaikkan harga (supaya bisa terus membeli murah), jadi ia diam di bid dan menampung semua jualan. Ketika penjual habis, harga mudah naik — seperti frame '5 menit kemudian'. Effort (volume jual besar) tanpa result (harga tidak turun) = tanda kekuatan. Rencana: masuk dekat 1.320, stop di bawah 1.315 (kalau tembok itu akhirnya jebol, analisismu salah).",en:"This is absorption — the most common footprint of accumulation. A big buyer who doesn't want to lift the price (so they can keep buying cheap) sits on the bid and soaks up all the selling. Once sellers are exhausted, price rises easily — as in the '5 minutes later' frame. Effort (heavy selling) without result (no drop) = strength. Plan: enter near 1,320, stop below 1,315 (if that wall finally breaks, your read was wrong)."}});
 S.push({t:{id:"Langkah 7 · Iceberg di offer: dibeli terus tapi tidak habis",en:"Step 7 · An iceberg offer: bought again and again, never empty"},
  chart:()=>frames([
   {t:{id:"Detik 1",en:"Second 1"},last:1335,bids:[[1330,7000,50],[1325,9000,60],[1320,9800,61]],offers:[[1335,6000,12,"wall"],[1340,26000,310],[1345,9000,60]],trades:[["13:45:20",1335,"B",5000]]},
   {t:{id:"Detik 2",en:"Second 2"},last:1335,bids:[[1330,8200,58],[1325,9000,60],[1320,9800,61]],offers:[[1335,6100,13,"refill"],[1340,26000,310],[1345,9000,60]],trades:[["13:45:21",1335,"B",4000]]},
   {t:{id:"Detik 3",en:"Second 3"},last:1335,bids:[[1330,9500,66],[1325,9000,60],[1320,9800,61]],offers:[[1335,5900,13,"refill"],[1340,26000,310],[1345,9000,60]],trades:[["13:45:22",1335,"B",6000]]}]),
  opts:[{a:"sell",l:{id:"Ada penjual besar yang menyuplai diam-diam (distribusi / menahan harga)",en:"A big seller is quietly supplying (distribution / capping price)"}},{a:"buy",l:{id:"Pembeli pasti menang sebentar lagi",en:"Buyers will surely win shortly"}},{a:"none",l:{id:"Tidak ada yang bisa disimpulkan",en:"Nothing can be concluded"}}],ans:"sell",
  q:{id:"15.000 lot dibeli di 1.335 dalam 3 detik, tapi offer 1.335 tetap ±6.000 lot dan harga tidak naik. Siapa yang sedang menang?",en:"15,000 lots bought at 1,335 in 3 seconds, yet the 1,335 offer stays ~6,000 and price doesn't rise. Who is winning?"},
  text:{id:`<p>Kebalikan dari langkah 6. Pembeli agresif (semua <span class="up">Buy</span>), total 15.000 lot — tapi offer 1.335 hanya menampilkan ±6.000 lot dan terus kembali ke angka yang sama. Ini disebut <b>iceberg</b>: yang terlihat hanya pucuknya.</p>`,
   en:`<p>The mirror of step 6. Buyers are aggressive (all <span class="up">Buy</span>), 15,000 lots in total — yet the 1,335 offer only ever shows ~6,000 and keeps returning to the same size. This is an <b>iceberg</b>: you only see the tip.</p>`},
  reveal:()=>frames([{t:{id:"10 menit kemudian",en:"10 minutes later"},last:1320,bids:[[1320,5000,40],[1315,15400,90],[1310,21000,120]],offers:[[1325,4000,30],[1330,6000,12],[1335,6000,12,"wall"]],trades:[["13:55:10",1320,"S",3000],["13:55:11",1320,"S",2200]]}]),
  why:{id:"Effort besar (banyak HAKA) tanpa result (harga tidak naik) di sisi beli = ada penjual besar yang menyuplai. Bisa jadi distribusi (bandar keluar ke pembeli yang FOMO), atau pemain besar sengaja menahan harga di bawah 1.335 sambil akumulasi di bawah. Pembedanya terlihat di broker summary sore hari. Yang penting: jangan ikut HAKA ke tembok iceberg. Kalau suatu saat iceberg itu benar-benar habis dan harga menembus 1.335 dengan volume besar, itu baru sinyal kuat.",en:"Big effort (lots of aggressive buying) without result (no rise) on the buy side = a big seller supplying. It could be distribution (a big player exiting into FOMO buyers), or a player capping price under 1,335 while accumulating below. The broker summary that afternoon tells them apart. Key point: don't chase into an iceberg. If the iceberg is finally exhausted and price breaks 1,335 on big volume, that's the strong signal."}});
 S.push({t:{id:"Langkah 8 · Sweep: beberapa level habis dalam satu detik",en:"Step 8 · A sweep: several levels cleared in one second"},
  chart:()=>frames([
   {t:{id:"Detik 1",en:"Second 1"},last:1325,bids:[[1325,4200,38],[1320,9800,61],[1315,15400,90]],offers:[[1330,5100,44],[1335,12000,80],[1340,14000,110],[1345,9000,60],[1350,30000,400]]},
   {t:{id:"Detik 2",en:"Second 2"},last:1340,bids:[[1340,3000,6,"new"],[1335,2000,9,"new"],[1325,4200,38]],offers:[[1345,9000,60],[1350,30000,400],[1355,7000,50]],trades:[["14:10:05",1330,"B",5100],["14:10:05",1335,"B",12000],["14:10:05",1340,"B",14000]]}]),
  opts:[{a:"up",l:{id:"Cenderung lanjut naik — ada pembeli yang sangat ingin barang sekarang",en:"Likely to keep rising — someone urgently wants stock now"}},{a:"down",l:{id:"Pasti langsung turun lagi",en:"It will surely drop straight back"}}],ans:"up",
  q:{id:"Dalam satu detik 31.100 lot dibeli dan tiga level offer habis. Apa artinya?",en:"In one second 31,100 lots were bought and three offer levels vanished. What does it mean?"},
  text:{id:`<p>Lihat jam di running trade: tiga transaksi besar pada detik yang sama (14:10:05), di tiga harga berbeda. Seseorang mengirim satu order beli besar yang menyapu 1.330, 1.335, dan 1.340 sekaligus. Ini <b>sweep</b>.</p><p>Orang tidak membayar 3 fraksi lebih mahal kalau tidak terburu-buru.</p>`,
   en:`<p>Check the timestamps: three big trades in the same second (14:10:05) at three different prices. Someone sent one large buy order that swept 1,330, 1,335 and 1,340 at once. This is a <b>sweep</b>.</p><p>Nobody pays 3 ticks more unless they're in a hurry.</p>`},
  reveal:()=>frames([{t:{id:"1 jam kemudian",en:"1 hour later"},last:1375,bids:[[1375,9000,70],[1370,12000,90]],offers:[[1380,8000,60],[1385,15000,120]],trades:[["15:12:44",1375,"B",1200]]}]),
  why:{id:"Sweep menunjukkan permintaan yang mendesak — sering di awal markup atau karena ada berita/informasi. Peluang lanjut naik lebih besar, tapi jangan langsung mengejar di harga tertinggi: tunggu harga bertahan di atas level yang disapu (1.330–1.340) beberapa menit. Cek juga apakah ada berita/keterbukaan informasi.",en:"A sweep shows urgent demand — often the start of a markup or a reaction to news/information. Odds favour more upside, but don't chase the very top: wait for price to hold above the swept levels (1,330–1,340) for a few minutes. Also check for news/disclosures."}});
 S.push({t:{id:"Langkah 9 · Tabel contekan: dimakan, ditarik, diisi ulang, disapu",en:"Step 9 · Cheat sheet: eaten, pulled, refilled, swept"},
  text:{id:`<div class="tablewrap"><table><tr><th>Yang terlihat di order book</th><th>Di running trade</th><th>Nama</th><th>Kemungkinan arti</th></tr>
<tr><td>Lot berkurang</td><td>Ada transaksi di harga itu, jumlah cocok</td><td><b>Dimakan</b></td><td>Nyata — ada yang benar-benar membeli/menjual</td></tr>
<tr><td>Lot berkurang</td><td>Tidak ada transaksi di harga itu</td><td><b>Ditarik</b></td><td>Niat berubah, atau antrian palsu (spoofing)</td></tr>
<tr><td>Bid tidak habis-habis</td><td>Banyak <span class="down">Sell</span> di harga itu</td><td><b>Absorption</b></td><td>Pembeli besar menampung → cenderung naik</td></tr>
<tr><td>Offer tidak habis-habis</td><td>Banyak <span class="up">Buy</span> di harga itu</td><td><b>Iceberg</b></td><td>Penjual besar menyuplai → harga tertahan</td></tr>
<tr><td>Beberapa level hilang sekaligus</td><td>Beberapa transaksi besar di detik yang sama</td><td><b>Sweep</b></td><td>Permintaan/penawaran mendesak</td></tr></table></div>
<p>Selalu bandingkan <b>perubahan antrian</b> dengan <b>transaksi yang benar-benar terjadi</b>. Riset mikrostruktur (Cont, Kukanov & Stoikov, 2014) juga menunjukkan bahwa pergerakan harga jangka sangat pendek lebih dekat hubungannya dengan <i>perubahan</i> antrian di bid & offer terbaik daripada dengan tebal-tipisnya.</p>`,
  en:`<div class="tablewrap"><table><tr><th>In the order book</th><th>In the running trade</th><th>Name</th><th>Likely meaning</th></tr>
<tr><td>Lots shrink</td><td>Trades at that price, matching size</td><td><b>Eaten</b></td><td>Real — someone actually bought/sold</td></tr>
<tr><td>Lots shrink</td><td>No trades at that price</td><td><b>Pulled</b></td><td>Changed intent, or a fake queue (spoofing)</td></tr>
<tr><td>Bid never empties</td><td>Many <span class="down">Sells</span> at that price</td><td><b>Absorption</b></td><td>A big buyer soaking up supply → leans up</td></tr>
<tr><td>Offer never empties</td><td>Many <span class="up">Buys</span> at that price</td><td><b>Iceberg</b></td><td>A big seller supplying → price capped</td></tr>
<tr><td>Several levels vanish at once</td><td>Several big trades in the same second</td><td><b>Sweep</b></td><td>Urgent demand/supply</td></tr></table></div>
<p>Always compare <b>queue changes</b> with <b>trades that actually happened</b>. Microstructure research (Cont, Kukanov & Stoikov, 2014) also finds very short-term price moves relate more to <i>changes</i> at the best bid & offer than to queue size.</p>`}});
 S.push({t:{id:"Langkah 10 · Kapan & di saham apa cara ini bekerja",en:"Step 10 · When & in which stocks this works"},
  text:{id:`<ul><li><b>Sesi kontinu</b> (09.00–12.00 dan 13.30–15.49) adalah waktu terbaik membaca order book. Pre-opening & pre-closing memakai lelang — dinamikanya berbeda (lihat pelajaran E5).</li>
<li><b>Saham likuid</b> (LQ45/IDX80, spread 1 fraksi): pola di atas paling bisa dipercaya. Di saham sangat sepi, satu order kecil saja bisa mengubah segalanya.</li>
<li><b>Saham "gorengan"</b>: semua pola bisa dipalsukan. Hati-hati, dan cek UMA/notasi khusus.</li>
<li><b>Gabungkan dengan konteks harian</b>: absorption di support harian + tren naik jauh lebih kuat daripada absorption di tengah downtrend.</li>
<li>Ingat: sejak 2021 kode broker & asing/domestik tidak tampil real-time. Konfirmasi "siapa" pelakunya dilakukan sore hari lewat broker summary — itu topik kelas berikutnya: <a href="#/pelan/bandar">Bandarmologi pelan-pelan</a>.</li></ul>`,
  en:`<ul><li><b>Continuous sessions</b> (09:00–12:00 and 13:30–15:49) are the best time to read the book. Pre-opening & pre-closing use auctions — different dynamics (see lesson E5).</li>
<li><b>Liquid stocks</b> (LQ45/IDX80, 1-tick spread): these patterns are most reliable. In very quiet stocks a single small order changes everything.</li>
<li><b>Pumped stocks</b>: every pattern can be faked. Be careful and check UMA/special notations.</li>
<li><b>Combine with daily context</b>: absorption at daily support in an uptrend is far stronger than absorption mid-downtrend.</li>
<li>Remember: since 2021 broker codes and foreign/domestic flags aren't shown in real time. Confirming "who" happens in the afternoon via the broker summary — the next class: <a href="#/pelan/bandar">Bandarmology step by step</a>.</li></ul>`}});
 return S; }
};

/* ================= BANDARMOLOGI ================= */
// akumulasi 50–119, spring 120–127, markup 128–177, distribusi 178–232, markdown 233–272
function wyData(){ return C().gen(4008,900,[[50,-.55,1.4,1.1],[70,0,1.0,.9],[4,-1.6,1.3,1.5],[4,1.7,1.3,1.6],[50,.65,1.3,1.3],[55,0,1.6,1.5],[40,-.65,1.5,1.2]]); }
const PH={acc:[50,119],spr:[120,127],mk:[128,177],dis:[178,232],md:[233,272]};
function wyChart(D,k,opt={}){ const end=opt.reveal||k, s0=opt.s0??0; const z=[];
  if(opt.phases){ const lab={acc:{id:"akumulasi",en:"accumulation"},mk:{id:"markup",en:"markup"},dis:{id:"distribusi",en:"distribution"},md:{id:"markdown",en:"markdown"}}; const col={acc:"var(--up)",mk:"var(--accent)",dis:"var(--gold)",md:"var(--down)"};
    for(const p of ["acc","mk","dis","md"]){ const [a,b]=PH[p]; if(a<=end) z.push({i0:a-s0,i1:Math.min(b,end)-s0,label:T(lab[p]),col:col[p]}); } }
  const o={h:260,zones:z,vl:[],marks:opt.marks||[]};
  if(opt.here!=null) o.vl.push({i:opt.here-s0,label:T({id:"kamu di sini",en:"you are here"})});
  if(opt.reveal) o.zones.push({i0:k+1-s0,i1:opt.reveal-s0,col:D[opt.reveal].c>=D[k].c?"var(--up)":"var(--down)"});
  return C().fig(D.slice(s0,end+1),o,opt.cap||""); }
const BAND={ key:"bandar", cat:"flow", t:{id:"Bandarmologi langkah demi langkah",en:"Bandarmology Step by Step"}, sub:{id:"broker summary, konsentrasi, harga rata-rata, Wyckoff",en:"broker summary, concentration, average price, Wyckoff"},
 endHref:"#/bsum", endLabel:{id:"Latihan di Lab Broker Summary →",en:"Practise in the Broker Summary Lab →"},
 data:wyData, build:()=>({}),
 steps:(D)=>{ const last=D.length-1, S=[];
 const av=(a,b)=>Math.round(D.slice(a,b+1).reduce((x,y)=>x+y.c,0)/(b-a+1)/5)*5, A=av(60,119), Tp=av(178,232), gain=Math.round((Tp/A-1)*100);
 S.push({t:{id:"Langkah 1 · Kenapa jejak bandar bisa terlihat",en:"Step 1 · Why big players leave footprints"},
  text:{id:`<p>Misalkan seorang pemain ingin membeli <b>10 juta lembar</b> (100.000 lot) saham yang rata-rata hanya diperdagangkan 20.000 lot sehari. Kalau ia membeli sekaligus, ia harus menyapu semua offer sampai harga melonjak — rata-rata harga belinya jadi mahal, dan semua orang langsung tahu.</p>
<p>Jadi ia harus:</p><ol class="steps"><li><b>Membeli pelan-pelan</b> selama berminggu-minggu (biasanya tidak lebih dari sebagian kecil volume harian).</li><li><b>Membutuhkan penjual</b> — orang-orang yang mau melepas barangnya. Penjual terbaik adalah ritel yang bosan atau takut.</li><li><b>Menjaga harga tetap rendah</b> selama ia belum selesai membeli.</li></ol>
<p>Ketiga hal ini meninggalkan jejak: harga yang menyamping lama, volume yang tidak biasa, penjualan yang diserap, dan nama broker yang sama muncul berulang di broker summary. Model ekonomi klasik Kyle (1985) menjelaskan perilaku ini secara matematis: pemain yang punya informasi memecah ordernya agar tersembunyi di antara transaksi orang lain.</p>`,
  en:`<p>Suppose a player wants to buy <b>10 million shares</b> (100,000 lots) of a stock that trades only 20,000 lots a day. Buying at once would mean sweeping every offer until price spikes — a costly average price, and everyone would notice.</p>
<p>So they must:</p><ol class="steps"><li><b>Buy slowly</b> over weeks (usually only a small slice of daily volume).</li><li><b>Need sellers</b> — people willing to let go. The best sellers are bored or scared retail investors.</li><li><b>Keep the price low</b> until they've finished buying.</li></ol>
<p>All three leave footprints: long sideways price action, unusual volume, absorbed selling, and the same broker names repeating in the broker summary. Kyle's classic model (1985) formalises this: informed players split orders to hide among other people's trades.</p>`}});
 S.push({t:{id:"Langkah 2 · Membaca broker summary kolom demi kolom",en:"Step 2 · Reading a broker summary column by column"},
  chart:()=>bsTable([["AK",42000,1318,1],["BK",18000,1322,1],["YP",9000,1330,0],["PD",6500,1328,0],["CC",4000,1325,0]],[["YP",15000,1326,0],["PD",12500,1324,0],["XC",9000,1327,0],["XL",8000,1325,0],["CC",7000,1323,0],["NI",5000,1329,0]],T({id:"Contoh broker summary 1 minggu, saham fiktif. Tag ungu = broker institusi asing.",en:"Example 1-week broker summary, fictional stock. Purple tag = foreign institutional broker."})),
  text:{id:`<ul><li><b>Buyer / Seller</b>: kode broker (2 huruf). Ini <b>pintu</b> transaksi, bukan nama orangnya.</li><li><b>B.Lot</b>: total lot yang dibeli lewat broker itu dalam periode yang dipilih.</li><li><b>B.Avg</b>: harga rata-rata pembeliannya — inilah perkiraan "modal" mereka.</li><li><b>S.Lot / S.Avg</b>: sama, untuk sisi jual.</li></ul>
<p>Dari tabel ini: <b>AK</b> (UBS) membeli 42.000 lot di rata-rata 1.318, <b>BK</b> (J.P. Morgan) 18.000 lot. Penjualnya tersebar: YP, PD, XC, XL, CC, NI — broker yang mayoritas nasabahnya ritel.</p>
<p>Cerita yang paling mungkin: <b>institusi asing menampung barang dari banyak investor ritel</b>.</p>`,
   en:`<ul><li><b>Buyer / Seller</b>: the 2-letter broker code. It's the <b>door</b> trades went through, not the person.</li><li><b>B.Lot</b>: total lots bought via that broker in the period.</li><li><b>B.Avg</b>: their average purchase price — an estimate of their "cost".</li><li><b>S.Lot / S.Avg</b>: the same for selling.</li></ul>
<p>Here <b>AK</b> (UBS) bought 42,000 lots at an average of 1,318 and <b>BK</b> (J.P. Morgan) 18,000. The sellers are spread out: YP, PD, XC, XL, CC, NI — mostly retail brokers.</p>
<p>The most likely story: <b>foreign institutions absorbing stock from many retail investors</b>.</p>`}});
 S.push({t:{id:"Langkah 3 · Menghitung konsentrasi",en:"Step 3 · Measuring concentration"},
  text:{id:`<p>Pakai tabel dari langkah 2. Misalkan total volume minggu itu <b>80.000 lot</b>.</p>
<div class="formula">Top-3 buyer  = AK 42.000 + BK 18.000 + YP 9.000  = 69.000 lot → 69.000 ÷ 80.000 = 86%
Top-3 seller = YP 15.000 + PD 12.500 + XC 9.000 = 36.500 lot → 36.500 ÷ 80.000 = 46%
Selisih      = 86% − 46% = +40%   → pembelian jauh lebih terkonsentrasi</div>
<p>Cara membaca selisihnya:</p><ul><li><b>Lebih dari +10%</b>: pembeli lebih sedikit & lebih besar daripada penjual → indikasi <b>akumulasi</b>.</li><li><b>Kurang dari −10%</b>: penjual lebih terkonsentrasi → indikasi <b>distribusi</b>.</li><li><b>Di antaranya</b>: netral, tidak ada jejak dominan.</li></ul>
<p>Kenapa konsentrasi penting? Karena ritel tersebar di banyak broker dengan order kecil. Kalau satu atau dua pintu menyerap sebagian besar barang, besar kemungkinan ada satu pihak besar di baliknya.</p>`,
  en:`<p>Use the table from step 2. Suppose the week's total volume was <b>80,000 lots</b>.</p>
<div class="formula">Top-3 buyers  = AK 42,000 + BK 18,000 + YP 9,000  = 69,000 lots → 69,000 ÷ 80,000 = 86%
Top-3 sellers = YP 15,000 + PD 12,500 + XC 9,000 = 36,500 lots → 36,500 ÷ 80,000 = 46%
Difference    = 86% − 46% = +40%   → buying is far more concentrated</div>
<p>Reading the difference:</p><ul><li><b>Above +10%</b>: fewer, bigger buyers than sellers → a sign of <b>accumulation</b>.</li><li><b>Below −10%</b>: selling more concentrated → a sign of <b>distribution</b>.</li><li><b>In between</b>: neutral, no dominant footprint.</li></ul>
<p>Why concentration matters: retail is spread over many brokers with small orders. If one or two doors absorb most of the stock, there's likely one big party behind it.</p>`}});
 S.push({t:{id:"Langkah 4 · Harga rata-rata bandar: kenapa penting",en:"Step 4 · The big player's average price: why it matters"},
  text:{id:`<p>Dari langkah 2, AK membeli di rata-rata <b>1.318</b>. Bayangkan tiga situasi:</p>
<div class="tablewrap"><table><tr><th>Harga sekarang</th><th>Posisi AK</th><th>Kemungkinan perilaku</th></tr>
<tr><td>1.250</td><td>Rugi ±5%</td><td>Cenderung bertahan atau menambah (rata-rata turun); jarang buang barang di harga rugi.</td></tr>
<tr><td>1.330</td><td>Hampir impas</td><td>Area "modal bandar" — sering menjadi support karena pemain besar mempertahankannya.</td></tr>
<tr><td>1.700</td><td>Untung ±29%</td><td>Mulai ada motivasi untuk distribusi. Pantau apakah AK berubah menjadi top seller.</td></tr></table></div>
<p>Jadi harga rata-rata pemain besar membantu menjawab: <b>"apakah mereka masih butuh harga naik, atau sudah siap menjual?"</b> Hati-hati: kita tidak tahu apakah AK adalah satu pihak atau banyak nasabah berbeda.</p>`,
  en:`<p>From step 2, AK bought at an average of <b>1,318</b>. Imagine three situations:</p>
<div class="tablewrap"><table><tr><th>Price now</th><th>AK's position</th><th>Likely behaviour</th></tr>
<tr><td>1,250</td><td>~5% loss</td><td>Tends to hold or add (lowering the average); rarely dumps at a loss.</td></tr>
<tr><td>1,330</td><td>Near break-even</td><td>The "big player's cost" area — often becomes support because they defend it.</td></tr>
<tr><td>1,700</td><td>~29% profit</td><td>Motive to distribute appears. Watch whether AK turns into a top seller.</td></tr></table></div>
<p>So the big player's average helps answer: <b>"do they still need a higher price, or are they ready to sell?"</b> Caution: we don't know whether AK is one party or many different clients.</p>`}});
 S.push({t:{id:"Langkah 5 · Siklus lengkap di grafik",en:"Step 5 · The full cycle on a chart"},
  chart:()=>wyChart(D,last,{phases:true,s0:30,cap:T({id:"Grafik fiktif dengan empat fase Wyckoff. Perhatikan volume di tiap fase.",en:"Fictional chart with the four Wyckoff phases. Watch the volume in each phase."})}),
  text:{id:`<ol class="steps"><li><b>Akumulasi</b> (hijau): setelah turun, harga menyamping lama. Volume naik saat harga mendekati bawah range, tapi harga tidak jatuh lagi. Broker summary: pembeli terkonsentrasi.</li>
<li><b>Markup</b> (biru): harga naik meninggalkan range. Koreksi kecil dengan volume rendah.</li>
<li><b>Distribusi</b> (kuning): harga menyamping di atas dengan volume besar tapi tidak bisa naik lagi. Broker summary: pembeli lama kini menjadi penjual; pembeli baru tersebar di broker ritel.</li>
<li><b>Markdown</b> (merah): harga turun, ritel yang membeli di atas tertinggal.</li></ol>
<p>Perhatikan bahwa akumulasi dan distribusi <b>terlihat mirip di grafik</b> (sama-sama menyamping). Yang membedakan: <b>posisinya</b> (setelah turun vs setelah naik) dan <b>siapa yang membeli vs menjual</b> di broker summary.</p>`,
  en:`<ol class="steps"><li><b>Accumulation</b> (green): after a fall, price moves sideways for a long time. Volume rises near the bottom of the range but price doesn't fall further. Broker summary: concentrated buyers.</li>
<li><b>Markup</b> (blue): price rises out of the range. Small pullbacks on low volume.</li>
<li><b>Distribution</b> (yellow): price moves sideways at the top on heavy volume but can't rise further. Broker summary: earlier buyers are now sellers; new buyers spread across retail brokers.</li>
<li><b>Markdown</b> (red): price falls, leaving the top buyers behind.</li></ol>
<p>Note that accumulation and distribution <b>look alike on a chart</b> (both sideways). What separates them: <b>where they occur</b> (after a fall vs after a rise) and <b>who buys vs sells</b> in the broker summary.</p>`}});
 S.push({quiz:true,k:PH.spr[1],h:40,exp:"up",t:{id:"Langkah 6 · Tebak: setelah 'spring' di akhir akumulasi",en:"Step 6 · Guess: after a 'spring' at the end of accumulation"},
  chart:(rev)=>wyChart(D,PH.spr[1],{s0:30,here:PH.spr[1],reveal:rev?Math.min(last,PH.spr[1]+40):null,zones:[]})+(rev?"":bsTable([["AK",38000,A-5,1],["KZ",21000,A-10,1],["CC",8000,A,0]],[["YP",14000,A+5,0],["PD",11000,A,0],["XC",9000,A+5,0],["XL",7000,A,0]],T({id:"Broker summary 1 bulan terakhir (sampai garis 'kamu di sini').",en:"Broker summary for the last month (up to 'you are here')."}))),
  text:{id:`<p>Harga sudah menyamping ±3 bulan. Beberapa hari lalu harga <b>jatuh menembus bawah range</b> (banyak stop loss tersentuh, volume besar), lalu dalam beberapa hari <b>kembali naik ke dalam range</b>. Di Wyckoff ini disebut <b>spring</b>.</p><p>Broker summary sebulan terakhir: pembeli terkonsentrasi di AK & KZ (institusi asing), penjual tersebar di broker ritel.</p><p>40 hari ke depan…</p>`,
   en:`<p>Price has been sideways for ~3 months. A few days ago it <b>broke below the range</b> (many stops hit, big volume), then within days <b>climbed back inside</b>. In Wyckoff terms this is a <b>spring</b>.</p><p>Last month's broker summary: buyers concentrated in AK & KZ (foreign institutions), sellers spread across retail brokers.</p><p>Over the next 40 days…</p>`},
  why:{id:"Spring adalah jebakan terakhir sebelum markup: memancing ritel cut loss di bawah support supaya pemain besar mendapat barang murah dalam jumlah besar. Kombinasi spring + konsentrasi pembeli institusi adalah salah satu setup bandarmologi terkuat. Stop: di bawah titik terendah spring.",en:"A spring is the final trap before a markup: luring retail to cut losses below support so big players get a large amount cheap. A spring plus concentrated institutional buying is one of the strongest bandarmology setups. Stop: below the spring low."}});
 S.push({quiz:true,k:PH.dis[0]+40,h:40,exp:"down",t:{id:"Langkah 7 · Tebak: menyamping di atas setelah naik tinggi",en:"Step 7 · Guess: sideways at the top after a big rise"},
  chart:(rev)=>wyChart(D,PH.dis[0]+40,{s0:90,here:PH.dis[0]+40,reveal:rev?Math.min(last,PH.dis[0]+80):null})+(rev?"":bsTable([["YP",16000,Tp-5,0],["PD",14000,Tp+5,0],["XC",11000,Tp,0],["XL",9000,Tp,0],["EP",7000,Tp+10,0]],[["AK",36000,Tp,1],["KZ",19000,Tp-5,1],["MG",9000,Tp+5,0]],T({id:"Broker summary 1 bulan terakhir.",en:"Broker summary for the last month."}))),
  text:{id:`<p>Harga sudah naik jauh dari range akumulasi, lalu menyamping beberapa minggu dengan volume besar. Banyak berita positif, grup media sosial ramai.</p><p>Broker summary: <b>AK & KZ — yang dulu membeli di ±${A.toLocaleString("id-ID")} — sekarang menjadi penjual terbesar di ±${Tp.toLocaleString("id-ID")}</b>. Pembelinya tersebar di YP, PD, XC, XL, EP.</p><p>40 hari ke depan…</p>`,
   en:`<p>Price has risen far above the accumulation range, then gone sideways for weeks on heavy volume. Plenty of good news, social media buzzing.</p><p>Broker summary: <b>AK & KZ — who bought around ${A.toLocaleString("en-US")} — are now the biggest sellers around ${Tp.toLocaleString("en-US")}</b>. Buyers are spread across YP, PD, XC, XL, EP.</p><p>Over the next 40 days…</p>`},
  why:{id:`Pembeli lama (untung ±${gain}%) menjadi penjual, pembeli baru adalah banyak investor ritel = distribusi. Barang berpindah dari tangan kuat ke tangan lemah. Setelah distribusi selesai, tidak ada lagi pihak besar yang menopang harga. Sikap terbaik: tidak membeli, dan bagi yang memegang, ambil untung bertahap.`,en:`Old buyers (~${gain}% profit) turned sellers, new buyers are many retail investors = distribution. Stock moved from strong hands to weak hands. Once distribution ends, nobody big supports the price. Best stance: don't buy, and holders take profits gradually.`}});
 S.push({t:{id:"Langkah 8 · Bandar menyamar lewat broker ritel",en:"Step 8 · Big players hiding behind retail brokers"},
  chart:()=>bsTable([["YP",61000,512,0],["PD",8000,518,0],["XC",6000,520,0]],[["XL",9000,515,0],["CC",8500,516,0],["NI",8000,514,0],["PD",7500,519,0],["KK",7000,517,0],["EP",6500,516,0]],T({id:"Contoh: YP sangat dominan di sisi beli.",en:"Example: YP heavily dominates the buy side."})),
  text:{id:`<p>Top buyer adalah <b>YP</b> — broker dengan nasabah ritel terbesar. Pemula akan bilang "ritel beli, berarti bukan bandar". Tapi perhatikan:</p>
<ol><li>YP membeli <b>61.000 lot</b>, hampir 8× broker ritel lain. Ritel sungguhan tersebar merata, tidak menumpuk di satu pintu.</li><li>Harga rata-rata YP (512) lebih rendah dari semua penjual — pembeli yang sabar dan disiplin harga.</li><li>Kalau di running trade terlihat lot "aneh" yang sama berulang (misalnya 777 lot tiap beberapa menit), itu ciri satu pihak yang memecah order.</li><li>Cek periode lain: kalau YP konsisten top buyer 1 hari, 1 minggu, dan 1 bulan, polanya semakin kuat.</li></ol>
<p>Kesimpulan: <b>yang dibaca adalah konsentrasi & konsistensi, bukan label "ritel" atau "asing" pada broker</b>.</p>`,
   en:`<p>The top buyer is <b>YP</b> — the broker with the largest retail client base. A beginner would say "retail is buying, so no big player". But note:</p>
<ol><li>YP bought <b>61,000 lots</b>, nearly 8× any other retail broker. Real retail is spread evenly, not piled into one door.</li><li>YP's average price (512) is below every seller's — a patient, price-disciplined buyer.</li><li>If the running trade shows the same "odd" lot repeating (e.g. 777 lots every few minutes), that's one party splitting an order.</li><li>Check other periods: if YP is the consistent top buyer over 1 day, 1 week and 1 month, the pattern strengthens.</li></ol>
<p>Conclusion: <b>read concentration & consistency, not the "retail" or "foreign" label on the broker</b>.</p>`}});
 S.push({t:{id:"Langkah 9 · Periode broker summary (seperti 'timeframe')",en:"Step 9 · Broker summary periods (like 'timeframes')"},
  text:{id:`<div class="tablewrap"><table><tr><th>Periode</th><th>Gunanya</th><th>Hati-hati</th></tr>
<tr><td><b>1 hari</b></td><td>Melihat siapa yang aktif hari ini; cocok untuk trader harian.</td><td>Sangat berisik; satu transaksi crossing bisa mengacaukan.</td></tr>
<tr><td><b>1 minggu</b> ⭐</td><td>Keseimbangan terbaik untuk swing trading.</td><td>Cek apakah ada transaksi nego besar.</td></tr>
<tr><td><b>1 bulan</b></td><td>Melihat akumulasi/distribusi yang sebenarnya (butuh waktu lama).</td><td>Lambat bereaksi terhadap perubahan.</td></tr>
<tr><td><b>3 bulan+</b></td><td>Menemukan harga rata-rata pemain besar jangka panjang.</td><td>Banyak pihak berbeda bercampur di satu kode broker.</td></tr></table></div>
<p>Cara terbaik: <b>bandingkan beberapa periode</b>. Akumulasi sungguhan terlihat konsisten di 1 minggu dan 1 bulan. Kalau hanya muncul 1 hari, bisa jadi kebetulan.</p>`,
  en:`<div class="tablewrap"><table><tr><th>Period</th><th>Use</th><th>Careful</th></tr>
<tr><td><b>1 day</b></td><td>Who was active today; suits day traders.</td><td>Very noisy; one crossing trade can distort it.</td></tr>
<tr><td><b>1 week</b> ⭐</td><td>The best balance for swing trading.</td><td>Check for big negotiated trades.</td></tr>
<tr><td><b>1 month</b></td><td>Shows real accumulation/distribution (it takes time).</td><td>Slow to react to change.</td></tr>
<tr><td><b>3 months+</b></td><td>Finds big players' long-term average price.</td><td>Many different parties mix under one broker code.</td></tr></table></div>
<p>Best practice: <b>compare several periods</b>. Real accumulation shows consistently over 1 week and 1 month. If it appears for just 1 day, it may be chance.</p>`}});
 S.push({t:{id:"Langkah 10 · Bandarmologi vs data asing: pakai yang mana?",en:"Step 10 · Bandarmology vs foreign data: which to use?"},
  text:{id:`<ul><li><b>Saham big cap</b> (BBCA, BBRI, TLKM, ASII): pemainnya sangat banyak & porsi asing besar. Gunakan <b>net foreign</b> beberapa hari–minggu, plus broker institusi global (AK, BK, KZ, MS). Riset Dvořák (2005, data BEI) menemukan nasabah broker global unggul untuk horizon lebih panjang.</li>
<li><b>Saham lapis 2–3</b>: porsi asing kecil, net foreign hampir tidak berarti. Di sini <b>konsentrasi broker, harga rata-rata, dan absorption</b> lebih berguna.</li>
<li><b>Selalu gabungkan dengan fundamental</b>: bandar juga bisa salah, dan bandarmologi paling aman dipakai untuk menentukan <i>kapan</i> membeli saham yang memang layak dibeli.</li></ul>
<div class="box trap"><h4>Jebakan</h4>Broker summary memperlihatkan pintu, bukan orang. Satu kode bisa berisi ribuan nasabah; satu pemain bisa memakai banyak kode. Pakai sebagai petunjuk peluang, bukan bukti.</div>`,
  en:`<ul><li><b>Large caps</b> (BBCA, BBRI, TLKM, ASII): many players & big foreign share. Use <b>net foreign</b> over days–weeks, plus global institutional brokers (AK, BK, KZ, MS). Dvořák (2005, IDX data) found global-broker clients did better over longer horizons.</li>
<li><b>Second/third liners</b>: small foreign share, net foreign barely matters. Here <b>broker concentration, average price and absorption</b> are more useful.</li>
<li><b>Always combine with fundamentals</b>: big players can be wrong too, and bandarmology is safest for deciding <i>when</i> to buy a stock worth owning.</li></ul>
<div class="box trap"><h4>Trap</h4>A broker summary shows doors, not people. One code can hold thousands of clients; one player can use many codes. Treat it as a probability hint, not proof.</div>`}});
 return S; }
};

window.Guide.list.unshift(BAND); window.Guide.list.unshift(OB);
})();
