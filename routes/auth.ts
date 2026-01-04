import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { hashPassword, comparePassword } from "../utils/hash";

const router = express.Router();

// Регистрация
router.post("/register", async (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username)
    return res.status(400).json({ message: "Все поля обязательны" });

  const existsEmail = await User.findOne({ email });
  const existsUsername = await User.findOne({ username });
  if (existsEmail) return res.status(400).json({ message: "Email занят" });
  if (existsUsername) return res.status(400).json({ message: "Username занят" });

  const passwordHash = await hashPassword(password);
  const user = new User({ email, passwordHash, username });
  await user.save();

  res.json({ message: "Пользователь создан" });
});

// Логин
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Неверные данные" });

  const isValid = await comparePassword(password, user.passwordHash);
  if (!isValid) return res.status(400).json({ message: "Неверные данные" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "7d" });
  res.json({ token, username: user.username, email: user.email });
});

export default router;
