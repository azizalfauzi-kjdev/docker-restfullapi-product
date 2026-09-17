const ProductModel = require('../models/productModel');

const ProductController = {
  async getAllProducts(req, res, next) {
    try {
      const products = await ProductModel.findAll();
      res.json({
        success: true,
        total: products.length,
        data: products
      });
    } catch (err) {
      next(err); // Dilempar ke middleware error handler
    }
  },

  async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await ProductModel.findById(id);
      
      if (!product) {
        const error = new Error('Produk tidak ditemukan');
        error.statusCode = 404;
        throw error;
      }

      res.json({
        success: true,
        data: product
      });
    } catch (err) {
      next(err);
    }
  },

  async createProduct(req, res, next) {
    try {
      const { name, price, stock } = req.body;
      
      if (!name || price === undefined || stock === undefined) {
        const error = new Error('Nama, harga, dan stok wajib diisi!');
        error.statusCode = 400;
        throw error;
      }

      const newProduct = await ProductModel.create(name, price, stock);
      res.status(201).json({
        success: true,
        message: 'Produk berhasil ditambahkan',
        data: newProduct
      });
    } catch (err) {
      next(err);
    }
  },

  async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const { name, price, stock } = req.body;

      const updatedProduct = await ProductModel.update(id, name, price, stock);

      if (!updatedProduct) {
        const error = new Error('Produk tidak ditemukan untuk diperbarui');
        error.statusCode = 404;
        throw error;
      }

      res.json({
        success: true,
        message: 'Produk berhasil diperbarui',
        data: updatedProduct
      });
    } catch (err) {
      next(err);
    }
  },

  async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const deletedProduct = await ProductModel.delete(id);

      if (!deletedProduct) {
        const error = new Error('Produk tidak ditemukan untuk dihapus');
        error.statusCode = 404;
        throw error;
      }

      res.json({
        success: true,
        message: 'Produk berhasil dihapus',
        data: deletedProduct
      });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = ProductController;