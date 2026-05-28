import { Helmet } from 'react-helmet-async';
import FAQ from '../components/FAQ';

export default function FAQPage() {
  return (
    <>
      <Helmet>
        <title>Preguntas Frecuentes | Javiera Valdivieso Nutricionista</title>
        <meta name="description" content="Preguntas frecuentes sobre asesorías nutricionales online con Javiera Valdivieso. Consultas sobre Isapres, reembolsos, pagos, modalidad online y programas. Chile." />
        <meta name="keywords" content="preguntas frecuentes nutricionista, consulta online nutrición, reembolso isapre nutricionista, asesoría nutricional chile" />
        <link rel="canonical" href="https://javieravaldivieso.cl/preguntas-frecuentes" />
        <meta property="og:title" content="Preguntas Frecuentes | Javiera Valdivieso Nutricionista" />
        <meta property="og:description" content="Toda la información sobre asesorías online, Isapres, reembolsos y programas nutricionales." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://javieravaldivieso.cl/preguntas-frecuentes" />
      </Helmet>

      <div className="pt-28 pb-12 bg-sand-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-sand-500 font-bold block mb-2">Resuelve tus Dudas</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-sage-900 mb-4">
            Preguntas Frecuentes
          </h1>
          <p className="font-sans text-sage-600 text-base max-w-2xl mx-auto leading-relaxed">
            Toda la información administrativa que necesitas saber sobre Isapres, Fonasa, 
            asesorías online y reserva de horas.
          </p>
        </div>
      </div>

      <FAQ />
    </>
  );
}
