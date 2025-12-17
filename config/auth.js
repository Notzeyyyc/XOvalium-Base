import TelegramBot from "node-telegram-bot-api";
import { config } from "./config.js";
import chalk from "chalk";

export function connectbot() {
    const bot = new TelegramBot(config.telegram.token, {polling: true});
    console.log(chalk.blue("bot succes start"));
    return bot;
}