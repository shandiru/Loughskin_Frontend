import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { registerCustomer, resendVerification } from "../api/authApi";

const Register = () => {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "",
    phone: "", gender: "", password: "", confirmPassword: "",
  });
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(null);
  const [resendStatus, setResendStatus] = useState("idle");
  const [resendMsg, setResendMsg] = useState("");
  const timerRef = useRef(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const startCountdown = () => {
    let seconds = 300;
    setCountdown(seconds);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) { clearInterval(timerRef.current); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (form.password !== form.confirmPassword) { setStatus("error"); return setMessage("Passwords do not match!"); }
    if (form.password.length < 8) { setStatus("error"); return setMessage("Password must be at least 8 characters."); }
    setStatus("loading");
    try {
      const { confirmPassword, ...data } = form;
      const res = await registerCustomer(data);
      setStatus("success");
      setMessage(res.message);
      startCountdown();
    } catch (err) { setStatus("error"); setMessage(err); }
  };

  const handleResend = async () => {
    setResendStatus("loading"); setResendMsg("");
    try {
      const res = await resendVerification(form.email);
      setResendStatus("success"); setResendMsg(res.message); startCountdown();
    } catch (err) { setResendStatus("error"); setResendMsg(err); }
  };

  const canResend = countdown === 0;

  const passwordStrength = (pass) => {
    if (!pass) return 0; let score = 0;
    if (pass.length >= 8) score++; if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++; if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };
  const strength = passwordStrength(form.password);
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
  // Used brand colors for strength meter
  const strengthColors = ["", "bg-gray-300", "bg-[#C9AF94]", "bg-[#22B8C8]", "bg-[#22B8C8]"];

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-[2.5rem] p-10 border border-gray-100">

        <div className="text-center mb-10">
          <img src="/logo.webp" alt="Lough Skin" className="mx-auto h-20 object-contain mb-4" />
          <h1 className="text-3xl font-bold text-[#22B8C8]">Create Account</h1>
          <p className="text-gray-500 text-sm mt-2">Join Lough Skin to book your treatments</p>
        </div>

        {/* Status Alerts using brand colors */}
        {countdown !== null && countdown > 0 && (
          <div className="mb-8 bg-[#F5F5F5] border border-[#22B8C8]/20 text-gray-700 rounded-2xl px-6 py-3 text-sm text-center">
            Verification link expires in <span className="font-bold text-[#22B8C8]">{formatTime(countdown)}</span>
          </div>
        )}

        {status !== "success" ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2 ml-1">First Name</label>
                <input type="text" name="firstName" required value={form.firstName} onChange={handleChange} placeholder="Jane"
                  className="w-full rounded-xl px-4 py-3 bg-white border border-gray-200 focus:ring-2 focus:ring-[#C9AF94] outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2 ml-1">Last Name</label>
                <input type="text" name="lastName" required value={form.lastName} onChange={handleChange} placeholder="Doe"
                  className="w-full rounded-xl px-4 py-3 bg-white border border-gray-200 focus:ring-2 focus:ring-[#C9AF94] outline-none transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2 ml-1">Email Address</label>
              <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="jane@example.com"
                className="w-full rounded-xl px-4 py-3 bg-white border border-gray-200 focus:ring-2 focus:ring-[#C9AF94] outline-none transition-all" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2 ml-1">Phone (UK)</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="07123 456789"
                  className="w-full rounded-xl px-4 py-3 bg-white border border-gray-200 focus:ring-2 focus:ring-[#C9AF94] outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2 ml-1">Gender</label>
                <select name="gender" value={form.gender} onChange={handleChange}
                  className="w-full rounded-xl px-4 py-3 bg-white border border-gray-200 focus:ring-2 focus:ring-[#C9AF94] outline-none transition-all appearance-none cursor-pointer">
                  <option value="">Select</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2 ml-1">Password</label>
                <input type="password" name="password" required value={form.password} onChange={handleChange} placeholder="Min 8 chars"
                    className="w-full rounded-xl px-4 py-3 bg-white border border-gray-200 focus:ring-2 focus:ring-[#C9AF94] outline-none transition-all" />
                {form.password && (
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
                <label className="block text-sm font-semibold text-gray-600 mb-2 ml-1">Confirm Password</label>
                <input type="password" name="confirmPassword" required value={form.confirmPassword} onChange={handleChange} placeholder="Repeat password"
                    className="w-full rounded-xl px-4 py-3 bg-white border border-gray-200 focus:ring-2 focus:ring-[#C9AF94] outline-none transition-all" />
                {form.confirmPassword && form.password !== form.confirmPassword && (
                    <p className="text-[#C9AF94] text-xs font-bold mt-2 ml-1 italic">Passwords don't match</p>
                )}
                </div>
            </div>

            {message && status !== "success" && (
              <div className="text-sm font-medium rounded-xl px-4 py-3 bg-gray-50 border border-gray-100 text-gray-600 text-center">
                {message}
              </div>
            )}

            <button type="submit" disabled={status === "loading"}
              className="w-full bg-[#22B8C8] text-white py-4 rounded-xl font-bold shadow-lg shadow-[#22B8C8]/20 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50">
              {status === "loading" ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        ) : (
          <div className="text-center space-y-8 animate-fade-in">
            <div className="bg-[#F5F5F5] rounded-[2rem] p-10 border border-gray-100">
              <div className="w-16 h-16 bg-[#22B8C8]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                 <svg className="w-8 h-8 text-[#22B8C8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Check Your Inbox</h2>
              <p className="text-gray-600 leading-relaxed">
                We sent a verification link to <br /><span className="font-bold text-gray-900">{form.email}</span>
              </p>
            </div>
            
            <div className="space-y-4 px-6">
                <p className="text-gray-400 text-xs">Didn't receive the email? Please check your spam folder.</p>
                <button onClick={handleResend}
                disabled={resendStatus === "loading" || (countdown !== null && countdown > 0)}
                className="w-full border-2 border-[#C9AF94] text-[#C9AF94] font-bold py-3 rounded-xl hover:bg-[#C9AF94] hover:text-white transition-all disabled:opacity-30">
                {resendStatus === "loading" ? "Resending..." : countdown !== null && countdown > 0 ? `Resend in ${formatTime(countdown)}` : "Resend Verification Email"}
                </button>
            </div>
            
            {resendMsg && (
              <div className="text-sm font-bold text-[#22B8C8] animate-bounce">
                {resendMsg}
              </div>
            )}
          </div>
        )}

        <div className="text-center mt-10 text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-[#C9AF94] font-bold hover:underline">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;