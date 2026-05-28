import React, { useState } from 'react';
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
    <footer className="bg-sage-900 text-sage-100 font-sans pt-16 pb-8 border-t border-sage-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          
          {/* Col 4 - Clinician intro */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-serif text-2xl font-bold tracking-tight text-white flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-sand-300"></span>
              {NUTRITIONIST_INFO.name}
            </span>
            <p className="text-xs text-sage-300 font-medium tracking-wide uppercase">
              Nutrición Clínica Integrativa - Registro SIS 481029
            </p>
            <p className="text-xs text-sage-400 leading-relaxed">
              Trabajamos con pautas nutricionales personalizadas libres de extremos. Especialista en resistencia a la insulina, salud digestiva (SIBO/IBS) y balance hormonal femenino.
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
              <li><a href="#especialidades" className="hover:text-sand-300 transition-colors">Especialidades</a></li>
              <li><a href="#programas" className="hover:text-sand-300 transition-colors">Programas</a></li>
              <li><a href="#enfoque" className="hover:text-sand-300 transition-colors">Mi Enfoque</a></li>
              <li><a href="#testimonios" className="hover:text-sand-300 transition-colors">Testimonios</a></li>
              <li><a href="#blog" className="hover:text-sand-300 transition-colors">Blog & Recetas</a></li>
              <li><a href="#faq" className="hover:text-sand-300 transition-colors">Preguntas Frecuentes</a></li>
            </ul>
          </div>

          {/* Col 3 - Contacts coordinates */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">Contacto</h4>
            <ul className="space-y-3.5 text-xs text-sage-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sand-300 flex-shrink-0 mt-0.5" />
                <span>Providencia, Santiago, Chile (Cercano a Metro Los Leones).</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sand-300 flex-shrink-0" />
                <a href="mailto:contacto@nutriconstanza.cl" className="hover:text-sand-300 transition-colors">nutricion.mivalenzuela@gmail.com</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sand-300 flex-shrink-0" />
                <span>+56 9 8765 4321</span>
              </li>
            </ul>
            
            {/* Social handles */}
            <div className="flex items-center space-x-3.5 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-sage-800 hover:bg-sage-700 text-sand-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram Nutricionista"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-sage-800 hover:bg-sage-700 text-sand-300 hover:text-white flex items-center justify-center transition-colors font-sans text-xs font-black"
                title="Siguenos en TikTok"
              >
                dτ
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

        {/* Footer bottom bar (Credits, Chilean flags info, Payment systems labels) */}
        <div className="border-t border-sage-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sage-400">
          <div className="flex items-center space-x-2">
            <span>© {new Date().getFullYear()} Nutrición {NUTRITIONIST_INFO.name}. Todos los derechos reservados.</span>
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
