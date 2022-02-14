const express = require('express');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const app = express();
const Photo = require('./models/Photo');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const { findById } = require('./models/Photo');

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
app.use(methodOverride('_method'));

//ROUTES
app.get('/', async (req, res) => {
  const photos = await Photo.find({}).sort('-dateCreated');
  res.render('index', {
    photos,
  });
});

app.get('/photos/:id', async (req, res) => {
  const singlePhoto = await Photo.findById(req.params.id);
  res.render('photo', {
    singlePhoto,
  });
  //console.log(req.params.id);
  //res.render('about')
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/photos', async (req, res) => {
  // console.log(req.files.image)
  // await Photo.create(req.body);
  // res.redirect('/');

  const uploadDir = 'public/uploads';
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  let uploadedImage = req.files.image;
  let uploadPath = __dirname + '/public/uploads/' + uploadedImage.name;

  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadedImage.name,
    });
    res.redirect('/');
  });
});

app.get('/photos/edit/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });

  res.render('edit', {
    photo,
  });
});

app.put('/photos/:id',async(req,res)=>{
  const photo=await Photo.findOne({_id:req.params.id});
  photo.title=req.body.title;
  photo.description=req.body.description;
  photo.save();

  res.redirect(`/photos/${photo._id}`)
})
const port = 3000;

app.listen(port, () => {
  console.log(`sunucu ${port} portundan başlatıldı.`);
});
