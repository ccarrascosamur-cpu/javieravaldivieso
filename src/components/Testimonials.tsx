import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles, Heart } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const activeTest = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonios" className="py-20 bg-sand-100 relative overflow-hidden">
      <div className="absolute top-0 right-10 w-96 h-96 rounded-full bg-sage-200/20 blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-widest text-sand-500 font-bold block mb-2">Historias de Éxito</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-sage-900 mb-4">
            Testimonios de Pacientes Reales
          </h2>
          <p className="font-sans text-sage-600 text-sm max-w-lg mx-auto leading-relaxed">
            Descubre las experiencias de quienes decidieron transformar su estilo de vida y sanar su metabolismo bajo mi asesoramiento nutricional.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative bg-white border border-sage-100 rounded-3xl p-6 sm:p-10 md:p-12 shadow-md max-w-3xl mx-auto animate-fade-in min-h-[300px] flex flex-col justify-between">
          
          {/* Big Quote background Icon */}
          <div className="absolute top-6 left-6 text-sage-100">
            <Quote className="w-14 h-14 rotate-180 fill-current" />
          </div>

          <div className="relative space-y-6 pt-4">
            
            {/* Stars & Condition tag */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                ))}
              </div>
              <span className="inline-flex items-center space-x-1.5 bg-sage-50 border border-sage-200 text-sage-800 text-xs font-semibold px-3 py-1 rounded-full w-fit">
                <Heart className="w-3 h-3 text-sage-500 fill-sage-500" />
                <span>Tratamiento por: {activeTest.condition}</span>
              </span>
            </div>

            {/* Testimonial Quote */}
            <blockquote className="font-serif text-base sm:text-lg text-sage-900 leading-relaxed font-medium italic pt-2">
              "{activeTest.text}"
            </blockquote>

            {/* Patient Credentials */}
            <div className="flex items-center space-x-4 pt-4 border-t border-sage-100">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-sage-200/80 bg-sand-100 flex-shrink-0">
                <img
                  src={activeTest.image || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120&h=120'}
                  alt={activeTest.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <cite className="font-sans text-sm font-bold text-sage-900 not-italic block">{activeTest.name}</cite>
                <span className="font-sans text-xs text-sage-500">{activeTest.age} años, {activeTest.city}, Chile</span>
              </div>
            </div>

          </div>

          {/* Nav Controls */}
          <div className="flex justify-end items-center gap-3 mt-8">
            <button
              onClick={prevSlide}
              className="p-2.5 rounded-full border border-sage-200 hover:bg-sage-50 text-sage-700 bg-white shadow-2xs hover:shadow-xs transition-all cursor-pointer"
              title="Anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs text-sage-500 font-semibold select-none">
              {currentIndex + 1} / {TESTIMONIALS.length}
            </span>
            <button
              onClick={nextSlide}
              className="p-2.5 rounded-full border border-sage-200 hover:bg-sage-50 text-sage-700 bg-white shadow-2xs hover:shadow-xs transition-all cursor-pointer"
              title="Siguiente"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Real results trust badge list */}
        <div className="mt-14 flex flex-wrap justify-center items-center gap-6 sm:gap-14 text-center">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-sage-500" />
            <span className="font-sans text-xs font-bold text-sage-800 uppercase tracking-widest">100% Historias Verídicas</span>
          </div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-sage-500" />
            <span className="font-sans text-xs font-bold text-sage-800 uppercase tracking-widest">Acompañamiento Sin Juicios</span>
          </div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-sage-500" />
            <span className="font-sans text-xs font-bold text-sage-800 uppercase tracking-widest">Soporte Empático Continuo</span>
          </div>
        </div>

      </div>
    </section>
  );
}
