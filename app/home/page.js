"use client";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebaseConfig";
import { auth } from "../../firebase/firebaseConfig"; // Import Firebase Auth
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { v4 } from "uuid";

const HomePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    coverImage: null,
    category: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showBlogs, setShowBlogs] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch current user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe(); // Clean up subscription
  }, []);

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateBlog = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);

      if (!currentUser) {
        alert("You need to be logged in to create a blog post.");
        return;
      }

      const blogData = {
        ...formData,
        id: v4(),
        author: currentUser.displayName || currentUser.email, 
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "blogs"), blogData);
      setFormData({
        title: "",
        description: "",
        coverImage: null,
        category: "",
      });
      alert("Blog created successfully!");
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Error creating blog.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, coverImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchBlogs = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const blogList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogList);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Create a Blog Post
          </h1>
          <Button
            onClick={() => setShowBlogs(!showBlogs)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Link href="/blog"> View All Blogs</Link>
          </Button>
        </div>

        {showBlogs ? (
          <div className="grid gap-4 md:grid-cols-2">
            {blogs.map((blog) => (
              <div key={blog.id} className="p-4 bg-white rounded-lg shadow">
                <h3 className="text-xl font-semibold">{blog.title}</h3>
                <p className="text-gray-600 mt-2">{blog.description}</p>
                <span className="text-sm text-blue-600 mt-2 block">
                  {blog.category}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <form
            className="bg-white rounded-lg shadow-lg p-6 space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <Input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            <div>
              <Textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className={errors.description ? "border-red-500" : ""}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            

            <div>
              <Input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
                className={errors.category ? "border-red-500" : ""}
              />
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                onClick={() =>
                  setFormData({
                    title: "",
                    description: "",
                    coverImage: null,
                    category: "",
                  })
                }
                variant="outline"
              >
                Clear
              </Button>
              <Button
                onClick={handleCreateBlog}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? "Creating..." : "Create Blog"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default HomePage;
