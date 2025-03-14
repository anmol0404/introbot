import { Telegraf } from "telegraf";
import env from "./env.js";
class Telegram {
    constructor() {
        this.app = new Telegraf(env.token);
        this.messages = new Map();
        this.waitingMessageId = NaN;
        this.waitingMessageTimeout = setTimeout(() => { });
        this.firstWaitingMessage = true;
        this.inviteLinks = new Map();
    }
    async initialize() {
        await this.app.telegram.setMyCommands([
            {
                command: "start",
                description: "start bot",
            },
            {
                command: "/addmyintro",
                description: "Admin Command",
            },
            {
                command: "/deletemyintro",
                description: "Admin Command",
            },
        ]);
    }
}
const telegram = new Telegram();
export default telegram;
