import { Link } from "react-router-dom";
import { Sparkles, Flower2, Waves, Zap, ArrowRight } from "lucide-react";

export default function ServicesSection() {
  const categories = [
    {
      _id: "1",
      name: "Facials",
      icon: <Sparkles size={28} className="text-[#a67c5b]" />,
      description: "Deeply cleanse, exfoliate, and hydrate your skin using advanced medical-grade technology.",
      features: ["Deep Cleansing", "Anti-Aging", "Moisturizing", "Brightening"],
    },
    {
      _id: "2",
      name: "Massage Therapy",
      icon: <Flower2 size={28} className="text-[#a67c5b]" />,
      description: "Ultimate relaxation therapies designed to reduce stress, muscle tension and improve circulation.",
      features: ["Swedish Massage", "Aromatherapy", "Hot Stone", "Therapeutic"],
    },
    {
      _id: "3",
      name: "Headspa",
      icon: <Waves size={28} className="text-[#a67c5b]" />,
      description: "Our signature ritual combining scalp health with ancient Japanese relaxation techniques.",
      features: ["Scalp Massage", "Glymphatic Drainage", "Growth Stimulation", "Deep Relaxation"],
    },
    {
      _id: "4",
      name: "Body Contouring",
      icon: <Zap size={28} className="text-[#a67c5b]" />,
      description: "Targeted, non-invasive treatments to sculpt, shape, and support lymphatic drainage.",
      features: ["Fat Reduction", "Body Sculpting", "Lymphatic Drainage", "Cellulite Treatment"],
    },
  ];

  return (
    <section className="py-10 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#a67c5b] mb-3">
            What We Do
          </h2>
          <p className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Our Signature Treatments
          </p>
          <div className="h-1 w-20 bg-[#62c5d2] mx-auto rounded-full"></div>
        </div>

        {/* RESPONSIVE GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div
              key={category._id}
              className="group flex flex-col bg-[#faf9f7] rounded-3xl p-8 transition-all duration-300 hover:bg-[#f3ede7] hover:shadow-xl hover:-translate-y-2 border border-transparent hover:border-[#e1c9b3]"
            >
              {/* ICON CIRCLE */}
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </div>

              {/* TEXT CONTENT */}
              <div className="grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 font-serif">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {category.description}
                </p>

                {/* FEATURE TAGS */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {category.features.map((feature, i) => (
                    <span 
                      key={i} 
                      className="text-[10px] uppercase tracking-wider font-bold bg-white/50 text-gray-500 px-2 py-1 rounded-md"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* ACTION BUTTON */}
              <div className="mt-auto pt-6 border-t border-gray-200/50">
                <Link
                  to={`/services#${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="flex items-center justify-between w-full text-[#1f7fa3] font-bold group/btn"
                >
                  <span className="text-sm uppercase tracking-widest">Learn More</span>
                  <div className="p-2 bg-[#62c5d2] text-white rounded-full group-hover/btn:translate-x-1 transition-transform">
                    <ArrowRight size={16} />
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-20 text-center">
          <Link 
            to="/services" 
            className="inline-block hover:bg-[#1f7fa3] text-white px-10 py-4 rounded-full font-bold shadow-lg bg-[#62c5d2] transition-all"
          >
            View All Specialized Services
          </Link>
        </div>
      </div>
    </section>
  );
}