import telegram from "../../services/telegram.js";
import { createThumbnail } from "../../utils/helper.js";
import env from "../../services/env.js";
import database from "../../services/database.js";
// Type guard to check if a message has a text property
function isTextMessage(message) {
    return "text" in message;
}
async function start(ctx) {
    await ctx.reply("Send your full name (Cancel anytime with /cancel)");
    ctx.wizard.next();
}
async function handleFullName(ctx) {
    if (ctx.message && isTextMessage(ctx.message)) {
        if (ctx.message.text.startsWith("/cancel")) {
            await ctx.reply("Cancelled. Try again with /addmyintro");
            return ctx.scene.leave();
        }
        ctx.session.fullName = ctx.message.text;
        await ctx.reply("Send your location (e.g., India)");
        ctx.wizard.next();
    }
}
async function handleLocation(ctx) {
    if (ctx.message && isTextMessage(ctx.message)) {
        if (ctx.message.text.startsWith("/cancel")) {
            await ctx.reply("Cancelled. Try again with /addmyintro");
            return ctx.scene.leave();
        }
        ctx.session.from = ctx.message.text;
        await ctx.reply("Send your age (e.g., 18)");
        ctx.wizard.next();
    }
}
async function handleAge(ctx) {
    if (ctx.message && isTextMessage(ctx.message)) {
        if (ctx.message.text.startsWith("/cancel")) {
            await ctx.reply("Cancelled. Try again with /addmyintro");
            return ctx.scene.leave();
        }
        const age = Number(ctx.message.text);
        if (!isNaN(age)) {
            ctx.session.age = age.toString();
            await ctx.reply("Send your profession (e.g., Developer)");
            ctx.wizard.next();
        }
        else {
            await ctx.reply("Invalid age! Please enter a valid number.");
        }
    }
}
async function handleProfession(ctx) {
    if (ctx.message && isTextMessage(ctx.message)) {
        if (ctx.message.text.startsWith("/cancel")) {
            await ctx.reply("Cancelled. Try again with /addmyintro");
            return ctx.scene.leave();
        }
        ctx.session.profession = ctx.message.text;
        await ctx.reply("Send your field of study (e.g., Computer Science)");
        ctx.wizard.next();
    }
}
async function handleStudy(ctx) {
    if (ctx.message && isTextMessage(ctx.message)) {
        if (ctx.message.text.startsWith("/cancel")) {
            await ctx.reply("Cancelled. Try again with /addmyintro");
            return ctx.scene.leave();
        }
        ctx.session.study = ctx.message.text;
        await ctx.reply("Write a short bio about yourself.");
        ctx.wizard.next();
    }
}
async function handleBio(ctx) {
    if (ctx.message && isTextMessage(ctx.message)) {
        if (ctx.message.text.startsWith("/cancel")) {
            await ctx.reply("Cancelled. Try again with /addmyintro");
            return ctx.scene.leave();
        }
        ctx.session.bio = ctx.message.text;
        await ctx.reply("Send a Background picture.");
        ctx.wizard.next();
    }
}
async function handleBgImg(ctx) {
    if (ctx.message && isTextMessage(ctx.message)) {
        await ctx.reply("Cancelled. Try again with /addmyintro");
        return ctx.scene.leave();
    }
    if (ctx.message && "photo" in ctx.message) {
        const { file_id } = ctx.message.photo.pop();
        const webPhotoUrl = await getUrlFromFileId(file_id);
        ctx.session.bgImage = webPhotoUrl;
        await ctx.reply("Send Main Image Now");
        ctx.wizard.next();
    }
    else {
        await ctx.reply("You need to send an image.", { parse_mode: "MarkdownV2" });
    }
}
async function handleMainImg(ctx) {
    var _a, _b, _c;
    if (ctx.message && isTextMessage(ctx.message)) {
        await ctx.reply("Cancelled. Try again with /addmyintro");
        return ctx.scene.leave();
    }
    if (ctx.message && "photo" in ctx.message) {
        const { file_id } = ctx.message.photo.pop();
        const webPhotoUrl = await getUrlFromFileId(file_id);
        const username = ((_a = ctx.from) === null || _a === void 0 ? void 0 : _a.username) || "not yet set";
        const { fullName, bio, age, profession, study, bgImage, from } = ctx.session;
        if (bgImage && fullName && bio && age && profession && study && from) {
            const buffer = await createThumbnail((_b = ctx.from) === null || _b === void 0 ? void 0 : _b.id.toString(), bgImage, webPhotoUrl, fullName, from, bio, age, profession, study, username);
            if (buffer) {
                await ctx.replyWithPhoto({ source: buffer });
                const result = await telegram.app.telegram.sendPhoto(env.dbPosterID, {
                    source: buffer,
                });
                if (result) {
                    const { message_id } = result;
                    await database.saveIntro({
                        userId: (_c = ctx.from) === null || _c === void 0 ? void 0 : _c.id,
                        fullName,
                        bio,
                        age,
                        profession,
                        study,
                        from,
                        imageId: message_id,
                        knownLanguages: [],
                        skills: [],
                        hobbies: [],
                    });
                }
            }
            else {
                await ctx.reply("Error generating image.");
                return ctx.scene.leave();
            }
        }
        else {
            await ctx.reply("Missing required details.");
            return ctx.scene.leave();
        }
        ctx.wizard.next();
    }
    else {
        await ctx.reply("You need to send an image.", { parse_mode: "MarkdownV2" });
    }
}
export { start, handleFullName, handleLocation, handleAge, handleProfession, handleStudy, handleBio, handleBgImg, handleMainImg, };
export const getUrlFromFileId = async (fileId) => {
    const link = await telegram.app.telegram.getFileLink(fileId);
    return link.toString();
};
