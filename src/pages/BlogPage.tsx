import { Helmet } from 'react-helmet-async';
import { useOutletContext } from 'react-router-dom';
import BlogSEO from '../components/BlogSEO';

interface OutletContext {
  onOpenBooking: (serviceId?: string) => void;
}

export default function BlogPage() {
  const { onOpenBooking } = useOutletContext<OutletContext>();

  return (
    <>
      <Helmet>
        <title>Blog Nutricional & Recetas | Javiera Valdivieso</title>
        <meta name="description" content="Blog de nutrición de Javiera Valdivieso. Artículos sobre salud digestiva, resistencia a la insulina, recetas saludables y tips de alimentación consciente para chilenos." />
        <meta name="keywords" content="blog nutrición chile, recetas saludables, salud digestiva, resistencia insulina, alimentación consciente, nutricionista blog" />
        <link rel="canonical" href="https://javieravaldivieso.cl/blog" />
        <meta property="og:title" content="Blog Nutricional & Recetas | Javiera Valdivieso" />
        <meta property="og:description" content="Artículos de nutrición, recetas saludables y tips de alimentación consciente para chilenos." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://javieravaldivieso.cl/blog" />
        <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Expires" content="0" />
      </Helmet>

      <div className="pt-28 pb-12 bg-sand-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-sand-500 font-bold block mb-2">Educación Nutricional</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-sage-900 mb-4">
            Blog & Recetas
          </h1>
          <p className="font-sans text-sage-600 text-base max-w-2xl mx-auto leading-relaxed">
            Explora recetas nutritivas rápidas, tips de salud hormonal y artículos basados en evidencia clínica. 
            Contenido 100% optimizado para tu bienestar diario.
          </p>
        </div>
      </div>

      <BlogSEO onOpenBooking={() => onOpenBooking()} />
    </>
  );
}
