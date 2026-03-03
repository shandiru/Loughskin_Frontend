import React from 'react'
import HeroSection from '../components/Home/HeroSection'
import IntroSection from '../components/Home/IntroSection'
import ServicesSection from '../components/Home/Service'
import Banner from '../components/Banner'
import WhyChoose from '../components/Home/WhyChoose'
import Gallery from '../components/Home/Gallery'
import Testimonials from '../components/Home/Testimonial'
import ContactForm from '../components/Home/ContactSection'

const Home = () => {
  return (
    <div>
      <HeroSection />
      <IntroSection />
      <ServicesSection />
      <Banner />
      <WhyChoose />
      <Gallery />
      <Testimonials />
      <ContactForm />
      <Banner />
    </div>
  )
}

export default Home
