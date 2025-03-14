import mongoose from "mongoose";
import env from "../services/env.js";
import UserModel from "./models/userModel.js";
import IntroModel from "./models/introModel.js";
class MongoDB {
    constructor() {
        this.db = mongoose;
        this.UserModel = UserModel;
        this.IntroModel = IntroModel;
        this.databaseUrl = env.databaseUrl || "";
    }
    async initialize() {
        await this.db.connect(this.databaseUrl);
    }
    async saveUser(user) {
        await new this.UserModel(user).save();
        return user;
    }
    async getIntroMessages(userId) {
        var _a;
        return (_a = (await this.IntroModel.findOne({ userId }))) === null || _a === void 0 ? void 0 : _a.imageId;
    }
    async saveIntro(aio) {
        const existingIntro = await this.IntroModel.findOne({ userId: aio.userId });
        if (existingIntro) {
            await this.IntroModel.updateOne({ userId: aio.userId }, { $set: aio });
            return { ...existingIntro.toObject(), ...aio };
        }
        else {
            const newIntro = new this.IntroModel(aio);
            await newIntro.save();
            return newIntro;
        }
    }
    async deleteIntro(userId) {
        const animeDocument = await this.IntroModel.findOne({ userId });
        if (animeDocument) {
            await this.IntroModel.findByIdAndDelete(animeDocument.id);
            return true;
        }
        else {
            return false;
        }
    }
    async updateIntroAttribute(userId, updateQuery) {
        try {
            await IntroModel.updateOne({ userId: userId }, { $set: updateQuery });
            return true;
        }
        catch (error) {
            console.error("Error updating drama attribute:", error);
            return false;
        }
    }
}
const mongoDB = new MongoDB();
export default mongoDB;
