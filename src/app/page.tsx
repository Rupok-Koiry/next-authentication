import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-400">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome to Our Next Authentication App!
        </h1>
        {!session ? (
          <>
            <p className="text-lg text-gray-600 mb-6">
              Please sign in to access your profile and explore the app.
            </p>
            <Link
              href="/sign-in"
              className="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Sign In
            </Link>
            <p className="mt-4 text-gray-500">
              Don’t have an account?{" "}
              <Link href="/sign-up" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </>
        ) : (
          <>
            <p className="text-lg text-gray-600 mb-6">
              Welcome back, {session.user.name}! You’re signed in.
            </p>
            <Link
              href="/profile"
              className="inline-block bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Go to Profile
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
