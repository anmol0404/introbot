var _a;
import "dotenv/config";
const env = process.env;
const token = env.TELEGRAM_BOT_TOKEN;
const channelSourceLink = env.CHANNEL_SOURCE_LINK;
const dbPosterID = Number(env.DB_POSTER_ID);
const toLog = Number(env.TO_LOG);
const dbPosterLink = env.DB_POSTER_LINK;
const development = env.DEVELOPMENT;
const webhookDomain = env.WEBHOOK_DOMAIN;
const botUserName = env.BOT_USERNAME;
const port = env.PORT || 8080;
const adminIds = (_a = env.ADMIN_IDS) === null || _a === void 0 ? void 0 : _a.split(" ").map(Number);
const databaseUrl = env.DATABASE_URL;
if (!token) {
    throw Error("Provide TELEGRAM_BOT_TOKEN");
}
if (!adminIds) {
    throw Error("Provide ADMIN_IDS");
}
export default {
    token,
    botUserName,
    development,
    dbPosterID,
    dbPosterLink,
    webhookDomain,
    port,
    channelSourceLink,
    toLog,
    adminIds,
    databaseUrl,
};
