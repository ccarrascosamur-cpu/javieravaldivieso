import { Sparkles, UtensilsCrossed, Apple, Smile, Shield } from 'lucide-react';
import { NUTRITIONIST_INFO } from '../data';

export default function Enfoque() {
  return (
    <section id="enfoque" className="py-20 lg:py-24 bg-white relative">
      {/* Visual ornaments */}
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-sand-100/40 blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Column 1: Lifestyle Photo Container & Editorial Blocks (col-6) */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full rounded-3xl overflow-hidden border-2 border-white shadow-2xl aspect-4/5 max-w-md mx-auto">
              {/* Fresh organic meal prep lifestyle image */}
              <img
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=650&h=850"
                alt="Alimentación Consciente y Estilo de Vida Saludable"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-103"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlaid Quotes/Insight */}
              <div className="absolute bottom-6 left-6 right-6 bg-sage-900/90 backdrop-blur-md p-5 rounded-2xl text-left border border-white/10 shadow-lg">
                <p className="font-serif italic text-sm text-sand-500 mb-2">"La salud no es un peso ideal, es un estado de paz digestiva, balance hormonal y libertad de pensamiento."</p>
                <p className="font-sans text-[10px] uppercase tracking-widest text-white/70 font-bold">— {NUTRITIONIST_INFO.name}</p>
              </div>
            </div>
          </div>

          {/* Column 2: Storytelling Content (col-6) */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            <span className="text-xs uppercase tracking-widest text-sand-500 font-bold block mb-2">Filosofía de Trabajo</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-sage-900 mb-6 leading-tight">
              Un enfoque sin torturas ni falsas promesas.
            </h2>
            
            <p className="font-sans text-sage-800 text-sm sm:text-base leading-relaxed mb-6">
              Todos sabemos que las dietas extremas de mil calorías y batidos adelgazantes fracasan a los pocos meses. El famoso <strong>efecto rebote</strong> no ocurre por falta de voluntad; ocurre porque tu fisiología interpreta la restricción de comida como un estado de hambruna, dañando tu tiroides y ralentizando tu tasa metabólica.
            </p>

            <p className="font-sans text-sage-800 text-sm sm:text-base leading-relaxed mb-8">
              Mi metodología se basa en la <strong>educación alimentaria adaptada</strong>. En lugar de entregarte una lista rígida de alimentos prohibidos, analizamos tu rutina chilena (tus horarios de oficina, tus gustos o antojos, tu cocinería del día a día) y armamos un pilar de hábitos sostenibles que giran a tu favor. Todo desde la comodidad de una <strong>asesoría online</strong> que se adapta a tu agenda.
            </p>

            {/* Crucial pillars list grids */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-sage-50 text-sage-700 flex items-center justify-center flex-shrink-0 border border-sage-100">
                  <Apple className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-sage-900 mb-1">Cero Restricciones Rígidas</h4>
                  <p className="text-xs text-sage-600 leading-relaxed">Disfruta la palta, el pan integral de panadería, y las legumbres. Comemos comidas reales y densas en nutrientes.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-sage-50 text-sage-700 flex items-center justify-center flex-shrink-0 border border-sage-100">
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-sage-900 mb-1">Educación Alimentaria</h4>
                  <p className="text-xs text-sage-600 leading-relaxed">Aprenderás a interpretar el etiquetado nutricional de supermercados chilenos y armar porciones balanceadas.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-sage-50 text-sage-700 flex items-center justify-center flex-shrink-0 border border-sage-100">
                  <Smile className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-sage-900 mb-1">Conexión Emocional</h4>
                  <p className="text-xs text-sage-600 leading-relaxed">Trabajamos las señales fisiológicas reales de hambre y saciedad en lugar de comer por aburrimiento o ansiedad.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-sage-50 text-sage-700 flex items-center justify-center flex-shrink-0 border border-sage-100">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-sage-900 mb-1">Resultados Comprobados</h4>
                  <p className="text-xs text-sage-600 leading-relaxed">Monitoreamos tu bioquímica (exámenes de laboratorio), tus niveles de energía diarios y digestión.</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
