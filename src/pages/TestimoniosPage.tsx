import { Helmet } from 'react-helmet-async';
import Testimonials from '../components/Testimonials';

export default function TestimoniosPage() {
  return (
    <>
      <Helmet>
        <title>Testimonios de Pacientes | Javiera Valdivieso Nutricionista</title>
        <meta name="description" content="Testimonios reales de pacientes de Javiera Valdivieso. Historias de éxito en salud digestiva, hormonal, pérdida de peso y nutrición deportiva. Asesorías online Chile." />
        <meta name="keywords" content="testimonios nutricionista, pacientes nutricionista chile, resultados nutrición, asesoría online testimonios" />
        <link rel="canonical" href="https://javieravaldivieso.cl/testimonios" />
        <meta property="og:title" content="Testimonios de Pacientes | Javiera Valdivieso Nutricionista" />
        <meta property="og:description" content="Historias reales de transformación nutricional. Pacientes de todo Chile." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://javieravaldivieso.cl/testimonios" />
      </Helmet>

      <div className="pt-28 pb-12 bg-sand-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-sand-500 font-bold block mb-2">Experiencias Reales</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-sage-900 mb-4">
            Testimonios de Pacientes
          </h1>
          <p className="font-sans text-sage-600 text-base max-w-2xl mx-auto leading-relaxed">
            Descubre las experiencias de quienes decidieron transformar su estilo de vida y sanar su metabolismo 
            bajo mi asesoramiento nutricional online desde diferentes ciudades de Chile.
          </p>
        </div>
      </div>

      <Testimonials />
    </>
  );
}
