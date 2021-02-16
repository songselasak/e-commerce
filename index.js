const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const fileUpload = require('express-fileupload');
const cookie = require('cookie-parser');
var session = require('express-session')

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public'))); // dirname means /(dirname of file index.js)/public

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }));

app.use(cookie());
app.use(session({
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 1000*60*60,
        sameSite: true,
        secure: false

    },
    secret: "secret",
    name: 'sid'
}));
app.post('/upload', (req, res) => {
  // upload file function
  let image;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  image = req.files.image;
  uploadPath = __dirname + '/public/uploads/' + image.name;

  // Use the mv() method to place the file somewhere on your server
  image.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
})

const adminRoutes = require('./routes/admin');
const products = require('./routes/api/product');
const userRoutes = require('./routes/user');
app.use(adminRoutes);
app.use('/api', products);
app.use(userRoutes);



// body-parser, use mean use the module, for syntax, just copy it
// app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb+srv://user1:user1@cluster-ecommerce.k1jer.mongodb.net/product?retryWrites=true&w=majority')
.then(result => {
    console.log("Db is connected");
}).catch(err => {
    console.log(err);
});

app.listen(5000);