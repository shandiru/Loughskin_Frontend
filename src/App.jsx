import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Navigation from "./components/Navbar";
import Footer from "./components/Footer";
import Service from "./page/Service";
import About from "./page/About";
import Gallery from "./page/Gallery";
import MeetOurTeam from "./page/MeetOurTeam";
import Testimonial from "./page/Testimonial";
import Contact from "./page/Contact";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Service />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/ourteam" element={<MeetOurTeam />} />
        <Route path="/testimonials" element={<Testimonial />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
