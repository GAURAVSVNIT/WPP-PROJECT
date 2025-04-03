"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase/firebase";
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import InputField from "@/components/Auth/InputField";
import Button from "@/components/Auth/Button";
import FormContainer from "@/components/Auth/FormContainer";

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (newPassword !== confirmPassword) {
            setError("New passwords do not match.");
            return;
        }

        if (newPassword.length < 6) {
            setError("Password should be at least 6 characters long.");
            return;
        }

        try {
            const user = auth.currentUser;
            if (!user) {
                setError("User is not authenticated.");
                return;
            }

            // Re-authenticate user before changing password
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);

            // Update password
            await updatePassword(user, newPassword);
            setMessage("Password updated successfully.");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

            // Redirect to login after successful password change
            setTimeout(() => {
                auth.signOut();
                router.push("/auth/login");
            }, 2000);
        } catch (error) {
            setError(error.message || "Failed to change password. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-600 to-black">
            <FormContainer title="Change Password">
                <form onSubmit={handleChangePassword} className="space-y-4">
                    <InputField label="Current Password" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                    <InputField label="New Password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    <InputField label="Confirm New Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    {message && <p className="text-green-500 text-sm text-center">{message}</p>}
                    
                    <Button type="submit" text="Update Password" />
                </form>
            </FormContainer>
        </div>
    );
};

export default ChangePassword;
