import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
    const faqs = [
        {
            question: "What should I expect during my first visit?",
            answer:
                "Your first visit begins with a complimentary 15-minute skin consultation where we assess your skin type and discuss your goals. We'll then recommend the best treatments for your needs and create a personalised skincare plan.",
        },
        {
            question: "What is your cancellation policy?",
            answer:
                "Deposits are non-refundable. If you are unable to attend your appointment and need to reschedule, you must notify us at least 72 hours in advance. Failure to attend your appointment will result in the loss of your deposit, and the full cost of treatment will be charged.",
        },
        {
            question: "Do you offer package deals or memberships?",
            answer:
                "Yes! We offer various treatment packages and monthly membership options that provide significant savings. Contact us to learn about our current offers and find the best option for your skincare journey.",
        },
        {
            question: "What products do you use?",
            answer:
                "We use only natural, professional-grade skincare products from leading brands. All our products are carefully selected for their quality, effectiveness, and suitability for different skin types.",
        },
        {
            question: "Is parking available?",
            answer:
                "Off-street parking is available on Albert Promenade, providing convenient access for our clients.",
        },
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="w-full max-w-3xl mx-auto px-4 py-8">
            <div className="space-y-4">
                <h1 className="text-4xl text-center font-bold text-gray-900 mb-8 tracking-tight">
                    Frequently Asked Questions
                </h1>
                {faqs.map((faq, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm"
                    >
                        <button
                            onClick={() => toggleAccordion(index)}
                            className="w-full flex justify-between items-center text-left transition-colors bg-white hover:bg-gray-50 px-5 py-4 sm:px-6 focus:outline-none"
                            aria-expanded={openIndex === index}
                        >
                            {/* Responsive text size: smaller on mobile, larger on tablet/desktop */}
                            <span className="text-sm sm:text-base md:text-lg font-medium text-gray-900 pr-4">
                                {faq.question}
                            </span>
                            <ChevronDown
                                className={`w-5 h-5 text-gray-500 transition-transform duration-300 shrink-0 ${openIndex === index ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        <AnimatePresence>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <div className="px-5 pb-4 sm:px-6 sm:pb-5 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gray-100 pt-2">
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}