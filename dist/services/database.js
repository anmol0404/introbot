import getProperDB from "../extra/getProperDB.js";
class Database {
    constructor() {
        this.client = getProperDB();
    }
    async initialize() {
        await this.client.initialize();
    }
    async saveIntro(IntroDocument) {
        await this.client.saveIntro(IntroDocument);
        return IntroDocument.userId;
    }
    async getIntroMessages(userId) {
        return this.client.getIntroMessages(userId);
    }
    async saveUser(user) {
        return this.client.saveUser(user);
    }
    async deleteIntro(userId) {
        return this.client.deleteIntro(userId);
    }
    async updateAIOAttribute(userId, attribute) {
        return this.client.updateIntroAttribute(userId, attribute);
    }
}
const database = new Database();
export default database;
