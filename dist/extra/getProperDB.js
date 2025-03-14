import mongoDB from "../databases/mongoDB.js";
import env from "../services/env.js";
export default function getProperDB() {
    const databaseUrl = env.databaseUrl;
    if (databaseUrl) {
        if (databaseUrl.startsWith("mongodb")) {
            return mongoDB;
        }
    }
    return mongoDB;
}
