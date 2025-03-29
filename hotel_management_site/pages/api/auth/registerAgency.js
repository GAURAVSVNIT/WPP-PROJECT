import AgencyOwnerModel from "@/models/agencyowner.model.js";
import bcrypt from "bcryptjs"; // renamed import
import { generateAccessToken, generateRefreshToken } from "@/utils/auth.utils.js";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { firstName, lastName, email, password, role } = req.body;

    if (!email || !password || !role) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await AgencyOwnerModel.getAgencyByEmail(email);
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { 
        firstName, 
        lastName, 
        email, 
        password: hashedPassword, 
        role 
    };

    const userId = await AgencyOwnerModel.createAgencyOwner(newUser);
    if (!userId) {
        return res.status(500).json({ message: "Error creating user" });
    }
    const accessToken = generateAccessToken({ id: userId, email });
    const refreshToken = generateRefreshToken({ id: userId });

    res.setHeader("Set-Cookie", `refresh_token=${refreshToken}; Path=/; HttpOnly; Secure`);

    return res.status(201).json({ message: "User registered", accessToken, role });
}
