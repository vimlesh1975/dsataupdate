// app/api/getContent/route.js
import pool from '../../db.js';

export async function GET(req) {
  try {
    const [rows] = await pool.query(`SELECT Script FROM script where ScriptID='201805090200654' LIMIT 1`);
    return new Response(JSON.stringify({ content: rows[0]?.Script || '' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
