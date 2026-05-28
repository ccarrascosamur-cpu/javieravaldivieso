import { useState } from 'react';
import { HelpCircle, ChevronDown, CheckCircle2, Award } from 'lucide-react';
import { FAQS } from '../data';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCat, setSelectedCat] = useState<string>('todos');

  const categories = [
    { id: 'todos', label: 'Ver Todo' },
    { id: 'consulta', label: 'La Consulta' },
    { id: 'isapre-fonasa', label: 'Isapre y Reembolsos' },
    { id: 'pagos', label: 'Pagos y Cancelaciones' },
    { id: 'programas', label: 'Programas Semanales' }
  ];

  const filteredFaqs = FAQS.filter(
    (faq) => selectedCat === 'todos' || faq.category === selectedCat
  );

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-sand-50/60 relative">
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-sand-200/30 blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-widest text-sand-500 font-bold block mb-2">Despeja tus dudas</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-sage-900 mb-4">
            Preguntas Frecuentes (FAQ)
          </h2>
          <p className="font-sans text-sage-600 text-sm max-w-lg mx-auto leading-relaxed">
            Toda la información administrativa que necesitas saber sobre Isapres, Fonasa, videollamadas y reserva online.
          </p>
        </div>

        {/* Category switcher tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCat(cat.id);
                setOpenIndex(null); // Close active accordion
              }}
              className={`px-4.5 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                selectedCat === cat.id
                  ? 'bg-sage-750 text-white shadow-xs'
                  : 'bg-white border border-sage-100 text-sage-700 hover:bg-sage-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-sage-100/60 overflow-hidden shadow-2xs hover:shadow-xs transition-all"
              >
                {/* Header Toggle */}
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-serif text-sage-900 font-bold text-sm sm:text-base focus:outline-hidden cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-sage-500 transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-sage-800' : ''
                    }`}
                  />
                </button>

                {/* Content Panel */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[500px] border-t border-sage-50 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 py-5 font-sans text-sage-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line bg-sand-50/20">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom micro notice */}
        <div className="mt-12 text-center p-5 bg-white border border-sage-100 rounded-2xl max-w-2xl mx-auto flex items-center gap-3 text-left">
          <div className="bg-sage-100 p-2 text-sage-700 rounded-lg hidden sm:block">
            <Award className="w-5 h-5" />
          </div>
          <p className="text-xs text-sage-600 leading-normal">
            <strong>¿Sabías qué?</strong> El reembolso por Isapre/seguro es un derecho legal de prestadores inscritos en la Superintendencia de Salud (SIS). Consulta siempre el código arancelario ante tu previsión para asegurar la cobertura óptima.
          </p>
        </div>

      </div>
    </section>
  );
}
