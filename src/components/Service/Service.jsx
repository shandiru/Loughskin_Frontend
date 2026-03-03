import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getCategories } from "../../api/categoryApi";
import { getServices } from "../../api/serviceApi";

export default function ServicesSection() {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [categoryData, serviceData] = await Promise.all([
        getCategories(),
        getServices(),
      ]);
       console.log(categoryData);
      setCategories(categoryData);
      setServices(serviceData);
    } catch (error) {
      console.error("Error loading services:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 text-center">
        <p className="text-gray-500">Loading services...</p>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-sm uppercase tracking-widest text-[#a67c5b] mb-2">
            What We Do
          </h2>
          <p className="text-4xl font-serif font-bold">
            Our Signature Treatments
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat) => {
            const categoryServices = services.filter(
              (srv) => srv.category?._id === cat._id
            );

            return (
              <div
                key={cat._id}
                className="bg-[#faf9f7] rounded-3xl p-8 hover:-translate-y-2 transition duration-300 shadow-md"
              >
                <h3 className="text-2xl font-bold mb-3">
                  {cat.name}
                </h3>

                <p className="text-gray-600 text-sm mb-4">
                  {cat.description}
                </p>

                {/* Show max 3 services */}
                <ul className="text-sm text-gray-500 mb-6 space-y-1">
                  {categoryServices.length > 0 ? (
                    categoryServices.slice(0, 3).map((srv) => (
                      <li key={srv._id}>• {srv.name}</li>
                    ))
                  ) : (
                    <li className="text-gray-400">
                      No services available
                    </li>
                  )}
                </ul>

                <Link
                  to={`/services#${cat._id}`}
                  className="flex items-center justify-between font-semibold text-[#1f7fa3] hover:text-[#155d78] transition"
                >
                  Learn More
                  <ArrowRight size={16} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}