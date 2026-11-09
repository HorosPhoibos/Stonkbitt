/* Bahasa: "id" (default) atau "en". T({id,en}) memilih teks; L("teks ID") menerjemahkan label pendek lewat kamus. */
(function(){
let lang = "id";
try{ lang = localStorage.getItem("sb_lang") || "id"; }catch(e){}
window.LANG = lang;
window.T = o => (o && typeof o==="object") ? (o[window.LANG] ?? o.id) : o;
const D = {
 // navigasi & umum
 "Peta Belajar A–Z":"A–Z Learning Map","Kurikulum":"Curriculum","Latihan":"Practice","Lanjutan":"Advanced","Mulai di sini":"Start here",
 "Kelas Pemula (Level 1 & 2)":"Beginner Class (Level 1 & 2)","Ekspektasi Realistis":"Realistic Expectations",
 "Indeks & Daftar LQ45":"Indices & LQ45 List","Pengaruh Global (USD, S&P)":"Global Drivers (USD, S&P)",
 "Dasar Bursa (BEI)":"Exchange Basics (IDX)","Fundamental":"Fundamentals","Teknikal":"Technicals","Bandarmologi & Volume":"Bandarmology & Volume",
 "Order Book & Tape":"Order Book & Tape","Asing (Foreign Flow)":"Foreign Flow","Risiko & Psikologi":"Risk & Psychology",
 "Lab Order Book (3 detik)":"Order Book Lab (3 sec)","Lab Broker Summary":"Broker Summary Lab","Kamus Kode Broker":"Broker Code Dictionary",
 "Matriks Asing vs Lokal":"Foreign vs Local Matrix","Jalur CFA (L1–L3)":"CFA Path (L1–L3)","Tools & Kalkulator":"Tools & Calculators",
 "Pustaka Buku":"Book Library","Lab Indikator (Fibo, RSI, Ichimoku)":"Indicator Lab (Fibo, RSI, Ichimoku)","Riset & Metode (Jurnal)":"Research & Methods (Journals)","Korelasi":"Correlation","Indikator Pelan-pelan":"Indicators, Step by Step","Belajar Pelan-pelan":"Learn Step by Step","Kamus Istilah":"Glossary","◐ Tema":"◐ Theme",
 "Inti 30 detik":"30-second core","Jebakan umum":"Common trap","Praktik minggu ini":"Practice this week","Rujukan":"References",
 "Catatanku":"My notes","Tandai pelajaran ini selesai":"Mark this lesson complete","menit":"min","Modul":"Module",
 "Tulis ringkasan dengan bahasamu sendiri…":"Summarise in your own words…","Cari istilah…":"Search terms…","Istilah":"Term","Arti":"Meaning",
 "Halaman tidak ditemukan":"Page not found","Kembali ke peta belajar":"Back to the learning map","selesai":"done",
 "Lanjut ke Jalur CFA →":"Continue to CFA Path →","Ketuk istilah bergaris titik untuk melihat artinya.":"Tap any dotted-underlined term to see its meaning.",
 // tools output
 "Bunga kotor":"Gross interest","Pajak dipotong":"Tax withheld","Per bulan (bersih, rata-rata)":"Per month (net, average)","Imbal hasil bersih efektif p.a.":"Effective net yield p.a.",
 "Nilai akhir":"Ending value","Kupon kotor per tahun":"Gross coupon per year","Kupon bersih per tahun":"Net coupon per year","Capital gain/loss":"Capital gain/loss",
 "Pajak capital gain":"Capital gain tax","Total keuntungan bersih":"Total net profit","Yield bersih atas modal (p.a., kira-kira)":"Net yield on cost (p.a., approx.)",
 "Return tahunan total (CAGR)":"Total annual return (CAGR)","Current yield":"Current yield","Macaulay duration":"Macaulay duration","Modified duration":"Modified duration",
 "Jika yield +1%, harga berubah":"If yield +1%, price changes by","Nilai beli":"Purchase value","Fee beli":"Buy fee","Total modal":"Total cost","Kenaikan perlu":"Rise needed",
 "Return bersih":"Net return","Fraksi di harga ini":"Tick size at this price","1 tick = ":"1 tick = ","ARA dipakai":"Upper limit used","Jumlah tick ke ARA":"Ticks to upper limit",
 "Nilai posisi":"Position value","Porsi dari modal":"Share of capital","Risk : Reward":"Risk : Reward","Potensi untung di target":"Potential profit at target",
 "P/L sebelum tambah":"P/L before adding","P/L sesudah tambah":"P/L after adding","Kenaikan perlu untuk impas":"Rise needed to break even","Tambahan dana":"Additional funds",
 "Win rate impas minimum":"Break-even win rate","Payoff ratio":"Payoff ratio","Perkiraan return modal / tahun":"Estimated return on capital / year",
 "PV arus kas tahap 1":"PV of stage-1 cash flows","PV terminal value":"PV of terminal value","Margin of safety vs harga":"Margin of safety vs price",
 "PBV wajar":"Fair P/B","Nilai wajar (PBV × BVPS)":"Fair value (P/B × BVPS)","PBV saat ini":"Current P/B","Payout berkelanjutan (1 − g/ROE)":"Sustainable payout (1 − g/ROE)",
 "PER wajar":"Fair P/E","Nilai wajar (PER × EPS)":"Fair value (P/E × EPS)","PER saat ini":"Current P/E","Graham number √(22,5×EPS×BVPS)":"Graham number √(22.5×EPS×BVPS)",
 "Dividen kotor":"Gross dividend","Yield kotor":"Gross yield","Yield bersih":"Net yield","Perkiraan harga ex-date":"Estimated ex-date price",
 "Nilai teoretis 1 HMETD":"Theoretical value of 1 right","Jumlah HMETD kamu":"Your rights","Dana untuk menebus semua":"Cash to exercise all","Dilusi jika tidak menebus":"Dilution if not exercised",
 "Total setoran":"Total contributions","Hasil investasi":"Investment gain","Nilai riil (daya beli hari ini)":"Real value (today's purchasing power)",
 "Waktu untuk 2× (72/CAGR)":"Time to double (72/CAGR)","Total return":"Total return","Cost of equity (Ke)":"Cost of equity (Ke)","Bobot ekuitas / utang":"Equity / debt weights",
 "Kd setelah pajak":"After-tax Kd","WACC":"WACC",
};
window.L = s => window.LANG==="en" ? (D[s] ?? s) : s;
window.setLang = l => { window.LANG=l; try{ localStorage.setItem("sb_lang",l); }catch(e){} document.documentElement.lang=l; window.dispatchEvent(new Event("langchange")); };
document.documentElement.lang = lang;
})();
