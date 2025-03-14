import database from "../../services/database.js";
export default async function startHandler(ctx) {
    var _a, _b;
    const userId = (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id;
    try {
        await database.saveUser(ctx.from);
    }
    catch (error) {
        console.error("Error saving user data:", error);
    }
    await ctx.reply("hello " + ((_b = ctx.from) === null || _b === void 0 ? void 0 : _b.first_name) + " /setmyintro");
}
