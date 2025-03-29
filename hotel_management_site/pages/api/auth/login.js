import bcrypt from "bcryptjs";
import UserModel from "@/models/users.model.js"; // Adjust the path if needed
import AgencyOwnerModel from "@/models/agencyowner.model.js"; // If you want to support agency login too
import { generateAccessToken, generateRefreshToken } from "@/utils/auth.utils.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  let user = await UserModel.getUserByEmail(email);
  let userType = "user";

  // If not found in normal users, try agency owners.
  if (!user) {
    user = await AgencyOwnerModel.getAgencyByEmail(email);
    userType = "agencyOwner";
  }

  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  // Compare plain password with the stored hashed password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ error: "Invalid password" });
  }

  // Generate tokens (adjust the payload and token generation as needed)
  const accessToken = generateAccessToken({ id: user.id, email });
  const refreshToken = generateRefreshToken({ id: user.id, email });

  // Set tokens in cookies (you might have your own cookie options)
  res.setHeader("Set-Cookie", [
    `access_token=${accessToken}; Path=/; HttpOnly; Secure`,
    `refresh_token=${refreshToken}; Path=/; HttpOnly; Secure`
  ]);

  return res.status(200).json({ message: "Login successful", accessToken, refreshToken, userType });
}
