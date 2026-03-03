"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Instagram,
    Facebook,
    Music2,
    Navigation,
} from "lucide-react";

const fadeUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function ContactUs() {
    const contactDetails = [
        {
            icon: <MapPin className="w-5 h-5" />,
            title: "Address",
            content: "11 Great Central Road, Loughborough, LE11 1RW",
        },
        {
            icon: <Phone className="w-5 h-5" />,
            title: "Phone",
            content: "+44 7788 988337",
        },
        {
            icon: <Mail className="w-5 h-5" />,
            title: "Email",
            content: "loughskin@outlook.com",
        },
    ];

    return (
        <section className="bg-white py-12 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* --- HEADER --- */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUpVariant}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6 tracking-tight">
                        Contact Us
                    </h1>
                    <div className="w-12 h-1 bg-[#62c5d2] mx-auto rounded-full" />
                </motion.div>

                {/* --- MAIN CONTENT GRID --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                    {/* 1. CONTACT INFORMATION CARD */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-xl p-8 md:p-12 shadow-sm border border-[#e1c9b3]/20 flex flex-col justify-between"
                    >
                        <div>
                            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">Get In Touch</h2>

                            <div className="space-y-8">
                                {contactDetails.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-4">
                                        <div className="bg-[#fdf6f0] p-3 rounded-full text-[#a67c5b] shrink-0">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-widest mb-1">{item.title}</h3>
                                            <p className="text-gray-600 leading-relaxed">{item.content}</p>
                                        </div>
                                    </div>
                                ))}

                                <div className="flex items-start gap-4">
                                    <div className="bg-[#fdf6f0] p-3 rounded-full text-[#a67c5b] shrink-0">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-sm uppercase tracking-widest mb-1">Business Hours</h3>
                                        <div className="text-gray-600 space-y-1">
                                            <p>Mon: <span className="text-gray-400 italic">Closed</span></p>
                                            <p>Tue – Fri: 10:30 AM – 6:30 PM</p>
                                            <p>Sat – Sun: 11:00 AM – 6:00 PM</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Socials */}
                        <div className="mt-12 pt-8 border-t border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-widest">Follow Our Journey</h3>
                            <div className="flex flex-wrap gap-3">
                                {[
                                    { name: 'Instagram', icon: <Instagram className="w-4 h-4" />, link: 'https://instagram.com/loughskin' },
                                    { name: 'Facebook', icon: <Facebook className="w-4 h-4" />, link: 'https://facebook.com/loughskin' },
                                    { name: 'TikTok', icon: <Music2 className="w-4 h-4" />, link: 'https://tiktok.com/@loughskin' },
                                ].map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 bg-white border border-[#e1c9b3] rounded-full text-[#a67c5b] text-sm font-medium hover:bg-[#a67c5b] hover:text-white transition-all duration-300"
                                    >
                                        {social.icon}
                                        {social.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* 2. MAP SECTION (Button moved to bottom) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col bg-white rounded-xl overflow-hidden shadow-sm border border-[#e1c9b3]/20"
                    >
                        {/* Map Area */}
                        <div className="relative h-88 lg:grow min-h-100">
                            <iframe
                                title="Lough Skin Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2414.0069618208963!2d-1.1994715!3d52.7681483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4879e0a439828733%3A0x294847c8d509daf5!2s11%20Great%20Central%20Rd%2C%20Loughborough%20LE11%201RW%2C%20UK!5e0!3m2!1sen!2slk!4v1771698291450!5m2!1sen!2slk"
                                className="absolute inset-0 w-full h-full"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>

                        {/* Directions Button Footer */}
                        <div className="p-6 bg-white border-t border-gray-100">
                            <a
                                href="http://googleusercontent.com/maps.google.com/9"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-[#1f7fa3] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#155a73] transition-all shadow-md active:scale-[0.98]"
                            >
                                <Navigation className="w-5 h-5" />
                                GET DIRECTIONS
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}