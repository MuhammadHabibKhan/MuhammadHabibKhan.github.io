const productFormatter = (product) => {

    const { categoryName, productName, productPrice } = product;
  
    return {
     categoryName, 
     productName, 
     productPrice
    };

  };

  
  module.exports = productFormatter;
  