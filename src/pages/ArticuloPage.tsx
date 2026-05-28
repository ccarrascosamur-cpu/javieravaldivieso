import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { ArrowLeft, Calendar, User, Clock, BookOpen, ArrowRight } from 'lucide-react';
import { ARTICLES, NUTRITIONIST_INFO } from '../data';
import { useOutletContext } from 'react-router-dom';

interface OutletContext {
  onOpenBooking: (serviceId?: string) => void;
}

export default function ArticuloPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { onOpenBooking } = useOutletContext<OutletContext>();
  
  const article = ARTICLES.find(a => a.slug === slug);
  
  if (!article) {
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
    "headline": article.title,
    "description": article.summary,
    "author": {
      "@type": "Person",
      "name": article.author,
      "jobTitle": "Nutricionista Registrada SII",
      "alumniOf": "Universidad de Chile"
    },
    "datePublished": "2026-05-24",
    "publisher": {
      "@type": "Physician",
      "name": NUTRITIONIST_INFO.name,
      "medicalSpecialty": "Dietitians and Nutritionists"
    },
    "keywords": article.seoKeywords.join(', ')
  };

  return (
    <>
      <Helmet>
        <title>{article.title} | Javiera Valdivieso</title>
        <meta name="description" content={article.summary} />
        <meta name="keywords" content={article.seoKeywords.join(', ')} />
        <link rel="canonical" href={`https://javieravaldivieso.cl/blog/${article.slug}`} />
        <meta property="og:title" content={`${article.title} | Javiera Valdivieso`} />
        <meta property="og:description" content={article.summary} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://javieravaldivieso.cl/blog/${article.slug}`} />
        <meta property="og:image" content={article.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.summary} />
        <meta name="twitter:image" content={article.image} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <article className="pt-24 pb-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-xs text-sage-500 mb-8">
            <button onClick={() => navigate('/')} className="hover:text-sage-700">Inicio</button>
            <span>/</span>
            <button onClick={() => navigate('/blog')} className="hover:text-sage-700">Blog</button>
            <span>/</span>
            <span className="text-sage-800 font-medium">{article.title}</span>
          </nav>

          {/* Header */}
          <header className="mb-8">
            <span className="inline-flex items-center bg-sage-100 text-sage-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              {article.category === 'recetas' ? 'Receta' : article.category === 'nutricion' ? 'Nutrición Clínica' : 'Salud Integral'}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-sage-900 leading-tight mb-6">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-sage-500">
              <span className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>Por {article.author}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{article.date}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{article.readTime}</span>
              </span>
            </div>
          </header>

          {/* Featured Image */}
          <div className="aspect-video w-full rounded-2xl overflow-hidden mb-10 shadow-lg">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Content */}
          <div className="prose prose-sage max-w-none">
            <div className="font-sans text-sage-800 text-base sm:text-lg leading-relaxed whitespace-pre-line">
              {article.content}
            </div>
          </div>

          {/* Tags */}
          <div className="mt-10 pt-6 border-t border-sage-100">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-sage-50 text-sage-700 rounded-full text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
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

          {/* Back */}
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
