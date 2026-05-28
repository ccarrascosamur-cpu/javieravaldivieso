import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, FileText, Briefcase, MessageSquare, Settings,
  Plus, Pencil, Trash2, LogOut, X, Save, Image, Eye, Loader2
} from 'lucide-react';

const ADMIN_PASSWORD = 'javiera2026';
const API_BASE = '';

interface Service {
  id: number;
  service_id: string;
  nombre: string;
  precio: number;
  precio_original?: number;
  duracion: string;
  categoria: string;
  shortDesc: string;
  beneficios: string;
  isPopular: number;
}

interface Article {
  id: number;
  slug: string;
  titulo: string;
  resumen: string;
  contenido: string;
  imagen: string;
  categoria: string;
  readtime: string;
  fecha: string;
  estado: string;
}

interface Testimonial {
  id: number;
  nombre: string;
  edad?: number;
  ciudad?: string;
  texto: string;
  rating: number;
  condicion?: string;
  imagen: string;
}

interface SiteConfig {
  key: string;
  value: string;
}

type Tab = 'dashboard' | 'servicios' | 'articulos' | 'testimonios' | 'config';

export default function AdminPage() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [services, setServices] = useState<Service[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [configs, setConfigs] = useState<SiteConfig[]>([]);

  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [showTestimonialModal, setShowTestimonialModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'true') setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    if (isAuthenticated) fetchAllData();
  }, [isAuthenticated]);

  const fetchAllData = async () => {
    await Promise.all([fetchServices(), fetchArticles(), fetchTestimonials(), fetchConfig()]);
  };

  const fetchServices = async () => {
    const res = await fetch(`${API_BASE}/api/servicios`, { headers: { 'Cache-Control': 'no-cache' } });
    const data = await res.json();
    setServices(Array.isArray(data) ? data : []);
  };

  const fetchArticles = async () => {
    const res = await fetch(`${API_BASE}/api/articulos`, { headers: { 'Cache-Control': 'no-cache' } });
    const data = await res.json();
    setArticles(Array.isArray(data) ? data : []);
  };

  const fetchTestimonials = async () => {
    const res = await fetch(`${API_BASE}/api/testimonios`, { headers: { 'Cache-Control': 'no-cache' } });
    const data = await res.json();
    setTestimonials(Array.isArray(data) ? data : []);
  };

  const fetchConfig = async () => {
    const res = await fetch(`${API_BASE}/api/config`, { headers: { 'Cache-Control': 'no-cache' } });
    const data = await res.json();
    // API returns object {key: value}, convert to array
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      setConfigs(Object.entries(data).map(([key, value]) => ({ key, value: String(value) })));
    } else {
      setConfigs(Array.isArray(data) ? data : []);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
    } else {
      setMessage('Contraseña incorrecta');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
    navigate('/');
  };

  const uploadImage = async (file: File): Promise<string> => {
    setUploadingImage(true);
    try {
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onloadend = () => {
          const base64 = reader.result as string;
          setUploadingImage(false);
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    } catch (error) {
      setUploadingImage(false);
      throw error;
    }
  };

  const saveService = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const body: any = {
      service_id: formData.get('service_id'),
      nombre: formData.get('nombre'),
      precio: Number(formData.get('precio')),
      precio_original: Number(formData.get('precio_original')) || null,
      duracion: formData.get('duracion'),
      categoria: formData.get('categoria'),
      shortDesc: formData.get('shortDesc'),
      beneficios: formData.get('beneficios'),
      isPopular: formData.get('isPopular') === 'on',
    };

    if (editingService) {
      body.id = editingService.id;
      await fetch(`${API_BASE}/api/servicios`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    } else {
      await fetch(`${API_BASE}/api/servicios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    }

    setShowServiceModal(false);
    setEditingService(null);
    await fetchServices();
    setLoading(false);
    setMessage('Servicio guardado correctamente');
    setTimeout(() => setMessage(''), 3000);
  };

  const deleteService = async (id: number) => {
    if (!confirm('¿Eliminar este servicio?')) return;
    await fetch(`${API_BASE}/api/servicios`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    await fetchServices();
  };

  const saveArticle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const body: any = {
      slug: formData.get('slug'),
      titulo: formData.get('titulo'),
      resumen: formData.get('resumen'),
      contenido: formData.get('contenido'),
      imagen: formData.get('imagen'),
      categoria: formData.get('categoria'),
      readtime: formData.get('readtime'),
      fecha: new Date().toLocaleDateString('es-CL'),
      estado: 'publicado',
    };

    if (editingArticle) {
      body.id = editingArticle.id;
      await fetch(`${API_BASE}/api/articulos`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    } else {
      await fetch(`${API_BASE}/api/articulos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    }

    setShowArticleModal(false);
    setEditingArticle(null);
    await fetchArticles();
    setLoading(false);
    setMessage('Artículo guardado correctamente');
    setTimeout(() => setMessage(''), 3000);
  };

  const deleteArticle = async (id: number) => {
    if (!confirm('¿Eliminar este artículo?')) return;
    await fetch(`${API_BASE}/api/articulos`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    await fetchArticles();
  };

  const saveTestimonial = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const body: any = {
      nombre: formData.get('nombre'),
      edad: Number(formData.get('edad')) || null,
      ciudad: formData.get('ciudad'),
      texto: formData.get('texto'),
      rating: Number(formData.get('rating')),
      condicion: formData.get('condicion'),
      imagen: formData.get('imagen'),
    };

    if (editingTestimonial) {
      body.id = editingTestimonial.id;
      await fetch(`${API_BASE}/api/testimonios`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    } else {
      await fetch(`${API_BASE}/api/testimonios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    }

    setShowTestimonialModal(false);
    setEditingTestimonial(null);
    await fetchTestimonials();
    setLoading(false);
    setMessage('Testimonio guardado correctamente');
    setTimeout(() => setMessage(''), 3000);
  };

  const deleteTestimonial = async (id: number) => {
    if (!confirm('¿Eliminar este testimonio?')) return;
    await fetch(`${API_BASE}/api/testimonios`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    await fetchTestimonials();
  };

  const getConfigValue = (key: string) => configs.find(c => c.key === key)?.value || '';

  const saveConfig = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const configObj: Record<string, string> = {
      site_title: formData.get('site_title') as string,
      site_description: formData.get('site_description') as string,
      contact_email: formData.get('contact_email') as string,
      contact_phone: formData.get('contact_phone') as string,
      whatsapp_number: formData.get('whatsapp_number') as string,
      instagram_handle: formData.get('instagram_handle') as string,
    };

    await fetch(`${API_BASE}/api/config`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(configObj),
    });

    await fetchConfig();
    setLoading(false);
    setMessage('Configuración guardada');
    setTimeout(() => setMessage(''), 3000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-sand-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-sage-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <LayoutDashboard className="w-8 h-8 text-sage-700" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-sage-900">Panel de Administración</h1>
            <p className="text-sm text-sage-600 mt-1">Javiera Valdivieso - Nutrición</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-sage-700 mb-1">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:border-sage-500 focus:ring-2 focus:ring-sage-200 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
            {message && <p className="text-rose-600 text-sm">{message}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-sage-700 hover:bg-sage-800 text-white font-bold rounded-xl transition-all cursor-pointer"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand-50 flex">
      <aside className="w-64 bg-white border-r border-sage-100 flex-shrink-0">
        <div className="p-6 border-b border-sage-100">
          <h1 className="font-serif text-lg font-bold text-sage-900">Admin</h1>
          <p className="text-xs text-sage-500">javieravaldivieso.cl</p>
        </div>
        <nav className="p-4 space-y-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'servicios', label: 'Servicios', icon: Briefcase },
            { id: 'articulos', label: 'Artículos', icon: FileText },
            { id: 'testimonios', label: 'Testimonios', icon: MessageSquare },
            { id: 'config', label: 'Configuración', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                activeTab === item.id
                  ? 'bg-sage-100 text-sage-800'
                  : 'text-sage-600 hover:bg-sand-50'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 mt-auto border-t border-sage-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        {message && (
          <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
            <Save className="w-4 h-4" />
            {message}
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div>
            <h2 className="font-serif text-2xl font-bold text-sage-900 mb-6">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { label: 'Servicios', value: services.length, icon: Briefcase, color: 'bg-sage-100 text-sage-700' },
                { label: 'Artículos', value: articles.length, icon: FileText, color: 'bg-amber-100 text-amber-700' },
                { label: 'Testimonios', value: testimonials.length, icon: MessageSquare, color: 'bg-rose-100 text-rose-700' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-2xl p-6 border border-sage-100">
                  <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <p className="text-3xl font-bold text-sage-900">{stat.value}</p>
                  <p className="text-sm text-sage-500">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-sage-100 p-6">
              <h3 className="font-bold text-sage-900 mb-4">Accesos Rápidos</h3>
              <div className="flex gap-3 flex-wrap">
                <button onClick={() => setActiveTab('servicios')} className="px-4 py-2 bg-sage-100 text-sage-700 rounded-lg text-sm font-medium hover:bg-sage-200 transition-all cursor-pointer">
                  Gestionar Servicios
                </button>
                <button onClick={() => setActiveTab('articulos')} className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg text-sm font-medium hover:bg-amber-200 transition-all cursor-pointer">
                  Gestionar Artículos
                </button>
                <button onClick={() => { window.open('/', '_blank'); }} className="px-4 py-2 bg-sand-100 text-sand-700 rounded-lg text-sm font-medium hover:bg-sand-200 transition-all cursor-pointer flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Ver Sitio
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'servicios' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold text-sage-900">Servicios</h2>
              <button
                onClick={() => { setEditingService(null); setShowServiceModal(true); }}
                className="flex items-center gap-2 px-4 py-2 bg-sage-700 text-white rounded-xl text-sm font-medium hover:bg-sage-800 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Nuevo Servicio
              </button>
            </div>
            <div className="bg-white rounded-2xl border border-sage-100 overflow-hidden">
              <table className="w-full">
                <thead className="bg-sand-50 border-b border-sage-100">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-bold text-sage-600 uppercase">Nombre</th>
                    <th className="text-left px-6 py-3 text-xs font-bold text-sage-600 uppercase">Categoría</th>
                    <th className="text-left px-6 py-3 text-xs font-bold text-sage-600 uppercase">Precio</th>
                    <th className="text-left px-6 py-3 text-xs font-bold text-sage-600 uppercase">Popular</th>
                    <th className="text-right px-6 py-3 text-xs font-bold text-sage-600 uppercase">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((s) => (
                    <tr key={s.id} className="border-b border-sage-50 hover:bg-sand-50/50">
                      <td className="px-6 py-4">
                        <p className="font-medium text-sage-900">{s.nombre}</p>
                        <p className="text-xs text-sage-500">{s.duracion}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-sage-100 text-sage-700 rounded-lg text-xs font-medium capitalize">
                          {s.categoria}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-sage-700">
                        ${s.precio?.toLocaleString('es-CL')}
                      </td>
                      <td className="px-6 py-4">
                        {s.isPopular ? (
                          <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-lg text-xs font-medium">★ Popular</span>
                        ) : (
                          <span className="text-sage-400 text-xs">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => { setEditingService(s); setShowServiceModal(true); }}
                            className="p-2 text-sage-600 hover:bg-sage-100 rounded-lg transition-all cursor-pointer"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteService(s.id)}
                            className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'articulos' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold text-sage-900">Artículos</h2>
              <button
                onClick={() => { setEditingArticle(null); setShowArticleModal(true); }}
                className="flex items-center gap-2 px-4 py-2 bg-sage-700 text-white rounded-xl text-sm font-medium hover:bg-sage-800 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Nuevo Artículo
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {articles.map((a) => (
                <div key={a.id} className="bg-white rounded-2xl border border-sage-100 p-4 flex gap-4">
                  <img src={a.imagen} alt="" className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sage-900 truncate">{a.titulo}</h3>
                    <p className="text-xs text-sage-500 mt-1">{a.categoria} · {a.readtime}</p>
                    <p className="text-xs text-sage-600 mt-2 line-clamp-2">{a.resumen}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() => { setEditingArticle(a); setShowArticleModal(true); }}
                        className="text-xs text-sage-600 hover:text-sage-800 font-medium cursor-pointer"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => deleteArticle(a.id)}
                        className="text-xs text-rose-600 hover:text-rose-800 font-medium cursor-pointer"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'testimonios' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold text-sage-900">Testimonios</h2>
              <button
                onClick={() => { setEditingTestimonial(null); setShowTestimonialModal(true); }}
                className="flex items-center gap-2 px-4 py-2 bg-sage-700 text-white rounded-xl text-sm font-medium hover:bg-sage-800 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Nuevo Testimonio
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testimonials.map((t) => (
                <div key={t.id} className="bg-white rounded-2xl border border-sage-100 p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={t.imagen} alt="" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="font-medium text-sage-900">{t.nombre}</p>
                      <p className="text-xs text-sage-500">{t.ciudad} · {t.condicion}</p>
                    </div>
                  </div>
                  <p className="text-sm text-sage-700 mb-3">{t.texto}</p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => { setEditingTestimonial(t); setShowTestimonialModal(true); }}
                      className="text-xs text-sage-600 hover:text-sage-800 font-medium cursor-pointer"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteTestimonial(t.id)}
                      className="text-xs text-rose-600 hover:text-rose-800 font-medium cursor-pointer"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'config' && (
          <div>
            <h2 className="font-serif text-2xl font-bold text-sage-900 mb-6">Configuración</h2>
            <form onSubmit={saveConfig} className="bg-white rounded-2xl border border-sage-100 p-6 max-w-2xl space-y-4">
              <div>
                <label className="block text-sm font-medium text-sage-700 mb-1">Título del sitio</label>
                <input name="site_title" defaultValue={getConfigValue('site_title')} className="w-full px-4 py-2 rounded-xl border border-sage-200 focus:border-sage-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-sage-700 mb-1">Descripción</label>
                <textarea name="site_description" defaultValue={getConfigValue('site_description')} rows={3} className="w-full px-4 py-2 rounded-xl border border-sage-200 focus:border-sage-500 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-1">Email</label>
                  <input name="contact_email" defaultValue={getConfigValue('contact_email')} className="w-full px-4 py-2 rounded-xl border border-sage-200 focus:border-sage-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-1">Teléfono</label>
                  <input name="contact_phone" defaultValue={getConfigValue('contact_phone')} className="w-full px-4 py-2 rounded-xl border border-sage-200 focus:border-sage-500 outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-1">WhatsApp</label>
                  <input name="whatsapp_number" defaultValue={getConfigValue('whatsapp_number')} className="w-full px-4 py-2 rounded-xl border border-sage-200 focus:border-sage-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-1">Instagram</label>
                  <input name="instagram_handle" defaultValue={getConfigValue('instagram_handle')} className="w-full px-4 py-2 rounded-xl border border-sage-200 focus:border-sage-500 outline-none" />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-sage-700 text-white font-bold rounded-xl hover:bg-sage-800 transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                Guardar Configuración
              </button>
            </form>
          </div>
        )}
      </main>

      {/* Service Modal */}
      {showServiceModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-sage-100 flex items-center justify-between">
              <h3 className="font-bold text-sage-900">{editingService ? 'Editar' : 'Nuevo'} Servicio</h3>
              <button onClick={() => setShowServiceModal(false)} className="p-2 hover:bg-sand-50 rounded-lg cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={saveService} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-1">ID del servicio</label>
                  <input name="service_id" defaultValue={editingService?.service_id} required className="w-full px-4 py-2 rounded-xl border border-sage-200 focus:border-sage-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-1">Nombre</label>
                  <input name="nombre" defaultValue={editingService?.nombre} required className="w-full px-4 py-2 rounded-xl border border-sage-200 focus:border-sage-500 outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-1">Precio</label>
                  <input name="precio" type="number" defaultValue={editingService?.precio} required className="w-full px-4 py-2 rounded-xl border border-sage-200 focus:border-sage-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-1">Precio original</label>
                  <input name="precio_original" type="number" defaultValue={editingService?.precio_original} className="w-full px-4 py-2 rounded-xl border border-sage-200 focus:border-sage-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-1">Duración</label>
                  <input name="duracion" defaultValue={editingService?.duracion} className="w-full px-4 py-2 rounded-xl border border-sage-200 focus:border-sage-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-sage-700 mb-1">Categoría</label>
                <select name="categoria" defaultValue={editingService?.categoria || 'consulta'} className="w-full px-4 py-2 rounded-xl border border-sage-200 focus:border-sage-500 outline-none">
                  <option value="consulta">Consulta Clínica</option>
                  <option value="pack">Pack Convenio</option>
                  <option value="programa">Programa Intensivo</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-sage-700 mb-1">Descripción corta</label>
                <textarea name="shortDesc" defaultValue={editingService?.shortDesc} rows={2} className="w-full px-4 py-2 rounded-xl border border-sage-200 focus:border-sage-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-sage-700 mb-1">Beneficios (separados por |)</label>
                <textarea name="beneficios" defaultValue={editingService?.beneficios} rows={4} className="w-full px-4 py-2 rounded-xl border border-sage-200 focus:border-sage-500 outline-none" />
              </div>
              <div className="flex items-center gap-2">
                <input name="isPopular" type="checkbox" defaultChecked={editingService?.isPopular === 1} className="w-4 h-4 rounded border-sage-300" />
                <label className="text-sm text-sage-700">Marcar como más recomendado</label>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowServiceModal(false)} className="px-4 py-2 text-sage-600 hover:bg-sand-50 rounded-xl cursor-pointer">Cancelar</button>
                <button type="submit" disabled={loading} className="px-6 py-2 bg-sage-700 text-white font-bold rounded-xl hover:bg-sage-800 transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2">
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Article Modal */}
      {showArticleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-sage-100 flex items-center justify-between">
              <h3 className="font-bold text-sage-900">{editingArticle ? 'Editar' : 'Nuevo'} Artículo</h3>
              <button onClick={() => setShowArticleModal(false)} className="p-2 hover:bg-sand-50 rounded-lg cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={saveArticle} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-1">Slug (URL)</label>
                  <input name="slug" defaultValue={editingArticle?.slug} required className="w-full px-4 py-2 rounded-xl border border-sage-200 focus:border-sage-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-1">Título</label>
                  <input name="titulo" defaultValue={editingArticle?.titulo} required className="w-full px-4 py-2 rounded-xl border border-sage-200 focus:border-sage-500 outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-1">Categoría</label>
                  <input name="categoria" defaultValue={editingArticle?.categoria} className="w-full px-4 py-2 rounded-xl border border-sage-200 focus:border-sage-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-1">Tiempo de lectura</label>
                  <input name="readtime" defaultValue={editingArticle?.readtime} className="w-full px-4 py-2 rounded-xl border border-sage-200 focus:border-sage-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-sage-700 mb-1">URL de imagen</label>
                <div className="flex gap-2">
                  <input name="imagen" defaultValue={editingArticle?.imagen} className="flex-1 px-4 py-2 rounded-xl border border-sage-200 focus:border-sage-500 outline-none" />
                  <label className="px-4 py-2 bg-sand-100 text-sand-700 rounded-xl text-sm font-medium hover:bg-sand-200 transition-all cursor-pointer flex items-center gap-2">
                    <Image className="w-4 h-4" />
                    <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const base64 = await uploadImage(file);
                        const input = e.target.closest('div')?.querySelector('input[name="imagen"]') as HTMLInputElement;
                        if (input) input.value = base64;
                      }
                    }} />
                    {uploadingImage ? '...' : 'Subir'}
                  </label>
                </div>
                <p className="text-xs text-sand-500 mt-1">O pega una URL de imagen externa</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-sage-700 mb-1">Extracto</label>
                <textarea name="resumen" defaultValue={editingArticle?.resumen} rows={2} className="w-full px-4 py-2 rounded-xl border border-sage-200 focus:border-sage-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-sage-700 mb-1">Contenido (HTML o Markdown)</label>
                <textarea name="contenido" defaultValue={editingArticle?.contenido} rows={8} className="w-full px-4 py-2 rounded-xl border border-sage-200 focus:border-sage-500 outline-none font-mono text-sm" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowArticleModal(false)} className="px-4 py-2 text-sage-600 hover:bg-sand-50 rounded-xl cursor-pointer">Cancelar</button>
                <button type="submit" disabled={loading} className="px-6 py-2 bg-sage-700 text-white font-bold rounded-xl hover:bg-sage-800 transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2">
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Testimonial Modal */}
      {showTestimonialModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg">
            <div className="p-6 border-b border-sage-100 flex items-center justify-between">
              <h3 className="font-bold text-sage-900">{editingTestimonial ? 'Editar' : 'Nuevo'} Testimonio</h3>
              <button onClick={() => setShowTestimonialModal(false)} className="p-2 hover:bg-sand-50 rounded-lg cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={saveTestimonial} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-sage-700 mb-1">Nombre</label>
                <input name="nombre" defaultValue={editingTestimonial?.nombre} required className="w-full px-4 py-2 rounded-xl border border-sage-200 focus:border-sage-500 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-1">Edad</label>
                  <input name="edad" type="number" defaultValue={editingTestimonial?.edad} className="w-full px-4 py-2 rounded-xl border border-sage-200 focus:border-sage-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-1">Ciudad</label>
                  <input name="ciudad" defaultValue={editingTestimonial?.ciudad} className="w-full px-4 py-2 rounded-xl border border-sage-200 focus:border-sage-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-sage-700 mb-1">Condición/Servicio</label>
                <input name="condicion" defaultValue={editingTestimonial?.condicion} className="w-full px-4 py-2 rounded-xl border border-sage-200 focus:border-sage-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-sage-700 mb-1">URL de imagen/avatar</label>
                <div className="flex gap-2">
                  <input name="imagen" defaultValue={editingTestimonial?.imagen} className="flex-1 px-4 py-2 rounded-xl border border-sage-200 focus:border-sage-500 outline-none" />
                  <label className="px-4 py-2 bg-sand-100 text-sand-700 rounded-xl text-sm font-medium hover:bg-sand-200 transition-all cursor-pointer flex items-center gap-2">
                    <Image className="w-4 h-4" />
                    <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const base64 = await uploadImage(file);
                        const input = e.target.closest('div')?.querySelector('input[name="imagen"]') as HTMLInputElement;
                        if (input) input.value = base64;
                      }
                    }} />
                    {uploadingImage ? '...' : 'Subir'}
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-sage-700 mb-1">Rating (1-5)</label>
                <input name="rating" type="number" min={1} max={5} defaultValue={editingTestimonial?.rating || 5} className="w-full px-4 py-2 rounded-xl border border-sage-200 focus:border-sage-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-sage-700 mb-1">Testimonio</label>
                <textarea name="texto" defaultValue={editingTestimonial?.texto} rows={4} className="w-full px-4 py-2 rounded-xl border border-sage-200 focus:border-sage-500 outline-none" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowTestimonialModal(false)} className="px-4 py-2 text-sage-600 hover:bg-sand-50 rounded-xl cursor-pointer">Cancelar</button>
                <button type="submit" disabled={loading} className="px-6 py-2 bg-sage-700 text-white font-bold rounded-xl hover:bg-sage-800 transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2">
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
