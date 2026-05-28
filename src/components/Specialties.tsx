import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, 
  Sparkles, 
  Heart, 
  Zap, 
  Leaf, 
  TrendingDown, 
  Baby, 
  Smile, 
  X, 
  CheckCircle2, 
  ArrowRight,
  ClipboardList
} from 'lucide-react';
import { SPECIALTIES } from '../data';
import { Specialty } from '../types';

interface SpecialtiesProps {
  onOpenBooking: (serviceId?: string) => void;
}

// Icon Mapping component
function SpecialtyIcon({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case 'Activity': return <Activity className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'Heart': return <Heart className={className} />;
    case 'Zap': return <Zap className={className} />;
    case 'Leaf': return <Leaf className={className} />;
    case 'TrendingDown': return <TrendingDown className={className} />;
    case 'Baby': return <Baby className={className} />;
    case 'Smile': return <Smile className={className} />;
    default: return <ClipboardList className={className} />;
  }
}

export default function Specialties({ onOpenBooking }: SpecialtiesProps) {
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(null);

  return (
    <section id="especialidades" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-sand-500 font-bold block mb-2">Especialidades Clínicas</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-sage-900 mb-4">
            ¿Cómo puedo ayudarte a optimizar tu cuerpo?
          </h2>
          <p className="font-sans text-sage-600 text-base leading-relaxed">
            Abordamos tu nutrición desde la fisiología, el respeto y la evidencia científica. Sin dietas de hambre, enfocándonos en lo que tu cuerpo verdaderamente necesita.
          </p>
        </div>

        {/* Specialties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SPECIALTIES.map((spec) => (
            <div
              key={spec.id}
              className="group relative bg-sand-50/50 hover:bg-sand-100/70 border border-sage-100/50 rounded-2xl p-6 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              {/* Card visual contents */}
              <div>
                <div className="flex justify-between items-start mb-5">
                  <div className="w-11 h-11 rounded-xl bg-sage-100/80 text-sage-700 flex items-center justify-center group-hover:bg-sage-700 group-hover:text-white transition-all duration-300">
                    <SpecialtyIcon name={spec.iconName} className="w-5.5 h-5.5" />
                  </div>
                  <span className="font-serif italic text-sage-700/40 text-lg font-bold">
                    {`0${SPECIALTIES.findIndex(s => s.id === spec.id) + 1}`}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-semibold text-sage-900 mb-2 group-hover:text-sage-800 transition-colors">
                  {spec.title}
                </h3>
                <p className="font-sans text-sm text-sage-600 leading-relaxed mb-6">
                  {spec.description}
                </p>
              </div>

              {/* Card Interactive Trigger */}
              <button
                onClick={() => setSelectedSpecialty(spec)}
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-sage-700 hover:text-sage-900 tracking-wider uppercase group-hover:translate-x-1 transition-all mt-auto cursor-pointer"
              >
                <span>Más información</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Quick bottom CTA */}
        <div className="mt-14 text-center">
          <p className="text-sm text-sage-600 mb-4 font-medium">
            ¿No estás seguro de cuál especialidad se adapta a tus síntomas alimenticios?
          </p>
          <button
            onClick={() => onOpenBooking()}
            className="inline-flex items-center space-x-2 text-sage-800 font-bold text-sm underline hover:text-sage-500 hover:no-underline cursor-pointer"
          >
            <span>Agenda una asesoría de orientación gratuita (10 min)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Specialty Detail Dialog Modal */}
      {selectedSpecialty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop screen lock */}
          <div 
            className="absolute inset-0 bg-sage-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedSpecialty(null)}
          ></div>

          {/* Dialog Container */}
          <div className="relative bg-sand-50 rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-sage-200/50 z-10 animate-scale-up max-h-[90vh] overflow-y-auto">
            {/* Close */}
            <button
              onClick={() => setSelectedSpecialty(null)}
              className="absolute top-4 right-4 text-sage-400 hover:text-sage-700 bg-white shadow-xs p-1.5 rounded-full border border-sage-100"
              title="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Icon & Title */}
            <div className="flex items-center space-x-4 mb-6 pt-2">
              <div className="w-12 h-12 rounded-xl bg-sage-700 text-white flex items-center justify-center">
                <SpecialtyIcon name={selectedSpecialty.iconName} className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-sand-500">¿Cómo lo tratamos?</span>
                <h3 className="font-serif text-2xl font-semibold text-sage-900">{selectedSpecialty.title}</h3>
              </div>
            </div>

            {/* Core clinical text info */}
            <div className="space-y-4 mb-8">
              <p className="font-sans text-sage-800 leading-relaxed text-base pt-1">
                {selectedSpecialty.longDescription}
              </p>
              
              {/* Highlight Checklist */}
              <div className="bg-sage-100/50 rounded-xl p-4 border border-sage-200/30">
                <span className="text-xs uppercase tracking-wider text-sage-800 font-bold block mb-2">La asesoría incluye:</span>
                <ul className="space-y-2 text-xs text-sage-700 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sage-500 flex-shrink-0" />
                    <span>Análisis fisiológico personalizado del cuadro.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sage-500 flex-shrink-0" />
                    <span>Orden de exámenes específicos (Glucosa, INS, TSH, etc.) si aplica.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sage-500 flex-shrink-0" />
                    <span>Propuesta culinaria libre de torturas restrictivas.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Actions inside modal */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setSelectedSpecialty(null)}
                className="py-3 bg-white hover:bg-sage-50 border border-sage-200 rounded-full font-bold text-sage-800 text-sm transition-all cursor-pointer"
              >
                Volver
              </button>
              <button
                onClick={() => {
                  setSelectedSpecialty(null);
                  onOpenBooking(selectedSpecialty.id);
                }}
                className="py-3 bg-sage-700 hover:bg-sage-800 text-white font-bold rounded-full text-sm transition-all cursor-pointer shadow-xs"
              >
                Agendar Asesoría
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
