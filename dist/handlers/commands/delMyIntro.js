import database from "../../services/database.js";
export default async function autoReactHandler(ctx) {
    var _a, _b, _c;
    try {
        const userId = (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id;
        const userName = ((_b = ctx.from) === null || _b === void 0 ? void 0 : _b.username) || ((_c = ctx.from) === null || _c === void 0 ? void 0 : _c.first_name) || "Unknown User";
        if (!userId)
            return;
        const result = await database.deleteIntro(userId);
        if (!result) {
            await ctx.reply(`No intro found for ${userName} add your intro using /addmyintro`);
            return;
        }
        await ctx.reply(`Deleted intro  for ${userName} successfully`);
    }
    catch (error) {
        console.error("Error in autoReactHandler:", error);
        await ctx.reply("An unexpected error occurred. Please try again later.");
    }
}
