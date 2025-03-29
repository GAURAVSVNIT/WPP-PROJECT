"use-client";
import { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "@/lib/firebase";
import InputField from "@/components/Auth/InputField";
import Button from "@/components/Auth/Button";
import FormContainer from "@/components/Auth/FormContainer";

const AdminRegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("admin"); // Default role
    const [phoneNumber, setPhoneNumber] = useState("");

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");


}
