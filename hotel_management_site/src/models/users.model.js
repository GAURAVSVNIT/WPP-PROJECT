// import { firestore } from "@/lib/firebase.js"; 
// import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
// // import { auth } from "@/lib/firebaseAdmin"; 

// class UserModel {
//   // Create a new user in the "users" collection
//   static async createUser(userData) {
//     const userRef = firestore.
//     const data = {
//       ...userData,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     };
//     await userRef.set(data);
//     return userRef.id;
//   }

//   // Get a user by email from the "users" collection
//   static async getUserByEmail(email) {
//     const snapshot = await firestore.collection("users").where("email", "==", email).get();
//     if (snapshot.empty) return null;
//     return snapshot.docs[0].data();
//   }
// }

// export default UserModel;
// src/models/users.model.js
import { firestore } from "@/lib/firebase.js";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

class UserModel {
  // Get a user by email from the "users" collection using modular SDK
  static async getUserByEmail(email) {
    const usersRef = collection(firestore, "users");
    const q = query(usersRef, where("email", "==", email));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    return snapshot.docs[0].data();
  }

  // Create a new user in the "users" collection using modular SDK
  static async createUser(userData) {
    const usersRef = collection(firestore, "users");
    const data = {
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const docRef = await addDoc(usersRef, data);
    return docRef.id;
  }
}

export default UserModel;
