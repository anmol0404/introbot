import auth from "../../services/auth.js";
import fs from "fs/promises";
export default async function findHandler(ctx) {
    var _a, _b;
    const userId = (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id;
    // Check if the user is an admin
    if (!auth.isAdmin(userId ? userId : 0)) {
        return ctx.reply("You are not authorized to use this command.");
    }
    let jsonData;
    try {
        // Read and parse the JSON file
        const fileData = await fs.readFile("./aios.json", "utf-8");
        jsonData = JSON.parse(fileData);
    }
    catch (error) {
        console.error("Error reading the JSON file:", error);
        return ctx.reply("Could not read the data file.");
    }
    // Extract the search phrase
    const queryText = ((_b = ctx.message) === null || _b === void 0 ? void 0 : _b.text) || "";
    const searchPhrase = queryText.replace("/find", "").trim();
    // Validate the search phrase
    if (!searchPhrase) {
        return ctx.reply("Please provide a phrase to search.");
    }
    // Search for matching items based on the full phrase
    const results = jsonData.filter((item) => { var _a; return (_a = item.aIOTitle) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(searchPhrase.toLowerCase()); });
    // Limit results to 10 items
    const limitedResults = results.slice(0, 10);
    // Format the response
    if (limitedResults.length === 0) {
        return ctx.reply("No results found for your search.");
    }
    const responseText = limitedResults
        .map((item, index) => {
        var _a;
        return `${index + 1}. *${(_a = item.aIOTitle) === null || _a === void 0 ? void 0 : _a.slice(0, 100).split("\n")[0]}*\n[Poster Link](${item.aIOPosterID})`;
    })
        .join("\n\n");
    // Send the results to the user
    return ctx.reply(responseText, { parse_mode: "Markdown" });
}
