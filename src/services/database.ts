import { User } from "telegraf/typings/core/types/typegram.js";
import getProperDB from "../extra/getProperDB.js";
import { DatabaseClient } from "../interfaces.js";
import { IntroDocument } from "../databases/interfaces/Intro.js";

class Database {
  client: DatabaseClient;

  constructor() {
    this.client = getProperDB();
  }

  async initialize() {
    await this.client.initialize();
  }

  async saveIntro(IntroDocument: IntroDocument) {
    await this.client.saveIntro(IntroDocument);
    return IntroDocument.userId;
  }

  async getIntroMessages(userId: number) {
    return this.client.getIntroMessages(userId);
  }

  async saveUser(user: User) {
    return this.client.saveUser(user);
  }

  async deleteIntro(userId: number) {
    return this.client.deleteIntro(userId);
  }

  async updateAIOAttribute(userId: number, attribute: any) {
    return this.client.updateIntroAttribute(userId, attribute);
  }
}

const database = new Database();
export default database;
