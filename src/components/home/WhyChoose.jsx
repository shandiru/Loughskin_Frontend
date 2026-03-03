import { motion } from "framer-motion";
import { Leaf, Sparkles, UserCheck } from "lucide-react";

const features = [
  {
    icon: <Leaf size={32} />,
    title: "Natural & Science Driven",
    desc: "Harnessing the potent synergy of botanical extracts and medical-grade science to deliver results without compromise.",
    color: "bg-emerald-50",
  },
  {
    icon: <UserCheck size={32} />,
    title: "Expert Practitioners",
    desc: "Our therapists are specialists in advanced aesthetics, providing tailored treatments backed by years of clinical experience.",
    color: "bg-amber-50",
  },
  {
    icon: <Sparkles size={32} />,
    title: "A Sanctuary of Calm",
    desc: "Every detail of our luxury setting is curated to soothe the senses, providing a meditative escape for your mind and body.",
    color: "bg-blue-50",
  },
];

const WhyChooseLoughSkin = () => {
  return (
    <section className="py-10 bg-[#faf9f7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-16 lg:mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#a67c5b] font-bold tracking-[0.3em] uppercase text-xs"
          >
            The Lough Skin Difference
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900"
          >
            Why Choose Us
          </motion.h2>
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: [0.21, 0.45, 0.32, 0.9] }}
              className="relative group"
            >
              {/* CARD CONTAINER */}
              <div className="h-full flex flex-col items-center text-center p-8 lg:p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-[#a67c5b]/10 hover:-translate-y-2">
                
                {/* ICON BOX */}
                <div className={`mb-8 p-5 rounded-2xl ${feature.color} text-[#a67c5b] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                  {feature.icon}
                </div>

                {/* TITLE */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-serif">
                  {feature.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-gray-600 leading-relaxed text-base">
                  {feature.desc}
                </p>

                {/* DECORATIVE ACCENT */}
                <div className="mt-8 w-12 h-1 bg-[#e1c9b3]/40 rounded-full group-hover:w-24 transition-all duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseLoughSkin;