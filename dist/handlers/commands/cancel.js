import auth from "../../services/auth.js";
import memory from "./memory.js";
export default async function cancelHandler(ctx) {
    var _a;
    const userId = (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id;
    if (auth.isAdmin(userId ? userId : 0)) {
        await ctx.reply("hello " + "canceled");
        memory.set(false);
        ctx.reply("memory was true, now set to:" + "false");
    }
    return;
}
