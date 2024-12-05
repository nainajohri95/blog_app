import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Dummy data
const blogs = [
  {
    title: "Getting Started with Web Development",
    description:
      "Learn the fundamentals of web development including HTML, CSS, and JavaScript...",
    slug: "getting-started-with-web-development",
    coverImage: "/api/placeholder/800/400",
    category: "Development",
    author: {
      name: "John Doe",
      avatar: "/api/placeholder/40/40",
    },
    publishedAt: "2024-04-02",
  },
  {
    title: "Modern React Best Practices",
    description:
      "Discover the latest React patterns and techniques for building scalable applications...",
    slug: "modern-react-best-practices",
    coverImage: "/api/placeholder/800/400",
    category: "React",
    author: {
      name: "Jane Smith",
      avatar: "/api/placeholder/40/40",
    },
    publishedAt: "2024-04-01",
  },
  {
    title: "CSS Grid Mastery",
    description:
      "Master CSS Grid layout system for creating complex web layouts with ease...",
    slug: "css-grid-mastery",
    coverImage: "/api/placeholder/800/400",
    category: "CSS",
    author: {
      name: "Mike Johnson",
      avatar: "/api/placeholder/40/40",
    },
    publishedAt: "2024-03-31",
  },
  {
    title: "TypeScript Advanced Concepts",
    description:
      "Deep dive into TypeScript's advanced features, generics, and type manipulation techniques...",
    slug: "typescript-advanced-concepts",
    coverImage: "/api/placeholder/800/400",
    category: "TypeScript",
    author: {
      name: "Sarah Wilson",
      avatar: "/api/placeholder/40/40",
    },
    publishedAt: "2024-03-30",
  },
  {
    title: "DevOps Best Practices Guide",
    description:
      "Essential DevOps practices for modern software development and deployment pipelines...",
    slug: "devops-best-practices",
    coverImage: "/api/placeholder/800/400",
    category: "DevOps",
    author: {
      name: "Alex Thompson",
      avatar: "/api/placeholder/40/40",
    },
    publishedAt: "2024-03-29",
  },
  {
    title: "Mobile-First Design Principles",
    description:
      "Learn how to create effective mobile-first designs that scale beautifully across devices...",
    slug: "mobile-first-design",
    coverImage: "/api/placeholder/800/400",
    category: "Design",
    author: {
      name: "Emma Davis",
      avatar: "/api/placeholder/40/40",
    },
    publishedAt: "2024-03-28",
  },
];

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-5 py-3">
        <h1 className="text-4xl font-bold mb-3 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
          Blog Posts
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg ">
          Explore our latest articles
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link
              href={`/blog/${blog.slug}`}
              key={blog.slug}
              className="block transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <Card className="h-full overflow-hidden bg-white dark:bg-gray-800 border-0 shadow-lg">
                <div className="relative w-full h-48 overflow-hidden">
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 text-sm font-medium rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
                      {blog.category}
                    </span>
                  </div>
                  <img
                    src="./blog2.jpg"
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <CardHeader className="space-y-2">
                  <CardTitle className="text-2xl font-bold line-clamp-2 min-h-[4rem]">
                    {blog.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 text-gray-600 dark:text-gray-400 min-h-[3rem]">
                    {blog.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8 ring-2 ring-purple-500">
                      <AvatarImage
                        src={blog.author.avatar}
                        alt={blog.author.name}
                      />
                      <AvatarFallback className="bg-purple-100 text-purple-700">
                        {blog.author.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {blog.author.name}
                    </span>
                  </div>
                  <time className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
