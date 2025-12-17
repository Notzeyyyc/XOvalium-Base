# XOVALIUM Bot 🚀

XOVALIUM adalah bot hybrid WhatsApp & Telegram canggih yang dibangun menggunakan Node.js. Bot ini memungkinkan Anda untuk mengelola beberapa sesi WhatsApp sekaligus (Multi-Session) melalui antarmuka Telegram yang mudah digunakan.

## ✨ Fitur Utama

- **Multi-Session Support**: Kelola banyak nomor WhatsApp dalam satu bot.
- **Telegram Control Panel**: Kontrol penuh bot WhatsApp via Telegram.
- **Crash / Spam Fitur**: Alat pengujian beban (load testing) untuk WhatsApp (Gunakan dengan bijak!).
- **DeepSeek AI Integration**: Tanya jawab dengan AI cerdas (support model DeepSeek/Mistral via OpenRouter).
- **Pairing Code**: Login WhatsApp tanpa scan QR, cukup pakai kode pairing.
- **Realtime Logs**: Pantau aktivitas bot langsung dari terminal atau Telegram.

## 🛠️ Instalasi

Pastikan Anda sudah menginstall [Node.js](https://nodejs.org/) dan [Git](https://git-scm.com/).

1.  **Clone Repository**

    ```bash
    git clone https://github.com/Notzeyyyc/XOvalium-Base.git
    cd XOvalium-Base
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    ```

3.  **Konfigurasi**
    Edit file `config/config.js` dan masukkan token Telegram Bot anda.

    ```javascript
    export const config = {
      telegram: {
        token: "TOKEN_TELEGRAM_BOT_KAMU",
        apiUrl: "https://api.telegram.org",
      },
      // ...
    };
    ```

4.  **Jalankan Bot**
    ```bash
    npm start
    ```

## 📱 Cara Penggunaan

Setelah bot berjalan:

1.  Buka bot Telegram Anda.
2.  Ketik `/start` untuk melihat menu utama.
3.  **Hubungkan WhatsApp**:
    - Ketik `/connect <nomor_hp> <nama_sesi>`
    - Contoh: `/connect 628123456789 session1`
    - Masukkan kode pairing yang muncul di Telegram ke WhatsApp Anda.
4.  **Cek Sesi**: Ketik `/sessions` untuk melihat daftar nomor yang terhubung.
5.  **Multi-Session Spam/Test**:
    - `/crash <target> <jumlah> [mode]`
    - Mode 1: Single Session (Satu nomor mengirim pesan)
    - Mode 2: Multi Session (Semua nomor mengirim pesan serentak 😈)

## ⚠️ Disclaimer

Project ini dibuat untuk tujuan **EDUKASI** dan **PENGUJIAN KEAMANAN** saja. Pengembang tidak bertanggung jawab atas penyalahgunaan alat ini. Gunakan dengan risiko Anda sendiri (DWYOR).

## 🤝 Kontribusi

Pull Request sangat diterima! Silakan fork repository ini dan kirimkan fitur terbaik Anda.

## 📄 Lisensi

ISC
