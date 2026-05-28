export async function onRequest(context) {
  const { request, env } = context;
  const db = env.javieravaldivieso_db;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (request.method === 'GET') {
      const result = await db.prepare('SELECT * FROM config').all();
      const config = {};
      (result.results || []).forEach(row => {
        config[row.key] = row.value;
      });
      return new Response(JSON.stringify(config), { headers: corsHeaders });
    }

    if (request.method === 'POST') {
      const body = await request.json();
      for (const [key, value] of Object.entries(body)) {
        await db.prepare('INSERT OR REPLACE INTO config (key, value) VALUES (?, ?)').bind(key, value).run();
      }
      return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
    }

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
  }
}
