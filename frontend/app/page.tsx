import { FaUserShield } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-300">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-lg text-center flex flex-col items-center">
        <FaUserShield className="text-orange-500 text-6xl mb-6" />
        <h1 className="text-4xl font-extrabold mb-4 text-gray-900">Welcome to the Dashboard App</h1>
        <p className="mb-8 text-gray-600 text-lg">Your one-stop solution for managing products and more. Please log in to access your dashboard.</p>
        <a
          href="/login"
          className="inline-block bg-orange-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow hover:bg-orange-700 transition-all duration-200"
        >
          Go to Login
        </a>
      </div>
    </div>
  );
}
