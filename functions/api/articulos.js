export async function onRequest(context) {
  const { request, env } = context;
  const db = env.javieravaldivieso_db;
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  const slug = url.searchParams.get('slug');

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (request.method === 'GET') {
      if (slug) {
        const result = await db.prepare('SELECT * FROM articulos WHERE slug = ?').bind(slug).first();
        return new Response(JSON.stringify(result || null), { headers: corsHeaders });
      }
      if (id) {
        const result = await db.prepare('SELECT * FROM articulos WHERE id = ?').bind(id).first();
        return new Response(JSON.stringify(result || null), { headers: corsHeaders });
      }
      const result = await db.prepare('SELECT * FROM articulos ORDER BY id DESC').all();
      return new Response(JSON.stringify(result.results || []), { headers: corsHeaders });
    }

    if (request.method === 'POST') {
      const body = await request.json();
      const { slug, titulo, resumen, contenido, categoria, imagen, tags, readtime, fecha, estado } = body;
      const result = await db.prepare(
        'INSERT INTO articulos (slug, titulo, resumen, contenido, categoria, imagen, tags, readtime, fecha, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
      ).bind(slug, titulo, resumen, contenido, categoria, imagen, tags, readtime, fecha || new Date().toLocaleDateString('es-CL'), estado || 'publicado').run();
      return new Response(JSON.stringify({ success: true, id: result.meta.last_row_id }), { headers: corsHeaders });
    }

    if (request.method === 'PUT') {
      const body = await request.json();
      const { id, slug, titulo, resumen, contenido, categoria, imagen, tags, readtime, fecha, estado } = body;
      await db.prepare(
        'UPDATE articulos SET slug=?, titulo=?, resumen=?, contenido=?, categoria=?, imagen=?, tags=?, readtime=?, fecha=?, estado=? WHERE id=?'
      ).bind(slug, titulo, resumen, contenido, categoria, imagen, tags, readtime, fecha, estado, id).run();
      return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
    }

    if (request.method === 'DELETE') {
      const body = await request.json();
      await db.prepare('DELETE FROM articulos WHERE id = ?').bind(body.id).run();
      return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
    }

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
  }
}
