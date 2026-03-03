import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Change navbar background on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Main nav items (without Contact)
  const navigationItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Gallery", href: "/gallery" },
    { label: "Our Team", href: "/ourteam" },
    { label: "Testimonials", href: "/testimonials" },
  ];

  // Separate Contact button
  const contactItem = { label: "Contact", href: "/contact" };

  return (
    <>
      {/* HEADER */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#e1c9b3]/95 backdrop-blur-md shadow-lg py-2"
            : "bg-[#e1c9b3] py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="/logo.png"
              alt="Lough Skin Logo"
              className="h-10 w-auto sm:h-12 transition-transform hover:scale-105"
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`text-sm xl:text-base font-medium py-2 px-3 xl:px-4 rounded-full transition-all duration-200 ${
                  location.pathname === item.href
                    ? "bg-[#d8ba58] text-white"
                    : "text-slate-800 hover:bg-white/50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center space-x-3">
            
            {/* CONTACT BUTTON (Desktop Only) */}
            <Link
              to={contactItem.href}
              className={`hidden lg:inline-block text-sm xl:text-base font-semibold px-6 py-2 rounded-full transition-all duration-300 shadow-md ${
                location.pathname === contactItem.href
                  ? "bg-[#b8962e] text-white"
                  : "bg-[#d4af37] text-white hover:bg-[#b8962e] hover:shadow-lg"
              }`}
            >
              {contactItem.label}
            </Link>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-800 hover:bg-white/50 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* MOBILE SIDEBAR */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-[#f8f1ea] z-50 shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-8">
            <span className="text-[#d4af37] font-bold text-2xl tracking-tight">
              Lough Skin
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 text-slate-600"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col space-y-2 grow">
            {[...navigationItems, contactItem].map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-xl font-medium transition-colors ${
                  location.pathname === item.href
                    ? "bg-[#d4af37] text-white"
                    : "text-slate-700 hover:bg-[#e1c9b3]/50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Spacer */}
      <div className="h-16 sm:h-20"></div>
    </>
  );
}