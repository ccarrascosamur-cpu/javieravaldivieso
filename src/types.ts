export interface Specialty {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  iconName: string;
}

export interface ServicePlan {
  id: string;
  name: string;
  price: number; // in CLP
  originalPrice?: number; // in CLP for discount representation
  duration: string;
  isPopular?: boolean;
  benefits: string[];
  shortDesc: string;
  category: 'consulta' | 'programa' | 'pack';
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string; // Markdown or plain text
  category: 'nutricion' | 'recetas' | 'salud-integral' | 'habitos';
  author: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
  seoKeywords: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'consulta' | 'pagos' | 'isapre-fonasa' | 'programas';
}

export interface Testimonial {
  id: string;
  name: string;
  age: number;
  city: string;
  text: string;
  rating: number;
  condition: string; // e.g., "Insulinoresistencia", "Salud Hormonal"
  image?: string;
}

export interface Appointment {
  id: string;
  serviceId: string;
  serviceName: string;
  date: string;
  timeSlot: string;
  mode: 'online' | 'presencial';
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  patientRut: string;
  status: 'pending' | 'paid' | 'confirmed';
  price: number;
}
