import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Specialties from './components/Specialties';
import Enfoque from './components/Enfoque';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import BlogSEO from './components/BlogSEO';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import AgendaOnline from './components/AgendaOnline';
import Payments from './components/Payments';
import { Appointment } from './types';
import { Calendar, X, AlertCircle, ShoppingBag, Check } from 'lucide-react';

export default function App() {
  // Booking & Checkout States
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [prefilledServiceId, setPrefilledServiceId] = useState<string>('');
  const [activeAppointment, setActiveAppointment] = useState<Appointment | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Sticky Booking Banner animation trigger
  const [showStickyBanner, setShowStickyBanner] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky banner after scrolling 600px
      setShowStickyBanner(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trigger Booking wizard with optional service preset
  const handleOpenBooking = (serviceId?: string) => {
    if (serviceId) {
      setPrefilledServiceId(serviceId);
    } else {
      setPrefilledServiceId('');
    }
    setIsBookingOpen(true);
  };

  // Trigger Direct Checkout payment step from price cards
  const handleOpenPaymentDirectly = (serviceId: string) => {
    const serviceNameMap: Record<string, { name: string; price: number }> = {
      'consulta-inicial': { name: 'Consulta de Evaluación Inicial', price: 45000 },
      'consulta-seguimiento': { name: 'Sesión de Control y Seguimiento', price: 30000 },
      'pack-bienestar': { name: 'Pack Bienestar Integral (1 Mes)', price: 68000 },
      'programa-transformacion': { name: 'Programa Hábitos Sostenibles (3 Meses)', price: 155000 },
      'nutricion-deportiva-plan': { name: 'Plan Atleta de Rendimiento', price: 85000 }
    };

    const details = serviceNameMap[serviceId] || { name: 'Plan Personalizado', price: 45000 };

    const dummyAppointment: Appointment = {
      id: 'app-' + Math.floor(Math.random() * 100000),
      serviceId,
      serviceName: details.name,
      date: 'Fecha por confirmar (Sincronizada vía WhastApp)',
      timeSlot: 'Opcional / Por acordar',
      mode: 'online',
      patientName: 'Paciente Invitado',
      patientEmail: 'correo@ejemplo.cl',
      patientPhone: '955443322',
      patientRut: '19.481.029-K',
      status: 'pending',
      price: details.price
    };

    setActiveAppointment(dummyAppointment);
    setShowPaymentModal(true);
  };

  const handleAppointmentConfirmed = (appointment: Appointment) => {
    // Save to state
    setActiveAppointment(appointment);
    // Transition from scheduler to checkout payment gateway screen
    setIsBookingOpen(false);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (confirmedAppointment: Appointment) => {
    setActiveAppointment(confirmedAppointment);
    // Let user stay on success modal to inspect their printable Boleta de honorarios!
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-sage-200 selection:text-sage-900 bg-sand-50">
      
      {/* Dynamic Header Navbar navigation */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Main Sections Body */}
      <main className="flex-grow">
        
        {/* Hero Section */}
        <Hero 
          onOpenBooking={() => handleOpenBooking()} 
          onViewPrograms={() => {
            const el = document.getElementById('programas');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }} 
        />

        {/* Specialties / "Cómo puedo ayudarte" */}
        <Specialties onOpenBooking={(specId) => handleOpenBooking(specId)} />

        {/* Storytelling "Mi enfoque" philosophy */}
        <Enfoque />

        {/* Services & Plan packages list */}
        <Services 
          onSelectServiceForBooking={(id) => handleOpenBooking(id)}
          onSelectServiceForPayment={(id) => handleOpenPaymentDirectly(id)}
        />

        {/* Testimonials and Transformative reviews */}
        <Testimonials />

        {/* Educational SEO Blog with recipe lead magnet search engine */}
        <BlogSEO onOpenBooking={() => handleOpenBooking()} />

        {/* FAQ Accordions for Chile context */}
        <FAQ />

      </main>

      {/* Footer professional legal & channels summary */}
      <Footer />

      {/* Sticky Bottom Floating Commercial Conversion Ribbon */}
      <div
        className={`fixed bottom-0 left-0 w-full bg-sage-800/95 backdrop-blur-md border-t border-sage-700 text-white py-3.5 px-4 sm:px-6 z-30 flex items-center justify-between shadow-2xl transition-all duration-500 transform ${
          showStickyBanner ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center space-x-3 text-left">
          <span className="text-xl hidden sm:block">🥑</span>
          <div>
            <p className="font-serif text-sm font-bold text-white leading-tight">¿Listo para transformar tu salud?</p>
            <p className="text-[10px] text-sand-300 font-medium">Reembolsable en Isapre y seguros de salud chilena.</p>
          </div>
        </div>
        <button
          onClick={() => handleOpenBooking()}
          className="px-5 py-2 bg-sand-300 hover:bg-sand-200 text-sage-900 font-bold text-xs sm:text-xs.5 uppercase tracking-wider rounded-full shadow-md transition-all cursor-pointer flex items-center space-x-1"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Reservar ahora</span>
        </button>
      </div>

      {/* MODAL 1: Online Appointment Scheduler (AgendaOnline.tsx) */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-sage-900/60 backdrop-blur-xs transition-opacity cursor-pointer"
            onClick={() => setIsBookingOpen(false)}
          ></div>
          
          <div className="relative bg-white rounded-2xl w-full max-w-4xl z-10 p-1 md:p-3 overflow-y-auto max-h-[95vh] animate-scale-up shadow-2xl">
            <button
              onClick={() => setIsBookingOpen(false)}
              className="absolute top-4 right-4 z-40 text-sage-400 hover:text-sage-700 bg-white shadow-xs p-1.5 rounded-full border border-sage-100"
              title="Cerrar Agenda"
            >
              <X className="w-5 h-5" />
            </button>
            
            <AgendaOnline 
              initialServiceId={prefilledServiceId} 
              onAppointmentConfirmed={handleAppointmentConfirmed}
              onClose={() => setIsBookingOpen(false)}
            />
          </div>
        </div>
      )}

      {/* MODAL 2: Secure Checkout and Payments Simulators (Payments.tsx) */}
      {showPaymentModal && activeAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-sage-900/60 backdrop-blur-xs transition-opacity cursor-pointer"
            onClick={() => {
              // Only let click backdrop close if checkout is done or pending (not processing)
              setShowPaymentModal(false);
            }}
          ></div>

          <div className="relative bg-white rounded-2xl w-full max-w-3xl z-10 p-2 md:p-5 overflow-y-auto max-h-[95vh] animate-scale-up shadow-2xl border border-sage-200">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 z-40 text-sage-400 hover:text-sage-700 bg-white shadow-xs p-1.5 rounded-full border border-sage-100"
              title="Cerrar Transacción"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="pt-6">
              <Payments 
                activeAppointment={activeAppointment} 
                onPaymentSuccess={handlePaymentSuccess}
                onCancel={() => setShowPaymentModal(false)}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
