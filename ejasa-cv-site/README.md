# Ejasa CV - Halaman Pemesanan

Satu halaman statis: galeri template, paket dan harga, tombol WhatsApp, dan link Google Form. Tanpa server, tanpa build.

## Struktur

```
ejasa-cv-site/
├── index.html                  halaman utama
├── assets/
│   ├── css/style.css           tampilan (warna navy dan emas)
│   ├── js/config.js            YANG PERLU DIUBAH: nomor WA, form, template, harga
│   ├── js/app.js               logika halaman
│   └── img/templates/          taruh gambar template di sini
├── blogger/
│   ├── blogger-embed.html      untuk Blogger (disarankan)
│   └── blogger-inline.html     untuk Blogger (satu file)
├── .nojekyll
└── README.md
```

## Yang diubah di `assets/js/config.js`

- `WA_NUMBER`: nomor WhatsApp, format `62...` tanpa `+` atau `0`
- `FORM_URL` dan `FORM_TEMPLATE_ENTRY`: link Google Form dan kode `entry.xxxx` dari menu "Dapatkan link terisi otomatis"
- `IG_URL`: link Instagram
- `TEMPLATES`: daftar kode template. Untuk memakai gambar asli, tambahkan `img:"assets/img/templates/kode-001.jpg"`
- `PACKAGES` dan `SERVICES`: paket dan harga satuan

Tips gambar template: format JPG atau WebP, lebar sekitar 600 px, ukuran di bawah 150 KB, dan beri watermark tipis.

## Hosting di GitHub Pages (disarankan)

1. Buat repository baru di GitHub (public), misalnya `ejasa-cv`.
2. Unggah semua isi folder ini (bukan folder induknya) ke repository.
3. Buka Settings > Pages. Pada Source pilih "Deploy from a branch", branch `main`, folder `/ (root)`, lalu Save.
4. Tunggu 1-2 menit. Situs aktif di `https://USERNAME.github.io/ejasa-cv/`.
5. Pasang link itu di bio Instagram.

Setiap kali kamu mengubah file lalu commit, situs ikut terbarui.

## Hosting di Blogger

Blogger tidak menyimpan file CSS dan JS terpisah, jadi ada dua cara:

- **Embed (disarankan)**: host situs di GitHub Pages dulu, lalu tempel isi `blogger/blogger-embed.html` ke Halaman baru (mode Tampilan HTML) setelah mengganti USERNAME dan NAMA-REPO.
- **Satu file**: tempel isi `blogger/blogger-inline.html` ke Halaman baru (mode Tampilan HTML, bukan Tulis). Tema Blogger bisa ikut memengaruhi tampilan, jadi hasilnya terbaik di tema yang polos. Setiap ubah nomor WA atau harga, edit langsung di halaman itu.
