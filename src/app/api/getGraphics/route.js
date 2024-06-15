// app/api/getContent/route.js
import pool from '../../db.js';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const ScriptID = searchParams.get('ScriptID');
  try {
    const [rows] = await pool.query(`SELECT * FROM graphics where ScriptID='${ScriptID}'`);
    return new Response(JSON.stringify({ graphics: rows }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
