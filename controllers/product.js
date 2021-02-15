const Product = require('../models/product');

exports.createProduct = (req, res, next) => {
    //create product and store in database
    console.log('create product');

    const title = req.body.title;
    const quantity = req.body.quantity;
    const description = req.body.description;
    const category = req.body.category;
    const inStock = req.body.inStock;
    // const title = req.body.title; // picture

    const product = new Product({
        title: title,
        quantity: quantity,
        description: description,
        category: category,
        inStock: inStock,
    });
    product.save()
        .then(result => {
            console.log('product is created');
            res.redirect('/admin');
        })
        .catch(err => {
            console.log(err);
        });
    res.send('Product is created');
}

exports.updateProduct = (req, res, next) => {
    //update product
}

exports.deleteProduct = (req, res, next) => {
    //delete product
}

exports.getProducts = (req, res, next) => {
    //get list of product
    console.log('get products');
    res.send('');
}
