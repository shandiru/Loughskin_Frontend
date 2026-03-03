import { Link } from "react-router-dom";
import { CheckCircle, Heart, Users, ShieldCheck } from "lucide-react";

export default function IntroSection() {
  const infoCards = [
    {
      icon: <ShieldCheck className="text-[#a67c5b]" size={32} />,
      title: "Qualified Experts",
      desc: "Led by trained professionals in aesthetic skincare",
    },
    {
      icon: <Heart className="text-[#a67c5b]" size={32} />,
      title: "Personalised Care",
      desc: "Every treatment is tailored to your unique skin journey",
    },
    {
      icon: <Users className="text-[#a67c5b]" size={32} />,
      title: "Trusted Community",
      desc: "Join hundreds of clients who trust us with their glow",
    },
    {
      icon: <CheckCircle className="text-[#a67c5b]" size={32} />,
      title: "Natural Results",
      desc: "Subtle enhancements for confident, radiant skin",
    },
  ];

  return (
    <section className="py-16  px-4 sm:px-8 bg-[#faf9f7]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: TEXT CONTENT (Spans 7 columns on large screens) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="inline-block bg-[#e1c9b3] text-[#5a4a3b] text-xs font-bold uppercase tracking-widest py-1 px-4 rounded-full">
                Established 2019
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
                Where Science Meets <span className="text-[#a67c5b]">Serenity</span>
              </h2>
            </div>

            <div className="space-y-6 text-gray-700 text-base sm:text-lg leading-relaxed">
              <p>
                Welcome to <span className="font-semibold">Loughskin</span> — your sanctuary for professional, results-driven
                treatments designed to restore balance, beauty, and inner calm.
              </p>
              <p>
                Experience the transformative power of our <span className="italic">Japanese-inspired Headspa</span>, the first
                of its kind in the East Midlands. This deeply relaxing ritual focuses on scalp
                health and glymphatic drainage, leaving you refreshed from head to soul.
              </p>
              <p>
                Our facials combine medical-grade technology with holistic techniques, ensuring 
                radiant results while offering a serene escape. We also offer curated body contouring, 
                lymphatic drainage, and massage options to support your detoxification.
              </p>
            </div>

            {/* CHECKLIST GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {[
                "Professional Skin Specialists",
                "Headspa Specialist",
                "Natural Body Contour Specialist",
                "Personalised Consultations",
                "Results-Driven Approach",
                "Holistic Wellness",
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3 group">
                  <CheckCircle className="text-[#62c5d2] transition-transform group-hover:scale-110" size={20} />
                  <span className="text-gray-800 font-medium">{item}</span>
                </div>
              ))}
            </div>
            
            <div className="pt-4">
               <Link to="/about" className="text-[#a67c5b] font-bold border-b-2 border-[#a67c5b] pb-1 hover:text-[#5a4a3b] hover:border-[#5a4a3b] transition-all">
                  Read Our Full Story →
               </Link>
            </div>
          </div>

          {/* RIGHT: IMAGE & CARDS (Spans 5 columns on large screens) */}
          <div className="lg:col-span-5 space-y-8">
            {/* FEATURED IMAGE WITH DECORATIVE ELEMENT */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-[#e1c9b3]/30 rounded-2xl rotate-3 group-hover:rotate-1 transition-transform"></div>
              <div className="relative h-88 sm:h-112 w-full rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/13.jpeg"
                  alt="Lough Skin Spa Interior"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>

            {/* INFO CARDS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {infoCards.map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="bg-[#faf9f7] w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-snug">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}