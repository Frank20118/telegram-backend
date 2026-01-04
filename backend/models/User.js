import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneOrEmail: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

userSchema.methods.setPassword = async function(password) {
  this.passwordHash = await bcrypt.hash(password, 10);
};

userSchema.methods.validatePassword = async function(password) {
  return bcrypt.compare(password, this.passwordHash);
};

export default mongoose.model("User", userSchema);
