// pages/api/users.js
import pool from '../db.js';

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     try {
//       const [rows] = await pool.query('SELECT * FROM podnewsusers');
//       res.status(200).json(rows);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }


export async function GET(req, res) {
 const dd= await  pool.query('SELECT * FROM podnewsusers');
  const response = new Response(JSON.stringify({ dd}));
  return response;
}