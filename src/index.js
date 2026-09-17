const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Konfigurasi koneksi PostgreSQL menggunakan environment variables dari Docker
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
});

app.use(express.json());

// Endpoint utama untuk menguji koneksi API dan Database
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      success: true,
      message: 'Halo! Backend Node.js & PostgreSQL berhasil terhubung dengan Docker! 🚀',
      server_time_db: result.rows[0].now
    });
  } catch (err) {
    console.error('Gagal terhubung ke database:', err);
    res.status(500).json({ 
      success: false, 
      error: 'Koneksi database gagal' 
    });
  }
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server RESTful API berjalan di port ${port}`);
});