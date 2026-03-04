import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getServiceById } from "../../api/serviceApi";
import {
  ArrowLeft, Clock, PoundSterling, Users,
  Wallet, CalendarCheck, LogIn, UserPlus, X, Sparkles
} from "lucide-react";

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
    <div className="flex flex-col justify-center items-center h-screen bg-[#fdf8f4] gap-4">
      <div className="w-10 h-10 rounded-full border-4 border-gray-200 border-t-[#22B8C8] animate-spin" />
      <span className="text-[#C9AF94] text-sm font-medium tracking-widest uppercase">Loading...</span>
    </div>
  );

  const infoItems = [
    { icon: <PoundSterling size={16} />, label: "Price",    value: `£${service.price}`, big: true },
    { icon: <Clock size={16} />,         label: "Duration", value: `${service.duration} Minutes`, big: false },
    { icon: <Users size={16} />,         label: "Gender",   value: service.genderRestriction ? service.genderRestriction.charAt(0).toUpperCase() + service.genderRestriction.slice(1) : "All", big: false },
    { icon: <Wallet size={16} />,        label: "Deposit",  value: `${(service.depositPercentage * 100).toFixed(0)}%`, big: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf8f4] via-[#f5ede4] to-[#fdf8f4]">
      <div className="max-w-6xl mx-auto py-12 px-6">

        {/* Back */}
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-[#C9AF94] text-sm font-semibold px-4 py-2 rounded-full bg-[#C9AF94]/10 border border-[#C9AF94]/20 hover:bg-[#C9AF94]/20 hover:-translate-x-1 transition-all mb-10"
        >
          <ArrowLeft size={14} /> Back to Services
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 bg-white/70 border border-[#C9AF94]/25 text-[#C9AF94] text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5 shadow-sm">
              <Sparkles size={11} />
              {service.category?.name}
            </div>

            <div className="w-12 h-0.5 bg-gradient-to-r from-[#22B8C8] to-[#C9AF94] rounded-full mb-3" />
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-8">
              {service.name}
            </h1>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/80 shadow-sm">
              <h3 className="text-xl font-bold text-[#22B8C8] mb-5">Treatment Description</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line text-base">
                {service.description}
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl border border-[#C9AF94]/20 shadow-sm p-10 sticky top-28">
              <div className="w-12 h-0.5 bg-gradient-to-r from-[#22B8C8] to-[#C9AF94] rounded-full mb-3" />
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Booking Info</h3>

              <div className="divide-y divide-gray-100">
                {infoItems.map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-4">
                    <span className="flex items-center gap-2 text-sm text-gray-400 font-medium">
                      <span className="text-[#C9AF94]">{item.icon}</span>
                      {item.label}
                    </span>
                    <span className={`font-bold text-gray-900 ${item.big ? "text-3xl" : "text-base"}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleBookClick}
                className="w-full mt-8 bg-gradient-to-r from-[#22B8C8] to-[#1a9aad] text-white py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#22B8C8]/30 transition-all"
              >
                <CalendarCheck size={18} /> Book Appointment
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Modal */}
      {showLoginPrompt && (
        <div
          className="fixed inset-0 bg-black/45 backdrop-blur-sm z-50 flex items-center justify-center px-4"
          onClick={() => setShowLoginPrompt(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl p-10 max-w-sm w-full text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowLoginPrompt(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-all"
            >
              <X size={14} />
            </button>

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f0fafa] to-[#e0f7fa] flex items-center justify-center mx-auto mb-5 shadow-sm">
              <CalendarCheck size={28} className="text-[#22B8C8]" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign In to Book</h2>
            <p className="text-gray-400 text-sm mb-7 leading-relaxed">
              Please sign in to book <strong className="text-gray-600">{service.name}</strong>
            </p>

            <button
              onClick={() => navigate("/login")}
              className="w-full bg-gradient-to-r from-[#22B8C8] to-[#1a9aad] text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#22B8C8]/25 transition-all mb-3"
            >
              <LogIn size={15} /> Sign In
            </button>

            <button
              onClick={() => navigate("/register")}
              className="w-full border border-[#C9AF94]/50 text-[#C9AF94] font-semibold py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#fdf8f4] hover:border-[#C9AF94] transition-all mb-5"
            >
              <UserPlus size={15} /> Create Account
            </button>

            <button
              onClick={() => setShowLoginPrompt(false)}
              className="text-gray-400 text-sm hover:text-gray-600 hover:underline transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}