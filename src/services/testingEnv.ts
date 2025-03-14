import "dotenv/config";

const env = process.env;
const token = env.TELEGRAM_BOT_TOKEN;
const dbDramaChannelId = Number(env.DB_CHANNEL_ID);
const dbMovieChannelId = Number(env.DB_MOVIE_CHANNEL_ID);
const dbAnimeChannelId = Number(env.DB_ANIME_CHANNEL_ID);
const dbAIOChannelId = Number(env.DB_AIO_CHANNEL_ID);
const development = env.DEVELOPMENT;
const webhookDomain = env.WEBHOOK_DOMAIN;
const botUserName = env.BOT_USERNAME;
const port = env.PORT || 8080;
// const forceChannelIds = env.FORCE_CHANNEL_IDS?.split(" ").map(Number) || [];
const forceGroupIds = env.FORCE_GROUP_IDS?.split(" ").map(Number) || [];
const allowGroups = env.ALLOW_GROUPS?.split(" ").map(Number) || [];
const adminIds = env.ADMIN_IDS?.split(" ").map(Number);
const databaseUrl = env.DATABASE_URL;
const join = env.JOIN || "";
const joinAnime = env.JOIN_ANIME || "";

const collectionAIO = env.COLLECTION_AIO || "";

if (!token) {
  throw Error("Provide TELEGRAM_BOT_TOKEN");
}
if (!dbDramaChannelId) {
  throw Error("Provide DB_CHANNEL_ID");
}
if (!dbMovieChannelId) {
  throw Error("Provide DB_MOVIE_CHANNEL_ID");
}
if (!adminIds) {
  throw Error("Provide ADMIN_IDS");
}
export default {
  token,
  botUserName,
  dbDramaChannelId,
  dbMovieChannelId,
  development,
  webhookDomain,
  port,
  join,
  dbAnimeChannelId,
  dbAIOChannelId,
  joinAnime,
  collectionAIO,
  // forceChannelIds,
  allowGroups,
  forceGroupIds,
  adminIds,
  databaseUrl,
};
