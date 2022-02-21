const express = require('express');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const app = express();
const Photo = require('./models/Photo');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const photoController = require('./controllers/photoController');
const pageController = require('./controllers/pageController');
//connect DB
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//TEMPLATE ENGINE
app.set('view engine', 'ejs');
//MIDDLEWARES

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//ROUTES
app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);

app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/photos/edit/:id', pageController.getEditPage);

const port = 3000;

app.listen(port, () => {
  console.log(`sunucu ${port} portundan başlatıldı.`);
});
