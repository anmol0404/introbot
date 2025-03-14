/// <reference types="mongoose/types/aggregate.js" />
/// <reference types="mongoose/types/callback.js" />
/// <reference types="mongoose/types/collection.js" />
/// <reference types="mongoose/types/connection.js" />
/// <reference types="mongoose/types/cursor.js" />
/// <reference types="mongoose/types/document.js" />
/// <reference types="mongoose/types/error.js" />
/// <reference types="mongoose/types/expressions.js" />
/// <reference types="mongoose/types/helpers.js" />
/// <reference types="mongoose/types/middlewares.js" />
/// <reference types="mongoose/types/indexes.js" />
/// <reference types="mongoose/types/models.js" />
/// <reference types="mongoose/types/mongooseoptions.js" />
/// <reference types="mongoose/types/pipelinestage.js" />
/// <reference types="mongoose/types/populate.js" />
/// <reference types="mongoose/types/query.js" />
/// <reference types="mongoose/types/schemaoptions.js" />
/// <reference types="mongoose/types/schematypes.js" />
/// <reference types="mongoose/types/session.js" />
/// <reference types="mongoose/types/types.js" />
/// <reference types="mongoose/types/utility.js" />
/// <reference types="mongoose/types/validation.js" />
/// <reference types="mongoose/types/virtuals.js" />
/// <reference types="mongoose/types/inferschematype.js" />
import mongoose, { Model } from "mongoose";
import { UserDocument } from "./models/userModel.js";
import { IntroDocument } from "./interfaces/Intro.js";
declare class MongoDB {
    db: typeof mongoose;
    UserModel: Model<UserDocument>;
    IntroModel: Model<IntroDocument>;
    databaseUrl: string;
    constructor();
    initialize(): Promise<void>;
    saveUser(user: UserDocument): Promise<UserDocument>;
    getIntroMessages(userId: number): Promise<number | undefined>;
    saveIntro(aio: IntroDocument): Promise<(mongoose.Document<unknown, {}, IntroDocument> & IntroDocument & {
        _id: mongoose.Types.ObjectId;
    }) | {
        fullName: string;
        userId: number;
        from: string;
        age: string;
        profession: string;
        study: string;
        bio: string;
        imageId: number;
        knownLanguages: string[];
        skills: string[];
        hobbies: string[];
        _id: mongoose.Types.ObjectId;
    }>;
    deleteIntro(userId: number): Promise<boolean>;
    updateIntroAttribute(userId: number, updateQuery: any): Promise<boolean>;
}
declare const mongoDB: MongoDB;
export default mongoDB;
