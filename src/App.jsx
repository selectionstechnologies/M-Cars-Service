import { BookingProvider } from './BookingContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Packages from './components/Packages'
import { HowItWorks, WhyUs } from './components/HowItWorks'
import { Testimonials, FAQ } from './components/Reviews'
import { CtaBanner, Contact, Footer } from './components/Contact'
import BookingModal from './components/BookingModal'
import OfferPopup from './components/OfferPopup'
import FloatingActions from './components/FloatingActions'

export default function App() {
  return (
    <BookingProvider>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <Packages />
        <WhyUs />
        <Testimonials />
        <FAQ />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
      <OfferPopup />
      <BookingModal />
    </BookingProvider>
  )
}
