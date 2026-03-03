import React from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

export default function Certification() {
    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: (i = 1) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" },
        }),
    };

    const certifications = [
        "Natural Body Contouring", "Sculpting", "Lymphatic Specialist",
        "Japanese Head Spa Training", "Advanced Skincare Specialist",
        "VTCT Certified", "CPD Accredited"
    ];

    return (
        <div className="bg-white overflow-hidden">
            <section className="py-10 px-6 max-w-6xl mx-auto">
                <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                    className="bg-[#e5f1f3] rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <h2 className="text-3xl font-serif font-bold mb-10 text-gray-700">Certifications & Training</h2>
                        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                            {certifications.map((cert, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 border border-white/10 px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-medium transition-colors"
                                >
                                    <GraduationCap className="w-6 h-6 text-[#e7ba8f]" />
                                    <span>{cert}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Subtle light effect */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-linear-to-b from-[#62c5d2]/10 to-transparent pointer-events-none" />
                </motion.div>
            </section>
        </div>
    );
}