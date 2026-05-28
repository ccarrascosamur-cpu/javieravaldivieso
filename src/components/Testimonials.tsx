import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Heart } from 'lucide-react';
import { useTestimonios } from '../hooks/useApi';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: testimonios, loading, error } = useTestimonios();

  const prevSlide = () => {
    if (!testimonios) return;
    setCurrentIndex((prev) => (prev === 0 ? testimonios.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    if (!testimonios) return;
    setCurrentIndex((prev) => (prev === testimonios.length - 1 ? 0 : prev + 1));
  };

  if (loading) {
    return (
      <section id="testimonios" className="py-20 bg-sand-100 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-sage-100 rounded w-1/3 mx-auto mb-8"></div>
            <div className="h-64 bg-white rounded-3xl"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !testimonios || testimonios.length === 0) {
    return (
      <section id="testimonios" className="py-20 bg-sand-100 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center text-sage-500">
          <p className="text-sm">Testimonios no disponibles en este momento.</p>
        </div>
      </section>
    );
  }

  const activeTest = testimonios[currentIndex];

  return (
    <section id="testimonios" className="py-20 bg-sand-100 relative overflow-hidden">
      <div className="absolute top-0 right-10 w-96 h-96 rounded-full bg-sage-200/20 blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-widest text-sand-500 font-bold block mb-2">Experiencias Reales</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-sage-900 mb-4">
            Testimonios de Pacientes
          </h2>
          <p className="font-sans text-sage-600 text-sm max-w-lg mx-auto leading-relaxed">
            Descubre las experiencias de quienes decidieron transformar su estilo de vida desde diferentes ciudades de Chile.
          </p>
        </div>

        <div className="relative bg-white border border-sage-100 rounded-3xl p-6 sm:p-10 md:p-12 shadow-md max-w-3xl mx-auto animate-fade-in min-h-[300px] flex flex-col justify-between">
          
          <div className="absolute top-6 left-6 text-sage-100">
            <Quote className="w-14 h-14 rotate-180 fill-current" />
          </div>

          <div className="relative space-y-6 pt-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < (activeTest.rating || 5) ? 'text-amber-500 fill-amber-500' : 'text-sage-200'}`} />
                ))}
              </div>
              <span className="inline-flex items-center space-x-1.5 bg-sage-50 border border-sage-200 text-sage-800 text-xs font-semibold px-3 py-1 rounded-full w-fit">
                <Heart className="w-3 h-3 text-sage-500 fill-sage-500" />
                <span>Tratamiento por: {activeTest.condicion}</span>
              </span>
            </div>

            <blockquote className="font-serif text-base sm:text-lg text-sage-900 leading-relaxed font-medium italic pt-2">
              "{activeTest.texto}"
            </blockquote>

            <div className="flex items-center space-x-4 pt-4 border-t border-sage-100">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-sage-200/80 bg-sand-100 flex-shrink-0">
                <img
                  src={activeTest.imagen || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120&h=120'}
                  alt={activeTest.nombre}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <cite className="font-sans text-sm font-bold text-sage-900 not-italic block">{activeTest.nombre}</cite>
                <span className="font-sans text-xs text-sage-500">{activeTest.edad} años, {activeTest.ciudad}, Chile</span>
              </div>
            </div>

          </div>

          <div className="flex justify-end items-center gap-3 mt-8">
            <button
              onClick={prevSlide}
              className="p-2.5 rounded-full border border-sage-200 hover:bg-sage-50 text-sage-700 bg-white shadow-2xs hover:shadow-xs transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs text-sage-500 font-semibold select-none">
              {currentIndex + 1} / {testimonios.length}
            </span>
            <button
              onClick={nextSlide}
              className="p-2.5 rounded-full border border-sage-200 hover:bg-sage-50 text-sage-700 bg-white shadow-2xs hover:shadow-xs transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        <div className="mt-14 flex flex-wrap justify-center items-center gap-6 sm:gap-14 text-center">
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-sage-500" />
            <span className="font-sans text-xs font-bold text-sage-800 uppercase tracking-widest">100% Historias Verídicas</span>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-sage-500" />
            <span className="font-sans text-xs font-bold text-sage-800 uppercase tracking-widest">Acompañamiento Sin Juicios</span>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-sage-500" />
            <span className="font-sans text-xs font-bold text-sage-800 uppercase tracking-widest">Soporte Empático Continuo</span>
          </div>
        </div>

      </div>
    </section>
  );
}
