# INSTA AUTO
![INSTA](https://drive.google.com/uc?export=view&id=1qNBXzdFOMm9Cf_h07HVtuIsON_HJdKcX)<br>
Instagram Auto API adalah script untuk mengunggah foto dan video ke Instagram secara otomatis menggunakan [`instagram-private-api`](https://github.com/dilame/instagram-private-api). Script ini memungkinkan Anda untuk login, menyimpan sesi, dan mengunggah media.

## Struktur Project

    InstaAuto/
    │
    ├── Code/
    │ ├── Login.js
    │ ├── MediaSelection.js
    │ ├── UploadPhoto.js
    │ └── UploadVideo.js
    │
    ├── Database/
    │ ├── Media/
    │ │  ├── Photo.jpg (optional path)
    │ │  └── Video.mp4 (optional path)
    │ ├── Account.json
    │ └── Session.json (added if login)
    │
    ├── node_modules/ 
    │  └── (added if installed)
    │
    ├── Index.js
    ├── LICENSE
    └── README.md



## Instalasi

1. **Clone Repository**

   ```bash
   git clone https://github.com/juwenaja/InstaAuto.git
   cd InstaAuto

2. **Install Dependencies**
   ```bash
   npm install

3. **Setup Akun** 

Tidak perlu membuat file Account.json secara manual.<br>
Script ini akan meminta Anda untuk memasukkan username dan password Instagram melalui interaksi di command line saat pertama kali dijalankan. Pastikan Anda mengikuti petunjuk yang diberikan saat diminta untuk memasukkan kredensial.<br>

4. **Menjalankan Script**
    ```bash
   npm start

## Final

Setelah login berhasil, Anda akan diminta untuk memilih jenis media yang ingin diunggah (Foto atau Video). Untuk media, Anda perlu memasukkan path lengkap file media pada saat diminta oleh script.<br>
<br>
Contoh path media:<br>
Untuk foto: `./Database/Media/Example.jpg`<br>
Untuk video: `./Database/Media/Example.mp4`<br>
<br>
Selain itu, Anda juga akan diminta untuk memasukkan caption untuk media yang diunggah.<br>
Setelah unggahan selesai, Anda akan ditanya apakah ingin mengupload media lain. Pilih "Ya" untuk mengupload media lain atau "Tidak" untuk keluar.


## Contact
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:juw3nn@gmail.com)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/6285155078806)
