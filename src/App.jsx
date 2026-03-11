import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import SilentRefresh from "./components/SilentRefresh";

import Navigation from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./page/Home";
import Service from "./page/Service";
import ServiceDetail from "./components/Service/ServiceDetail";
import About from "./page/About";
import Gallery from "./page/Gallery";
import MeetOurTeam from "./page/MeetOurTeam";
import Testimonial from "./page/Testimonial";
import Contact from "./page/Contact";

import Login from "./page/LoginPage";
import Register from "./page/RegisterPage";
import VerifyEmail from "./page/VerifyEmail";
import ForgotPassword from "./page/Forgotpasswordpage";
import ResetPassword from "./page/Resetpasswordpage";
import BookingPage from "./page/BookingPage";
import BookingSuccess from "./page/BookingSuccess";
import BookingCancelled from "./page/BookingCancelled";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <SilentRefresh>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Service />} />
            <Route path="/service/:id" element={<ServiceDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/ourteam" element={<MeetOurTeam />} />
            <Route path="/testimonials" element={<Testimonial />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route path="/book/:id" element={<BookingPage />} />
            <Route path="/booking/success" element={<BookingSuccess />} />
            <Route path="/booking/cancelled" element={<BookingCancelled />} />
          </Routes>
          <Footer />
        </SilentRefresh>
      </Router>
    </Provider>
  );
}

export default App;
