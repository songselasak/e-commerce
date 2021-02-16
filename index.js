const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const fileUpload = require('express-fileupload');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public'))); // dirname means /(dirname of file index.js)/public

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }));

const adminRoutes = require('./routes/admin');
const products = require('./routes/api/product');
app.use(adminRoutes);
app.use('/api', products);



// body-parser, use mean use the module, for syntax, just copy it
// app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb+srv://user1:user1@cluster-ecommerce.k1jer.mongodb.net/product?retryWrites=true&w=majority')
.then(result => {
    console.log("Db is connected");
}).catch(err => {
    console.log(err);
});

app.listen(5000);