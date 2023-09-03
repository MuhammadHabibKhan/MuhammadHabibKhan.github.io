const express = require('express');
const toDo = require('../../Model/categories');
const productFormatter = require('../../Formatters/categories');
const categories = require('../../Model/categories');

const router = express.Router();

// Route to create a new product
router.post('/product', (req, res) => {
  const newItem = new categories(req.body);
  newItem
    .save()
    .then((item) => {
      res.status(201).json({
        status: 'success',
        message: 'Item created successfully',
        data: productFormatter(item),
      });
    })
    .catch((err) => {
      console.error('Error creating new product:', err);
      res.status(500).json({
        status: 'error',
        message: 'Failed to create product',
        error: err.message,
      });
    });
});

// Route to get all products based on category
router.get('/category/:categoryID', (req, res) => {
  const { categoryID } = req.params;

  const matched = []
  const categoryMatch = (p) => {
    if (p.categoryID == categoryID){
      matched.push(p)
    }
  }
  categories.find()
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          status: 'error',
          message: 'No products exist in the database',
        });
      }
      else {
          product.map(categoryMatch)
          res.status(200).json({
            status: 'success',
            message: 'Products for category retrieved successfully',
            data: (matched.map(productFormatter)),
          });
      }
    })
    .catch((err) => {
      console.error('Error retrieving customer:', err);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve customer data',
        error: err.message,
      });
    });
});


//update a product
router.post("/productUpdate", (req, res) => {
  const { categoryID, categoryName, productID, productName, productPrice } = req.body

  toDo.findOne({ productID: productID }).then((item) => {

    console.log(item)
    if (!item) {
      return res.status(200).json({
        status: 'error',
        message: "Product does not exist",
      });
    }

    item.updateOne({ categoryID: categoryID, categoryName: categoryName, productID: productID, productName: productName, productPrice: productPrice}).then((updateCheck) => {

      res.status(200).json({
        status: 'success',
        message: 'Product updated successfully',
        data: productFormatter(item),
      });
    }
    ).catch((err) => { console.log(err) })

  }).catch((err) => { console.log(err) })

})

// Delete a product
router.delete('/product/:id', (req, res) => {
  const { id } = req.params;
  toDo.findByIdAndDelete(id)
    .then((item) => {
      if (!item) {
        return res.status(404).json({
          status: 'error',
          message: 'Product not found',
        });
      } else {
        res.status(200).json({
          status: 'success',
          message: 'Product deleted successfully'
        });
      }
    })
    .catch((err) => {
      console.error('Error deleting product:', err);
      res.status(500).json({
        status: 'error',
        message: 'Failed to delete product',
        error: err.message,
      });
    });
});

module.exports = router;

