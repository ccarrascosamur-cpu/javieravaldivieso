import { Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { NUTRITIONIST_INFO } from '../data';

interface HeroProps {
  onOpenBooking: () => void;
  onViewPrograms?: () => void;
}

export default function Hero({ onOpenBooking, onViewPrograms }: HeroProps) {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-36 bg-sand-100 overflow-hidden">
      {/* Background organic gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-sage-200/20 blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-10 left-0 w-[300px] h-[300px] rounded-full bg-sand-300/30 blur-2xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Copy Content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Soft Badge */}
            <div className="inline-flex items-center space-x-2 bg-sage-100/70 border border-sage-200 text-sage-800 px-3 py-1 ml-0 rounded-full w-fit mb-6 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-sage-500 fill-sage-500 animate-pulse" />
              <span className="text-xs font-semibold tracking-wide uppercase font-sans">
                Nutricionista Clínica · Registro SIS N° 481029
              </span>
            </div>

            {/* Powerful Editorial Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-5xl font-medium tracking-tight text-sage-900 leading-[1.15] mb-6">
              Sana tu abdomen, <span className="italic text-sage-700 font-normal">regulariza tus hormonas</span> y haz las paces con la comida.
            </h1>

            {/* Emotional Subtitle */}
            <p className="font-sans text-base sm:text-lg text-sage-800 font-normal leading-relaxed mb-8 max-w-2xl opacity-90">
              Pautas 100% personalizadas sin restricciones absurdas ni efecto rebote. Te acompaño con empatía en tu camino metabólico, hormonal o digestivo desde <strong className="text-sage-950 font-semibold">cualquier parte de Chile</strong> a través de <strong className="text-sage-950 font-semibold">asesorías online por videollamada</strong>.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-10">
              <button
                onClick={onOpenBooking}
                className="px-8 py-4 bg-sage-700 hover:bg-sage-800 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-center cursor-pointer"
              >
                Agenda tu Asesoría Online
              </button>
              <button
                onClick={onViewPrograms}
                className="px-8 py-4 bg-white hover:bg-sage-100 border border-sage-200 text-sage-800 font-semibold rounded-full shadow-xs hover:shadow-sm transition-all duration-300 text-center cursor-pointer"
              >
                Ver Planes y Programas
              </button>
            </div>

            {/* Trust checkmarks & Chilean Isapres mention */}
            <div className="border-t border-sage-200/50 pt-6">
              <span className="text-xs uppercase tracking-wider text-sand-500 font-bold block mb-3">
                * Reembolsable en todas las Isapres de Chile y seguros médicos complementarios
              </span>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                <div className="flex items-center space-x-2 text-sm text-sage-800">
                  <CheckCircle2 className="w-4 h-4 text-sage-500 flex-shrink-0" />
                  <span>Colmena, Banmédica, CruzBlanca, Consalud</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-sage-800">
                  <CheckCircle2 className="w-4 h-4 text-sage-500 flex-shrink-0" />
                  <span>Seguros Bicevida, Sura, Metlife y más</span>
                </div>
              </div>
            </div>
          </div>

          {/* Clinician Portrait & Key Stats */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            {/* Visual background circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full bg-sand-200/60 -z-10 scale-105"></div>
            
            {/* Main Picture */}
            <div className="relative w-full max-w-[380px] rounded-2xl overflow-hidden border-2 border-white shadow-xl aspect-3/4">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600&h=800"
                alt="Javiera Valdivieso - Nutricionista Chilena"
                className="w-full h-full object-cover object-top hover:scale-105 transition-all duration-500 ease-out"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlaid Medical Tag */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-xs p-3 rounded-xl border border-sage-100 flex items-center space-x-3 shadow-md">
                <div className="bg-sage-100 p-2 rounded-lg text-sage-700">
                  <Award className="w-5 h-5" />
                </div>
                <div className="leading-tight">
                  <p className="text-xs text-sand-500 font-bold uppercase tracking-wider">Superintendencia de Salud</p>
                  <p className="text-sm font-semibold text-sage-900">Prestadora N° 481029</p>
                </div>
              </div>
            </div>

            {/* Embedded Floating Trust Badge */}
            <div className="absolute -top-4 -right-4 bg-terracotta-50 shadow-lg border border-terracotta-500/20 p-4 rounded-xl max-w-[130px] text-center hidden sm:block rotate-6">
              <p className="font-serif text-3xl font-bold text-terracotta-700 leading-none">8+</p>
              <p className="font-sans text-[11px] font-semibold text-sage-800 mt-1 leading-snug">Años Sanando Metabolismos</p>
            </div>
          </div>

        </div>

        {/* Dynamic Horizontal Trust Statistics Grid */}
        <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 bg-white border border-sage-100/50 rounded-2xl p-6 md:p-8 shadow-xs">
          {NUTRITIONIST_INFO.stats.map((stat, i) => (
            <div
              key={i}
              className="text-center md:border-r border-sage-100 last:border-0 flex flex-col justify-center"
            >
              <span className="font-serif text-3xl md:text-4xl font-bold text-sage-700 block">
                {stat.value}
              </span>
              <span className="font-sans text-xs sm:text-sm text-sage-500 mt-1 font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
