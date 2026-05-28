// Catch-all function for SPA routing on Cloudflare Pages
export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  
  // API routes are handled by their specific function files
  if (url.pathname.startsWith('/api/')) {
    return next();
  }
  
  // Static assets
  if (url.pathname.includes('.')) {
    return next();
  }
  
  // SPA fallback - serve index.html for all routes
  return next();
}
