import { Check, Calendar, ShoppingCart, HelpCircle } from 'lucide-react';
import { useServicios } from '../hooks/useApi';

interface ServicesProps {
  onSelectServiceForBooking: (serviceId: string) => void;
  onSelectServiceForPayment: (serviceId: string) => void;
}

export default function Services({ onSelectServiceForBooking, onSelectServiceForPayment }: ServicesProps) {
  const { data: servicios, loading, error } = useServicios();

  if (loading) {
    return (
      <section id="programas" className="py-20 bg-sand-50/60">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-sage-100 rounded w-1/3 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[1,2,3].map(i => (
                <div key={i} className="h-96 bg-sage-50 rounded-3xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="programas" className="py-20 bg-sand-50/60">
        <div className="max-w-7xl mx-auto px-4 text-center text-rose-600">
          <p>Error cargando servicios: {error}</p>
        </div>
      </section>
    );
  }

  const categoryLabels: Record<string, string> = {
    consulta: 'Consulta Clínica',
    pack: 'Pack Convenio',
    programa: 'Programa Intensivo'
  };

  return (
    <section id="programas" className="py-20 bg-sand-50/60 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-sand-200/20 blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-sand-500 font-bold block mb-2">Programas y Diagnósticos</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-sage-900 mb-4">
            Planes de Acompañamiento Nutricional Premium
          </h2>
          <p className="font-sans text-sage-600 text-sm sm:text-base leading-relaxed">
            Inversiones pensadas para generar transformaciones metabólicas y digestivas reales. 
            Todas las asesorías son 100% online y las boletas son reembolsables en Isapres y seguros.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-14">
          {(servicios || []).slice(0, 3).map((plan: any, index: number) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-3xl border transition-all duration-500 flex flex-col justify-between p-6 sm:p-8 group cursor-default ${
                plan.isPopular === 1
                  ? 'border-sage-500 shadow-lg scale-100 md:scale-105 z-10 bg-white hover:shadow-xl hover:-translate-y-1'
                  : 'border-sage-200/60 shadow-xs hover:border-sage-400 hover:shadow-lg hover:-translate-y-2 hover:scale-[1.02]'
              }`}
            >
              {/* Número sutil esquina superior derecha */}
              <div className="absolute top-3 right-5 z-10">
                <span className="font-serif text-4xl font-bold text-sage-200/60 select-none">{index + 1}</span>
              </div>

              {plan.isPopular === 1 && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-sage-700 text-white text-[10px] uppercase tracking-widest font-black px-4 py-1.5 rounded-full shadow-xs">
                  El más recomendado
                </div>
              )}

              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-sand-500 block mb-1">
                  {categoryLabels[plan.categoria] || plan.categoria || 'Servicio'}
                </span>
                
                <h3 className="font-serif text-xl font-bold text-sage-900 mb-2 leading-tight">
                  {plan.nombre}
                </h3>
                
                <p className="font-sans text-xs text-sage-600 leading-relaxed mb-6">
                  {plan.shortDesc}
                </p>

                <div className="border-b border-sage-100 pb-5 mb-6 flex items-baseline gap-2">
                  <span className="font-serif text-3xl sm:text-4xl font-black text-sage-955">
                    ${plan.precio?.toLocaleString('es-CL')}
                  </span>
                  <span className="text-xs text-sage-400 font-bold uppercase">CLP</span>
                  {plan.precio_original && (
                    <span className="text-xs text-sage-400 line-through ml-2 font-medium">
                      ${plan.precio_original.toLocaleString('es-CL')} CLP
                    </span>
                  )}
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center space-x-2 text-xs text-sage-700 py-1 border-b border-sage-50">
                    <span className="font-sans font-bold text-sand-600 block w-20">Duración:</span>
                    <span className="font-medium text-sage-900">{plan.duracion}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-sage-700 py-1 border-b border-sage-50">
                    <span className="font-sans font-bold text-sand-600 block w-20">Modalidad:</span>
                    <span className="font-medium text-sage-900">100% Online (Videollamada)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-sage-700 py-1 border-b border-sage-50">
                    <span className="font-sans font-bold text-sand-600 block w-20">Recetarios:</span>
                    <span className="font-medium text-sage-900">Incluido en PDF interactivo</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {(plan.beneficios?.split('|') || []).map((benefit: string, idx: number) => (
                    <li key={idx} className="flex items-start text-xs text-sage-700 leading-snug">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mr-2 mt-0.5" />
                      <span>{benefit.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2.5 mt-auto">
                <a
                  href={plan.link_calendario || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (!plan.link_calendario) {
                      e.preventDefault();
                      onSelectServiceForBooking(plan.service_id || plan.id);
                    }
                  }}
                  className="w-full py-3.5 bg-sage-700 hover:bg-sage-800 text-white font-bold rounded-full text-xs shadow-xs hover:shadow-sm transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Agendar Fecha y Hora</span>
                </a>
                <a
                  href={plan.link_pago || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (!plan.link_pago) {
                      e.preventDefault();
                      onSelectServiceForPayment(plan.service_id || plan.id);
                    }
                  }}
                  className="w-full py-3 bg-white hover:bg-sage-50 border border-sage-200 text-sage-800 font-bold rounded-full text-xs transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <ShoppingCart className="w-3.5 h-3.5 text-sage-500" />
                  <span>Pagar / Comprar Ahora</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl border border-sage-100 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xs">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-sage-50 text-sage-600 flex-shrink-0 hidden sm:block">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-sage-900 mb-1">¿Cómo realizo el reembolso de mi boleta?</h4>
              <p className="font-sans text-xs text-sage-600 max-w-2xl leading-relaxed">
                Una vez concluida la asesoría o el pago, emitiré tu boleta de honorarios clínica digital. 
                Deberás subir el archivo PDF adjunto a la App o portal de tu Isapre.
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/56987654321?text=Hola,%20tengo%20dudas%20sobre%20el%20reembolso"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 bg-sage-100 hover:bg-sage-200 text-sage-800 font-bold rounded-full text-xs transition-all flex-shrink-0"
          >
            Consultar por WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
