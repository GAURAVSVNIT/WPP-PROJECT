"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase"; // Ensure you have a correct Firebase config file
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "@/lib/firebase"; // Import firestore separately
import Navbar from "@/components/Home/Navbar.js";
import MainSection from "@/components/Home/MainSection.js";
import ContentSection from "@/components/Home/ContentSection.js";
import Footer from "@/components/Home/Footer.js";
import { configDotenv } from "dotenv";

configDotenv({
  path: ".env.local",
});
const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (user.emailVerified) {
          const userDoc = doc(firestore, "users", user.uid);
          const docSnap = await getDoc(userDoc);

          if (!docSnap.exists()) {
            // Retrieve user data from local storage  
            const registrationData = localStorage.getItem("registrationData");
            const { firstName = "", lastName = "" } = registrationData ? JSON.parse(registrationData) : {};

            await setDoc(userDoc, {
              email: user.email,
              firstName,
              lastName,
            });

            // Remove registration data from local storage
            localStorage.removeItem("registrationData");
          }``
          setUser(user);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="overflow-y-auto">
      <Navbar />
      {/* Give some padding at the top to account for the fixed navbar */}
      <main className="pt-20">
        <MainSection />
        <ContentSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
