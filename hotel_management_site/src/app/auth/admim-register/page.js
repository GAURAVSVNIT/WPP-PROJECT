"use-client";
// import { useState } from "react";
// import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
// import { auth } from "@/lib/firebase";
import InputField from "@/components/Auth/InputField";
import Button from "@/components/Auth/Button";
import FormContainer from "@/components/Auth/FormContainer";

const AdminRegisterPage = () => {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [confirmPassword, setConfirmPassword] = useState("");
    // const [role, setRole] = useState("admin"); // Default role
    // const [phoneNumber, setPhoneNumber] = useState("");

    // const [error, setError] = useState("");
    // const [message, setMessage] = useState("");

    return(
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-600 to-black">
            <FormContainer title="Admin Register">
                <form onSubmit={handleRegister} className="space-y-4">
                    <InputField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <InputField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <InputField label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <InputField label="Phone Number" type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    {message && <p className="text-green-500 text-sm text-center">{message}</p>}
                    <Button type="submit" text="Sign Up" />
                </form>
            </FormContainer>
        </div>
    );

}
