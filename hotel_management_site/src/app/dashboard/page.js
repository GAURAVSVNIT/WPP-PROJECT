"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase"; // Ensure you have a correct Firebase config file
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase"; // Import firestore separately

const DashboardPage = () => {
    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState("");
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                 
                    const userDoc = doc(firestore, "users", user.uid);
                    const docSnap = await getDoc(userDoc);

                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        setUserName(`${userData.firstName} ${userData.lastName}`);
                    }
                        setUser(user);
            } else {
                setUser(null);
                router.push("/auth/login");
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            router.push("/auth/login");
        } catch (error) {
            console.error("LogOut error:",error);
        }
    };

    const handleChangePassword =  () => {
        router.push("/auth/change-password");
    };

    if(loading){
        return <p>Loading...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 bg-gradient-to-b from-gray-600 to-black"> 
         <nav className="bg-gray-800 p-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16"> 
                    <div className="flex items-center">
                        <div className="text-white text-xl">Dashboard</div> 
                    </div>
                </div> 
            </div> 
         </nav>

         <main className="flex flex-col items-center justify-center flex-grow mt-10">
            {userName && (
                <h1 className="text-4xl font-bold mb-6 ml-10">
                    Welcome, {userName}
                </h1>
            )}
            <div className="space-x-4">
                <button
                    onClick={handleChangePassword}
                    className="px-4 py-2 bg-red-600 text-white rounde-md hover:bg-red-700"
                >
                    Change Password
                </button>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-blue-600 text-white rounde-md hover:bg-blue-700"
                >
                    Logout
                </button>
            </div>
         </main>    
        </div>
    );

};

export default DashboardPage;