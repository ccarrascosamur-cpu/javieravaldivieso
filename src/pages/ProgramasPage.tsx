import { Helmet } from 'react-helmet-async';
import { useOutletContext } from 'react-router-dom';
import Services from '../components/Services';

interface OutletContext {
  onOpenBooking: (serviceId?: string) => void;
  onOpenPaymentDirectly: (serviceId: string) => void;
}

export default function ProgramasPage() {
  const { onOpenBooking, onOpenPaymentDirectly } = useOutletContext<OutletContext>();

  return (
    <>
      <Helmet>
        <title>Programas y Precios | Javiera Valdivieso Nutricionista</title>
        <meta name="description" content="Programas de asesoría nutricional online con Javiera Valdivieso. Consulta inicial, pack bienestar 1 mes, programa 3 meses y plan deportivo. Precios en CLP. Reembolsable en Isapres." />
        <meta name="keywords" content="programas nutricionales chile, asesoría nutricional precios, consulta nutricionista online, pack bienestar, programa hábitos sostenibles" />
        <link rel="canonical" href="https://javieravaldivieso.cl/programas" />
        <meta property="og:title" content="Programas y Precios | Javiera Valdivieso Nutricionista" />
        <meta property="og:description" content="Programas de asesoría nutricional online. Consultas, packs y mentorías. Precios en CLP. Reembolsable en Isapres." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://javieravaldivieso.cl/programas" />
      </Helmet>

      <div className="pt-28 pb-12 bg-sand-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-sand-500 font-bold block mb-2">Inversiones</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-sage-900 mb-4">
            Planes de Acompañamiento
          </h1>
          <p className="font-sans text-sage-600 text-base max-w-2xl mx-auto leading-relaxed">
            Inversiones pensadas para generar transformaciones metabólicas y digestivas reales. 
            Todas las asesorías son online y las boletas son reembolsables en Isapres.
          </p>
        </div>
      </div>

      <Services 
        onSelectServiceForBooking={(id) => onOpenBooking(id)}
        onSelectServiceForPayment={(id) => onOpenPaymentDirectly(id)}
      />
    </>
  );
}
