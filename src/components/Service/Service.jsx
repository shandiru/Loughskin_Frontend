import { Link } from "react-router-dom";
import { Sparkles, Flower2, Waves, Zap, ArrowRight } from "lucide-react";

export default function ServicesSection() {
  const categories = [
    {
      _id: "1",
      name: "Facials",
      icon: <Sparkles size={28} className="text-[#a67c5b]" />,
      description:
        "Deeply cleanse, exfoliate, and hydrate your skin using advanced techniques.",
      features: ["Deep Cleansing", "Anti-Aging", "Hydration"],
    },
    {
      _id: "2",
      name: "Massage Therapy",
      icon: <Flower2 size={28} className="text-[#a67c5b]" />,
      description:
        "Relaxation therapies to reduce stress and muscle tension.",
      features: ["Swedish", "Aromatherapy", "Hot Stone"],
    },
    {
      _id: "3",
      name: "Headspa",
      icon: <Waves size={28} className="text-[#a67c5b]" />,
      description:
        "Japanese-inspired scalp and relaxation ritual.",
      features: ["Scalp Care", "Relaxation", "Growth"],
    },
    {
      _id: "4",
      name: "Body Contouring",
      icon: <Zap size={28} className="text-[#a67c5b]" />,
      description:
        "Non-invasive sculpting and lymphatic drainage.",
      features: ["Fat Reduction", "Sculpting", "Drainage"],
    },
  ];

  return (
    <section className="py-20 bg-white px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm uppercase tracking-widest text-[#a67c5b] mb-2">
            What We Do
          </h2>
          <p className="text-4xl font-serif font-bold">
            Our Signature Treatments
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="bg-[#faf9f7] rounded-3xl p-8 hover:-translate-y-2 transition shadow-md"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6">
                {cat.icon}
              </div>

              <h3 className="text-2xl font-bold mb-3">{cat.name}</h3>
              <p className="text-gray-600 text-sm mb-6">{cat.description}</p>

              <Link
                to={`/services#${cat.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="flex items-center justify-between font-bold text-[#1f7fa3]"
              >
                Learn More
                <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}