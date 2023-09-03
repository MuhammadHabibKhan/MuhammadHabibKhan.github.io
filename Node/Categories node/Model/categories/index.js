const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    categoryID: {
      type: String,
      required: true,
      unique: true,
    },

    categoryName: {
      type: String,
      required: true,
      unique: true,
    },

    productID: {
      type: String,
      required: true,
      unique: true,
    },

    productName: {
      type: String,
      required: true,
    },

    productPrice: {
      type: String,
      required: true,
    },

  },

  { timestamps: true }

  );

  module.exports = mongoose.model('product', productSchema);