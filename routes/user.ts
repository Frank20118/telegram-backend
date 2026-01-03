import express from "express";
import User from "../models/User";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

// Изменение username
router.post("/username", authMiddleware, async (req: any, res) => {
  const { username } = req.body;
  if (!username || username.length < 3) return res.status(400).json({ message: "Username слишком короткий" });

  const exists = await User.findOne({ username });
  if (exists) return res.status(400).json({ message: "Username занят" });

  const updated = await User.findByIdAndUpdate(req.user.id, { username }, { new: true });
  res.json({ username: updated?.username });
});

// Глобальный поиск всех пользователей (для @username)
router.get("/search", authMiddleware, async (req, res) => {
  const { q } = req.query; // q = что вводит пользователь
  const regex = new RegExp(q as string, "i"); // поиск без учета регистра
  const users = await User.find({ username: regex }, "username _id");
  res.json(users);
});

export default router;
