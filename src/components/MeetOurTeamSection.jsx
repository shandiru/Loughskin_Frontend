import React from "react";
import { motion } from "framer-motion";
import { Flower2, Quote, Award } from "lucide-react";

const team = [
  {
    name: "Bithe (B)",
    role: "Therapist & Beauty Specialist",
    desc: `With nearly 10 years in the makeup and beauty industry and a retail-based role with Dior, I've had the privilege of working closely with clients every day, helping them feel confident through makeup and skincare. Through these experiences, I discovered my true passion: creating moments of calm.\n\nI focus on delivering deeply relaxing, result-driven treatments with a personal touch and keen attention to detail. Whether addressing specific skin concerns or providing a soothing HeadSpa experience, my goal is to offer a peaceful space where self-care thrives and every visit feels like a journey toward beauty and well-being.`,
    tags: [
      "Facialist",
      "HeadSpa Specialist",
      "Lymphatic Drainage Expert",
      "10+ Years Experience",
      "VTCT Qualified",
      "CPD Credited",
    ],
    image: "image2.jpeg",
  },
  {
    name: "Shriya",
    role: "Body & Wellbeing Therapist",
    desc: `Hi, I’m Shriya! With a bubbly personality and a love for good conversation, I’m passionate about body contouring, wood therapy, lymphatic drainage, and overall wellbeing. I create calm, relaxing experiences tailored to each client.\n\nWith careful attention to skin concerns and soothing HeadSpa treatments, my goal is to provide a peaceful space where self-care thrives and every visit becomes a journey of beauty and renewal.`,
    tags: [
      "Facialist",
      "Natural Body Contour Expert",
      "Lymphatic Expert",
      "HeadSpa Therapy",
      "VTCT Qualified",
      "CPD Credited",
    ],
    image: "image1.jpeg",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" },
  }),
};

export default function OurTeamSection() {
  return (
    <section className="bg-[#faf9f7] py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Decorative Background Accent */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#62c5d2]/5 rounded-full blur-3xl" />

        {/* --- HEADER --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center relative z-10 mb-20"
        >
          <span className="text-[#a67c5b] font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4 block">
            The Experts
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
            Meet Our Team
          </h2>
          <div className="w-16 h-1 bg-[#62c5d2] mx-auto rounded-full mb-8" />
          <p className="max-w-2xl mx-auto text-gray-500 text-lg italic">
            Passionate professionals dedicated to your wellness and beauty journey.
          </p>
        </motion.div>

        {/* --- TEAM MEMBERS --- */}
        <div className="space-y-24 lg:space-y-40">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              custom={i + 1}
              className={`flex flex-col items-stretch gap-10 lg:gap-20 ${
                i % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row"
              }`}
            >
              {/* Image Container */}
              <div className="w-full lg:w-2/5 relative group">
                <div className="relative aspect-4/5 rounded-xl overflow-hidden shadow-2xl z-10 border-8 border-white">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                </div>
                {/* Decorative Elements */}
                <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-[#e1c9b3] rounded-xl -z-10 transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />
                <div className="absolute -top-6 -left-6 bg-[#62c5d2]/20 w-32 h-32 rounded-full blur-2xl -z-10" />
              </div>

              {/* Text Content */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="relative p-2 md:p-6">
                  {/* Quote Icon for style */}
                  <Quote className="absolute -top-4 -left-4 w-12 h-12 text-[#e1c9b3] opacity-20" />
                  
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <h4 className="text-xl font-medium text-[#a67c5b] mb-6 flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    {member.role}
                  </h4>
                  
                  <p className="text-gray-600 text-lg whitespace-pre-line leading-relaxed mb-8 font-light">
                    {member.desc}
                  </p>

                  {/* Specialty Tags */}
                  <div className="flex flex-wrap gap-3">
                    {member.tags.map((tag, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 bg-white border border-[#e1c9b3]/30 text-gray-700 text-xs md:text-sm px-4 py-2 rounded-full shadow-sm hover:border-[#62c5d2] hover:text-[#1f7fa3] transition-all cursor-default group"
                      >
                        <Flower2 className="w-4 h-4 text-[#62c5d2] transition-transform group-hover:rotate-45" />
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}