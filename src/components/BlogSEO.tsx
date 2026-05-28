import React, { useState } from 'react';
import { Search, Eye, BookOpen, Download, Mail, ArrowRight, Sparkles, X, Check, Calendar, User, Clock, FileText } from 'lucide-react';
import { ARTICLES, NUTRITIONIST_INFO } from '../data';
import { Article } from '../types';

interface BlogSEOProps {
  onOpenBooking: () => void;
}

export default function BlogSEO({ onOpenBooking }: BlogSEOProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  
  // Lead Magnet states
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [leadError, setLeadError] = useState('');

  // Handle lead submission
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeadError('');
    if (!leadName.trim()) return setLeadError('Por favor ingresa tu nombre.');
    if (!leadEmail.trim() || !leadEmail.includes('@')) return setLeadError('Por favor ingresa un correo electrónico válido.');

    setLeadCaptured(true);
  };

  // Filter articles based on search & category select
  const filteredArticles = ARTICLES.filter((article) => {
    const matchesCategory = selectedCategory === 'todos' || article.category === selectedCategory;
    const matchesQuery = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  // Schema Markup generation simulation
  const getSimulatedSchema = (article: Article) => {
    return {
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
  };

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-sand-500 font-bold block mb-2">Educación y Salud</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-sage-900 mb-4">
            Portal Nutricional y Recetas
          </h2>
          <p className="font-sans text-sage-600 text-sm sm:text-base leading-relaxed">
            Explora recetas nutritivas rápidas, tips de salud hormonal y artículos basados en evidencia clínica. Contenido pensado para tu bienestar diario.
          </p>
        </div>

        {/* Lead Magnet Box (Ebook download banner) */}
        {!leadCaptured ? (
          <div className="mb-16 bg-sage-50 rounded-3xl border border-sage-200/50 p-6 md:p-10 max-w-5xl mx-auto shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center space-x-2 bg-sage-100 text-sage-800 px-3 py-1 rounded-full text-xs font-bold w-fit">
                <Sparkles className="w-3 h-3 text-sage-600" />
                <span>E-Book de Regalo 2026</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-sage-900 leading-tight">
                Descarga Gratis: "Recetario Saludable de Temporada"
              </h3>
              <p className="font-sans text-xs sm:text-sm text-sage-700 leading-relaxed">
                Más de 35 combinaciones de almuerzos, postres antiinflamatorios y cenas rápidas adaptadas a ingredientes chilenos. Incluye la guía para armar porciones inteligentes en 5 minutos.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-sage-600">
                <span>✓ Archivo PDF de 80 páginas</span>
                <span>✓ Lista de compras supermercado LIDL/Jumbo/Líder</span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <form onSubmit={handleLeadSubmit} className="bg-white p-5 rounded-2xl border border-sage-200/30 space-y-4 shadow-sm">
                <p className="text-xs text-sage-500 font-medium">Ingresa tus datos para desbloquear descarga instantánea:</p>
                
                <div>
                  <input
                    type="text"
                    required
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    placeholder="Tu nombre completo"
                    className="w-full px-3.5 py-2 border border-sage-200 rounded-lg text-xs font-sans focus:outline-hidden focus:border-sage-700"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    placeholder="Tu mejor correo electrónico"
                    className="w-full px-3.5 py-2 border border-sage-200 rounded-lg text-xs font-sans focus:outline-hidden focus:border-sage-700"
                  />
                </div>

                {leadError && (
                  <p className="text-[11px] text-rose-500 font-medium">{leadError}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 bg-sage-700 hover:bg-sage-800 text-white rounded-full font-bold text-xs flex items-center justify-center space-x-1.5 cursor-pointer transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Obtener Recetario Gratis</span>
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="mb-16 bg-emerald-50 rounded-3xl border border-emerald-200 p-8 max-w-2xl mx-auto shadow-xs text-center space-y-4 animate-scale-up">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-2xs">
              <Check className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-emerald-950">¡Estás en la lista de descarga!</h3>
            <p className="text-xs text-emerald-800 leading-relaxed max-w-sm mx-auto">
              Hola, {leadName}. Hemos despachado con éxito el recetario interactivo y tu plantilla de porciones a <strong>{leadEmail}</strong>.
            </p>
            <a
              href="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-full text-xs shadow-xs transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar PDF Directamente</span>
            </a>
          </div>
        )}

        {/* Filter controls: live search input + category pills */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-sage-100 pb-6 mb-8 max-w-5xl mx-auto">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 order-2 md:order-1">
            {[
              { id: 'todos', name: 'Todos' },
              { id: 'nutricion', name: 'Nutrición Clínica' },
              { id: 'recetas', name: 'Recetas Rápidas' },
              { id: 'salud-integral', name: 'Salud Integral' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-sage-750 text-white shadow-xs'
                    : 'bg-sage-50 text-sage-700 hover:bg-sage-100'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Text Search element */}
          <div className="relative max-w-xs w-full order-1 md:order-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar artículo / receta..."
              className="w-full pl-8 pr-4 py-1.5 border border-sage-200 rounded-full text-xs font-sans outline-hidden focus:border-sage-500 bg-sand-50/50"
            />
            <Search className="w-3.5 h-3.5 text-sage-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="bg-sand-50/30 hover:bg-white rounded-2xl border border-sage-100 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-104"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-[10px] font-black uppercase text-sage-800 px-2.5 py-1 rounded-md border border-sage-150">
                    {article.category === 'recetas' ? 'Receta' : article.category === 'nutricion' ? 'Nutrición' : 'Salud'}
                  </span>
                </div>

                {/* Info Text */}
                <div className="p-5 space-y-3">
                  <h3 className="font-serif text-lg font-bold text-sage-900 leading-snug hover:text-sage-700 cursor-pointer" onClick={() => setSelectedArticle(article)}>
                    {article.title}
                  </h3>
                  <p className="font-sans text-xs text-sage-600 leading-relaxed line-clamp-2">
                    {article.summary}
                  </p>
                </div>
              </div>

              {/* Footer specs inside card */}
              <div className="px-5 pb-5 pt-3 border-t border-sage-100 flex items-center justify-between text-[11px] text-sage-500">
                <span className="font-medium">{article.readTime}</span>
                <button
                  onClick={() => setSelectedArticle(article)}
                  className="inline-flex items-center space-x-1 font-bold text-sage-750 hover:text-sage-900 cursor-pointer"
                >
                  <span>Leer Artículo</span>
                  <BookOpen className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Fallback no articles found */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12 max-w-md mx-auto">
            <Search className="w-8 h-8 text-sage-300 mx-auto mb-2 animate-bounce" />
            <p className="text-sm font-bold text-sage-900">No encontramos lo que buscas</p>
            <p className="text-xs text-sage-600 mt-1">Prueba con palabras clave como "intestino", "palta", "desayuno" o "insulina".</p>
          </div>
        )}

      </div>

      {/* Immersive Article Reader Dialog Modal with Full Schema markup */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop screen lock */}
          <div 
            className="absolute inset-0 bg-sage-900/70 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedArticle(null)}
          ></div>

          {/* Reader container */}
          <div className="relative bg-sand-50 rounded-2xl max-w-3xl w-full p-6 md:p-8 shadow-2xl border border-sage-200/50 z-10 animate-scale-up max-h-[92vh] overflow-y-auto">
            
            {/* Action Bar */}
            <div className="flex justify-between items-center pb-4 border-b border-sage-100 mb-6">
              <span className="text-[10px] uppercase font-bold tracking-widest text-sand-500 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                SEO Schema: MedicalBlogPosting Activo
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-sage-400 hover:text-sage-700 bg-white shadow-xs p-1.5 rounded-full border border-sage-100 cursor-pointer"
                title="Cerrar artículo"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Title & Author Details */}
            <header className="space-y-4 mb-6 text-left">
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-sage-900 leading-tight">
                {selectedArticle.title}
              </h3>
              
              <div className="flex flex-wrap items-center gap-4 text-xs text-sage-500">
                <span className="flex items-center space-x-1">
                  <User className="w-3.5 h-3.5" />
                  <span>Por {selectedArticle.author}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{selectedArticle.date}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{selectedArticle.readTime}</span>
                </span>
              </div>
            </header>

            {/* Big banner image */}
            <div className="aspect-video w-full rounded-xl overflow-hidden mb-6">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Formatted Text Content inside Article */}
            <div className="font-sans text-sage-800 text-sm sm:text-base leading-relaxed space-y-4 text-left whitespace-pre-line border-b border-sage-100 pb-8 prose max-w-none">
              {selectedArticle.content}
            </div>

            {/* Built-in conversions inside post */}
            <div className="mt-8 bg-sage-50 rounded-2xl border border-sage-200/50 p-6 flex flex-col md:flex-row items-center justify-between gap-5 text-left">
              <div>
                <h5 className="font-serif text-sm font-bold text-sage-900 mb-1">¿Deseas tratar esto paso a paso de forma seria?</h5>
                <p className="text-xs text-sage-600 max-w-md">
                  Inscritas en el SIS, nuestras pautas se adaptan para regularizar glicemias, sanar intestinos o SOP.
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedArticle(null);
                  onOpenBooking();
                }}
                className="px-6 py-2.5 bg-sage-700 hover:bg-sage-800 text-white rounded-full font-bold text-xs flex items-center space-x-1 cursor-pointer transition-all"
              >
                <span>Agendar Aquí</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Interactive Schema Markup Debug panel representation */}
            <div className="bg-slate-900 text-slate-100 rounded-xl p-4 mt-6 text-left border border-slate-700 font-mono text-[10px] max-h-40 overflow-y-auto">
              <span className="text-[9px] uppercase font-bold text-emerald-400 block mb-2">Schema.org JSON-LD (Metadata SEO Inyectada)</span>
              <pre>{JSON.stringify(getSimulatedSchema(selectedArticle), null, 2)}</pre>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
