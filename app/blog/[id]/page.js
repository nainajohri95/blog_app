"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { db } from "@/firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Calendar, Clock, User, ChevronLeft } from "lucide-react";
import { use } from "react";

const SingleBlog = ({ params }) => {
  const { id } = use(params); // Resolve the `params` promise.
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const q = query(collection(db, "blogs"), where("id", "==", id));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setError("Blog not found");
          return;
        }

        const blogData = querySnapshot.docs[0].data();
        setBlog(blogData);
      } catch (error) {
        console.error("Error fetching blog data:", error);
        setError("Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-pulse space-y-4 w-full max-w-4xl px-4">
          <div className="h-32 bg-gray-200 rounded-2xl" />
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <div className="text-gray-500 text-xl mb-4">🤔</div>
          <div className="text-xl text-gray-600 font-medium mb-4">
            Blog not found
          </div>
          <button
            onClick={() => window.history.back()}
            className="text-purple-600 hover:text-purple-700 inline-flex items-center"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Navigation */}
        <button
          onClick={() => window.history.back()}
          className="text-purple-600 hover:text-purple-700 inline-flex items-center mb-8"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Articles
        </button>

        {/* Content */}
        <Card className="p-8 shadow-xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-gray-600">
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full">
                <User className="w-4 h-4 text-purple-600" />
                <span className="font-medium">{blog.author}</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full">
                <Calendar className="w-4 h-4 text-purple-600" />
                <span>
                  {blog.createdAt?.toDate().toLocaleDateString() || "No date"}
                </span>
              </div>
              {blog.category}
            </div>
          </div>

          <div className="prose prose-purple max-w-none mb-8">
            <p className="text-xl text-gray-600 leading-relaxed border-l-4 border-purple-200 pl-4 italic">
              {blog.description}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SingleBlog;
