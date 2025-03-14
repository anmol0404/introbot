// models/UserModel.ts
import { model, Schema, Model, Document } from "mongoose";
import { User } from "telegraf/typings/core/types/typegram";

  

export type UserDocument = User & Document;

const userSchema: Schema<UserDocument> = new Schema<UserDocument>({
  id: { type: Number, required: true, unique: true },
  is_bot: { type: Boolean, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String },
  username: { type: String },
  language_code: { type: String },
  is_premium: { type: Boolean },
  added_to_attachment_menu: { type: Boolean },
});

const UserModel: Model<UserDocument> = model<UserDocument>("user", userSchema);

export default UserModel;
