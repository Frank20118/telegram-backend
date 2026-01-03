import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// Регистрация
router.post("/register", async (req, res) => {
  const { name, phoneOrEmail, password } = req.body;
  if (!name || !phoneOrEmail || !password)
    return res.status(400).json({ message: "Все поля обязательны" });

  try {
    let user = await User.findOne({ phoneOrEmail });
    if (user) return res.status(400).json({ message: "Пользователь уже существует" });

    user = new User({ name, phoneOrEmail });
    await user.setPassword(password);
    await user.save();

    res.status(201).json({ message: "Регистрация успешна" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

// Вход
router.post("/login", async (req, res) => {
  const { phoneOrEmail, password } = req.body;
  if (!phoneOrEmail || !password)
    return res.status(400).json({ message: "Все поля обязательны" });

  try {
    const user = await User.findOne({ phoneOrEmail });
    if (!user) return res.status(400).json({ message: "Пользователь не найден" });

    const isValid = await user.validatePassword(password);
    if (!isValid) return res.status(400).json({ message: "Неверный пароль" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

export default router;
