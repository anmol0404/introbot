import database from "../../services/database.js";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import getDramadata from "./aIODocument.js";
import telegram from "../../services/telegram.js";
import memory from "../../handlers/commands/memory.js";
import { getDramaInfo, searchDramas } from "../../utils/apiservice.js";
let jsonData;
(async () => {
    try {
        const data = await fs.promises.readFile("updated.json", "utf8");
        jsonData = JSON.parse(data);
    }
    catch (err) {
        console.error("Error reading or parsing JSON:", err);
    }
})();
async function start(ctx) {
    ctx.session.messageIds = [];
    ctx.session.captions = [];
    ctx.session.done = false;
    ctx.session.posterDone = false;
    ctx.session.aIOPosterID = "";
    ctx.session.sentBy = ctx.from.id;
    memory.set(true);
    if (ctx.message && "text" in ctx.message && ctx.message.text === "/cancel") {
        await ctx.reply("Share AIO Canceled start again /nxt");
        return await ctx.scene.leave();
    }
    if (ctx.message && "text" in ctx.message) {
        const text = ctx.message.text;
        if (text.startsWith("/nxt")) {
            const tracker = await database.createOrUpdateTracker();
            try {
                await ctx.reply(`\`\n${jsonData[tracker.counter].detail.slice(0, 1024)}\n\``, {
                    parse_mode: "Markdown",
                });
            }
            catch (error) {
                console.error("Error replying with detail:", error);
                await ctx.scene.leave();
            }
        }
        return ctx.wizard.next();
    }
    else {
        await ctx.reply("try again /nxt");
        await ctx.scene.leave();
    }
}
async function handleText(ctx) {
    memory.set(true);
    if (ctx.message && "text" in ctx.message && ctx.message.text === "/cancel") {
        await ctx.reply("Share AIO Canceled start again /nxt");
        return await ctx.scene.leave();
    }
    if (ctx.message && "text" in ctx.message) {
        const text = ctx.message.text;
        const result = await searchDramas(text);
        if (result && Array.isArray(result.results.dramas)) {
            const dramas = result.results.dramas.slice(0, 10);
            await ctx.reply(`\`\`\`\n${"choose"}\n\`\`\``, {
                reply_markup: makeButtons(dramas),
                parse_mode: "MarkdownV2",
            });
            console.log(JSON.stringify(dramas, null, 2));
        }
        else {
            console.error("Error: `dramas` is undefined or not an array.");
            ctx.reply("No dramas found or an error occurred during search.");
        }
        if (text.startsWith("/nxt")) {
            const tracker = await database.createOrUpdateTracker();
            try {
                await ctx.reply(`\`\n${jsonData[tracker.counter].detail}\n\``, {
                    parse_mode: "Markdown",
                });
            }
            catch (error) {
                console.error("Error replying with detail:", error);
                await ctx.scene.leave();
            }
        }
        return ctx.wizard.next();
    }
    else {
        await ctx.reply("try again /nxt");
        await ctx.scene.leave();
    }
}
async function done(ctx) {
    if (ctx.session.sentBy !== ctx.from.id) {
        await ctx.answerCbQuery(`bkwas n kr bich me `, {
            show_alert: true,
            cache_time: 2,
        });
    }
    else {
        if ("data" in ctx.callbackQuery && ctx.callbackQuery.data.startsWith("cancel")) {
            await ctx.reply("Canceled start again /nxt");
            memory.set(false);
            return await ctx.scene.leave();
        }
        if (ctx.callbackQuery &&
            "data" in ctx.callbackQuery &&
            ctx.callbackQuery.data !== "done" &&
            ctx.callbackQuery.data !== "cancel") {
            if ("data" in ctx.callbackQuery) {
                const data = ctx.callbackQuery.data;
                console.log("data", data);
                const dramaDetails = await getDramaInfo(data);
                ctx.session.allData = JSON.stringify(dramaDetails.data, null, 2);
                const aioData = extractData(dramaDetails.data);
                try {
                    let photo = await getPhotoUrlFromWebPage(dramaDetails.data.poster);
                    if (photo) {
                        ctx.session.aIOPosterID = photo;
                    }
                    else {
                        await ctx.reply("Invalid, try again /nxt");
                        memory.set(false);
                        ctx.session.posterDone = false;
                        return await ctx.scene.leave();
                    }
                }
                catch (error) {
                    await ctx.reply("Invalid, try again /nxt");
                    ctx.session.posterDone = false;
                    memory.set(false);
                    return await ctx.scene.leave();
                }
                ctx.session.data = aioData;
                await ctx.replyWithPhoto(dramaDetails.data.poster, {
                    caption: `${JSON.stringify(aioData, null, 2)}`.slice(0, 1024),
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "Done 👌", callback_data: "done" }],
                            [{ text: "Cancel ❌", callback_data: "cancel" }],
                        ],
                    },
                });
            }
        }
        else if ("data" in ctx.callbackQuery && ctx.callbackQuery.data.startsWith("done")) {
            const dataFromSession = ctx.session.data;
            const tracker = await database.createOrUpdateTracker();
            const item = jsonData.find((item) => tracker.counter + 1 === item.counter);
            if (item && dataFromSession) {
                item.title = `${dataFromSession.title} || ${dataFromSession.alsoKnownAs.toString()} || ${dataFromSession.year}`;
                item.year = dataFromSession.year;
                item.type = dataFromSession.type;
                item.relatedContent = dataFromSession.relatedContent;
                item.genres = dataFromSession.genres || item.genres;
                item.country = dataFromSession.country;
                item.aired = dataFromSession.aired;
                item.duration = dataFromSession.duration;
                item.detail =
                    item.detail +
                        "data:\n" +
                        JSON.stringify(ctx.session.allData, null, 2);
                item.whereToWatch = dataFromSession.whereToWatch;
                item.plot = dataFromSession.plot;
                item.rating = dataFromSession.contentRating;
                item.score = dataFromSession.score;
                item.screenwriter = dataFromSession.screenwriter;
                item.director = dataFromSession.director;
                item.totalEpisodes = dataFromSession.episodes;
                item.posterUrl = ctx.session.aIOPosterID;
                if (item.year === 0 || !item.title) {
                    await ctx.reply("Invalid, try again copy and send ");
                    return;
                }
                const data = await getDramadata(item);
                const shareId = data ? await database.saveAIO(data) : null;
                if (shareId) {
                    memory.set(false);
                    try {
                        await telegram.app.telegram.sendMessage(ctx.chat.id, `\`\`\`counter: ${jsonData[tracker.counter].counter}${JSON.stringify(data || "error", null, 2).slice(0, 1000)}\`\`\``, {
                            parse_mode: "Markdown",
                        });
                        await ctx.reply("below above saved, add next /nxt");
                        await database.createOrUpdateTracker((tracker === null || tracker === void 0 ? void 0 : tracker.counter) + 1);
                        ctx.session.posterDone = false;
                        await ctx.scene.leave();
                    }
                    catch (error) {
                        console.error("Error sending log:", error);
                    }
                }
            }
            else {
                await ctx.reply("data not found /nxt");
                memory.set(false);
                await ctx.scene.leave();
            }
            return await ctx.scene.leave();
        }
        else {
            await ctx.reply("wrong input try again  /nxt");
            memory.set(false);
            await ctx.scene.leave();
        }
    }
}
export async function getPhotoUrlFromWebPage(link) {
    let photoUrl = "";
    try {
        const result = await cloudinary.uploader.upload(link, {
            folder: "dramorld",
        });
        console.log(result.secure_url);
        photoUrl = result.secure_url;
    }
    catch (error) {
        console.error("Error uploading photo to Cloudinary:", error);
        return "";
    }
    return photoUrl;
}
const extractData = (data) => {
    var _a;
    return {
        title: data.title,
        year: Number(((_a = data.complete_title.match(/\((\d{4})\)/)) === null || _a === void 0 ? void 0 : _a[1]) || 0),
        relatedContent: data.others.related_content ? data.others.tags : [],
        alsoKnownAs: data.others.also_known_as,
        genres: data.others.genres,
        country: data.details.country,
        type: data.details.type,
        episodes: Number(data.details.episodes),
        aired: data.details.aired || data.details.release_date || "not found",
        duration: data.details.duration,
        director: data.others.director ? String(data.others.director) : "Unknown Director",
        screenwriter: data.others.director ? String(data.others.screenwriter) : "Unknown Director",
        score: data.rating,
        contentRating: data.details.content_rating,
        plot: data.synopsis,
        whereToWatch: [{ platform: data.details.original_network, type: "" }],
    };
};
// Function to create buttons with `caption` and `slug` in `callback_data`
export const makeButtons = (items) => {
    return {
        inline_keyboard: createBatchOfButtons(items),
    };
};
function createBatchOfButtons(items) {
    const buttonsBatch = [];
    items.forEach((item) => {
        const button = {
            text: convertToTinySubscript(`${item.title.slice(0, 24)} , ${item.year} , ${item.series} , ${item.type}`
                .toLowerCase()
                .trim()
                .replace("episodes", "EP")
                .replace("movie", "MOV")
                .replace("series", "SER")
                .replace("chinese", "CH")
                .replace("korean", "KO")),
            callback_data: item.slug,
        };
        buttonsBatch.push([button]);
    });
    buttonsBatch.push([{ text: "Cancel This Search", callback_data: "cancel" }]);
    return buttonsBatch;
}
function convertToTinySubscript(inputText) {
    const subscriptMapping = {
        // Letters
        a: "ᴀ",
        b: "ʙ",
        c: "ᴄ",
        d: "ᴅ",
        e: "ᴇ",
        f: "ғ",
        g: "ɢ",
        h: "ʜ",
        i: "ɪ",
        j: "ᴊ",
        k: "ᴋ",
        l: "ʟ",
        m: "ᴍ",
        n: "ɴ",
        o: "ᴏ",
        p: "ᴘ",
        q: "ǫ",
        r: "ʀ",
        s: "s",
        t: "ᴛ",
        u: "ᴜ",
        v: "ᴠ",
        w: "ᴡ",
        x: "x",
        y: "ʏ",
        z: "ᴢ",
        // 0: "₀",
        // 1: "₁",
        // 2: "₂",
        // 3: "₃",
        // 4: "₄",
        // 5: "₅",
        // 6: "₆",
        // 7: "₇",
        // 8: "₈",
        // 9: "₉",
    };
    let tinySubscriptText = "";
    for (let char of inputText.toLowerCase()) {
        tinySubscriptText += subscriptMapping[char] || char;
    }
    return tinySubscriptText.replace(/[()\[\]\+\-]/g, " ").trim();
}
export { start, done, handleText };
