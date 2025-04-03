// import bcrypt from "bcryptjs";
// import { generateAccessToken, generateRefreshToken, generateEmailVerificationToken } from "@/utils/auth.utils.js";
// import UserModel from "@/models/users.model.js";
// import 

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   const { firstName, lastName, email, password, confirmpassword } = req.body;

//   if (!email || !password || !confirmpassword) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   if (password !== confirmpassword) {
//     return res.status(400).json({ message: "Passwords do not match" });
//   }

//   const existingUser = await UserModel.getUserByEmail(email);
//   if (existingUser) {
//     return res.status(400).json({ message: "User already exists" });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const newUser = { 
//     firstName, 
//     lastName, 
//     email, 
//     password: hashedPassword,
//     emailVerified: false, // set false until the user verifies
//     isGoogleUser: false,  // this flag can later be set to true if registered via Google
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   };

//   // Create the user and capture the generated user ID
//   const userId = await UserModel.createUser(newUser);
//   if (!userId) {
//     return res.status(500).json({ message: "Error creating user" });
//   }

//   // Generate an email verification token (expires in 24h, for example)
//   const emailToken = generateEmailVerificationToken({ _id: userId, email });
  
//   // Build the verification URL; use NEXT_PUBLIC_DOMAIN or fallback to localhost
//   const domain = process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000";
//   const verificationUrl = `${domain}/api/auth/verifyEmail?token=${emailToken}`;

//   try {
//     // Send the verification email
//     await transporter.sendMail(mailOptions);
//     console.log("Verification email sent to:", email);
//   } catch (error) {
//     console.error("Error sending verification email:", error);
//     return res.status(500).json({ message: "Error sending verification email" });
//   }

//   // Optionally, you could generate access/refresh tokens here if you want to log the user in immediately.
//   // Generate access and refresh tokens for the user
//   const accessToken = generateAccessToken({ _id: userId, email });
//   const refreshToken = generateRefreshToken({ _id: userId, email });

//   // Optionally, save the refresh token in the database or send it as an HTTP-only cookie
//   res.setHeader("Set-Cookie", `refreshToken=${refreshToken}; HttpOnly; Path=/; Secure; SameSite=Strict`);
  
//   // Include the access token in the response
//   return res.status(201).json({ 
//     message: "Registration successful. Please check your email to verify your account.",
//     accessToken,
//   });
// }
// // //import { https } from "firebase-functions";
// // import { hash } from "bcryptjs";
// // import { generateAccessToken, generateRefreshToken, generateEmailVerificationToken } from "@/utils/auth.utils.js";
// // import { getUserByEmail, createUser } from "@/models/users.model.js";

// // export default async function handler(req, res) {
// //   if (req.method !== "POST") {
// //     return res.status(405).json({ message: "Method not allowed" });
// //   }

// //   const { firstName, lastName, email, password, confirmpassword } = req.body;
// //   if (!email || !password || !confirmpassword) {
// //     return res.status(400).json({ message: "All fields are required" });
// //   }
// //   if (password !== confirmpassword) {
// //     return res.status(400).json({ message: "Passwords do not match" });
// //   }

// //   const existingUser = await getUserByEmail(email);
// //   if (existingUser) {
// //     return res.status(400).json({ message: "User already exists" });
// //   }

// //   const hashedPassword = await hash(password, 10);
// //   const newUser = { 
// //     firstName, 
// //     lastName, 
// //     email, 
// //     password: hashedPassword,
// //     emailVerified: false,
// //     isGoogleUser: false,
// //     createdAt: new Date(),
// //     updatedAt: new Date(),
// //   };

// //   const userId = await createUser(newUser);
// //   if (!userId) {
// //     return res.status(500).json({ message: "Error creating user" });
// //   }

// //   const emailToken = generateEmailVerificationToken({ _id: userId, email });
// //   const domain = process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000";
// //   const verificationUrl = `${domain}/api/auth/verifyEmail?token=${emailToken}`;

// //   try {
// //     await transporter.sendMail(mailOptions);
// //     console.log("Verification email sent to:", email);
// //   } catch (error) {
// //     console.error("Error sending verification email:", error);
// //     return res.status(500).json({ message: "Error sending verification email" });
// //   }

// //   const accessToken = generateAccessToken({ _id: userId, email });
// //   const refreshToken = generateRefreshToken({ _id: userId, email });
// //   res.setHeader("Set-Cookie", `refreshToken=${refreshToken}; HttpOnly; Path=/; Secure; SameSite=Strict`);
  
// //   return res.status(201).json({ 
// //     message: "Registration successful. Please check your email to verify your account.",
// //     accessToken,
// //   });
// // }
