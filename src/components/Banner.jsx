import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Banner = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="py-10 ">
      <div className="max-w-6xl px-7 mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="p-6 md:p-12 text-center bg-[#e1c9b3] rounded-3xl">
            <h4 className="mb-4 text-2xl md:text-3xl font-semibold tracking-wide">
              Book Your FREE Consultation Today
            </h4>

            <p className="mb-6 text-lg text-gray-600 mx-auto max-w-lg leading-relaxed">
              Begin your FREE skincare journey with our specialists — discover
              your unique path to radiant, confident skin.
            </p>

            <Link
              to="/services"
              className="inline-block px-8 py-3 bg-[#62c5d2] text-white text-lg rounded-full shadow-lg transition-all ease-in-out duration-300 hover:bg-[#1f7fa3] hover:shadow-2xl"
            >
              Book Your Free Consultation
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;