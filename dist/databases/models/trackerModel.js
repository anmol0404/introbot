import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    counter: { type: Number, required: true },
});
const TrackerModel = mongoose.model("counter", userSchema);
export default TrackerModel;
