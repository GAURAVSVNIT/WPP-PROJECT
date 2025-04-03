import { firestore } from "@/firebase/firebase"; // Ensure correct import path
import { collection, query, where, getDocs, addDoc, doc, updateDoc } from "firebase/firestore";

class UserModel {
  // Get a user by email from the "users" collection
  static async getUserByEmail(email) {
    const usersRef = collection(firestore, "users");
    const q = query(usersRef, where("email", "==", email));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    
    const docData = snapshot.docs[0].data();
    return { id: snapshot.docs[0].id, ...docData };
  }

  // Create a new user in the "users" collection
  static async createUser(userData) {
    const usersRef = collection(firestore, "users");
    const data = {
      ...userData,
      emailVerified: userData.emailVerified ?? false, // default to false
      isGoogleUser: userData.isGoogleUser ?? false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const docRef = await addDoc(usersRef, data);
    return docRef.id;
  }

  // Update a user's document
  static async updateUser(userId, updateData) {
    const userRef = doc(firestore, "users", userId);
    await updateDoc(userRef, { ...updateData, updatedAt: new Date() });
    return true;
  }
}

// Fix: Named exports for easier importing
export { UserModel, UserModel as default, UserModel as userModel };
export const getUserByEmail = UserModel.getUserByEmail;
export const createUser = UserModel.createUser;
export const updateUser = UserModel.updateUser;
