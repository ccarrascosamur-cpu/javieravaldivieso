import { useState, useEffect, useCallback } from 'react';

const API_BASE = '';

async function apiFetch(endpoint: string, options?: RequestInit) {
  const url = `${API_BASE}/api${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export function useApi<T>(endpoint: string, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFetch(endpoint);
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, deps);

  return { data, loading, error, refetch: fetchData };
}

export function useArticulos() {
  return useApi<any[]>('/articulos');
}

export function useArticulo(slug: string) {
  return useApi<any>(`/articulos?slug=${encodeURIComponent(slug)}`);
}

export function useServicios() {
  return useApi<any[]>('/servicios');
}

export function useTestimonios() {
  return useApi<any[]>('/testimonios');
}

export function useConfig() {
  return useApi<Record<string, string>>('/config');
}

export { apiFetch };
