/* Kode broker (Anggota Bursa) yang sering muncul di broker summary.
   g = golongan untuk keperluan BELAJAR membaca broker summary:
   "asing"  : broker global yang banyak melayani institusi/fund asing
   "ritel"  : broker dengan basis nasabah ritel besar (online trading)
   "bumn"   : grup BUMN (nasabah institusi + ritel)
   "lokal"  : broker lokal lain (campuran institusi/ritel/HNW)
   Catatan: kepemilikan & nama bisa berubah (merger/tutup). Verifikasi di idx.co.id → Anggota Bursa. */
window.BROKERS = [
 // ---- Asing (institusi global)
 {c:"AK", n:"UBS Sekuritas Indonesia", g:"asing", k:"Salah satu jalur utama fund global. Net buy AK konsisten di big cap sering sejalan dengan net foreign buy."},
 {c:"BK", n:"J.P. Morgan Sekuritas Indonesia", g:"asing", k:"Institusi global; aktif saat rebalancing indeks & di saham konstituen MSCI."},
 {c:"ZP", n:"Maybank Sekuritas Indonesia", g:"asing", k:"Grup Malaysia; nasabah institusi regional, juga ada ritel."},
 {c:"KZ", n:"CLSA Sekuritas Indonesia", g:"asing", k:"Institusi asing; sering muncul di big cap & saham tambang."},
 {c:"MS", n:"Morgan Stanley Sekuritas Indonesia", g:"asing", k:"Institusi global."},
 {c:"GW", n:"HSBC Sekuritas Indonesia", g:"asing", k:"Institusi global."},
 {c:"RX", n:"Macquarie Sekuritas Indonesia", g:"asing", k:"Institusi global (cek status aktif terbaru)."},
 {c:"YU", n:"CGS International Sekuritas Indonesia", g:"asing", k:"Grup Singapura/Tiongkok; dulu CGS-CIMB. Campuran institusi & ritel."},
 {c:"AI", n:"UOB Kay Hian Sekuritas", g:"asing", k:"Grup Singapura; institusi & HNW."},
 {c:"FS", n:"Yuanta Sekuritas Indonesia", g:"asing", k:"Grup Taiwan."},
 {c:"HD", n:"KGI Sekuritas Indonesia", g:"asing", k:"Grup Taiwan."},
 {c:"DR", n:"RHB Sekuritas Indonesia", g:"asing", k:"Grup Malaysia; institusi & ritel."},
 // ---- Ritel (dimiliki asing tapi nasabah mayoritas ritel lokal)
 {c:"YP", n:"Mirae Asset Sekuritas Indonesia", g:"ritel", k:"Grup Korea, tapi basis nasabah ritel lokal terbesar. Broker asing ≠ investor asing!"},
 {c:"KK", n:"Phillip Sekuritas Indonesia", g:"ritel", k:"Grup Singapura; banyak nasabah ritel aktif."},
 {c:"AG", n:"Kiwoom Sekuritas Indonesia", g:"ritel", k:"Grup Korea; ritel."},
 {c:"BQ", n:"Korea Investment & Sekuritas Indonesia", g:"ritel", k:"Grup Korea; campuran."},
 {c:"XA", n:"NH Korindo Sekuritas Indonesia", g:"ritel", k:"Grup Korea; campuran ritel."},
 {c:"AH", n:"Shinhan Sekuritas Indonesia", g:"ritel", k:"Grup Korea."},
 // ---- Ritel lokal (aplikasi online)
 {c:"PD", n:"Indo Premier Sekuritas (IPOT)", g:"ritel", k:"Ritel sangat besar. Top buyer PD + harga turun sering = ritel menangkap pisau."},
 {c:"XC", n:"Ajaib Sekuritas Asia", g:"ritel", k:"Ritel generasi muda; lot rata-rata kecil."},
 {c:"XL", n:"Stockbit Sekuritas Digital", g:"ritel", k:"Ritel komunitas Stockbit; sering terlihat di saham yang ramai dibicarakan."},
 {c:"SQ", n:"BCA Sekuritas", g:"ritel", k:"Ritel & nasabah prioritas BCA."},
 {c:"GR", n:"Panin Sekuritas", g:"lokal", k:"Campuran ritel & HNW."},
 {c:"EP", n:"MNC Sekuritas", g:"ritel", k:"Ritel."},
 {c:"DH", n:"Sinarmas Sekuritas", g:"lokal", k:"Campuran."},
 {c:"IF", n:"Samuel Sekuritas Indonesia", g:"lokal", k:"Campuran ritel/HNW."},
 {c:"HP", n:"Henan Putihrai Sekuritas", g:"lokal", k:"Ritel & HNW."},
 {c:"CP", n:"KB Valbury Sekuritas", g:"lokal", k:"Campuran."},
 // ---- Lokal institusi / HNW
 {c:"LG", n:"Trimegah Sekuritas Indonesia", g:"lokal", k:"Institusi lokal & HNW."},
 {c:"AZ", n:"Sucor Sekuritas", g:"lokal", k:"Institusi & HNW; grup Sucor (juga manajer investasi)."},
 {c:"KI", n:"Ciptadana Sekuritas Asia", g:"lokal", k:"Institusi lokal."},
 {c:"BB", n:"Verdhana Sekuritas Indonesia", g:"lokal", k:"Institusi."},
 {c:"MG", n:"Semesta Indovest Sekuritas", g:"lokal", k:"Sering muncul di saham lapis 2–3 dengan pergerakan aktif."},
 // ---- BUMN group
 {c:"CC", n:"Mandiri Sekuritas", g:"bumn", k:"Grup BUMN; institusi (dana pensiun, asuransi) & ritel MOST."},
 {c:"NI", n:"BNI Sekuritas", g:"bumn", k:"Grup BUMN; ritel & institusi."},
 {c:"OD", n:"BRI Danareksa Sekuritas", g:"bumn", k:"Grup BUMN; institusi & ritel."},
 {c:"DX", n:"Bahana Sekuritas", g:"bumn", k:"Grup BUMN (IFG); institusi."},
];

window.BROKER_GROUP = {
  asing:{label:"Asing (institusi global)", cls:"violet"},
  ritel:{label:"Ritel", cls:"blue"},
  lokal:{label:"Lokal (institusi/HNW/campuran)", cls:"gold"},
  bumn:{label:"Grup BUMN", cls:"up"},
};
window.brokerByCode = c => window.BROKERS.find(b=>b.c===c);
