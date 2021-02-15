const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname,'public'))); // dirname means /(dirname of file index.js)/public

const adminRoutes = require('./routes/admin')
app.use(adminRoutes);

// body-parser, use mean use the module, for syntax, just copy it
// app.use(bodyParser.urlencoded({extended: true}));

app.listen(5000);