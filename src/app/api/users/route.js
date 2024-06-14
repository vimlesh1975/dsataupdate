import pool from '../../db.js';

export async function GET(req) {
  try {
    const [rows] = await pool.query('SELECT * FROM podnewsusers');
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