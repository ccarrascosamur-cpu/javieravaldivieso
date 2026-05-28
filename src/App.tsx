import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import HomePage from './pages/HomePage';
import EspecialidadesPage from './pages/EspecialidadesPage';
import ProgramasPage from './pages/ProgramasPage';
import BlogPage from './pages/BlogPage';
import ArticuloPage from './pages/ArticuloPage';
import TestimoniosPage from './pages/TestimoniosPage';
import FAQPage from './pages/FAQPage';
import ContactoPage from './pages/ContactoPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/especialidades" element={<EspecialidadesPage />} />
        <Route path="/programas" element={<ProgramasPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<ArticuloPage />} />
        <Route path="/testimonios" element={<TestimoniosPage />} />
        <Route path="/preguntas-frecuentes" element={<FAQPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
      </Route>
    </Routes>
  );
}
