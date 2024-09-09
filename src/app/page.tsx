import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-teal-500">
      <div className="bg-white shadow-xl rounded-xl p-10 max-w-lg w-full text-center relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-teal-400 opacity-30"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
            Welcome to Next Auth App!
          </h1>
          {!session ? (
            <>
              <p className="text-lg text-gray-700 mb-8">
                Discover a world of secure authentication. Sign in to access
                your profile and explore personalized features.
              </p>
              <Link
                href="/sign-in"
                className="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 shadow-md transform hover:scale-105 transition duration-300"
              >
                Sign In
              </Link>
              <p className="mt-4 text-gray-500">
                Don’t have an account yet?{" "}
                <Link href="/sign-up" className="text-blue-600 hover:underline">
                  Sign Up Now
                </Link>
              </p>
            </>
          ) : (
            <>
              <p className="text-lg text-gray-700 mb-8">
                Welcome back,{" "}
                <span className="font-bold">{session.user.name}</span>! Ready to
                explore your personalized dashboard?
              </p>
              <Link
                href="/profile"
                className="inline-block bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 shadow-md transform hover:scale-105 transition duration-300"
              >
                Go to Profile
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
