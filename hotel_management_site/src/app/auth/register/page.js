"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "@/lib/firebase";
import InputField from "@/components/Auth/InputField";
import Button from "@/components/Auth/Button";
import FormContainer from "@/components/Auth/FormContainer";

const RegisterPage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
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
            localStorage.setItem("registrationData", JSON.stringify({ firstName, lastName, email }));
            setMessage("Registration successful. Please check your email.");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-600 to-black">
            <FormContainer title="Register">
                <form onSubmit={handleRegister} className="space-y-4">
                    <InputField label="First Name" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <InputField label="Last Name" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <InputField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <InputField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <InputField label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    {message && <p className="text-green-500 text-sm text-center">{message}</p>}
                    <Button type="submit" text="Sign Up" />
                </form>
            </FormContainer>
        </div>
    );
};

export default RegisterPage;
