/* config.js - semua yang perlu kamu ubah ada di file ini */
/* ===== UBAH BAGIAN INI ===== */
var WA_NUMBER = "6287878101055";      // 0878 7810 1055
var FORM_URL  = "https://docs.google.com/forms/d/e/1FAIpQLSdOW1Wn1Jough16nEbtZ3lUyTdjfXLXPjDFSNIvGv6ExsXLNg/viewform";
var FORM_ORDER_ENTRY = "entry.1674770662";    // kode entry untuk pertanyaan "Kode pesanan" di Google Form
var FORM_TEMPLATE_ENTRY = "entry.1608842900"; // dari "Dapatkan link terisi otomatis" di Google Form
var FORM_TEMPLATE_PAKAI = "nama";  // isi kolom KODE CV di form: "nama" = CV Kode 005 | "kode" = 005
var IG_URL = "https://instagram.com/ejasa.cv";
// ===== DAFTAR TEMPLATE =====
// Gambar ada di assets/img/templates/ dengan nama CV-xxx.png (CV) dan CV-xxx-S.png (surat lamaran).
// Format tiap baris: [nomor, kategori, surat]
//   surat: 1 = ada file CV-xxx-S.png | 0 = belum ada surat lamaran | "nama-file.png" = nama file surat berbeda
// Kategori dipakai untuk tombol filter: ATS, Fresh Graduate, Profesional, Kreatif (boleh tambah kategori baru).
// Kategori di bawah ini perkiraan dari tampilan gambar, silakan koreksi.
// Menambah template baru: tambah satu baris, lalu unggah gambarnya.
var BASE = "assets/img/templates/";
var PAGE_MOBILE = 6;    // jumlah template yang tampil awal di HP
var PAGE_DESKTOP = 12;  // jumlah template yang tampil awal di komputer
var LIST = [
  ["001","Profesional",1],
  ["002","Fresh Graduate",1],
  ["003","Kreatif",1],
  ["004","Kreatif",1],
  ["005","Profesional",1],
  ["006","Fresh Graduate",1],
  ["007","Fresh Graduate",1],
  ["008","ATS",1],
  ["009","Profesional",1],
  ["010","ATS",1],
  ["011","ATS",0],
  ["012","ATS",0],
  ["013","ATS",0],
  ["014","Fresh Graduate",0],
  ["015","Profesional",0],
  ["016","Fresh Graduate",1],
  ["017","Profesional",1],
  ["018","Fresh Graduate",1],
  ["019","Kreatif",1],
  ["020","Kreatif",1],
  ["021","Profesional",1],
  ["022","ATS",0],
  ["023","Kreatif",1],
  ["024","Profesional",1],
  ["025","Kreatif","CV-025_S.png"],
  ["026","Profesional",0],
  ["027","Kreatif",0],
  ["028","Fresh Graduate",0],
  ["029","Kreatif",0],
  ["030","Kreatif",0],
  ["031","Profesional",0],
  ["032","Profesional",0],
  ["033","Profesional",0],
  ["034","Kreatif",0],
  ["035","Fresh Graduate",0],
  ["036","Profesional",0],
  ["037","Fresh Graduate",0],
  ["038","Fresh Graduate",0],
  ["039","Kreatif",0],
  ["040","Kreatif",0]
];
var TEMPLATES = LIST.map(function(r){
  var s = r[2];
  return {
    n: "CV Kode " + r[0],
    kode: r[0],
    c: r[1],
    d: s ? "Termasuk surat lamaran" : "CV saja",
    img: BASE + "CV-" + r[0] + ".png",
    imgSurat: s ? BASE + (s === 1 ? "CV-" + r[0] + "-S.png" : s) : "",
    surat: !!s
  };
});
// ===== LAYANAN DAN HARGA =====
// p = harga (rupiah), atau null kalau "tanya admin" (tidak dihitung di total)
// form:1 = setelah pesan, pelanggan mengisi form data | tpl:1 = perlu memilih template
var PAKET = [
  {id:"std",name:"Standart",p:35000,t:"1x24 jam",f:["CV (PDF)","Surat lamaran (Word)"]},
  {id:"biz",name:"Business",p:45000,t:"1x24 jam",f:["CV (PDF)","Surat lamaran (Word)","Gabung PDF","Gratis: edit background foto, request file Word"]},
  {id:"prm",name:"Premium",p:50000,t:"3 s.d 4 jam",f:["CV (PDF)","Surat lamaran (Word)","Gabung PDF","Gratis: edit background foto, request file Word, konsultasi"]}
];
var SERVICES = [
  {id:"cv",name:"Curriculum Vitae",desc:"CV profesional dari template pilihan",opts:[{o:"Dari template",p:25000,form:1,tpl:1},{o:"Custom",p:30000,form:1}]},
  {id:"sl",name:"Surat lamaran",desc:"Surat lamaran kerja siap kirim",opts:[{o:"Dari template",p:15000,form:1,tpl:1},{o:"Custom",p:25000,form:1}]},
  {id:"bg",name:"Edit background foto",desc:"Per foto, file dikirim lewat WhatsApp",opts:[{o:"",p:10000}]},
  {id:"pdf",name:"Gabung PDF",desc:"Satukan beberapa file jadi satu PDF",opts:[{o:"Kurang dari 10 lembar",p:10000},{o:"Lebih dari 10 lembar",p:15000}]},
  {id:"edit",name:"Edit CV",desc:"Revisi CV yang sudah kamu punya",opts:[{o:"",p:15000}]},
  {id:"doc",name:"Desain dokumen",desc:"Proposal, undangan, dan dokumen lain",opts:[{o:"",p:null}]},
  {id:"zip",name:"Kompres dokumen",desc:"Perkecil ukuran file dokumen",opts:[{o:"",p:null}]},
  {id:"pri",name:"Prioritas (No Antri)",desc:"Terabas antrean, pengerjaan 1 jam",opts:[{o:"",p:20000}]}
];
/* =========================== */
