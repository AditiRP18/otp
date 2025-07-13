import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

const Login = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Send OTP
  const handleSendOtp = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep(2);
        setMessage("OTP sent to your email.");
      } else {
        setError(data.message || "Failed to send OTP.");
      }
    } catch (err) {
      setError("Server error.");
    }
    setLoading(false);
  };

  // Verify OTP
  const handleVerifyOtp = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Email verified! Redirecting...");
        localStorage.setItem("isAuthenticated", "true");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else {
        setError(data.message || "Failed to verify OTP.");
      }
    } catch (err) {
      setError("Server error.");
    }
    setLoading(false);
  };

  // Resend OTP
  const handleResendOtp = async () => {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("OTP resent to your email.");
      } else {
        setError(data.message || "Failed to resend OTP.");
      }
    } catch (err) {
      setError("Server error.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f6fa] p-4">
      <div className="w-full max-w-3xl flex shadow-2xl rounded-2xl overflow-hidden bg-white">
        {/* Left: Login Form */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-extrabold mb-8 text-gray-800 flex items-center gap-4">
            Sign In
            <span className="ml-auto flex gap-2">
              <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-pink-100"><svg width="20" height="20" fill="currentColor"><path d="M18.896 4.112a7.5 7.5 0 1 1-2.808-2.808l2.808 2.808zM10 2a8 8 0 1 0 8 8h-2a6 6 0 1 1-6-6V2z"/></svg></button>
              <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-pink-100"><svg width="20" height="20" fill="currentColor"><path d="M17.316 6.246c.008.176.008.352.008.528 0 5.376-4.092 11.584-11.584 11.584-2.304 0-4.448-.672-6.24-1.824.32.04.624.064.96.064 1.92 0 3.68-.656 5.088-1.76-1.792-.032-3.296-1.216-3.808-2.848.248.04.496.064.76.064.36 0 .72-.048 1.056-.144-1.872-.376-3.28-2.032-3.28-4.016v-.048c.552.304 1.184.488 1.856.512A4.13 4.13 0 0 1 .8 4.64c0-.76.208-1.472.576-2.08C3.36 5.12 6.56 6.8 10.16 6.96c-.064-.304-.096-.624-.096-.944C10.064 3.36 12.08 1.6 14.48 1.6c1.04 0 1.984.44 2.648 1.144.824-.16 1.6-.464 2.304-.88-.272.848-.848 1.552-1.6 2 .736-.088 1.44-.288 2.08-.576-.496.736-1.12 1.376-1.84 1.888z"/></svg></button>
            </span>
          </h2>
          <form onSubmit={step === 1 ? handleSendOtp : handleVerifyOtp} className="flex flex-col gap-6">
            <label className="block text-gray-700 text-lg font-bold">Email Address</label>
            <input
              type="email"
              className="w-full border-2 border-pink-200 rounded-lg px-4 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={step === 2}
            />
            {step === 2 && (
              <>
                <label className="block text-gray-700 text-lg font-bold">OTP</label>
                <input
                  type="text"
                  className="w-full border-2 border-pink-200 rounded-lg px-4 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-pink-400"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </>
            )}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700 text-lg font-bold py-3 rounded-full mt-2 shadow-md"
              disabled={loading}
            >
              {step === 1 ? (loading ? "Sending..." : "Send OTP") : (loading ? "Verifying..." : "Verify OTP")}
            </Button>
            {step === 2 && (
              <Button
                type="button"
                variant="secondary"
                className="w-full text-lg font-bold py-3 rounded-full border border-pink-300 mt-0"
                onClick={handleResendOtp}
                disabled={loading}
              >
                Resend OTP
              </Button>
            )}
            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center gap-2 text-pink-500 font-semibold text-sm">
                <input type="checkbox" className="accent-pink-500" disabled /> Remember Me
              </label>
              <a href="#" className="text-sm text-gray-400 hover:text-pink-500 font-semibold">Forgot Password</a>
            </div>
            {error && <div className="text-red-600 text-center text-base font-bold">{error}</div>}
            {message && <div className="text-green-600 text-center text-base font-bold">{message}</div>}
          </form>
        </div>
        {/* Right: Welcome Section */}
        <div className="w-1/2 flex flex-col justify-center items-center bg-gradient-to-br from-pink-400 to-pink-600 text-white p-10">
          <div className="w-full flex flex-col items-center">
            <h2 className="text-2xl font-extrabold mb-4 text-center">Welcome to login</h2>
            <p className="mb-6 text-center text-lg font-medium">Don't have an account?</p>
            <Button
              type="button"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-pink-600 font-bold px-8 py-2 rounded-full text-lg shadow"
              onClick={() => {}}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
