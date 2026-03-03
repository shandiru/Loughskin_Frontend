import { Link } from "react-router-dom";

export default function HeroSection() {
  const stats = [
    { value: "500+", label: "Happy Clients" },
    { value: "10+", label: "Years of Experience" },
    { value: "100%", label: "Natural Results" },
  ];

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
      </div>

      {/* Centered Hero Content */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-10 md:p-16 shadow-2xl border border-white/20 text-center">
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6">
            Welcome to <span className="text-[#a67c5b]">LoughSkin</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-5">
            <span className="block font-semibold text-[#a67c5b] text-xl sm:text-2xl mb-2">
              A space created for calm, care, and confidence.
            </span>
          </p>
          <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed ">
            At LoughSkin, we combine expert skincare and beauty techniques to help you look and feel your best, while providing a moment of calm in your busy day.
          </p>
          <p className="max-w-2xl mx-auto text-base mt-5 mb-5 sm:text-lg md:text-xl text-gray-700 leading-relaxed">
            Every visit is designed to be more than a beauty session—it’s your moment to pause, unwind, and leave feeling refreshed and renewed.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              to="/services"
              className="group relative bg-[#62c5d2] text-white px-8 py-4 text-lg font-bold rounded-full hover:bg-[#1f7fa3] transition-all duration-300 shadow-lg hover:shadow-[#62c5d2]/40 w-full sm:w-auto"
            >
              Explore Services
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-[#62c5d2] text-[#1f7fa3] px-8 py-4 text-lg font-bold rounded-full hover:bg-[#62c5d2] hover:text-white transition-all duration-300 w-full sm:w-auto"
            >
              Free Consultation
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
            {stats.map((item, index) => (
              <div
                key={index}
                className="group bg-white/50 border border-white/50 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className="text-3xl md:text-4xl font-black text-[#a67c5b]">
                  {item.value}
                </h3>
                <p className="text-sm font-medium uppercase tracking-wider text-gray-500 mt-1">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}