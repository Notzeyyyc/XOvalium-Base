import { makeWASocket, useMultiFileAuthState, DisconnectReason } from '@rexxhayanasi/elaina-baileys';
import pino from 'pino';
import QRCode from 'qrcode';

import { waHandler } from './wa_handler.js';

export const sessions = new Map();

export async function connectToWhatsApp(bot, chatId, phoneNumber = null, sessionName = 'default') {
    const authFolder = sessionName === 'default' ? 'auth_info_baileys' : `auth_info_baileys_${sessionName}`;
    const { state, saveCreds } = await useMultiFileAuthState(authFolder);

    console.log(`Starting Baileys connection for session: ${sessionName}...`);

    const sock = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: !phoneNumber, 
        auth: state,
        browser: ["Ubuntu", "Chrome", "20.0.04"], // Standard browser config often helps
        markOnlineOnConnect: true
    });

    sessions.set(sessionName, sock);

    // Call the Message Handler
    sock.ev.on('messages.upsert', async (m) => {
        await waHandler(sock, m);
    });

    // Request Pairing Code Logic
    if (phoneNumber && !sock.authState.creds.registered) {
        console.log(`Requesting pairing code for ${phoneNumber} in session ${sessionName}...`);
        
        // Wait briefly for init
        setTimeout(async () => {
            try {
                // Ensure number is a string and formatted
                const code = await sock.requestPairingCode(phoneNumber);
                console.log(`Pairing Code Generated: ${code}`);
                
                const formattedCode = code?.match(/.{1,4}/g)?.join("-") || code;

                try {
                    await bot.sendMessage(chatId, `🔐 *Kode Pairing (${sessionName}):*\n\`\`\`${formattedCode}\`\`\`\n\n1. Buka WhatsApp di HP\n2. Menu > Linked Devices > Link a Device\n3. Tap "Link with phone number instead"\n4. Masukkan kode di atas.`, { parse_mode: 'Markdown' });
                    console.log("Pairing code message sent successfully!");
                } catch (msgErr) {
                    console.error("Failed to send pairing code message:", msgErr);
                    await bot.sendMessage(chatId, `Kode Pairing: ${code}`);
                }
            } catch (err) {
                console.error("Failed to request pairing code:", err);
                bot.sendMessage(chatId, `❌ Gagal meminta Pairing Code: ${err.message}. Pastikan nomor HP benar (tanpa +, contoh: 62812345).`);
            }
        }, 3000);
    }

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr && !phoneNumber) {
            console.log(`QR Code received for session ${sessionName}, generating image...`);
            try {
                const buffer = await QRCode.toBuffer(qr);
                await bot.sendPhoto(chatId, buffer, { caption: `📱 Scan QR Code ini untuk menghubungkan bot (Sesi: ${sessionName})!` });
            } catch (err) {
                console.error("Failed to send QR:", err);
                bot.sendMessage(chatId, "Gagal mengirim QR Code gambar. Cek terminal.");
            }
        }

        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log(`Session ${sessionName} connection closed due to `, lastDisconnect?.error, ', reconnecting ', shouldReconnect);
            if (shouldReconnect) {
                connectToWhatsApp(bot, chatId, phoneNumber, sessionName);
            } else {
                bot.sendMessage(chatId, `Sesi WhatsApp ${sessionName} terputus (Logged Out). Silakan hubungkan ulang.`);
                sessions.delete(sessionName);
            }
        } else if (connection === 'open') {
            console.log(`Opened connection for session ${sessionName}`);
            bot.sendMessage(chatId, `✅ Berhasil terhubung ke WhatsApp (Sesi: ${sessionName})!\n\nBot siap digunakan.`);
        }
    });

    sock.ev.on('creds.update', saveCreds);
    
    return sock;
}
