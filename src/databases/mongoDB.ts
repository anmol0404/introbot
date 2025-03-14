import mongoose, { Model } from "mongoose";
import env from "../services/env.js";
import UserModel, { UserDocument } from "./models/userModel.js";
import IntroModel from "./models/introModel.js";
import { IntroDocument } from "./interfaces/Intro.js";

class MongoDB {
  db: typeof mongoose;
  UserModel: Model<UserDocument>;
  IntroModel: Model<IntroDocument>;
  databaseUrl: string;

  constructor() {
    this.db = mongoose;
    this.UserModel = UserModel;
    this.IntroModel = IntroModel;
    this.databaseUrl = env.databaseUrl || "";
  }

  async initialize() {
    await this.db.connect(this.databaseUrl);
  }

  async saveUser(user: UserDocument) {
    await new this.UserModel(user).save();
    return user;
  }

  async getIntroMessages(userId: number): Promise<number | undefined> {
    return (await this.IntroModel.findOne({ userId }))?.imageId;
  }

  async saveIntro(aio: IntroDocument) {
    const existingIntro = await this.IntroModel.findOne({ userId: aio.userId });

    if (existingIntro) {
      await this.IntroModel.updateOne({ userId: aio.userId }, { $set: aio });
      return { ...existingIntro.toObject(), ...aio };
    } else {
      const newIntro = new this.IntroModel(aio);
      await newIntro.save();
      return newIntro;
    }
  }

  async deleteIntro(userId: number) {
    const animeDocument = await this.IntroModel.findOne({ userId });
    if (animeDocument) {
      await this.IntroModel.findByIdAndDelete(animeDocument.id);
      return true;
    } else {
      return false;
    }
  }

  async updateIntroAttribute(userId: number, updateQuery: any) {
    try {
      await IntroModel.updateOne({ userId: userId }, { $set: updateQuery });
      return true;
    } catch (error) {
      console.error("Error updating drama attribute:", error);
      return false;
    }
  }
}

const mongoDB = new MongoDB();

export default mongoDB;
