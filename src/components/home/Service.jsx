import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getActiveServicesGrouped } from "../../api/serviceApi";
import { Tag, ArrowRight, Sparkles } from "lucide-react";

export default function ServicesSection() {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const result = await getActiveServicesGrouped();
    setData(result);
  };

  const filtered = data.filter(
    (cat) => !selectedCategory || cat._id === selectedCategory
  );

  return (
    <section className="min-h-screen py-24 px-4 bg-gradient-to-br from-[#fdf8f4] via-[#f5ede4] to-[#fdf8f4]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-[#C9AF94]/30 text-[#C9AF94] text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-6 shadow-sm">
            <Sparkles size={12} />
            What We Offer
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
            Our <span className="text-[#22B8C8]">Services</span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            Tailored treatments crafted for your skin's unique needs — experience the Lough Skin difference.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-16">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 ${
              selectedCategory === null
                ? "bg-gradient-to-r from-[#22B8C8] to-[#1a9aad] text-white border-transparent shadow-lg shadow-[#22B8C8]/20"
                : "bg-white/70 text-gray-500 border-gray-200 hover:border-[#C9AF94] hover:text-[#C9AF94]"
            }`}
          >
            All Services
          </button>

          {data.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setSelectedCategory(cat._id)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 ${
                selectedCategory === cat._id
                  ? "bg-gradient-to-r from-[#22B8C8] to-[#1a9aad] text-white border-transparent shadow-lg shadow-[#22B8C8]/20"
                  : "bg-white/70 text-gray-500 border-gray-200 hover:border-[#C9AF94] hover:text-[#C9AF94]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Services by Category */}
        {filtered.map((cat) => (
          <div key={cat._id} className="mb-20">

            {/* Category Header */}
            <div className="mb-10">
              <div className="w-12 h-0.5 bg-gradient-to-r from-[#22B8C8] to-[#C9AF94] rounded-full mb-3" />
              <div className="flex items-end justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-4xl font-bold text-gray-900">{cat.name}</h2>
                  {cat.description && (
                    <p className="text-gray-400 mt-2 max-w-2xl text-sm leading-relaxed">
                      {cat.description}
                    </p>
                  )}
                </div>
                <span className="text-xs font-semibold tracking-widest uppercase text-[#C9AF94] bg-[#f5ede4] border border-[#C9AF94]/20 px-4 py-2 rounded-full">
                  {cat.services.length} {cat.services.length === 1 ? "Service" : "Services"}
                </span>
              </div>
            </div>

            {/* Cards */}
            {cat.services.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.services.map((service) => (
                  <div
                    key={service._id}
                    className="relative group bg-white rounded-3xl p-7 flex flex-col justify-between gap-6 border border-[#C9AF94]/20 shadow-sm hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#22B8C8]/10 hover:border-[#22B8C8]/25 transition-all duration-300"
                  >
                    {/* Top accent line */}
                    <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-[#C9AF94] to-[#22B8C8] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div>
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#22B8C8] leading-tight transition-colors duration-300">
                          {service.name}
                        </h3>
                        <div className="w-8 h-8 rounded-full bg-[#f5ede4] flex items-center justify-center shrink-0 mt-0.5">
                          <Tag size={13} className="text-[#C9AF94]" />
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100">
                      <div className="bg-gradient-to-br from-[#f5ede4] to-[#ecddd0] rounded-xl px-4 py-2.5">
                        <span className="block text-[10px] uppercase tracking-widest text-[#C9AF94] font-semibold mb-0.5">From</span>
                        <span className="text-xl font-bold text-gray-900">£{service.price}</span>
                      </div>

                      <Link
                        to={`/service/${service._id}`}
                        className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#22B8C8] to-[#1a9aad] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:translate-x-0.5 hover:shadow-lg hover:shadow-[#22B8C8]/30 transition-all duration-300"
                      >
                        View Details <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-16 text-gray-300 italic text-sm">
                No services available in this category.
              </p>
            )}
          </div>
        ))}

      </div>
    </section>
  );
}