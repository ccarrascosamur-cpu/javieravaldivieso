import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, User, Clock, ArrowRight } from 'lucide-react';
import { useArticulo } from '../hooks/useApi';
import { NUTRITIONIST_INFO } from '../data';
import { useOutletContext } from 'react-router-dom';

interface OutletContext {
  onOpenBooking: (serviceId?: string) => void;
}

const categoryLabels: Record<string, string> = {
  nutricion: 'Nutrición Clínica',
  recetas: 'Recetas',
  'salud-integral': 'Salud Integral',
  habitos: 'Hábitos'
};

export default function ArticuloPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { onOpenBooking } = useOutletContext<OutletContext>();
  const { data: article, loading, error } = useArticulo(slug || '');
  
  if (loading) {
    return (
      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 animate-pulse">
          <div className="h-8 bg-sage-100 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-sage-100 rounded w-1/2 mb-8"></div>
          <div className="h-64 bg-sage-50 rounded-2xl mb-8"></div>
          <div className="space-y-3">
            <div className="h-4 bg-sage-50 rounded"></div>
            <div className="h-4 bg-sage-50 rounded"></div>
            <div className="h-4 bg-sage-50 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="font-serif text-2xl text-sage-900 mb-4">Artículo no encontrado</h1>
        <button 
          onClick={() => navigate('/blog')}
          className="px-6 py-2 bg-sage-700 text-white rounded-full text-sm font-bold"
        >
          Volver al Blog
        </button>
      </div>
    );
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalBlogPosting",
    "headline": article.titulo,
    "description": article.resumen,
    "author": {
      "@type": "Person",
      "name": NUTRITIONIST_INFO.name,
      "jobTitle": "Nutricionista Registrada SII"
    },
    "datePublished": "2026-05-24",
    "publisher": {
      "@type": "Physician",
      "name": NUTRITIONIST_INFO.name,
      "medicalSpecialty": "Dietitians and Nutritionists"
    },
    "keywords": article.tags
  };

  return (
    <>
      <Helmet>
        <title>{article.titulo} | {NUTRITIONIST_INFO.name}</title>
        <meta name="description" content={article.resumen} />
        <meta name="keywords" content={article.tags} />
        <link rel="canonical" href={`https://javieravaldivieso.cl/blog/${article.slug}`} />
        <meta property="og:title" content={`${article.titulo} | ${NUTRITIONIST_INFO.name}`} />
        <meta property="og:description" content={article.resumen} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://javieravaldivieso.cl/blog/${article.slug}`} />
        <meta property="og:image" content={article.imagen} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.titulo} />
        <meta name="twitter:description" content={article.resumen} />
        <meta name="twitter:image" content={article.imagen} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <article className="pt-24 pb-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-xs text-sage-500 mb-8">
            <button onClick={() => navigate('/')} className="hover:text-sage-700">Inicio</button>
            <span>/</span>
            <button onClick={() => navigate('/blog')} className="hover:text-sage-700">Blog</button>
            <span>/</span>
            <span className="text-sage-800 font-medium">{article.titulo}</span>
          </nav>

          <header className="mb-8">
            <span className="inline-flex items-center bg-sage-100 text-sage-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              {categoryLabels[article.categoria] || article.categoria}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-sage-900 leading-tight mb-6">
              {article.titulo}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-sage-500">
              <span className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>Por {NUTRITIONIST_INFO.name}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{article.fecha}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{article.readtime}</span>
              </span>
            </div>
          </header>

          <div className="aspect-video w-full rounded-2xl overflow-hidden mb-10 shadow-lg">
            <img
              src={article.imagen || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=700&h=450'}
              alt={article.titulo}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="font-sans text-sage-800 text-base sm:text-lg leading-relaxed whitespace-pre-line border-b border-sage-100 pb-8">
            {article.contenido || article.resumen}
          </div>

          {article.tags && (
            <div className="mt-10 pt-6">
              <div className="flex flex-wrap gap-2">
                {article.tags.split(',').map((tag: string) => (
                  <span key={tag} className="px-3 py-1 bg-sage-50 text-sage-700 rounded-full text-xs font-medium">
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10 bg-sage-50 rounded-2xl border border-sage-200/50 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-5">
            <div>
              <h3 className="font-serif text-lg font-bold text-sage-900 mb-2">¿Quieres aplicar esto en tu vida?</h3>
              <p className="text-sm text-sage-600 max-w-md">
                Agenda una asesoría online personalizada y trabajemos juntas en tu salud metabólica, digestiva o hormonal.
              </p>
            </div>
            <button
              onClick={() => onOpenBooking()}
              className="px-6 py-3 bg-sage-700 hover:bg-sage-800 text-white rounded-full font-bold text-sm flex items-center space-x-2 transition-all whitespace-nowrap"
            >
              <span>Agendar Asesoría</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-10">
            <button
              onClick={() => navigate('/blog')}
              className="inline-flex items-center space-x-2 text-sage-700 hover:text-sage-900 font-medium text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver al Blog</span>
            </button>
          </div>
        </div>
      </article>
    </>
  );
}
