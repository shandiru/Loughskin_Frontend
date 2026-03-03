import { Instagram, Facebook, Mail, MapPin, Phone, ExternalLink } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#e1c9b3] text-gray-900 border-t border-[#d8bfa8]">
      {/* MAIN FOOTER CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-10 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* 1. BRAND & CONTACT - Optimized for mobile stacking */}
          <div className="space-y-6">
            <h3 className="text-3xl font-serif font-bold tracking-tight text-[#5a4a3b]">Lough Skin</h3>
            <div className="space-y-5">
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-start group transition-all"
              >
                <div className="bg-white/40 p-2 rounded-lg mr-4 group-hover:bg-[#1f7fa3] group-hover:text-white transition-colors">
                  <MapPin size={18} />
                </div>
                <span className="text-sm leading-relaxed group-hover:text-[#1f7fa3]">
                  11 Great Central Road,<br />
                  Loughborough, LE11 1RW
                </span>
              </a>
              <a href="tel:+447788988337" className="flex items-center group">
                <div className="bg-white/40 p-2 rounded-lg mr-4 group-hover:bg-[#1f7fa3] group-hover:text-white transition-colors">
                  <Phone size={18} />
                </div>
                <span className="text-sm font-semibold group-hover:text-[#1f7fa3] transition-colors">+44 7788 988337</span>
              </a>
              <a href="mailto:loughskin@outlook.com" className="flex items-center group">
                <div className="bg-white/40 p-2 rounded-lg mr-4 group-hover:bg-[#1f7fa3] group-hover:text-white transition-colors">
                  <Mail size={18} />
                </div>
                <span className="text-sm font-semibold group-hover:text-[#1f7fa3] transition-colors">loughskin@outlook.com</span>
              </a>
            </div>
          </div>

          {/* 2. BUSINESS HOURS - Better spacing for readability */}
          <div className="lg:pl-8">
            <h4 className="text-xs font-black uppercase tracking-[0.25em] mb-8 text-[#5a4a3b] opacity-80">
              Studio Hours
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-[#d8bfa8] pb-1">
                <span className="font-medium">Mon</span>
                <span className="opacity-50 italic">Closed</span>
              </div>
              <div className="flex justify-between border-b border-[#d8bfa8] pb-1">
                <span>Tue - Fri</span>
                <span className="font-semibold">10:30 - 18:30</span>
              </div>
              <div className="flex justify-between border-b border-[#d8bfa8] pb-1">
                <span>Sat - Sun</span>
                <span className="font-semibold">11:00 - 18:00</span>
              </div>
              <p className="mt-4 text-[11px] uppercase tracking-wider text-[#7a6a5b] font-bold">
                By Appointment Only
              </p>
            </div>
          </div>

          {/* 3. AMENITIES - Uses a grid on mobile for compactness */}
          <div className="lg:pl-8">
            <h4 className="text-xs font-black uppercase tracking-[0.25em] mb-8 text-[#5a4a3b] opacity-80">
              The Experience
            </h4>
            <ul className="grid grid-cols-1 gap-4">
              {[
                "Verified on Fresha",
                "Instant Confirmation",
                "Wheelchair Accessible",
                "Free Local Parking",
                "Japanese Ritual Experts"
              ].map((item, i) => (
                <li key={i} className="flex items-center text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1f7fa3] mr-3 shadow-sm" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 4. SOCIALS & CTA */}
          <div className="space-y-8 lg:pl-8">
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.25em] mb-6 text-[#5a4a3b] opacity-80">
                Follow The Journey
              </h4>
              <div className="flex gap-3">
                <SocialIcon href="https://instagram.com/loughskin" icon={<Instagram size={20}/>} />
                <SocialIcon href="https://facebook.com/loughskin" icon={<Facebook size={20}/>} />
                <SocialIcon 
                  href="https://tiktok.com/@loughskin" 
                  icon={
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                  } 
                />
              </div>
            </div>
            {/* <a 
              href="https://fresha.com" 
              className="group flex items-center justify-center w-full py-4 bg-white/80 backdrop-blur-sm border border-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] text-[#1f7fa3] hover:bg-[#1f7fa3] hover:text-white transition-all duration-500 shadow-sm hover:shadow-xl"
            >
              Book via Fresha <ExternalLink size={14} className="ml-2 group-hover:rotate-12 transition-transform" />
            </a> */}
          </div>
        </div>
      </div>

      {/* COPYRIGHT BAR - Floating effect on larger screens */}
      <div className="bg-[#d8bfa8]/80 backdrop-blur-md border-t border-black/5 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[12px] font-medium opacity-70 text-center md:text-left space-y-1">
            <p>© {currentYear} <span className="text-gray-900 font-bold">Lough Skin Ltd</span>. All rights reserved.</p>
            <p className="tracking-widest uppercase text-[10px]">Loughborough's Premier Japanese Headspa</p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
            <FooterLink href="/privacy">Privacy</FooterLink>
            <FooterLink href="/terms">Terms</FooterLink>
            <p className="text-[12px] font-medium opacity-70">
              By{" "}
              <a href="https://ansely.co.uk" className="text-[#1f7fa3] font-bold hover:underline underline-offset-4">Ansely</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Sub-components for cleaner structure
const SocialIcon = ({ href, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/40 text-[#5a4a3b] hover:bg-[#1f7fa3] hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm"
  >
    {icon}
  </a>
);

const FooterLink = ({ href, children }) => (
  <a href={href} className="text-[12px] font-bold tracking-tight opacity-60 hover:opacity-100 hover:text-[#1f7fa3] transition-all">
    {children}
  </a>
);

export default Footer;