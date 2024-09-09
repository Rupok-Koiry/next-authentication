"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-600">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 to-blue-400 opacity-30"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
            Welcome Back
          </h2>
          <form onSubmit={handleSubmit}>
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-indigo-500 focus:outline-none transition-all"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-indigo-500 focus:outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-3 px-4 rounded-lg hover:bg-indigo-600 shadow-lg transition duration-300 transform hover:scale-105"
            >
              Sign In
            </button>
          </form>
          <p className="text-center text-gray-500 text-sm mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-indigo-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
