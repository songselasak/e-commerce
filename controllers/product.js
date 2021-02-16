const Product = require('../models/product');
const fs = require('fs');

exports.createProduct = (req, res, next) => {
    //create product and store in database
    console.log('create product');
    const image = req.body.image;

    const title = req.body.title;
    const quantity = req.body.quantity;
    const description = req.body.description;
    const category = req.body.category;
    const inStock = req.body.inStock;



    const product = new Product({
        image: image,
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

// exports.getProducts = (req, res, next) => {
//     Product.find().then(product =>{
//         console.log(product);
//         res.render('adminPanel', {product: product});
//     }).catch(err=>{
//         console.log(err);
//     })
// }
