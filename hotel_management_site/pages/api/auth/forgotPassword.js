import { auth } from "../../../src/app/firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    await sendPasswordResetEmail(auth, email);
    return res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error("Forgot Password Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
