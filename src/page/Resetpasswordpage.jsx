import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { resetPasswordConfirm } from "../api/authApi";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [form, setForm] = useState({ newPassword: "", confirmPassword: "" });
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (!token || !email) {
      setStatus("error");
      setMessage("Invalid or missing reset link. Please request a new one.");
    }
  }, [token, email]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) { 
      setStatus("error"); 
      return setMessage("Passwords do not match!"); 
    }
    if (form.newPassword.length < 8) { 
      setStatus("error"); 
      return setMessage("Password must be at least 8 characters."); 
    }
    setStatus("loading");
    setMessage("");
    try {
      const res = await resetPasswordConfirm({ token, email, newPassword: form.newPassword });
      setStatus("success");
      setMessage(res.message || "Password reset successfully!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setStatus("error");
      setMessage(err);
    }
  };

  const passwordStrength = (pass) => {
    if (!pass) return 0; let score = 0;
    if (pass.length >= 8) score++; if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++; if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };
  const strength = passwordStrength(form.newPassword);
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
  // Using brand colors for the strength meter
  const strengthColors = ["", "bg-gray-200", "bg-[#C9AF94]", "bg-[#22B8C8]", "bg-[#22B8C8]"];

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-4">
      <div className="bg-white rounded-[2rem] shadow-xl w-full max-w-md p-10 border border-gray-100">

        <div className="flex flex-col items-center mb-8">
          <img src="/logo.webp" alt="Lough Skin" className="h-16 mb-4 object-contain" />
          <h1 className="text-2xl font-bold text-[#22B8C8]">Reset Password</h1>
          <p className="text-sm text-gray-500 text-center mt-1">Enter your new password</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-600 mb-1 ml-1">Email</label>
          <input type="email" value={email || ""} disabled
            className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-[#F5F5F5] text-gray-500 font-medium cursor-not-allowed" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1 ml-1">New Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                name="newPassword"
                required
                value={form.newPassword}
                onChange={handleChange}
                disabled={status === "success" || !token || !email}
                placeholder="Enter new password"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C9AF94] transition-all bg-white"
              />
              <button 
                type="button" 
                onClick={() => setShowPass(!showPass)} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C9AF94] text-xs font-bold uppercase tracking-wider"
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
            {form.newPassword && (
              <div className="mt-3 px-1">
                <div className="flex gap-1.5 mb-1.5">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= strength ? strengthColors[strength] : "bg-gray-100"}`} />
                  ))}
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Strength: <span className={strength >= 3 ? "text-[#22B8C8]" : "text-[#C9AF94]"}>{strengthLabels[strength]}</span>
                </p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1 ml-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                required
                value={form.confirmPassword}
                onChange={handleChange}
                disabled={status === "success" || !token || !email}
                placeholder="Confirm password"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C9AF94] transition-all bg-white"
              />
              <button 
                type="button" 
                onClick={() => setShowConfirm(!showConfirm)} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C9AF94] text-xs font-bold uppercase tracking-wider"
              >
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>
            {form.confirmPassword && form.newPassword !== form.confirmPassword && (
              <p className="text-[11px] font-bold text-[#C9AF94] mt-1 ml-1 italic tracking-wide">Passwords do not match</p>
            )}
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

          <button type="submit"
            disabled={status === "loading" || status === "success" || !token || !email}
            className="w-full py-4 rounded-xl bg-[#22B8C8] text-white font-bold shadow-lg shadow-[#22B8C8]/20 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50">
            {status === "loading" ? "Resetting..." : status === "success" ? "Done! Redirecting..." : "Reset Password"}
          </button>
        </form>

        <div className="mt-8 text-sm text-center">
          <Link to="/forgot-password" size="sm" className="text-[#C9AF94] font-bold hover:underline">
            Request a new reset link
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;