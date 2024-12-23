"use client";

import React from "react";
import { auth } from "../../firebase/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import useAuthStore from "../../store/authStore";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";

const Navbar = () => {
  const { user, setUser, clearUser } = useAuthStore();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;

      // Update the user state in your store
      setUser({
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
        token,
      });

      console.log("User signed in:", user);
    } catch (error) {
      console.error("Error during Google Sign-In:", error.message);
      alert("Google Sign-In failed. Please try again.");
    }
  };

  const handleLogout = () => {
    auth.signOut();
    clearUser();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            BlogSpace
          </h1>
          <Image src="/pen.svg" alt="logo" width={24} height={24} />
          <div className="flex gap-4 ml-auto">
            {user ? (
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={user?.avatar} alt="User Avatar" />
                  <AvatarFallback>{user?.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-gray-700 font-medium">{user.name}</span>
                <Button
                  variant="outline"
                  className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button variant="outline" onClick={handleGoogleSignIn}>
                <FcGoogle className="text-xl mr-2" />
                Continue with Google
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
