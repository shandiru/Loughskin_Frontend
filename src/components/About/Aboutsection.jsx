import React from "react";
import { motion } from "framer-motion";
import { Star, School, Flower2, Quote } from "lucide-react";

export default function AboutPage() {
    const storySections = [
        {
            title: "Our Origins",
            text: "Lough Skin was born from a passion for holistic wellness and the belief that true beauty comes from nurturing both the skin and the spirit. Founded in the heart of Loughborough, our spa represents a sanctuary where ancient wisdom meets modern skincare science.",
            icon: <Star className="w-8 h-8 md:w-10 md:h-10 text-white" />,
        },
        {
            title: "Our Founder",
            text: `LoughSkin was founded by Bithe, also known as B, whose journey began in the fast-paced retail sector. It was here she discovered the value of helping women pause, relax, and feel restored in the middle of their busy routines.`,
            text1:
                "Through dedicated training in both classic and modern techniques, her passion for self-care evolved into the creation of LoughSkin. Today, the brand is built on delivering treatments that combine skill, comfort, and genuine care.",
            icon: <School className="w-8 h-8 md:w-10 md:h-10 text-white" />,
        },
        {
            title: "Our Philosophy",
            text: `At LoughSkin, we believe self-care is not a luxury—it is a necessity. Our philosophy is rooted in the idea that true beauty comes from balance: moments of calm in a busy life, and care that restores both skin and spirit.`,
            text1:
                "We combine traditional practices with modern techniques to create experiences that go beyond the surface. LoughSkin is more than a treatment; it is a sanctuary where luxury and expertise meet.",
            icon: <Flower2 className="w-8 h-8 md:w-10 md:h-10 text-white" />,
        },
    ];

    return (
        <section className="bg-[#faf9f7] py-12">
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* HERO TITLE */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-10"
                >
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
                        About Lough Skin
                    </h1>
                    <div className="w-20 h-1 bg-[#62c5d2] mx-auto rounded-full" />
                    <span className="text-[#a67c5b] font-bold tracking-[0.3em] mt-20 uppercase block">
                        Our Story
                    </span>
                </motion.div>

                {/* STORY SECTIONS */}
                <div className="space-y-20 lg:space-y-40">
                    {storySections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className={`flex flex-col items-center gap-10 lg:gap-24 ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                                }`}
                        >
                            {/* VISUAL ELEMENT (ICON BOX) */}
                            <div className="relative shrink-0">
                                <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center rounded-[3rem] bg-white shadow-xl rotate-3 transition-transform hover:rotate-0 duration-500 border border-[#e1c9b3]/30">
                                    <div className="w-20 h-20 md:w-28 md:h-28 flex items-center justify-center rounded-3xl bg-[#62c5d2] shadow-lg -rotate-6 group-hover:rotate-0 transition-transform">
                                        {section.icon}
                                    </div>
                                    {/* Decorative Quote mark */}
                                    <Quote className="absolute -bottom-4 -right-4 w-12 h-12 text-[#e1c9b3] opacity-40 rotate-12" />
                                </div>
                                {/* Background Blobs */}
                                <div className="absolute -z-10 top-4 left-4 w-full h-full rounded-[3rem] bg-[#e1c9b3]/20 -rotate-6" />
                            </div>

                            {/* CONTENT */}
                            <div className={`flex-1 text-center ${index % 2 === 0 ? "lg:text-left" : "lg:text-right"}`}>
                                <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
                                    {section.title}
                                </h3>
                                <div className="space-y-4">
                                    <p className="text-gray-600 text-lg leading-relaxed font-light italic">
                                        {section.text}
                                    </p>
                                    {section.text1 && (
                                        <p className="text-gray-600 text-lg leading-relaxed">
                                            {section.text1}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}