import { Scenes, Telegraf } from "telegraf";
import env from "./env.js";

class Telegram {
  app: Telegraf<Scenes.WizardContext>;

  messages: Map<number, number[]>;
  waitingMessageId: number;
  waitingMessageTimeout: NodeJS.Timeout;
  firstWaitingMessage: boolean;
  inviteLinks: Map<number, string>;

  constructor() {
    this.app = new Telegraf<Scenes.WizardContext>(env.token);
    this.messages = new Map();
    this.waitingMessageId = NaN;
    this.waitingMessageTimeout = setTimeout(() => {});
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
