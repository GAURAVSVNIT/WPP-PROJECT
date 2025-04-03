// "use client";
// import { useState } from "react";
// import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
// import { auth } from "@/lib/firebase";
// import InputField from "@/components/Auth/InputField";
// import Button from "@/components/Auth/Button";
// import FormContainer from "@/components/Auth/FormContainer";

// const RegisterPage = () => {
//     const [firstName, setFirstName] = useState("");
//     const [lastName, setLastName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [error, setError] = useState("");
//     const [message, setMessage] = useState("");

//     const handleRegister = async (event) => {
//         event.preventDefault();
//         setError(null);
//         setMessage(null);

//         if (password !== confirmPassword) {
//             setError("Passwords do not match");
//             return;
//         }

//         try {
//             const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//             const user = userCredential.user;
//             await sendEmailVerification(user);
//             localStorage.setItem("registrationData", JSON.stringify({ firstName, lastName, email }));
//             setMessage("Registration successful. Please check your email.");
//         } catch (error) {
//             setError(error.message);
//         }
//     };

//     return (
//         <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-600 to-black">
//             <FormContainer title="Register">
//                 <form onSubmit={handleRegister} className="space-y-4">
//                     <InputField label="First Name" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
//                     <InputField label="Last Name" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
//                     <InputField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//                     <InputField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//                     <InputField label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

//                     {error && <p className="text-red-500 text-sm text-center">{error}</p>}
//                     {message && <p className="text-green-500 text-sm text-center">{message}</p>}
//                     <Button type="submit" text="Sign Up" />
//                 </form>
//             </FormContainer>
//         </div>
//     );
// };

// export default RegisterPage;
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/api";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/firebase";
import InputField from "@/components/Auth/InputField";
import Button from "@/components/Auth/Button";
import FormContainer from "@/components/Auth/FormContainer";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  // Handle input changes for form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Traditional registration with email/password
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // Validate passwords
    if (formData.password !== formData.confirmpassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Call the API service to register the user
      const data = await registerUser(formData);
      setMessage("Registration successful. Please check your email to verify your account.");
      // Redirect after a short delay (adjust as needed)
      setTimeout(() => {
        router.push("/home");
      }, 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  // Registration using Google sign-up
  const handleGoogleSignUp = async () => {
    setError("");
    setMessage("");
    try {
      // Trigger the Google sign-in popup
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      // Optionally, send user data to your backend API to create a record,
      // marking isGoogleUser as true and emailVerified as true
      setMessage("Google registration successful. Redirecting...");
      setTimeout(() => {
        router.push("/home");
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-600 to-black">
      <FormContainer title="Register">
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField label="First Name" type="text" value={formData.firstName} onChange={handleChange} name="firstName" />
          <InputField label="Last Name" type="text" value={formData.lastName} onChange={handleChange} name="lastName" />
          <InputField label="Email" type="email" value={formData.email} onChange={handleChange} name="email" />
          <InputField label="Password" type="password" value={formData.password} onChange={handleChange} name="password" />
          <InputField label="Confirm Password" type="password" value={formData.confirmpassword} onChange={handleChange} name="confirmpassword" />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {message && <p className="text-green-500 text-sm text-center">{message}</p>}

          <div className="flex flex-col gap-2">
            <Button type="submit" text="Sign Up" />
            <Button type="button" text="Register with Google" onClick={handleGoogleSignUp} />
          </div>
        </form>
      </FormContainer>
    </div>
  );
}
