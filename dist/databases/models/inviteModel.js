import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    userId: { type: String, required: true },
    invites: [
        {
            username: { type: String, required: true },
            userId: { type: String, required: true },
        },
    ],
    lastRequestDate: { type: Date, default: Date.now },
    dailyRequests: { type: Number, default: 1 },
});
const InviteModel = mongoose.model("InviteUser", userSchema);
export default InviteModel;
