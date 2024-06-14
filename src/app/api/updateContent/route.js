// app/api/updateContent/route.js
import pool from '../../db.js';

export async function POST(req) {
  try {
    const { content, ScriptID } = await req.json();
    await pool.query(`UPDATE script SET Script = ?  where ScriptID='${ScriptID}' LIMIT 1`, [content]);
    return new Response(JSON.stringify({ message: 'Content updated successfully' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
