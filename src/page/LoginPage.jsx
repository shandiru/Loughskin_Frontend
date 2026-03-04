import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess, setError, clearError } from "../store/slices/authSlice";
import { loginCustomer, resendVerification } from "../api/authApi";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [notVerified, setNotVerified] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState("");
  const [resendStatus, setResendStatus] = useState("idle");
  const [resendMsg, setResendMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (message) setMessage("");
    setNotVerified(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    setNotVerified(false);
    dispatch(clearError());

    try {
      const data = await loginCustomer(form);
      dispatch(loginSuccess({ accessToken: data.accessToken, user: data.user }));
      navigate("/");
    } catch (err) {
      setStatus("error");
      if (err.notVerified) {
        setNotVerified(true);
        setUnverifiedEmail(err.email || form.email);
        setMessage(err.message);
      } else {
        setMessage(err.message || "Login failed.");
        dispatch(setError(err.message));
      }
    }
  };

  const handleResend = async () => {
    setResendStatus("loading");
    setResendMsg("");
    try {
      const data = await resendVerification(unverifiedEmail);
      setResendStatus("success");
      setResendMsg(data.message);
    } catch (err) {
      setResendStatus("error");
      setResendMsg(err);
    }
  };

  return (
    // Background using #F5F5F5 (Soft white/light gray)
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-[2rem] p-10 border border-gray-100">

        <div className="text-center mb-10">
          <img src="/logo.webp" alt="Lough Skin" className="mx-auto h-20 object-contain mb-4" />
          {/* Text using #22B8C8 (Teal) */}
          <h1 className="text-3xl font-bold text-[#22B8C8]">Welcome Back</h1>
          <p className="text-gray-500 text-sm mt-2">Sign in to continue your journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2 ml-1">Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="name@example.com"
              // Focus ring using #C9AF94 (Beige)
              className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C9AF94] transition-all bg-white"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2 ml-1">
              <label className="text-sm font-semibold text-gray-600">Password</label>
              {/* Link using #C9AF94 */}
              <Link to="/forgot-password" size="sm" className="text-xs font-bold text-[#C9AF94] hover:opacity-80">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C9AF94] transition-all bg-white"
              />
              <button 
                type="button" 
                onClick={() => setShowPass(!showPass)} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C9AF94] text-xs font-bold uppercase tracking-wider"
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Error / Status Messages */}
          {message && (
            <div className={`text-sm rounded-xl px-4 py-3 border ${notVerified ? "bg-[#F5F5F5] border-[#C9AF94] text-gray-700" : "bg-gray-50 border-gray-200 text-gray-600"}`}>
              <p className="font-medium">{message}</p>
              {notVerified && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-2">Check your inbox: <strong>{unverifiedEmail}</strong></p>
                  <button type="button" onClick={handleResend}
                    disabled={resendStatus === "loading" || resendStatus === "success"}
                    className="text-sm font-bold text-[#22B8C8] hover:underline disabled:opacity-50">
                    {resendStatus === "loading" ? "Sending..." : resendStatus === "success" ? "Sent Successfully!" : "Resend Verification"}
                  </button>
                  {resendMsg && (
                    <p className="text-xs mt-2 font-medium text-[#C9AF94]">{resendMsg}</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Submit Button using #22B8C8 */}
          <button 
            type="submit" 
            disabled={status === "loading"}
            className="w-full bg-[#22B8C8] text-white py-4 rounded-xl font-bold shadow-lg shadow-[#22B8C8]/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {status === "loading" ? "Verifying..." : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-8 text-sm text-gray-500">
          New to Lough Skin?{" "}
          <Link to="/register" className="text-[#C9AF94] font-bold hover:underline">Create Account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;