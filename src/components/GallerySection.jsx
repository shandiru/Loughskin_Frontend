import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, X, Maximize2 } from "lucide-react";

export default function GallerySection() {
  const [selectedMedia, setSelectedMedia] = useState(null);

  // Close lightbox on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setSelectedMedia(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const media = [
    ...Array.from({ length: 14 }, (_, i) => ({
      src: `/${i + 1}.jpeg`,
      type: "image",
      id: i
    })),
    ...Array.from({ length: 8 }, (_, i) => ({
      src: `/${15 + i}.mp4`,
      type: "video",
      id: 15 + i
    })),
  ];

  return (
    <section className="py-10 bg-[#faf9f7]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="text-center mb-14">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6"
          >
            The Gallery
          </motion.h1>
          <div className="w-16 h-1 bg-[#62c5d2] mx-auto rounded-full mb-5" />
          <p className="max-w-2xl mx-auto text-gray-600 text-xl font-light italic">
           Step inside our luxurious spa and see where wellness meets beauty
          </p>
        </div>

        {/* MASONRY GRID (Using CSS Columns for best responsiveness) */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {media.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              className="relative break-inside-avoid group cursor-pointer rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-white"
              onClick={() => setSelectedMedia(item)}
            >
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-[#1f7fa3]/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                 <div className="bg-white/90 p-3 rounded-full transform scale-50 group-hover:scale-100 transition-transform duration-500">
                    <Maximize2 className="text-[#1f7fa3] w-5 h-5" />
                 </div>
              </div>

              {item.type === "image" ? (
                <img
                  src={item.src}
                  alt="Gallery"
                  className="w-full h-auto object-cover block transform group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
              ) : (
                <div className="relative">
                  <video
                    src={item.src}
                    muted
                    playsInline
                    loop
                    onMouseOver={(e) => e.target.play()}
                    onMouseOut={(e) => {
                      e.target.pause();
                      e.target.currentTime = 0;
                    }}
                    className="w-full h-auto object-cover block transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full z-20">
                    <PlayCircle className="text-white w-6 h-6" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-gray-950/95 backdrop-blur-xl p-4 md:p-10"
            onClick={() => setSelectedMedia(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute top-8 right-8 text-white bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all z-110"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Media Container */}
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedMedia.type === "image" ? (
                <img
                  src={selectedMedia.src}
                  alt="Full view"
                  className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                />
              ) : (
                <video
                  src={selectedMedia.src}
                  controls
                  autoPlay
                  className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}