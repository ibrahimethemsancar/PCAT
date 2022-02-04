const express = require('express');
const ejs=require('ejs');
const path=require('path');
const app = express();
const Photo=require('./models/Photo')
const mongoose = require('mongoose');


//connect DB
mongoose.connect('mongodb://localhost/pcat-test-db',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//TEMPLATE ENGINE
app.set("view engine","ejs");
//MIDDLEWARES

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json())

//ROUTES
app.get('/', (req, res) => {
  res.render('index')
});
app.get('/about', (req, res) => {
  res.render('about')
});
app.get('/add', (req, res) => {
  res.render('add')
});


app.post('/photos', async (req, res) => {
  await Photo.create(req.body)
  res.redirect('/')
});



const port = 3000;

app.listen(port, () => {
  console.log(`sunucu ${port} portundan başlatıldı.`);
});
