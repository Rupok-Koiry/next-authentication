"use client";
import { createUser } from "@/utils/apiUsers";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await createUser({ name, email, password });
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (res?.error) {
        toast.error(res.error);
      } else {
        router.push("/");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <div className="bg-white shadow-2xl rounded-xl p-8 max-w-md w-full relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 opacity-20"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
            Create Your Account
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-purple-500 focus:outline-none transition-all"
              />
            </div>
            <div className="mb-5">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-purple-500 focus:outline-none transition-all"
              />
            </div>
            <div className="mb-8">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-purple-500 focus:outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 shadow-lg transition duration-300 transform hover:scale-105"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center text-gray-500 text-sm mt-6">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-purple-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
