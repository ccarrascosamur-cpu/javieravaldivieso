import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, BookOpen, ArrowRight, X, User, Calendar, Clock, FileText } from 'lucide-react';
import { useArticulos } from '../hooks/useApi';
import { NUTRITIONIST_INFO } from '../data';

interface BlogSEOProps {
  onOpenBooking: () => void;
}

export default function BlogSEO({ onOpenBooking }: BlogSEOProps) {
  const navigate = useNavigate();
  const { data: articulos, loading, error } = useArticulos();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);

  const filteredArticles = (articulos || []).filter((article: any) => {
    const matchesCategory = selectedCategory === 'todos' || article.categoria === selectedCategory;
    const matchesQuery = 
      !searchQuery ||
      article.titulo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.resumen?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const categoryLabels: Record<string, string> = {
    todos: 'Todos',
    nutricion: 'Nutrición Clínica',
    recetas: 'Recetas Rápidas',
    'salud-integral': 'Salud Integral',
    habitos: 'Hábitos'
  };

  if (loading) {
    return (
      <section id="blog" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-sage-100 rounded w-1/3 mx-auto"></div>
            <div className="h-4 bg-sage-100 rounded w-1/2 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[1,2,3].map(i => (
                <div key={i} className="h-64 bg-sage-50 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="blog" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center text-rose-600">
          <p>Error cargando artículos: {error}</p>
        </div>
      </section>
    );
  }

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

        {/* Filter controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-sage-100 pb-6 mb-8 max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-2 order-2 md:order-1">
            {Object.entries(categoryLabels).map(([id, name]) => (
              <button
                key={id}
                onClick={() => setSelectedCategory(id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                  selectedCategory === id
                    ? 'bg-sage-750 text-white shadow-xs'
                    : 'bg-sage-50 text-sage-700 hover:bg-sage-100'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
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
          {filteredArticles.map((article: any) => (
            <article
              key={article.id}
              className="bg-sand-50/30 hover:bg-white rounded-2xl border border-sage-100 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={article.imagen || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=700&h=450'}
                    alt={article.titulo}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-104"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-[10px] font-black uppercase text-sage-800 px-2.5 py-1 rounded-md border border-sage-150">
                    {categoryLabels[article.categoria] || article.categoria}
                  </span>
                </div>
                <div className="p-5 space-y-3">
                  <h3 
                    className="font-serif text-lg font-bold text-sage-900 leading-snug hover:text-sage-700 cursor-pointer" 
                    onClick={() => navigate(`/blog/${article.slug}`)}
                  >
                    {article.titulo}
                  </h3>
                  <p className="font-sans text-xs text-sage-600 leading-relaxed line-clamp-2">
                    {article.resumen}
                  </p>
                </div>
              </div>
              <div className="px-5 pb-5 pt-3 border-t border-sage-100 flex items-center justify-between text-[11px] text-sage-500">
                <span className="font-medium">{article.readtime || '5 min read'}</span>
                <button
                  onClick={() => navigate(`/blog/${article.slug}`)}
                  className="inline-flex items-center space-x-1 font-bold text-sage-750 hover:text-sage-900 cursor-pointer"
                >
                  <span>Leer Artículo</span>
                  <BookOpen className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12 max-w-md mx-auto">
            <Search className="w-8 h-8 text-sage-300 mx-auto mb-2 animate-bounce" />
            <p className="text-sm font-bold text-sage-900">No encontramos lo que buscas</p>
            <p className="text-xs text-sage-600 mt-1">Prueba con palabras clave como "intestino", "palta", "desayuno" o "insulina".</p>
          </div>
        )}

      </div>
    </section>
  );
}
