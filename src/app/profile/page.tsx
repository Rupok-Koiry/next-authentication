"use client";
import { signOut, useSession } from "next-auth/react";

export default function Profile() {
  const { data: session } = useSession();
  if (!session) return null;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          User Profile
        </h2>
        <div className="text-center">
          <img
            src={
              "https://static.vecteezy.com/system/resources/thumbnails/029/711/176/small_2x/developer-with-ai-generated-free-png.png"
            }
            alt="User Avatar"
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-500"
          />
          <h3 className="text-xl font-semibold text-gray-700">
            {session.user?.name}
          </h3>
          <p className="text-gray-600 mb-6">{session.user?.email}</p>
          <button
            onClick={() => signOut()}
            className="inline-block bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
