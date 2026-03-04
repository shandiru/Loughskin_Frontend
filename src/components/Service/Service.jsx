import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getActiveServicesGrouped } from "../../api/serviceApi";

export default function ServicesSection() {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const result = await getActiveServicesGrouped();
    setData(result);
  };

  return (
    <section className="py-20 px-4 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Category Filter Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-16">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-full font-semibold transition-all border ${
              selectedCategory === null 
                ? "bg-[#C9AF94] text-white border-[#C9AF94]" 
                : "bg-transparent text-gray-500 border-gray-200 hover:border-[#C9AF94]"
            }`}
          >
            All Services
          </button>

          {data.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setSelectedCategory(cat._id)}
              className={`px-6 py-2 rounded-full font-semibold transition-all border ${
                selectedCategory === cat._id 
                  ? "bg-[#C9AF94] text-white border-[#C9AF94]" 
                  : "bg-transparent text-gray-500 border-gray-200 hover:border-[#C9AF94]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        {data
          .filter((cat) => !selectedCategory || cat._id === selectedCategory)
          .map((cat) => (
            <div key={cat._id} className="mb-20">
              <div className="mb-8 border-l-4 border-[#22B8C8] pl-4">
                <h2 className="text-3xl font-bold text-gray-900">{cat.name}</h2>
                <p className="text-gray-500 mt-2 max-w-2xl">{cat.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cat.services.length > 0 ? (
                  cat.services.map((service) => (
                    <div
                      key={service._id}
                      className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#22B8C8] transition-colors mb-4">
                          {service.name}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-3 mb-6">
                          {service.description}
                        </p>
                      </div>

                      <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
                        <div>
                          <span className="block text-xs uppercase tracking-widest text-[#C9AF94]">Price</span>
                          <span className="text-lg font-bold text-gray-900">£{service.price}</span>
                        </div>
                        
                        <Link
                          to={`/service/${service._id}`}
                          className="bg-[#22B8C8] text-white px-5 py-2 rounded-xl text-sm font-bold hover:opacity-90 transition"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 italic">No services available</p>
                )}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}