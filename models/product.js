const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: false
    },

    category: {
        type: String,
        required: true
    },

    inStock: {
        type: Date,
        required: true
    },
});

productSchema.methods.createProduct = function(product) {
    let products = new Product({
        title: product.title,
        quantity: product.quantity,
        description: product.description,
        category: product.category,
        inStock: product.inStock
    })
    products.save();
}

module.exports = mongoose.model('Product', productSchema);