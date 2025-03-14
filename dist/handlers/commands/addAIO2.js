import auth from "../../services/auth.js";
import memory from "./memory.js";
export default async function addAIOHandler(ctx) {
    var _a;
    const userId = (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id;
    if (!auth.isAdmin(userId ? userId : 0)) {
        return ctx.reply("only admin can ");
    }
    else if (memory.get()) {
        return ctx.reply("it is in use by an other admin");
    }
    else {
        memory.set(true);
        await await ctx.scene.enter("add2");
    }
}
