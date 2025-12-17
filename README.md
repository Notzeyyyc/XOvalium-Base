# XOVALIUM Dashboard & WhatsApp Bot

XOVALIUM is a powerful WhatsApp userbot coupled with a modern web dashboard for monitoring, administration, and execution of special tools.

## 🌟 Features

- **Live Web Dashboard**: Monitor chat logs in real-time.
- **Multi-Session Support**: Connect multiple WhatsApp numbers.
- **Crash Tools (Danger Zone)**: Execute specific payloads via web interface.
- **VIP System**: sophisticated access control allowing only VIP users to access the dashboard.
- **Admin Panel**: Secure panel to manage VIP users.
- **Mobile Responsive**: Beautiful interface optimized for both desktop and mobile.

## 🛠️ Installation

1.  **Clone/Download the repository**
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Start the Server**:
    ```bash
    npm start
    ```

## 🚀 Usage

### 1. Web Dashboard

Open your browser and navigate to:

```
http://localhost:3000
```

- **Login**: Enter your VIP Access Code (Phone Number) or Admin Password.
- **Live Logs**: View bot interactions in real-time.
- **Crash Tools**: Send specific payloads to targets.

### 2. Admin Panel

Access the secret admin panel at:

```
http://localhost:3000/admin.html
```

- **Default Admin Password**: `admin` (Change this in `index.js` for security!)
- **Manage VIPs**: Add or remove users who are allowed to access the dashboard.

### 3. WhatsApp Connection

- **Connect via Pairing Code**:
  Open Telegram or Terminal logs to see the pairing code when connecting a new session.
  Command: `/connect <number> <sessionName>` (via Telegram if configured) or automatic pairing via logs.

## ⚠️ Disclaimer

This tool is for educational purposes only. Use responsibly. The developer is not responsible for any misuse.
