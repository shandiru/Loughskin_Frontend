import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import SilentRefresh from "./components/SilentRefresh";

import Navigation from "./components/Navbar";
import Footer from "./components/Footer";

// Existing pages
import Home from "./page/Home";
import Service from "./page/Service";
import ServiceDetail from "./components/Service/ServiceDetail";
import About from "./page/About";
import Gallery from "./page/Gallery";
import MeetOurTeam from "./page/MeetOurTeam";
import Testimonial from "./page/Testimonial";
import Contact from "./page/Contact";

// Auth pages (new)
import Login from "./page/LoginPage";
import Register from "./page/RegisterPage";
import VerifyEmail from "./page/VerifyEmail";
import ForgotPassword from "./page/Forgotpasswordpage";
import ResetPassword from "./page/Resetpasswordpage";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <SilentRefresh>
          <Navigation />
          <Routes>
            {/* Existing */}
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Service />} />
            <Route path="/service/:id" element={<ServiceDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/ourteam" element={<MeetOurTeam />} />
            <Route path="/testimonials" element={<Testimonial />} />
            <Route path="/contact" element={<Contact />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
          <Footer />
        </SilentRefresh>
      </Router>
    </Provider>
  );
}

export default App;