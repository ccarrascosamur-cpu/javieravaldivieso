import { useState, useEffect } from 'react';

interface SiteConfig {
  nombre: string;
  descripcion: string;
  email: string;
  telefono: string;
  whatsapp_number: string;
  instagram_handle: string;
  instagram: string;
  instagram_followers: string;
  link_reservas: string;
  link_pagos: string;
}

const defaultConfig: SiteConfig = {
  nombre: 'Javiera Valdivieso',
  descripcion: 'Nutricionista Clínico & Especialista en Salud Integral',
  email: 'contacto@javieravaldivieso.cl',
  telefono: '+56 9 8765 4321',
  whatsapp_number: '56987654321',
  instagram_handle: 'nutjavieravaldivieso',
  instagram: 'https://www.instagram.com/nutjavieravaldivieso/',
  instagram_followers: '228K',
  link_reservas: '',
  link_pagos: '',
};

export function useConfig() {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/config', { headers: { 'Cache-Control': 'no-cache' } })
      .then(r => r.json())
      .then((data: Record<string, string>) => {
        setConfig({ ...defaultConfig, ...data });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { config, loading };
}
