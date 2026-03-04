import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../api/authApi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(null);

  const startCountdown = () => {
    let seconds = 300;
    setCountdown(seconds);
    const interval = setInterval(() => {
      seconds -= 1;
      setCountdown(seconds);
      if (seconds <= 0) { 
        clearInterval(interval); 
        setCountdown(0); 
      }
    }, 1000);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await forgotPassword(email);
      setStatus("success");
      setMessage(res.message || "Reset link sent! Please check your email inbox.");
      startCountdown();
    } catch (err) {
      setStatus("error");
      setMessage(err || "Something went wrong. Please try again.");
    }
  };

  const canResend = countdown === 0;

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-4">
      <div className="bg-white rounded-[2.5rem] shadow-xl w-full max-w-md p-10 border border-gray-100">

        <div className="flex flex-col items-center mb-10 text-center">
          <img src="/logo.webp" alt="Lough Skin" className="h-20 mb-6 object-contain" />
          <h1 className="text-3xl font-bold text-[#22B8C8]">Forgot Password</h1>
          <p className="text-sm text-gray-500 mt-3 px-4">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {/* Countdown Timer using Teal color */}
        {countdown !== null && countdown > 0 && (
          <div className="mb-6 bg-[#F5F5F5] border border-[#22B8C8]/20 text-gray-700 p-4 rounded-2xl text-sm text-center">
            Reset link expires in <span className="font-bold text-[#22B8C8]">{formatTime(countdown)}</span>
          </div>
        )}
        
        {countdown === 0 && (
          <div className="mb-6 bg-gray-50 border border-gray-200 text-gray-600 p-4 rounded-2xl text-sm text-center italic">
            Link expired — you can request a new one below.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2 ml-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@example.com"
              autoComplete="email"
              disabled={status === "loading" || (countdown !== null && countdown > 0)}
              className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C9AF94] transition-all bg-white disabled:bg-gray-50"
            />
          </div>

          {message && (
            <div className={`text-sm font-medium p-4 rounded-xl text-center border ${
              status === "success" 
                ? "bg-[#F5F5F5] border-[#22B8C8]/30 text-[#22B8C8]" 
                : "bg-gray-50 border-gray-200 text-gray-600"
            }`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading" || (countdown !== null && countdown > 0)}
            className="w-full py-4 rounded-xl bg-[#22B8C8] text-white font-bold shadow-lg shadow-[#22B8C8]/20 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
          >
            {status === "loading" 
              ? "Sending..." 
              : countdown !== null && countdown > 0 
                ? `Wait ${formatTime(countdown)}` 
                : canResend 
                  ? "Resend Reset Link" 
                  : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-10 text-sm text-center text-gray-500">
          Remember your password?{" "}
          <Link to="/login" className="text-[#C9AF94] font-bold hover:underline ml-1">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;