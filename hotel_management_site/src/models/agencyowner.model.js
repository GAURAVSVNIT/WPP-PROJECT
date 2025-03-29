import { firestore } from "@/lib/firebase.js"; // Import the Firestore instance from your Firebase configuration

class AgencyOwnerModel {
  // Create a new agency owner in the "agencyOwners" collection
  static async createAgencyOwner(agencyData) {
    const agencyRef = firestore.collection("agencyOwners").doc(); // auto-generated ID
    const data = {
      ...agencyData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await agencyRef.set(data);
    return agencyRef.id;
  }

  // Get an agency owner by email from the "agencyOwners" collection
  static async getAgencyByEmail(email) {
    const snapshot = await firestore.collection("agencyOwners").where("ownerEmail", "==", email).get();
    if (snapshot.empty) return null;
    return snapshot.docs[0].data();
  }
}

export default AgencyOwnerModel;
