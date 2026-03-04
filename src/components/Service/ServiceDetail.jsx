import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getServiceById } from "../../api/serviceApi";

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, accessToken } = useSelector((state) => state.auth);

  const [service, setService] = useState(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => { loadService(); }, [id]);

  const loadService = async () => {
    const data = await getServiceById(id);
    setService(data);
  };

  const handleBookClick = () => {
    if (accessToken && user) {
      navigate(`/book/${id}`);
    } else {
      setShowLoginPrompt(true);
    }
  };

  if (!service) return (
    <div className="flex justify-center items-center h-screen bg-white text-[#22B8C8]">Loading...</div>
  );

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto py-12 px-6">

        <Link to="/services" className="flex items-center text-[#C9AF94] font-semibold mb-10 hover:translate-x-[-5px] transition-transform">
          <span className="mr-2">←</span> Back to Services
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <span className="inline-block bg-[#F5F5F5] text-[#C9AF94] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              {service.category?.name}
            </span>
            <h1 className="text-5xl font-bold text-gray-900 mb-8">{service.name}</h1>
            <div className="prose prose-lg max-w-none">
              <h3 className="text-xl font-bold text-[#22B8C8] mb-4">Treatment Description</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">{service.description}</p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-[#F5F5F5] rounded-[2rem] p-10 sticky top-10 border border-gray-100">
              <h3 className="text-2xl font-bold mb-8 text-gray-800 border-b border-[#C9AF94] pb-2">Booking Info</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-500 font-medium">Price</span>
                  <span className="text-3xl font-black text-gray-900">£{service.price}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-500 font-medium">Duration</span>
                  <span className="text-gray-900 font-bold">{service.duration} Minutes</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-500 font-medium">Gender</span>
                  <span className="text-gray-900 font-bold capitalize">{service.genderRestriction || "All"}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-500 font-medium">Deposit</span>
                  <span className="text-gray-900 font-bold">{(service.depositPercentage * 100).toFixed(0)}%</span>
                </div>
              </div>

              <button
                onClick={handleBookClick}
                className="w-full mt-10 bg-[#22B8C8] text-white py-5 rounded-2xl font-bold text-lg hover:bg-opacity-90 transition-all shadow-md">
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center">
            <div className="text-5xl mb-4">🔒</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Login Required</h2>
            <p className="text-gray-500 text-sm mb-6">
              Please sign in to book <strong>{service.name}</strong>
            </p>
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-[#22B8C8] text-white font-bold py-3 rounded-xl hover:bg-opacity-90 transition-all mb-3">
              Sign In
            </button>
            <button
              onClick={() => navigate("/register")}
              className="w-full border-2 border-[#22B8C8] text-[#22B8C8] font-bold py-3 rounded-xl hover:bg-[#22B8C8]/10 transition-all mb-4">
              Create Account
            </button>
            <button onClick={() => setShowLoginPrompt(false)}
              className="text-gray-400 text-sm hover:underline">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}