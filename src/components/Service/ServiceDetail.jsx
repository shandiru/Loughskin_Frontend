import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getServiceById } from "../../api/serviceApi";

export default function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    loadService();
  }, [id]);

  const loadService = async () => {
    const data = await getServiceById(id);
    setService(data);
  };

  if (!service) return (
    <div className="flex justify-center items-center h-screen bg-white text-[#22B8C8]">
      Loading...
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto py-12 px-6">
        
        {/* Navigation */}
        <Link to="/services" className="flex items-center text-[#C9AF94] font-semibold mb-10 hover:translate-x-[-5px] transition-transform">
          <span className="mr-2">←</span> Back to Services
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content Area */}
          <div className="lg:col-span-7">
            <span className="inline-block bg-[#F5F5F5] text-[#C9AF94] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              {service.category?.name}
            </span>
            <h1 className="text-5xl font-bold text-gray-900 mb-8">{service.name}</h1>
            
            <div className="prose prose-lg max-w-none">
              <h3 className="text-xl font-bold text-[#22B8C8] mb-4">Treatment Description</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                {service.description}
              </p>
            </div>
          </div>

          {/* Sidebar Info Card */}
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
                  <span className="text-gray-900 font-bold capitalize">{service.genderRestriction || 'All'}</span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-500 font-medium">Deposit</span>
                  <span className="text-gray-900 font-bold">{(service.depositPercentage * 100).toFixed(0)}%</span>
                </div>
              </div>

              <button className="w-full mt-10 bg-[#22B8C8] text-white py-5 rounded-2xl font-bold text-lg hover:bg-opacity-90 transition-all shadow-md">
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}