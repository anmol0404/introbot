import database from "../../services/database.js";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import getDramadata from "./aIODocument.js";
import telegram from "../../services/telegram.js";
import env from "../../services/env.js";
import memory from "../../handlers/commands/memory.js";
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
    memory.set(true);
    if (ctx.message && "text" in ctx.message && ctx.message.text === "/cancel") {
        await ctx.reply("Share AIO Canceled start again /apd");
        return await ctx.scene.leave();
    }
    if (ctx.message && "text" in ctx.message) {
        const text = ctx.message.text;
        if (text.startsWith("/apd")) {
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
        await ctx.reply("try again /apd");
        await ctx.scene.leave();
    }
}
async function poster(ctx) {
    var _a;
    if (ctx.message && "text" in ctx.message) {
        if ((ctx.message && "text" in ctx.message && ctx.message.text === "/cancel") ||
            ctx.message.text.toLowerCase() === "done") {
            await ctx.reply("Share AIO Canceled start again /apd");
            memory.set(false);
            return await ctx.scene.leave();
        }
        if (!ctx.session.posterDone) {
            ctx.session.posterDone = true;
            console.log("Preview URL:", ctx.message);
            const previewUrl = (_a = ctx.message.link_preview_options) === null || _a === void 0 ? void 0 : _a.url;
            if (previewUrl) {
                console.log("Preview URL:", previewUrl);
                try {
                    let photo = await getPhotoUrlFromWebPage(previewUrl);
                    if (photo) {
                        ctx.session.aIOPosterID = photo;
                        ctx.reply("Image uploaded successfully. now copy above message and paste for detail");
                    }
                    else {
                        await ctx.reply("Invalid, try again /apd");
                        memory.set(false);
                        ctx.session.posterDone = false;
                        return await ctx.scene.leave();
                    }
                }
                catch (error) {
                    await ctx.reply("Invalid, try again /apd");
                    ctx.session.posterDone = false;
                    memory.set(false);
                    return await ctx.scene.leave();
                }
            }
            else {
                await ctx.reply("Invalid, try again /apd");
                ctx.session.posterDone = false;
                memory.set(false);
                return await ctx.scene.leave();
            }
        }
        if (ctx.session.aIOPosterID) {
            return ctx.wizard.next();
        }
        else {
            await ctx.reply("/canceled, Invalid, try again /apd");
            memory.set(false);
            await ctx.scene.leave();
        }
    }
    else {
        await ctx.reply("/canceled, Invalid, try again /apd");
        memory.set(false);
        await ctx.scene.leave();
    }
}
async function done(ctx) {
    if (ctx.message && "text" in ctx.message) {
        const text = ctx.message.text ? ctx.message.text.replace(/[:：]/g, "").trim() : "";
        const text2 = ctx.message.text;
        console.log("text", text);
        if ((ctx.message && "text" in ctx.message && ctx.message.text === "/cancel") ||
            ctx.message.text.toLowerCase() === "done") {
            await ctx.reply("Share AIO Canceled start again /apd");
            memory.set(false);
            return await ctx.scene.leave();
        }
        const dataFromText = extractData(text);
        const tracker = await database.createOrUpdateTracker();
        const item = jsonData.find((item) => (tracker === null || tracker === void 0 ? void 0 : tracker.counter) + 1 === item.counter);
        if (item) {
            item.title = `${dataFromText.title} || ${dataFromText.alsoKnownAs.toString()} || ${dataFromText.year}`;
            item.year = dataFromText.year;
            item.type = dataFromText.type;
            item.relatedContent = dataFromText.relatedContent;
            item.genres = dataFromText.genres || item.genres;
            item.country = dataFromText.country;
            item.aired = dataFromText.aired;
            item.duration = dataFromText.duration;
            item.detail = item.detail + "\n" + text2;
            item.whereToWatch = dataFromText.whereToWatch;
            item.plot = dataFromText.plot;
            item.rating = dataFromText.contentRating;
            item.score = dataFromText.score;
            item.screenwriter = dataFromText.screenwriter;
            item.director = dataFromText.director;
            item.totalEpisodes = dataFromText.episodes;
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
                    await ctx.reply("below Data saved, add next /apd");
                    await telegram.app.telegram.sendMessage(env.toLog, `\`\`\`counter: ${jsonData[tracker.counter].counter}${JSON.stringify(data || "error", null, 2).slice(0, 1000)}\`\`\``, {
                        parse_mode: "Markdown",
                    });
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
            await ctx.reply("data not found /apd");
            memory.set(false);
            await ctx.scene.leave();
        }
    }
    else {
        await ctx.reply("canceled Invalid, try again /apd");
        memory.set(false);
        await ctx.scene.leave();
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
const extractData = (inputString) => {
    const titleMatch = inputString.match(/(.*)\s\((\d{4})\)/);
    const relatedContentMatch = inputString.match(/Related Content\s*(.*)\s*Also Known As/);
    const alsoKnownAsMatch = inputString.match(/Also Known As\s*(.*?)(?=\s*(Screenwriter|Director|Genres))/);
    const directorMatch = inputString.match(/Director\s*(.*?)\s*(Screenwriter|Genres|$)/);
    const screenwriterMatch = inputString.match(/Screenwriter\s*(.*?)\s*(Director|Genres|$)/);
    const genresMatch = inputString.match(/Genres\s*(.*)\s*Country/);
    const countryMatch = inputString.match(/Country\s*(.*)\s*Type/);
    const typeMatch = inputString.match(/Type\s*(.*)\s*Episodes/);
    const episodesMatch = inputString.match(/Episodes\s*(\d+)/);
    const airedMatch = inputString.match(/Aired\s*(.*) - (.*)\s*Duration/);
    const releaseDateMatch = inputString.match(/Release Date\s*(.*)\s*Duration/);
    const airedMatch2 = inputString.match(/Aired\s*(.*)\s*Duration/);
    const durationMatch = inputString.match(/Duration\s*(.*)\s*Score/);
    const scoreMatch = inputString.match(/Score\s*(\d+\.\d+)/);
    const contentRatingMatch = inputString.match(/Content Rating\s*(.*)\s*📋/);
    const plotMatch = inputString.match(/📋 Plot\s*([\s\S]*?)(?:Where to Watch|$)/);
    const whereToWatchMatch = inputString.match(/Where to Watch\s*(.*)/);
    const relatedContent = relatedContentMatch ? relatedContentMatch[1].split(/,\s*|\s+/) : [];
    const alsoKnownAs = alsoKnownAsMatch ? alsoKnownAsMatch[1].split(/,\s*/) : [];
    const genres = genresMatch ? genresMatch[1].split(/\s+/) : [];
    const whereToWatch = whereToWatchMatch
        ? whereToWatchMatch[1].split(/\s+/).map((item) => ({
            platform: item.split(" ")[0],
            type: item.split(" ")[1] || "Unknown",
        }))
        : [{ platform: "Not available", type: "" }];
    // Handle cases where either Director or Screenwriter is missing
    const director = directorMatch ? directorMatch[1].trim() : "";
    const screenwriter = screenwriterMatch ? screenwriterMatch[1].trim() : "";
    return {
        title: titleMatch ? titleMatch[1].trim() : "",
        year: titleMatch ? parseInt(titleMatch[2].trim()) : 0,
        relatedContent,
        alsoKnownAs: alsoKnownAs.length > 0 && alsoKnownAs.some((item) => item.trim() !== "") ? alsoKnownAs : [],
        genres,
        country: countryMatch ? countryMatch[1].trim() : "",
        type: typeMatch ? typeMatch[1].replace(":", "").trim() : "",
        episodes: episodesMatch ? parseInt(episodesMatch[1].trim()) : 0,
        aired: airedMatch
            ? `${airedMatch[1].trim()} - ${airedMatch[2].trim()}`
            : releaseDateMatch
                ? releaseDateMatch[1].trim()
                : airedMatch2
                    ? airedMatch2[1].trim()
                    : "",
        duration: durationMatch ? durationMatch[1].trim() : "",
        director,
        screenwriter,
        score: scoreMatch ? parseFloat(scoreMatch[1]) : 0,
        contentRating: contentRatingMatch ? contentRatingMatch[1].trim() : "",
        plot: plotMatch ? plotMatch[1].trim() : "",
        whereToWatch,
    };
};
export { start, poster, done };
