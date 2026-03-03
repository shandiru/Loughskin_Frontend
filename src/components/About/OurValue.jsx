import React from "react";
import { motion } from "framer-motion";
import { Star, School, Flower2, Leaf, Sparkles, Quote } from "lucide-react";

export default function OurValue() {
    // Animation Variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: (i = 1) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" },
        }),
    };

    const values = [
        {
            title: "Luxury",
            description: "Natural and science-driven products and treatments in an elegant environment.",
            icon: <Star className="w-8 h-8" />,
        },
        {
            title: "Clean",
            description: "Natural, clean ingredients and sustainable beauty practices for your peace of mind.",
            icon: <Leaf className="w-8 h-8" />,
        },
        {
            title: "Sustainable",
            description: "An environmentally conscious approach to beauty, focusing on long-term wellness.",
            icon: <Sparkles className="w-8 h-8" />,
        },
    ];

    return (
        <div className="bg-[#faf9f7] overflow-hidden">
            <section className="bg-white py-10 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-4">Our Core Values</h2>
                        <p className="text-gray-500 italic">The pillars of the Lough Skin experience</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                custom={index + 1}
                                variants={fadeInUp}
                                className="group relative bg-[#fdf1e5] p-10 rounded-xl text-center hover:bg-[#62c5d2] transition-all duration-500 shadow-sm hover:shadow-2xl"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white text-[#62c5d2] mb-8 shadow-sm group-hover:scale-110 group-hover:bg-[#62c5d2] group-hover:text-white transition-all duration-500">
                                    {value.icon}
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4 group-hover:text-white transition-colors">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed group-hover:text-white/80 transition-colors">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}