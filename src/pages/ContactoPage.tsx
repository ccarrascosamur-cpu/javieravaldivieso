import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, MessageSquare, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';
import { NUTRITIONIST_INFO } from '../data';
import { useOutletContext } from 'react-router-dom';

interface OutletContext {
  onOpenBooking: (serviceId?: string) => void;
}

export default function ContactoPage() {
  const { onOpenBooking } = useOutletContext<OutletContext>();

  return (
    <>
      <Helmet>
        <title>Contacto | Javiera Valdivieso Nutricionista · Asesorías Online Chile</title>
        <meta name="description" content="Contacta a Javiera Valdivieso, nutricionista clínica. Agenda tu asesoría online por WhatsApp, Instagram o correo. Atención para todo Chile." />
        <meta name="keywords" content="contacto nutricionista chile, agenda asesoría nutricional, WhatsApp nutricionista, Javiera Valdivieso contacto" />
        <link rel="canonical" href="https://javieravaldivieso.cl/contacto" />
        <meta property="og:title" content="Contacto | Javiera Valdivieso Nutricionista" />
        <meta property="og:description" content="Agenda tu asesoría online. Contacto por WhatsApp, Instagram o correo. Atención para todo Chile." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://javieravaldivieso.cl/contacto" />
      </Helmet>

      <div className="pt-28 pb-20 bg-sand-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-sand-500 font-bold block mb-2">Comunícate</span>
            <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-sage-900 mb-4">
              Contacto
            </h1>
            <p className="font-sans text-sage-600 text-base leading-relaxed">
              Estoy aquí para acompañarte en tu proceso. Escríbeme por WhatsApp, Instagram o correo 
              y te responderé a la brevedad para agendar tu asesoría online.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl border border-sage-100 p-6 md:p-8 shadow-xs">
                <h2 className="font-serif text-xl font-bold text-sage-900 mb-6">Información de Contacto</h2>
                
                <div className="space-y-5">
                  <a 
                    href={NUTRITIONIST_INFO.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-100 transition-colors">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-sand-500 font-bold uppercase tracking-wider block">WhatsApp</span>
                      <span className="text-sm text-sage-900 font-medium group-hover:text-sage-700 transition-colors">{NUTRITIONIST_INFO.phone}</span>
                      <p className="text-xs text-sage-500 mt-0.5">Respuesta en menos de 2 horas</p>
                    </div>
                  </a>

                  <a 
                    href={NUTRITIONIST_INFO.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center flex-shrink-0 group-hover:bg-pink-100 transition-colors">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-sand-500 font-bold uppercase tracking-wider block">Instagram</span>
                      <span className="text-sm text-sage-900 font-medium group-hover:text-sage-700 transition-colors">@{NUTRITIONIST_INFO.instagramHandle}</span>
                      <p className="text-xs text-sage-500 mt-0.5">{NUTRITIONIST_INFO.instagramFollowers} seguidores</p>
                    </div>
                  </a>

                  <a 
                    href={`mailto:${NUTRITIONIST_INFO.email}`}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-sage-50 text-sage-600 flex items-center justify-center flex-shrink-0 group-hover:bg-sage-100 transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-sand-500 font-bold uppercase tracking-wider block">Correo Electrónico</span>
                      <span className="text-sm text-sage-900 font-medium group-hover:text-sage-700 transition-colors">{NUTRITIONIST_INFO.email}</span>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-sand-50 text-sand-600 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-sand-500 font-bold uppercase tracking-wider block">Ubicación</span>
                      <span className="text-sm text-sage-900 font-medium">{NUTRITIONIST_INFO.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick benefits */}
              <div className="bg-sage-700 rounded-2xl p-6 md:p-8 text-white">
                <h3 className="font-serif text-lg font-bold mb-4">¿Por qué elegir asesoría online?</h3>
                <ul className="space-y-3">
                  {[
                    'Atención desde cualquier ciudad de Chile',
                    'Sin traslados ni tiempo de espera',
                    'Horarios flexibles adaptados a tu rutina',
                    'Misma calidad clínica que presencial',
                    'Seguimiento continuo vía WhatsApp'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA Card */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-sage-100 p-6 md:p-8 shadow-xs">
                <h2 className="font-serif text-xl font-bold text-sage-900 mb-4">Agenda tu Asesoría Online</h2>
                <p className="text-sm text-sage-600 mb-6 leading-relaxed">
                  El primer paso hacia tu transformación nutricional está a un clic. Selecciona el programa 
                  que mejor se adapte a tus necesidades y agenda tu hora de videollamada.
                </p>

                <div className="space-y-3">
                  <button
                    onClick={() => onOpenBooking('consulta-inicial')}
                    className="w-full flex items-center justify-between p-4 rounded-xl border border-sage-200 hover:border-sage-500 hover:bg-sage-50 transition-all group"
                  >
                    <div className="text-left">
                      <span className="text-sm font-bold text-sage-900 block">Consulta de Evaluación Inicial</span>
                      <span className="text-xs text-sage-500">60 minutos · $45.000 CLP</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-sage-400 group-hover:text-sage-700 transition-colors" />
                  </button>

                  <button
                    onClick={() => onOpenBooking('pack-bienestar')}
                    className="w-full flex items-center justify-between p-4 rounded-xl border border-sage-200 hover:border-sage-500 hover:bg-sage-50 transition-all group"
                  >
                    <div className="text-left">
                      <span className="text-sm font-bold text-sage-900 block">Pack Bienestar Integral</span>
                      <span className="text-xs text-sage-500">1 mes · $68.000 CLP</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-sage-400 group-hover:text-sage-700 transition-colors" />
                  </button>

                  <button
                    onClick={() => onOpenBooking('programa-transformacion')}
                    className="w-full flex items-center justify-between p-4 rounded-xl border border-sage-200 hover:border-sage-500 hover:bg-sage-50 transition-all group"
                  >
                    <div className="text-left">
                      <span className="text-sm font-bold text-sage-900 block">Programa Hábitos Sostenibles</span>
                      <span className="text-xs text-sage-500">3 meses · $155.000 CLP</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-sage-400 group-hover:text-sage-700 transition-colors" />
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-sage-100">
                  <button
                    onClick={() => onOpenBooking()}
                    className="w-full py-3.5 bg-sage-700 hover:bg-sage-800 text-white font-bold rounded-full text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Ver todos los programas y agendar</span>
                  </button>
                </div>
              </div>

              {/* Instagram CTA */}
              <a
                href={NUTRITIONIST_INFO.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="block bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-2xl p-6 text-white text-center hover:opacity-90 transition-opacity"
              >
                <Instagram className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-serif text-lg font-bold mb-1">Sígueme en Instagram</h3>
                <p className="text-sm opacity-90">@{NUTRITIONIST_INFO.instagramHandle} · {NUTRITIONIST_INFO.instagramFollowers} seguidores</p>
                <p className="text-xs opacity-75 mt-2">Tips diarios, recetas y contenido de valor</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
