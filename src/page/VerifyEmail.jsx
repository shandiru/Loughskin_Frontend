import { useSearchParams, Link } from "react-router-dom";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const email = searchParams.get("email");

  if (!status) {
    return (
      <div className="min-h-screen bg-brand-soft flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 text-center">
          <img src="/logo.webp" alt="Lough Skin" className="mx-auto h-20 object-contain mb-6" />
          <h1 className="text-xl font-semibold text-brand mb-2">Check Your Email</h1>
          <p className="text-gray-500 text-sm mb-6">Click the verification link we sent to your inbox to activate your account.</p>
          <Link to="/register" className="text-brand text-sm font-medium hover:underline">Back to Register</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-soft flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 text-center">
        <img src="/logo.webp" alt="Lough Skin" className="mx-auto h-20 object-contain mb-6" />

        {status === "success" ? (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-brand mb-2">Email Verified</h1>
            <p className="text-gray-600 text-sm mb-2">Your account for <strong>{email}</strong> is now active.</p>
            <p className="text-gray-500 text-sm mb-8">You can now sign in to book appointments.</p>
            <Link to="/login" className="block w-full bg-brand text-white py-2.5 rounded-lg font-medium shadow-md hover:opacity-90 transition">
              Go to Login
            </Link>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-red-500 mb-2">Link Expired</h1>
            <p className="text-gray-600 text-sm mb-8">This verification link has expired or is invalid. Please register again to get a new link.</p>
            <Link to="/register" className="block w-full bg-brand text-white py-2.5 rounded-lg font-medium shadow-md hover:opacity-90 transition">
              Back to Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;