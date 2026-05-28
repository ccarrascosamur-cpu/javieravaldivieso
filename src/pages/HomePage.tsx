import { useOutletContext } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import Specialties from '../components/Specialties';
import Enfoque from '../components/Enfoque';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import BlogSEO from '../components/BlogSEO';
import FAQ from '../components/FAQ';

interface OutletContext {
  onOpenBooking: (serviceId?: string) => void;
  onOpenPaymentDirectly: (serviceId: string) => void;
}

export default function HomePage() {
  const { onOpenBooking, onOpenPaymentDirectly } = useOutletContext<OutletContext>();

  return (
    <>
      <Helmet>
        <title>Javiera Valdivieso | Nutricionista · Asesorías Online en Chile</title>
        <meta name="description" content="Asesorías nutricionales online con Javiera Valdivieso. Especialista en salud digestiva, hormonal y metabólica. Atención 100% online para todo Chile. Reembolsable en Isapres." />
        <meta name="keywords" content="nutricionista online chile, asesoría nutricional, Javiera Valdivieso, salud digestiva, resistencia insulina, SOP, nutrición clínica" />
        <link rel="canonical" href="https://javieravaldivieso.cl/" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Javiera Valdivieso | Nutricionista · Asesorías Online en Chile" />
        <meta property="og:description" content="Asesorías nutricionales online personalizadas. Especialista en salud digestiva, hormonal y metabólica. Atención para todo Chile." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://javieravaldivieso.cl/" />
        <meta property="og:image" content="https://javieravaldivieso.cl/logo-javiera-valdivieso.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Javiera Valdivieso | Nutricionista · Asesorías Online en Chile" />
        <meta name="twitter:description" content="Asesorías nutricionales online personalizadas para todo Chile." />
        <meta name="twitter:image" content="https://javieravaldivieso.cl/logo-javiera-valdivieso.png" />
        
        {/* Schema.org */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Javiera Valdivieso",
          "jobTitle": "Nutricionista Clínica",
          "description": "Nutricionista especialista en asesorías online para todo Chile. Experta en salud digestiva, hormonal y metabólica.",
          "url": "https://javieravaldivieso.cl",
          "image": "https://javieravaldivieso.cl/logo-javiera-valdivieso.png",
          "sameAs": [
            "https://www.instagram.com/nutjavieravaldivieso/"
          ],
          "worksFor": {
            "@type": "Organization",
            "name": "Javiera Valdivieso Nutricionista"
          },
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "CL"
          }
        })}</script>
      </Helmet>

      <Hero 
        onOpenBooking={() => onOpenBooking()} 
        onViewPrograms={() => {
          const el = document.getElementById('programas');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }} 
      />
      <Specialties onOpenBooking={(specId) => onOpenBooking(specId)} />
      <Enfoque />
      <Services 
        onSelectServiceForBooking={(id) => onOpenBooking(id)}
        onSelectServiceForPayment={(id) => onOpenPaymentDirectly(id)}
      />
      <Testimonials />
      <BlogSEO onOpenBooking={() => onOpenBooking()} />
      <FAQ />
    </>
  );
}
