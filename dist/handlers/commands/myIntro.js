import database from "../../services/database.js";
import telegram from "../../services/telegram.js";
import env from "../../services/env.js";
export default async function autoReactHandler(ctx) {
    var _a, _b, _c;
    try {
        const userId = (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id;
        const userName = ((_b = ctx.from) === null || _b === void 0 ? void 0 : _b.username) || ((_c = ctx.from) === null || _c === void 0 ? void 0 : _c.first_name) || "Unknown User";
        if (!hasReplyToMessage(ctx.message)) {
            await ctx.reply("Reply to the message of the user to whom you want to introduce yourself.");
            return;
        }
        const replyToMessage = ctx.message.reply_to_message.message_id;
        if (!userId)
            return;
        const userIntro = await database.getIntroMessages(userId);
        try {
            const chat = await ctx.getChat();
            if (chat.type === "private") {
                await ctx.reply("This command does not work in private chats.");
                return;
            }
            if (userIntro) {
                await telegram.app.telegram.copyMessage(chat.id, env.dbPosterID, userIntro, {
                    reply_parameters: { message_id: replyToMessage },
                    parse_mode: "Markdown",
                });
                return;
            }
            else {
                await ctx.reply(`No intro found for ${userName} add your intro using /addmyintro`);
            }
        }
        catch (error) {
            console.error("Error copying message:", error);
        }
        const args = isTextMessage(ctx.message) ? ctx.message.text.split(" ") : null;
    }
    catch (error) {
        console.error("Error in autoReactHandler:", error);
        await ctx.reply("An unexpected error occurred. Please try again later.");
    }
}
export function hasReplyToMessage(message) {
    return message && message.reply_to_message !== undefined;
}
export function isTextMessage(message) {
    return message && typeof message.text === "string";
}
