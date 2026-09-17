const express = require("express");
const { initDb } = require("../src/config/database");
const productRoutes = require("../src/routes/productRoute");
const errorHandler = require("../src/middlewares/errorHandler");

const app = express();
const port = process.env.PORT || 3000;

// Middleware global untuk membaca format JSON
app.use(express.json());

// Pendaftaran jalur API (Routes)
app.use("/products", productRoutes);

// Penanganan untuk URL/Endpoint yang tidak terdaftar (404)
app.use((req, res, next) => {
  const error = new Error(`Endpoint tidak ditemukan: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// Middleware Global Error Handler (Harus diletakkan di urutan paling bawah)
app.use(errorHandler);

// Inisialisasi Database, lalu jalankan Server
initDb().then(() => {
  app.listen(port, () => {
    console.log(`Server RESTful API (MVC) berjalan di port ${port}`);
  });
});
