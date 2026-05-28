export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  
  // Si es una ruta de API, dejar pasar
  if (url.pathname.startsWith('/api/')) {
    return next();
  }
  
  // Si es un archivo estático (tiene extensión), dejar pasar
  if (url.pathname.match(/\.[a-zA-Z0-9]+$/)) {
    return next();
  }
  
  // Para cualquier otra ruta, servir index.html (SPA routing)
  const response = await next();
  
  // Si da 404, intentar servir index.html
  if (response.status === 404) {
    url.pathname = '/index.html';
    return context.env.ASSETS.fetch(new Request(url.toString(), request));
  }
  
  return response;
}
