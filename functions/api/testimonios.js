export async function onRequest(context) {
  const { request, env } = context;
  const db = env.javieravaldivieso_db;
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

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
      if (id) {
        const result = await db.prepare('SELECT * FROM testimonios WHERE id = ?').bind(id).first();
        return new Response(JSON.stringify(result || null), { headers: corsHeaders });
      }
      const result = await db.prepare('SELECT * FROM testimonios ORDER BY id DESC').all();
      return new Response(JSON.stringify(result.results || []), { headers: corsHeaders });
    }

    if (request.method === 'POST') {
      const body = await request.json();
      const { nombre, edad, ciudad, texto, rating, condicion, imagen } = body;
      const result = await db.prepare(
        'INSERT INTO testimonios (nombre, edad, ciudad, texto, rating, condicion, imagen) VALUES (?, ?, ?, ?, ?, ?, ?)'
      ).bind(nombre, edad, ciudad, texto, rating || 5, condicion, imagen).run();
      return new Response(JSON.stringify({ success: true, id: result.meta.last_row_id }), { headers: corsHeaders });
    }

    if (request.method === 'PUT') {
      const body = await request.json();
      const { id, nombre, edad, ciudad, texto, rating, condicion, imagen } = body;
      await db.prepare(
        'UPDATE testimonios SET nombre=?, edad=?, ciudad=?, texto=?, rating=?, condicion=?, imagen=? WHERE id=?'
      ).bind(nombre, edad, ciudad, texto, rating, condicion, imagen, id).run();
      return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
    }

    if (request.method === 'DELETE') {
      const body = await request.json();
      await db.prepare('DELETE FROM testimonios WHERE id = ?').bind(body.id).run();
      return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
    }

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
  }
}
