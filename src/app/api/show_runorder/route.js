import pool from '../../db.js';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const param1 = searchParams.get('param1');
  try {
    // const [rows] = await pool.query('SELECT * FROM podnewsusers');
    // return new Response(JSON.stringify({ users: rows }), {
    const [rows] = await pool.query(`CALL show_runorder('${param1}')`);

    return new Response(JSON.stringify({ users: rows }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}