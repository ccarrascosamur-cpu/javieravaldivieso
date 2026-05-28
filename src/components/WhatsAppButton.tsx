import { MessageCircle } from 'lucide-react';
import { NUTRITIONIST_INFO } from '../data';

export default function WhatsAppButton() {
  return (
    <a
      href={NUTRITIONIST_INFO.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-7 h-7 fill-current" />
      {/* Tooltip */}
      <span className="absolute right-16 bg-sage-800 text-white text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        Escríbeme por WhatsApp
      </span>
    </a>
  );
}
