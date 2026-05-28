export async function onRequest(context) {
  const { request, env } = context;
  const db = env.javieravaldivieso_db;
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (request.method === 'GET') {
      if (id) {
        const result = await db.prepare('SELECT * FROM servicios WHERE id = ?').bind(id).first();
        return new Response(JSON.stringify(result || null), { headers: corsHeaders });
      }
      const result = await db.prepare('SELECT * FROM servicios ORDER BY id ASC').all();
      return new Response(JSON.stringify(result.results || []), { headers: corsHeaders });
    }

    if (request.method === 'POST') {
      const body = await request.json();
      const { service_id, nombre, precio, precio_original, duracion, categoria, shortDesc, beneficios, isPopular } = body;
      const result = await db.prepare(
        'INSERT INTO servicios (service_id, nombre, precio, precio_original, duracion, categoria, shortDesc, beneficios, isPopular) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
      ).bind(service_id, nombre, precio, precio_original, duracion, categoria, shortDesc, beneficios, isPopular ? 1 : 0).run();
      return new Response(JSON.stringify({ success: true, id: result.meta.last_row_id }), { headers: corsHeaders });
    }

    if (request.method === 'PUT') {
      const body = await request.json();
      const { id, service_id, nombre, precio, precio_original, duracion, categoria, shortDesc, beneficios, isPopular } = body;
      await db.prepare(
        'UPDATE servicios SET service_id=?, nombre=?, precio=?, precio_original=?, duracion=?, categoria=?, shortDesc=?, beneficios=?, isPopular=? WHERE id=?'
      ).bind(service_id, nombre, precio, precio_original, duracion, categoria, shortDesc, beneficios, isPopular ? 1 : 0, id).run();
      return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
    }

    if (request.method === 'DELETE') {
      const body = await request.json();
      await db.prepare('DELETE FROM servicios WHERE id = ?').bind(body.id).run();
      return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
    }

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
  }
}
