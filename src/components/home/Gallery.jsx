import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";

const media = [
  ...Array.from({ length: 14 }, (_, i) => ({
    src: `/${i + 1}.jpeg`,
    type: "image",
  })),
  ...Array.from({ length: 8 }, (_, i) => ({
    src: `/${15 + i}.mp4`,
    type: "video",
  })),
];

const Gallery = () => {
  // Animating the container to stagger the children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-10 bg-[#faf9f7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Our Gallery
          </h2>
          <p className="text-[#a67c5b] font-medium tracking-widest uppercase text-xs">
            Visualizing the Lough Skin Experience
          </p>
        </div>

        {/* RESPONSIVE GRID */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {media.slice(0, 6).map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative aspect-square overflow-hidden rounded-3xl bg-gray-200 shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              {item.type === "image" ? (
                <img
                  src={item.src}
                  alt={`Gallery item ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="relative w-full h-full">
                  <video
                    src={item.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Video Indicator */}
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30 text-white">
                    <Play size={16} fill="white" />
                  </div>
                </div>
              )}

              {/* OVERLAY ON HOVER */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="px-6 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-bold text-gray-800 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  View Detail
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* BUTTON */}
        <div className="text-center mt-16">
          <Link
            to="/gallery"
            className="inline-flex items-center space-x-2 bg-transparent border-2 border-[#1f7fa3] text-[#1f7fa3] font-bold py-3 px-10 rounded-full transition-all duration-300 hover:bg-[#1f7fa3] hover:text-white hover:shadow-lg hover:shadow-[#1f7fa3]/20"
          >
            <span>Explore Full Gallery</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Gallery;