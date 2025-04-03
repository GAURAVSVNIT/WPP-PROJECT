"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../app/firebase/firebase";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="w-full bg-gray-800 p-4 text-white flex justify-between items-center fixed top-0 z-50">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <span className="text-xl font-bold cursor-pointer">MyHotel</span>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/restaurant-join">
          <span className="cursor-pointer hover:underline">Join With Us</span>
        </Link>
        {user ? (
          <Link href="/profile">
            <span className="cursor-pointer hover:underline">Profile</span>
          </Link>
        ) : 
        (
          <>
            <Link href="/auth/user-register">
              <span className="bg-blue-500 px-3 py-2 rounded cursor-pointer hover:bg-blue-600">
                Sign Up
              </span>
            </Link>
            <Link href="/auth/login">
              <span className="bg-green-500 px-3 py-2 rounded cursor-pointer hover:bg-green-600">
                Login
              </span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
