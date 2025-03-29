import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "@/utils/auth.utils.js";
import UserModel from "@/models/users.model.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { firstName, lastName, email, password, confirmpassword } = req.body;

  if (!email || !password || !confirmpassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password !== confirmpassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const existingUser = await UserModel.getUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { 
    firstName, 
    lastName, 
    email, 
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Assign the returned ID from createUser to userId
  const userId = await UserModel.createUser(newUser);
  if (!userId) {
    return res.status(500).json({ message: "Error creating user" });
  }

  const accessToken = generateAccessToken({ id: userId, email });
  const refreshToken = generateRefreshToken({ id: userId, email });

  res.setHeader("Set-Cookie", [
    `access_token=${accessToken}; Path=/; HttpOnly; Secure`,
    `refresh_token=${refreshToken}; Path=/; HttpOnly; Secure`
  ]);

  return res.status(201).json({ message: "User registered", accessToken, refreshToken });
}
