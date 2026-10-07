/* config.js - semua yang perlu kamu ubah ada di file ini */
/* ===== UBAH BAGIAN INI ===== */
var WA_NUMBER = "6287878101055";      // 0878 7810 1055
var FORM_URL  = "https://docs.google.com/forms/d/e/ISI_ID_FORM/viewform";
var FORM_TEMPLATE_ENTRY = "entry.0000000"; // dari "Dapatkan link terisi otomatis" di Google Form
var IG_URL = "https://instagram.com/ejasa.cv";
// ===== DAFTAR TEMPLATE =====
// Gambar ada di assets/img/templates/ dengan nama CV-xxx.png (CV) dan CV-xxx-S.png (surat lamaran).
// Format tiap baris: [nomor, kategori, surat]
//   surat: 1 = ada file CV-xxx-S.png | 0 = belum ada surat lamaran | "nama-file.png" = nama file surat berbeda
// Kategori dipakai untuk tombol filter: ATS, Fresh Graduate, Profesional, Kreatif (boleh tambah kategori baru).
// Kategori di bawah ini perkiraan dari tampilan gambar, silakan koreksi.
// Menambah template baru: tambah satu baris, lalu unggah gambarnya.
var BASE = "assets/img/templates/";
var LIST = [
  ["001","Fresh Graduate",1],
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
  ["013","Profesional",0],
  ["014","Profesional",0],
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
  ["036","ATS",0],
  ["037","Fresh Graduate",0],
  ["038","Fresh Graduate",0],
  ["039","Kreatif",0],
  ["040","ATS",0]
];
var TEMPLATES = LIST.map(function(r){
  var s = r[2];
  return {
    n: "CV Kode " + r[0],
    c: r[1],
    d: s ? "Termasuk surat lamaran" : "CV saja",
    img: BASE + "CV-" + r[0] + ".png",
    imgSurat: s ? BASE + (s === 1 ? "CV-" + r[0] + "-S.png" : s) : "",
    surat: !!s
  };
});
var PACKAGES = [
  {n:"Standart",p:"Rp35.000",t:"Pengerjaan 1x24 jam",f:["CV (PDF)","Surat lamaran (Word)"]},
  {n:"Business",p:"Rp45.000",t:"Pengerjaan 1x24 jam",f:["CV (PDF)","Surat lamaran (Word)","Gabung PDF","Gratis: edit background foto, request file Word"]},
  {n:"Premium",p:"Rp50.000",t:"Pengerjaan 3 s.d 4 jam",f:["CV (PDF)","Surat lamaran (Word)","Gabung PDF","Gratis: edit background foto, request file Word, konsultasi"]}
];
var SERVICES = [
  ["Curriculum Vitae","25.000"],["Curriculum Vitae (custom)","30.000"],["Surat lamaran","15.000"],["Surat lamaran (custom)","25.000"],
  ["Edit background foto","10.000"],["Gabung PDF (<10 lembar)","10.000"],["Gabung PDF (>10 lembar)","15.000"],["Edit CV","15.000"],["Prioritas","20.000"]
];
/* =========================== */
