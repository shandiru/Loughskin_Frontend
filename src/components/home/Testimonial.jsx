import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    text: "The experience at Lough Skin was amazing. I left feeling rejuvenated and refreshed! The Japanese Headspa is a total game changer.",
    rating: 5,
    author: "Jane Doe",
    location: "Nottingham",
  },
  {
    text: "The service was professional and the results were better than I expected. My skin has never looked this radiant.",
    rating: 5,
    author: "John Smith",
    location: "Leicester",
  },
  {
    text: "I highly recommend Lough Skin for anyone looking for top-tier skincare. It's a sanctuary of peace in a busy city.",
    rating: 5,
    author: "Emma Brown",
    location: "Derby",
  },
];

const Testimonials = () => {
  return (
    <section className="py-10 bg-[#faf9f7] relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-[#e1c9b3]/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mb-4"
          >
            <Quote size={40} className="text-[#62c5d2] opacity-50" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <div className="h-1 w-16 bg-[#a67c5b] mx-auto rounded-full"></div>
        </div>

        {/* TESTIMONIALS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="flex"
            >
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col relative hover:shadow-xl transition-shadow duration-500">
                
                {/* STARS */}
                <div className="flex space-x-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < testimonial.rating ? "fill-[#d4af37] text-[#d4af37]" : "text-gray-200"}
                    />
                  ))}
                </div>

                {/* TEXT */}
                <p className="text-gray-700 leading-relaxed text-lg italic grow">
                  "{testimonial.text}"
                </p>

                {/* AUTHOR INFO */}
                <div className="mt-8 pt-6 border-t border-gray-50">
                  <h4 className="font-bold text-gray-900 text-lg">
                    {testimonial.author}
                  </h4>
                  <p className="text-[#a67c5b] text-sm font-medium tracking-wide">
                    {testimonial.location}
                  </p>
                </div>

                {/* SUBTLE ACCENT */}
                <div className="absolute top-8 right-8 text-[#e1c9b3]/10 select-none">
                   <Quote size={60} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* GOOGLE REVIEWS CALLOUT */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 text-sm">
            Trusted by over <span className="font-bold text-gray-800">500+ Happy Clients</span> 
            <br className="sm:hidden" /> 
            {" "} on Google & Social Media
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;