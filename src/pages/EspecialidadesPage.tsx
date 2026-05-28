import { Helmet } from 'react-helmet-async';
import { useOutletContext } from 'react-router-dom';
import Specialties from '../components/Specialties';

interface OutletContext {
  onOpenBooking: (serviceId?: string) => void;
}

export default function EspecialidadesPage() {
  const { onOpenBooking } = useOutletContext<OutletContext>();

  return (
    <>
      <Helmet>
        <title>Especialidades Clínicas | Javiera Valdivieso Nutricionista</title>
        <meta name="description" content="Especialidades nutricionales de Javiera Valdivieso: resistencia a la insulina, salud digestiva, SOP, nutrición deportiva, pérdida de peso sostenible y más. Asesorías online en Chile." />
        <meta name="keywords" content="nutricionista especialidades, resistencia insulina, salud digestiva, SOP, nutrición deportiva, pérdida peso sostenible, asesoría online chile" />
        <link rel="canonical" href="https://javieravaldivieso.cl/especialidades" />
        <meta property="og:title" content="Especialidades Clínicas | Javiera Valdivieso Nutricionista" />
        <meta property="og:description" content="Especialidades nutricionales: resistencia insulina, salud digestiva, SOP, nutrición deportiva. Asesorías online Chile." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://javieravaldivieso.cl/especialidades" />
      </Helmet>

      <div className="pt-28 pb-12 bg-sand-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-sand-500 font-bold block mb-2">Áreas de Expertise</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-sage-900 mb-4">
            Especialidades Clínicas
          </h1>
          <p className="font-sans text-sage-600 text-base max-w-2xl mx-auto leading-relaxed">
            Abordamos tu nutrición desde la fisiología, el respeto y la evidencia científica. 
            Cada especialidad incluye asesoría online personalizada para todo Chile.
          </p>
        </div>
      </div>

      <Specialties onOpenBooking={(specId) => onOpenBooking(specId)} />
    </>
  );
}
