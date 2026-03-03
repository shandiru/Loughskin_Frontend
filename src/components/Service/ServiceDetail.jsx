import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getServiceById } from "../../api/serviceApi";

export default function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    loadService();
  }, []);

  const loadService = async () => {
    const data = await getServiceById(id);
    setService(data);
  };

  if (!service) return <p className="text-center py-20">Loading service...</p>;

  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      <h1 className="text-4xl font-bold mb-6">{service.name}</h1>
      <p className="mb-4">{service.description}</p>
      <p className="font-semibold mb-2">
        £{service.price} • {service.duration} mins
      </p>
      <p className="text-gray-500">Category: {service.category.name}</p>
    </div>
  );
}