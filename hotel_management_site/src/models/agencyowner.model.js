import { firestore } from "../firebase/firebase.js"; // Import the Firestore instance from your Firebase configuration

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
    const q = query(collection(firestore, "agencyOwners"), where("ownerEmail", "==", email));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    return snapshot.docs[0].data();
  }
}

export default AgencyOwnerModel;