import { WizardContext } from "telegraf/typings/scenes";
export default function autoReactHandler(ctx: WizardContext): Promise<void>;
export declare function hasReplyToMessage(message: any): message is {
    reply_to_message: any;
};
export declare function isTextMessage(message: any): message is {
    text: string;
};
