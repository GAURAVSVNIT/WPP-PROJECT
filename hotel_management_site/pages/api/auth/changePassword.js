// pages/api/auth/changePassword.js
import { auth } from "@/lib/firebaseAdmin"; // Use admin SDK for verifyIdToken

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { idToken, newPassword } = req.body;

  if (!idToken || !newPassword) {
    return res.status(400).json({ error: "Missing idToken or newPassword" });
  }

  try {
    // Verify the provided ID token to get the user's UID
    const decodedToken = await auth.verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // Update the user's password using the Admin SDK
    await auth.updateUser(uid, { password: newPassword });

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Change Password API error:", error);
    return res.status(500).json({ error: error.message });
  }
}
