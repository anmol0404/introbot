import { Markup } from "telegraf";
export declare function getCallbackInlineKeyboard(): Markup.Markup<import("@telegraf/types").InlineKeyboardMarkup>;
export declare function getUrlInlineKeyboard(): Markup.Markup<import("@telegraf/types").InlineKeyboardMarkup>;
export declare function getRemoveKeyboardMarkup(): Markup.Markup<import("@telegraf/types").ReplyKeyboardRemove>;
export declare function getReplyKeyboardWithRowWidth(): Markup.Markup<import("@telegraf/types").ReplyKeyboardMarkup>;
export declare function getMixedButtonsInlineKeyboard(movieList: Array<{
    title: string;
    description: string;
    imageUrl: string;
}>): Markup.Markup<import("@telegraf/types").InlineKeyboardMarkup>;
export declare function getSwitchToCurrentChatInlineKeyboard(): Markup.Markup<import("@telegraf/types").InlineKeyboardMarkup>;
