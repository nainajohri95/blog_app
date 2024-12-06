"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import useAuthStore from "../store/authStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FcGoogle } from "react-icons/fc";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Pen, Share2, Compass } from "lucide-react";
import Link from "next/link";

const HomePage = () => {
  const router = useRouter();
  const { user, setUser, clearUser } = useAuthStore();

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const userData = result.user;

      setUser({
        name: userData.displayName,
        avatar: userData.photoURL,
      });

      router.push("/home");
    } catch (error) {
      console.error("Error during Google login:", error.message);
    }
  };

  const handleStartWriting = () => {
    if (user) {
      router.push("/home");
    } else {
      // Optional: You can trigger the Google sign-in directly
      handleGoogle();
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userData) => {
      if (userData) {
        setUser({
          name: userData.displayName,
          avatar: userData.photoURL,
        });
      } else {
        clearUser();
      }
    });

    return () => unsubscribe();
  }, [setUser, clearUser]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              BlogSpace
            </h1>
            <div className="flex gap-4 ml-auto">
              {user ? (
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={user.avatar} alt="User Avatar" />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-gray-700 font-medium">{user.name}</span>
                  <Button
                    variant="outline"
                    className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                    onClick={() => {
                      auth.signOut();
                      clearUser();
                    }}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Button variant="outline" onClick={handleGoogle}>
                  <FcGoogle className="text-xl mr-2" />
                  Continue with Google
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 py-16">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <h2 className="text-5xl font-bold leading-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome to BlogSpace
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Share your thoughts, discover new perspectives, and join our
              growing community of writers and readers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 px-8"
                onClick={handleStartWriting}
              >
                Start Writing
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 px-8">
                <Link href="/blog">Explore Blogs</Link>
              </Button>
            </div>
          </div>
          <div className="flex-shrink-0 w-full md:w-[30%]">
            <img
              src="/img.jpeg"
              alt="BlogSpace Community"
              className="w-full h-auto rounded-2xl shadow-2xl transform"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto py-16">
          <Card className="group bg-white/50 backdrop-blur-sm border-2 hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <CardHeader className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                <Pen className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <CardTitle className="text-2xl">Create</CardTitle>
              <CardDescription className="text-lg">
                Share your stories with the world
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                Write and publish your blog posts with our intuitive editor that
                makes content creation a breeze.
              </p>
            </CardContent>
          </Card>
          <Card className="group bg-white/50 backdrop-blur-sm border-2 hover:border-purple-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <CardHeader className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-600 transition-colors duration-300">
                <Share2 className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <CardTitle className="text-2xl">Connect</CardTitle>
              <CardDescription className="text-lg">
                Build your network
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                Engage with other writers and readers in our vibrant community
                of storytellers.
              </p>
            </CardContent>
          </Card>
          <Card className="group bg-white/50 backdrop-blur-sm border-2 hover:border-indigo-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <CardHeader className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-600 transition-colors duration-300">
                <Compass className="w-8 h-8 text-indigo-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <CardTitle className="text-2xl">Discover</CardTitle>
              <CardDescription className="text-lg">
                Explore new content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                Find inspiring stories and unique perspectives from diverse
                writers worldwide.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
