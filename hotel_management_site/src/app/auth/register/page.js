"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "@/lib/firebase";

const RegisterPage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async (event) => {
        event.preventDefault();
        setError(null);
        setMessage(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            await sendEmailVerification(user);
            
            //Temporary store user data in local storage
            localStorage.setItem("registrationData", JSON.stringify(
                {
                    firstName,
                    lastName,
                    email,
                })
            );
            setMessage("Registration successful. Please check your email to verify your account.");

            //Clear form fields
            setFirstName("");
            setLastName("");
            setEmail("");
            setGender("");
            setPassword("");
            setConfirmPassword("");
        } catch (error) {
            if(error instanceof Error) {
                setError(error.message);
            } else {
                setError("An error occurred. Please try again.");
            }
        }
    };

    return (//Flex container of column classes
        <div className="bg-gradient-to-b from-gray-600 justify-center items-center h-screen w-screen flex flex-col h-screen relative"> 
            <h2 className="text-2xl font-bold text-center mb-10">Register</h2>
                <div className="p-5 border border-gray-300 rounded">
                    <form className="space-y-6 px-6 pb-4" onSubmit={handleRegister}>
                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-300">First Name</label>
                                <input type="text" id="firstName" name="firstName" value={firstName} onChange={(event) => setFirstName(event.target.value)} required className="border-2 outline-none sm:text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-500 placeholder-gray-400 text-white" />
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="lastName" className="block text-sm font-medium mb-2 text-gray-300">Last Name</label>
                                <input type="text" id="lastName" name="lastName" value={lastName} onChange={(event) => setLastName(event.target.value)} required className="border-2 outline-none sm:text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-500 placeholder-gray-400 text-white" />
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="email" className="block text-sm mb-2 font-medium text-gray-300">Email</label>
                                <input type="email" id="email" name="lastName" value={email} onChange={(event) => setEmail(event.target.value)} required className="border-2 outline-none sm:text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-500 placeholder-gray-400 text-white" />
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="password" className="block text-sm font-medium mb-2 text-gray-300">Password</label>
                                <input type="password" id="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} required className="border-2 outline-none sm:text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-500 placeholder-gray-400 text-white" />
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2 text-gray-300">Confirm Password</label>
                                <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required className="border-2 outline-none sm:text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-500 placeholder-gray-400 text-white" />
                            </div>
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        {message && <p className="text-green-500 text-sm">{message}</p>}    
                <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 borde border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Sign Up
                        </button>
                    </form>           
                </div>
        </div>
    );
};

export default RegisterPage;