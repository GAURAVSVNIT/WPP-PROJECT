"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase"; // Ensure you have a correct Firebase config file
import { doc, getDoc, setDoc } from "firebase/firestore";
<<<<<<< HEAD
import { firestore } from "./firebase/firebase"; // Import firestore separately
import Navbar from "@/components/Home/Navbar.js";
import MainSection from "@/components/Home/MainSection.js";
import ContentSection from "@/components/Home/ContentSection.js";
import Footer from "@/components/Home/Footer.js";
import { configDotenv } from "dotenv";
=======
import { firestore } from "@/lib/firebase"; // Import firestore separately
>>>>>>> parent of e57d48b (Added Authentication API)

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
          }
          setUser(user);
          router.push("/dashboard");
        } else {
          setUser(null);
          router.push("/auth/login");
        }
      } else {
        setUser(null);
        router.push("/auth/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <div>{user ? "Redirecting to dashboard..." : "Redirecting to login..."}</div>;
};

export default HomePage;
