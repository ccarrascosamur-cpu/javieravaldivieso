import { useState, useEffect } from 'react';
import { Instagram, ExternalLink, Heart, MessageCircle } from 'lucide-react';
import { NUTRITIONIST_INFO } from '../data';

// Simulated Instagram posts based on real account info
// @nutjavieravaldivieso - 228K followers, 37 posts
const SIMULATED_POSTS = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=600&h=600',
    caption: 'Alimentación simple y real para toda la familia 🥑✨',
    likes: '12.4K',
    comments: '328',
    link: 'https://www.instagram.com/p/example1/'
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600&h=600',
    caption: 'Desayuno antiinflamatorio en 5 minutos 🍓🥣',
    likes: '8.7K',
    comments: '215',
    link: 'https://www.instagram.com/p/example2/'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600&h=600',
    caption: 'Tu abdomen te está hablando, escúchalo 🌿',
    likes: '15.2K',
    comments: '412',
    link: 'https://www.instagram.com/p/example3/'
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1494390248081-4e521a5940db?auto=format&fit=crop&q=80&w=600&h=600',
    caption: 'Recetas que sanan desde adentro 💚',
    likes: '9.1K',
    comments: '267',
    link: 'https://www.instagram.com/p/example4/'
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600&h=600',
    caption: 'Hormonas felices = cuerpo feliz 🧘‍♀️',
    likes: '11.8K',
    comments: '356',
    link: 'https://www.instagram.com/p/example5/'
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600&h=600',
    caption: 'Comida real, no dietas restrictivas 🍽️',
    likes: '7.3K',
    comments: '198',
    link: 'https://www.instagram.com/p/example6/'
  }
];

export default function InstagramFeed() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-sand-100/40 blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 text-purple-800 px-3 py-1 rounded-full w-fit mb-4 shadow-xs">
            <Instagram className="w-3.5 h-3.5" />
            <span className="text-xs font-semibold tracking-wide uppercase font-sans">
              @{NUTRITIONIST_INFO.instagramHandle}
            </span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-sage-900 mb-4">
            Sígueme en Instagram
          </h2>
          
          <p className="font-sans text-sage-600 text-base leading-relaxed mb-2">
            Más de <strong className="text-sage-900">{NUTRITIONIST_INFO.instagramFollowers} seguidores</strong> recibiendo tips diarios, recetas prácticas y contenido sobre nutrición real sin restricciones absurdas.
          </p>
          
          <a
            href={NUTRITIONIST_INFO.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center space-x-1.5 text-sm font-bold text-purple-700 hover:text-purple-900 transition-colors mt-2"
          >
            <span>Ver perfil completo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {SIMULATED_POSTS.map((post) => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noreferrer"
              className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
              onMouseEnter={() => setHoveredId(post.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              
              {/* Hover Overlay */}
              <div 
                className={`absolute inset-0 bg-sage-900/70 flex flex-col items-center justify-center text-white p-3 transition-opacity duration-300 ${
                  hoveredId === post.id ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="flex items-center space-x-4 mb-2">
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4 fill-white" />
                    <span className="text-sm font-bold">{post.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span className="text-sm font-bold">{post.comments}</span>
                  </div>
                </div>
                <p className="text-xs text-center line-clamp-2 leading-snug opacity-90">
                  {post.caption}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-10 text-center">
          <a
            href={NUTRITIONIST_INFO.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center space-x-2 px-8 py-3.5 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white font-bold rounded-full shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Instagram className="w-5 h-5" />
            <span>Seguir a @{NUTRITIONIST_INFO.instagramHandle}</span>
          </a>
        </div>

      </div>
    </section>
  );
}
