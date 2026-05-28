import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Instagram, Send, Heart, ShieldCheck, Check } from 'lucide-react';
import { NUTRITIONIST_INFO } from '../data';

export default function Footer() {
  const [subEmail, setSubEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subEmail.trim() || !subEmail.includes('@')) return;
    setSubscribed(true);
    setSubEmail('');
  };

  return (
    <footer className="bg-sage-900 text-sage-100 font-sans pt-4 pb-8 border-t border-sage-800">
      {/* Credits - arriba de todo */}
      <div className="text-center pb-4 mb-4 border-b border-sage-800">
        <p className="text-[10px] text-sage-500">
          Sitio desarrollado por{' '}
          <a 
            href="https://www.emmagination.cl" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sage-300 hover:text-white transition-colors font-medium"
          >
            Emmagination
          </a>
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          
          {/* Col 4 - Clinician intro */}
          <div className="md:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src="/logo-javiera-valdivieso.png" 
                alt="Javiera Valdivieso"
                className="h-12 w-auto object-contain brightness-200"
              />
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white block">
                  {NUTRITIONIST_INFO.name}
                </span>
                <span className="text-xs text-sage-300 font-medium tracking-wide uppercase">
                  Nutricionista · Asesorías Online Chile
                </span>
              </div>
            </Link>
            <p className="text-xs text-sage-400 leading-relaxed">
              Trabajamos con pautas nutricionales personalizadas libres de extremos. Especialista en resistencia a la insulina, salud digestiva (SIBO/IBS) y balance hormonal femenino. Atención 100% online para todo Chile.
            </p>
            <div className="flex items-center space-x-2 text-xs text-sage-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Reembolsos Isapre & Seguros Médicos</span>
            </div>
          </div>

          {/* Col 2 - Quick links */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">Secciones</h4>
            <ul className="space-y-2 text-xs text-sage-400">
              <li><Link to="/especialidades" className="hover:text-sand-300 transition-colors">Especialidades</Link></li>
              <li><Link to="/programas" className="hover:text-sand-300 transition-colors">Programas</Link></li>
              <li><Link to="/blog" className="hover:text-sand-300 transition-colors">Blog & Recetas</Link></li>
              <li><Link to="/testimonios" className="hover:text-sand-300 transition-colors">Testimonios</Link></li>
              <li><Link to="/preguntas-frecuentes" className="hover:text-sand-300 transition-colors">Preguntas Frecuentes</Link></li>
              <li><Link to="/contacto" className="hover:text-sand-300 transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Col 3 - Contacts coordinates */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">Contacto</h4>
            <ul className="space-y-3.5 text-xs text-sage-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sand-300 flex-shrink-0 mt-0.5" />
                <span>Asesorías Online para todo Chile. Desde Santiago, Chile.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sand-300 flex-shrink-0" />
                <a href={`mailto:${NUTRITIONIST_INFO.email}`} className="hover:text-sand-300 transition-colors">{NUTRITIONIST_INFO.email}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sand-300 flex-shrink-0" />
                <span>{NUTRITIONIST_INFO.phone}</span>
              </li>
            </ul>
            
            {/* Social handles */}
            <div className="flex items-center space-x-3.5 pt-2">
              <a
                href={NUTRITIONIST_INFO.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-sage-800 hover:bg-sage-700 text-sand-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram Nutricionista"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={NUTRITIONIST_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-sage-800 hover:bg-sage-700 text-sand-300 hover:text-white flex items-center justify-center transition-colors font-sans text-xs font-bold"
                title="WhatsApp Directo"
              >
                Wa
              </a>
            </div>
          </div>

          {/* Col 3 - Newsletter form */}
          <div className="md:col-span-3 space-y-4 text-left">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">Newsletter de Recetas</h4>
            <p className="text-xs text-sage-400 leading-relaxed">
              Recibe consejos semanales, recetas fáciles chilenas de temporada y tips para desinflamarte de forma natural.
            </p>
            
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex overflow-hidden rounded-lg border border-sage-700 bg-sage-850">
                <input
                  type="email"
                  required
                  placeholder="Tu correo"
                  value={subEmail}
                  onChange={(e) => setSubEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-transparent text-white outline-hidden placeholder-sage-400"
                />
                <button
                  type="submit"
                  className="bg-sand-300 hover:bg-sand-200 text-sage-900 px-3.5 flex items-center justify-center transition-colors cursor-pointer"
                  title="Suscribirse"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <div className="flex items-center space-x-1.5 text-xs text-sand-300 font-bold bg-sage-800/40 p-2.5 rounded-lg border border-sage-750">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>¡Suscrito con éxito!</span>
              </div>
            )}
          </div>

        </div>

        {/* Footer bottom bar */}
        <div className="border-t border-sage-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sage-400">
          <div className="flex items-center space-x-2">
            <span>© {new Date().getFullYear()} {NUTRITIONIST_INFO.name}. Todos los derechos reservados.</span>
            <span className="text-sage-600">|</span>
            <span className="flex items-center gap-1">
              <span>Hecho en Chile</span>
              <span className="inline-flex w-3 h-2 bg-blue-600 relative overflow-hidden">
                <span className="absolute top-0 left-0 w-1 h-1 bg-white"></span>
                <span className="absolute top-0 right-0 w-2 h-1 bg-white"></span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-red-600"></span>
              </span>
            </span>

          </div>

          {/* Payment gateways logos placeholder representation */}
          <div className="flex items-center space-x-3 text-[10px] font-black tracking-tight text-sage-500 uppercase select-none">
            <span>Webpay Plus</span>
            <span className="text-sage-700">•</span>
            <span>Mercado Pago</span>
            <span className="text-sage-700">•</span>
            <span>Flow CLP</span>
            <span className="text-sage-700">•</span>
            <span>Transbank</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
