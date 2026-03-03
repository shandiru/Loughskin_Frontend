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
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full font-semibold ${
              selectedCategory === null ? "bg-[#a67c5b] text-white" : "bg-gray-200"
            }`}
          >
            All
          </button>

          {data.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setSelectedCategory(cat._id)}
              className={`px-4 py-2 rounded-full font-semibold ${
                selectedCategory === cat._id ? "bg-[#a67c5b] text-white" : "bg-gray-200"
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
            <div key={cat._id} className="mb-16">
              <h2 className="text-3xl font-bold mb-6">{cat.name}</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.services.length > 0 ? (
                  cat.services.map((service) => (
                    <div
                      key={service._id}
                      className="bg-[#faf9f7] p-6 rounded-2xl shadow hover:-translate-y-2 transition"
                    >
                      <h3 className="text-xl font-semibold mb-2">{service.name}</h3>

                      <p className="text-sm text-gray-600 mb-3">{service.description}</p>

                      <p className="text-sm font-medium mb-4">
                        £{service.price} • {service.duration} mins
                      </p>

                      <Link
                        to={`/service/${service._id}`}
                        className="text-[#1f7fa3] font-semibold hover:text-[#155d78] transition"
                      >
                        View Details →
                      </Link>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No services available</p>
                )}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}