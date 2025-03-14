import mongoose, { Schema } from "mongoose";
const introSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    userId: {
        type: Number,
        required: true,
        unique: true,
    },
    from: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    profession: {
        type: String,
        required: true,
    },
    study: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    imageId: {
        type: Number,
        required: true,
    },
    knownLanguages: {
        type: [String],
        default: [],
    },
    skills: {
        type: [String],
        default: [],
    },
    hobbies: {
        type: [String],
        default: [],
    },
}, { timestamps: true });
const IntroModelDB = mongoose.model("Intro", introSchema);
export default IntroModelDB;
