import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  username?: string;
  email: string;
  password: string;
  profilePic?: string;
  isAdmin?: boolean;
}

const UserSchema: mongoose.Schema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    profilePic: { type: String, default: "" },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
