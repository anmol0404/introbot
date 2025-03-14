import mongoose, { Schema } from "mongoose";
export const linkSchema = new Schema({
    episode: {
        type: Number,
        required: true,
    },
    shortUrl: {
        type: String,
        default: "no link",
    },
    teleUrl: {
        type: String,
        required: true,
    },
});
export const aioSchema = new Schema({
    shareId: {
        type: Number,
        required: true,
        unique: true, // Ensure unique shareId
    },
    messageIds: {
        type: [Number],
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["Anime", "Movie", "Drama", "Series", "Manga", "Special", "TV Show", "Other"],
        required: true,
    },
    detail: {
        type: String,
        required: true,
    },
    posterUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        default: "Unknown",
    },
    screenwriter: {
        type: String,
        default: "Unknown",
    },
    aired: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    episodes: [linkSchema],
    totalEpisodes: {
        type: Number,
        required: true,
    },
    tags: {
        type: String,
        required: true,
    },
    plot: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    screenshots: {
        type: [String],
        default: [],
    },
    quality: {
        type: [String],
        default: [],
    },
    genres: {
        type: [String],
        default: [],
    },
    rating: {
        type: Number,
        default: null,
    },
    year: {
        type: Number,
        default: null,
    },
    status: {
        type: String,
        enum: ["Ongoing", "Completed", "Upcoming"],
        default: "Ongoing",
    },
    trailerUrl: {
        type: String,
        default: null,
    },
    languages: {
        type: [String],
        default: "Unknown",
    },
    subtitles: {
        type: [String],
        default: [],
    },
    relatedContent: {
        type: [String],
        default: [],
    },
}, { timestamps: true });
const DramaModel = mongoose.model("hDrama", aioSchema);
export default DramaModel;
