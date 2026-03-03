import { motion } from "framer-motion";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

const ContactForm = () => {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // Add your submission logic here
  };

  return (
    <section className="py-10 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6"
          >
            Get In Touch
          </motion.h2>
          <p className="text-lg text-gray-600 leading-relaxed">
           Ready to start your self care journey? Contact us today to book your consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: CONTACT INFO & MAP */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="bg-[#faf9f7] p-8 md:p-10 rounded-[2.5rem] space-y-8 border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 font-serif">Studio Info</h3>
              
              <div className="space-y-6">
                <ContactInfoItem icon={<Phone size={20}/>} title="Phone" detail="+44 7788 988337" />
                <ContactInfoItem icon={<Mail size={20}/>} title="Email" detail="loughskin@outlook.com" />
                <ContactInfoItem 
                  icon={<MapPin size={20}/>} 
                  title="Location" 
                  detail={<>11 Great Central Road<br/>Loughborough, LE11 1RW</>} 
                />
                <ContactInfoItem 
                  icon={<Clock size={20}/>} 
                  title="Opening Hours" 
                  detail={<>Tue – Fri: 10:30am – 6:30pm<br/>Sat – Sun: 11:00am – 6:00pm</>} 
                />
              </div>
            </div>
          </motion.div>

          {/* RIGHT: CONTACT FORM */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="bg-white p-2 md:p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <InputField 
                  label="First Name" name="firstName" placeholder="Jane" 
                  value={formData.firstName} onChange={handleChange} 
                />
                <InputField 
                  label="Last Name" name="lastName" placeholder="Doe" 
                  value={formData.lastName} onChange={handleChange} 
                />
              </div>
              <div className="space-y-6">
                <InputField 
                  label="Email Address" name="email" type="email" placeholder="jane@example.com" 
                  value={formData.email} onChange={handleChange} 
                />
                <InputField 
                  label="Phone Number" name="phone" type="tel" placeholder="+44 0000 000000" 
                  value={formData.phone} onChange={handleChange} 
                />
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Your Message</label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your aesthetic goals..."
                    className="w-full p-4 bg-[#faf9f7] border-0 rounded-2xl focus:ring-2 focus:ring-[#62c5d2] transition-all outline-none text-gray-800"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="group w-full sm:w-auto flex items-center justify-center space-x-3 bg-[#1f7fa3] text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-[#62c5d2] transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span>Send Message</span>
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

// Helper Components for Cleaner Code
const ContactInfoItem = ({ icon, title, detail }) => (
  <div className="flex items-start space-x-4">
    <div className="mt-1 bg-white p-3 rounded-xl text-[#a67c5b] shadow-sm">{icon}</div>
    <div>
      <h4 className="font-bold text-gray-900">{title}</h4>
      <p className="text-gray-600 text-sm leading-relaxed">{detail}</p>
    </div>
  </div>
);

const InputField = ({ label, name, type = "text", placeholder, value, onChange }) => (
  <div className="flex flex-col space-y-2 w-full">
    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="p-4 bg-[#faf9f7] border-0 rounded-2xl focus:ring-2 focus:ring-[#62c5d2] transition-all outline-none text-gray-800"
      required
    />
  </div>
);

export default ContactForm;