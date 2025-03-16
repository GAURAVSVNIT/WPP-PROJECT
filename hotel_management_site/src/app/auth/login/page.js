// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "@/lib/firebase";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { firestore } from "@/lib/firebase";
// import Link from "next/link";

// const LoginPage = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState(null);
//     const router = useRouter();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setError(null);

//         try {
//             const userCredential = await signInWithEmailAndPassword(auth, email, password);
//             const user = userCredential.user;

//             if (user.emailVerified) {
//                 const userDoc = doc(firestore, "users", user.uid);
//                 const docSnap = await getDoc(userDoc);

//                 if (!docSnap.exists()) {
//                     const registrationData = localStorage.getItem("registrationData");
//                     const { firstName = "", lastName = "" } = registrationData ? JSON.parse(registrationData) : {};

//                     await setDoc(userDoc, {
//                         email: user.email,
//                         firstName,
//                         lastName,
//                     });
//                 }
//                 router.push("/dashboard");
//             } else {
//                 setError("Please verify your email address.");
//             }
//         } catch (error) {
//             if (error instanceof Error) {
//                 setError(error.message);
//             } else {
//                 setError("An unknown error occurred. Please try again.");
//             }
//         }
//     };

//     return (
//         <div className="bg-gradient-to-b from-gray-600 to-black flex flex-col items-center justify-center h-screen">
//             <h2 className="text-4xl text-white font-medium mb-10">Login</h2>
//             <form onSubmit={handleLogin} className="p-5 border border-gray-300 rounded w-96 bg-gray-800">
//                 <div className="flex flex-col space-y-4">
//                     <label className="text-sm font-medium text-gray-300">Email</label>
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         className="p-2 border border-gray-300 rounded bg-gray-700 text-white"
//                         required
//                     />
//                 </div>
//                 <div className="flex flex-col space-y-4 mt-4">
//                     <label className="text-sm font-medium text-gray-300">Password</label>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         className="p-2 border border-gray-300 rounded bg-gray-700 text-white"
//                         required
//                     />
//                 </div>
//                 {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//                 <button
//                     type="submit"
//                     className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//                 >
//                     Login
//                 </button>
//             </form>
//             <p className="text-sm font-medium text-gray-300 mt-4">
//                 Don&apos;t have an account?{" "}
//                 <Link href="/auth/register" className="text-blue-500 hover:underline">
//                     Register Here
//                 </Link>
//             </p>
//         </div>
//     );
// };

// export default LoginPage;

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import Link from "next/link";
import InputField from "@/components/Auth/InputField";
import Button from "@/components/Auth/Button";
import FormContainer from "@/components/Auth/FormContainer";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (user.emailVerified) {
                const userDoc = doc(firestore, "users", user.uid);
                const docSnap = await getDoc(userDoc);

                if (!docSnap.exists()) {
                    await setDoc(userDoc, { email: user.email });
                }

                router.push("/dashboard");
            } else {
                setError("Please verify your email address.");
            }
        } catch (error) {
            setError(error.message || "An unknown error occurred.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-600 to-black">
            <FormContainer title="Login">
                <form onSubmit={handleLogin} className="space-y-4">
                    <InputField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <InputField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <Button type="submit" text="Login" />

                    <p className="text-sm font-medium text-gray-300 mt-4 text-center">
                        Don&apos;t have an account?{" "}
                        <Link href="/auth/register" className="text-blue-500 hover:underline">
                            Register Here
                        </Link>
                    </p>
                </form>
            </FormContainer>
        </div>
    );
};

export default LoginPage;
