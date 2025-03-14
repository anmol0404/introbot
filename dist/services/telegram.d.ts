/// <reference types="node" />
import { Scenes, Telegraf } from "telegraf";
declare class Telegram {
    app: Telegraf<Scenes.WizardContext>;
    messages: Map<number, number[]>;
    waitingMessageId: number;
    waitingMessageTimeout: NodeJS.Timeout;
    firstWaitingMessage: boolean;
    inviteLinks: Map<number, string>;
    constructor();
    initialize(): Promise<void>;
}
declare const telegram: Telegram;
export default telegram;
