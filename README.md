<h1 align="center">INSTA AUTO</h1>

![INSTA](https://drive.google.com/uc?export=view&id=1qNBXzdFOMm9Cf_h07HVtuIsON_HJdKcX)<br>

# About
Instagram Auto API adalah script untuk mengunggah foto dan video ke Instagram secara otomatis menggunakan [`instagram-private-api`](https://github.com/dilame/instagram-private-api). Script ini memungkinkan Anda untuk login, menyimpan sesi, dan mengunggah media.

## Structure Project

    InstaAuto/
    │
    ├── Code/
    │ ├── Login.js
    │ ├── MediaSelection.js
    │ ├── UploadPhoto.js
    │ ├── UploadVideo.js
    │ ├── Schedule.js
    │ └── Config/
    │   └── DepreceatedHandler.js
    │
    ├── Database/
    │ ├── Media/
    │ │  ├── Photo.jpg/png (optional path)
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

3. **Setup Account** 

Tidak perlu membuat file Account.json secara manual.<br>
Script ini akan meminta Anda untuk memasukkan username dan password Instagram melalui interaksi di command line saat pertama kali dijalankan. Pastikan Anda mengikuti petunjuk yang diberikan saat diminta untuk memasukkan kredensial.<br>

4. **Usage**
    ```bash
   npm start

## Description Feature

Setelah login berhasil, Anda akan diminta untuk memilih jenis media yang ingin diunggah (Foto atau Video). Untuk media, Anda perlu memasukkan path lengkap file media pada saat diminta oleh script.<br>
<br>
Contoh path media:<br>
Untuk foto: `./Database/Media/Example.jpg`<br>
Untuk video: `./Database/Media/Example.mp4`<br>
<br>
Selain itu, Anda juga akan diminta untuk memasukkan caption untuk media yang diunggah.<br>
Setelah unggahan selesai, Anda akan ditanya apakah ingin mengupload media lain. Pilih "Ya" untuk mengupload media lain atau "Tidak" untuk keluar.

## Feature Update

Membuat `Schedule Update` yang akan mengatur Post dalam path dan caption yang di tentukan, dengan waktu yang di tentukan. 

## Contributing

Kami sangat menyambut pull request dari Anda! Jika Anda berencana melakukan perubahan besar, mohon untuk membuka sebuah issue terlebih dahulu agar kita dapat berdiskusi mengenai perubahan yang Anda inginkan.

Jangan lupa untuk memperbarui tes jika diperlukan. Terima kasih atas kontribusi Anda untuk membuat proyek ini lebih baik!


## License

[MIT](https://choosealicense.com/licenses/mit/)


## Support My Work

Jika kamu rasa ini bermanfaat, jangan lupa donasi aku yaa.

<div style="display: flex; align-items: center;">
  <a href="https://drive.google.com/uc?export=view&id=1imJW7vu16PpI2n5oahQB0GCAliMFGKAJ">
    <img src="https://drive.google.com/uc?export=view&id=1xau4ZmyMx_Az4sIRwBqSXlpe43wiwc8x" alt="Donate via QRIS" width="200" style="margin-right: 10px;"/>
  </a>
  <br>
  <strong>Scan QRIS Di Sini</strong>
</div>

## Contact
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:juw3nn@gmail.com)
[![Whatsapp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/6285155078806)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/juwennnn_)
