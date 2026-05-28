import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageSquare, Calendar, PhoneCall } from 'lucide-react';
import { NUTRITIONIST_INFO } from '../data';

interface NavbarProps {
  onOpenBooking: (serviceId?: string) => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Especialidades', href: '/especialidades' },
    { name: 'Programas', href: '/programas' },
    { name: 'Blog & Recetas', href: '/blog' },
    { name: 'Testimonios', href: '/testimonios' },
    { name: 'Preguntas Frecuentes', href: '/preguntas-frecuentes' },
    { name: 'Contacto', href: '/contacto' },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-sand-50/95 backdrop-blur-md shadow-sm border-b border-sand-200/50 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 border-b border-sage-900/10 pb-2">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center gap-3">
              <img 
                src="/logo-javiera-valdivieso.png" 
                alt="Javiera Valdivieso Nutricionista"
                className="h-14 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`font-sans text-sm font-medium transition-colors ${
                    isActive(link.href) ? 'text-sage-700 border-b-2 border-sage-500 pb-0.5' : 'text-sage-800 hover:text-sage-500'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CTAs */}
            <div className="hidden sm:flex items-center space-x-3">
              <a
                href={NUTRITIONIST_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 px-4 py-2 border border-sage-200 rounded-full hover:bg-sage-50 text-sage-800 font-medium text-sm transition-all"
              >
                <PhoneCall className="w-3.5 h-3.5 text-sage-500" />
                <span>Contacto Directo</span>
              </a>
              <button
                onClick={() => onOpenBooking()}
                className="flex items-center space-x-1.5 px-5 py-2.5 bg-sage-700 hover:bg-sage-800 text-white rounded-full font-medium text-sm shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Agenda tu Consulta</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-2">
              <button
                onClick={() => onOpenBooking()}
                className="p-2 bg-sage-700 text-white rounded-full shadow-sm sm:hidden hover:bg-sage-800 transition-all cursor-pointer"
                title="Reservar Hora"
              >
                <Calendar className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md text-sage-900 hover:text-sage-500 focus:outline-none focus:ring-1 focus:ring-sage-200 transition-colors"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isOpen && (
          <div className="lg:hidden bg-sand-100 border-b border-sage-200 px-4 pt-2 pb-6 space-y-3 animate-fade-in">
            <div className="space-y-1 block">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`block px-3 py-2.5 rounded-md text-base font-medium transition-all ${
                    isActive(link.href) ? 'bg-sage-100 text-sage-700' : 'text-sage-800 hover:bg-sage-50 hover:text-sage-500'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="pt-4 border-t border-sage-200/50 flex flex-col space-y-2">
              <a
                href={NUTRITIONIST_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-2 w-full py-3 border border-sage-200 rounded-full bg-white text-sage-800 font-medium text-sm transition-all"
              >
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Consultas</span>
              </a>
              <button
                onClick={() => onOpenBooking()}
                className="flex items-center justify-center space-x-2 w-full py-3 bg-sage-700 hover:bg-sage-800 text-white rounded-full font-medium text-sm shadow-sm transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Agenda tu Consulta</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Floating Sticky Button WhatsApp */}
      <a
        href={NUTRITIONIST_INFO.whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        aria-label="Contactar por WhatsApp"
      >
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out whitespace-nowrap font-sans font-semibold text-sm pr-0 group-hover:pr-2 block leading-none">
          ¿Dudas? Chat en vivo
        </span>
        <MessageSquare className="w-6 h-6 fill-current text-white" />
      </a>
    </>
  );
}
