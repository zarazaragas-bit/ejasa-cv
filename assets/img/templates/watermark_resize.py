"""
Kecilkan dan beri watermark semua gambar template (CV-xxx.png dan CV-xxx-S.png).

Cara pakai:
1. Taruh file ini di folder yang sama dengan gambar template asli.
2. Buka terminal / Command Prompt di folder itu, lalu jalankan:  python watermark_resize.py
3. Hasilnya ada di folder "siap-upload". Unggah isi folder itu ke GitHub.
File asli TIDAK diubah. Foto.png, Post.png, dan file lain yang bukan CV-*.png dilewati.
"""
import os, sys
from PIL import Image, ImageDraw, ImageFont

# ===== PENGATURAN (boleh diubah) =====
WATERMARK_TEXT = "EJASA CV  @ejasa.cv"
LEBAR = 1000          # lebar hasil (px). Gambar yang lebih kecil tidak diperbesar.
OPACITY = 45          # 0-255, makin kecil makin tipis
SUDUT = 30            # kemiringan watermark (derajat)
UKURAN_FONT = 0.045   # tinggi huruf relatif terhadap lebar gambar
FOLDER_HASIL = "siap-upload"
# =====================================

def cari_font(ukuran):
    for nama in ("arialbd.ttf", "arial.ttf", "DejaVuSans-Bold.ttf", "DejaVuSans.ttf",
                 "/System/Library/Fonts/Supplemental/Arial Bold.ttf"):
        try:
            return ImageFont.truetype(nama, ukuran)
        except OSError:
            pass
    return ImageFont.load_default()

def watermark(img):
    w, h = img.size
    font = cari_font(max(14, int(w * UKURAN_FONT)))
    sisi = int((w * w + h * h) ** 0.5) + 40          # kanvas besar agar tertutup setelah diputar
    layer = Image.new("RGBA", (sisi, sisi), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    bbox = d.textbbox((0, 0), WATERMARK_TEXT, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    langkah_x, langkah_y = tw + int(tw * 0.5), th * 5
    baris = 0
    for y in range(0, sisi, langkah_y):
        geser = (langkah_x // 2) if baris % 2 else 0
        for x in range(-langkah_x, sisi, langkah_x):
            d.text((x + geser, y), WATERMARK_TEXT, font=font, fill=(90, 90, 90, OPACITY))
        baris += 1
    layer = layer.rotate(SUDUT, resample=Image.BICUBIC)
    kiri, atas = (sisi - w) // 2, (sisi - h) // 2
    layer = layer.crop((kiri, atas, kiri + w, atas + h))
    return Image.alpha_composite(img.convert("RGBA"), layer).convert("RGB")

def main():
    folder = os.path.dirname(os.path.abspath(__file__))
    hasil = os.path.join(folder, FOLDER_HASIL)
    os.makedirs(hasil, exist_ok=True)
    daftar = sorted(f for f in os.listdir(folder)
                    if f.lower().startswith("cv-") and f.lower().endswith(".png"))
    if not daftar:
        print("Tidak ada file CV-*.png di folder ini. Pastikan file ini ada di folder yang sama dengan gambar.")
        sys.exit(1)
    total_asli = total_baru = 0
    for nama in daftar:
        src = os.path.join(folder, nama)
        img = Image.open(src)
        if img.mode in ("RGBA", "LA", "P"):
            img = img.convert("RGBA")
            latar = Image.new("RGBA", img.size, (255, 255, 255, 255))
            img = Image.alpha_composite(latar, img)
        img = img.convert("RGB")
        if img.width > LEBAR:
            img = img.resize((LEBAR, round(img.height * LEBAR / img.width)), Image.LANCZOS)
        img = watermark(img)
        tujuan = os.path.join(hasil, nama)
        img.save(tujuan, "PNG", optimize=True)
        a, b = os.path.getsize(src), os.path.getsize(tujuan)
        total_asli += a; total_baru += b
        tanda = "  <-- masih besar" if b > 1_000_000 else ""
        print(f"{nama}: {a/1e6:.1f} MB -> {b/1e6:.2f} MB{tanda}")
    print(f"\nSelesai: {len(daftar)} file. Total {total_asli/1e6:.1f} MB -> {total_baru/1e6:.1f} MB")
    print(f'Unggah isi folder "{FOLDER_HASIL}" ke GitHub.')

if __name__ == "__main__":
    main()
