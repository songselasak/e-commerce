const Product = require('../models/product');

exports.getHomePage = (req, res, next) => {
    res.render('awesomeshop', {
        pageTitle: 'Awesome Shop',
    })
}

exports.getProductPage = (req, res, next) => {
    res.render('product', {
        pageTitle: 'Awesome Shop',
    })
}

// exports.getAdminPanel = (req, res, next) => {
//     res.render('adminPanel', {
//         pageTitle: 'Awesome Shop',
//     })
// }

exports.getAdminPanel = (req, res, next) => {
    Product.find().then(product =>{
        console.log(product);
        res.render('adminPanel', {product: product});
    }).catch(err=>{
        console.log(err);
    })
}