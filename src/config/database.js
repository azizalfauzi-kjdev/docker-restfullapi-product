const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
});

// Fungsi inisialisasi tabel otomatis
async function initDb() {
  const query = `
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      price NUMERIC(10, 2) NOT NULL,
      stock INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(query);
    console.log('Tabel "products" berhasil diperiksa/dibuat di database.');
  } catch (err) {
    console.error('Gagal membuat tabel otomatis:', err);
    process.exit(1); // Hentikan aplikasi jika database gagal terhubung
  }
}

module.exports = { pool, initDb };