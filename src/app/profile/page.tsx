"use client";
import { signOut, useSession } from "next-auth/react";
import developerImg from "@/images/developer.webp";
import Image from "next/image";

export default function Profile() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white shadow-2xl rounded-xl p-8 max-w-md w-full relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-green-400 opacity-20"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
            User Profile
          </h2>
          <div className="text-center">
            <Image
              src={developerImg}
              alt="User Avatar"
              className="w-28 h-28 rounded-full mx-auto mb-6 border-4 border-blue-600 shadow-lg"
              width={112}
              height={112}
            />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              {session?.user?.name}
            </h3>
            <p className="text-lg text-gray-600 mb-6">{session?.user?.email}</p>
            <button
              onClick={() => signOut()}
              className="inline-block bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 shadow-lg transform hover:scale-105 transition duration-300"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
