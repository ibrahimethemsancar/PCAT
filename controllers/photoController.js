const Photo=require('../models/Photo');
const fs=require('fs')

exports.getAllPhotos = async (req, res) => {

  const page=req.query.page || 1;
  const photoPerPage=2;
  const totalPhotos=await Photo.find().countDocuments();
  const photos = await Photo.find({}).sort('-dateCreated')
  .skip((page*photoPerPage)-1)
  .limit(photoPerPage)

  res.render('index', {
       photos:photos,
       current:page,
       pages:Math.ceil((totalPhotos/photoPerPage))
     })
  // const photos = await Photo.find({}).sort('-dateCreated');
  // res.render('index', {
  //   photos,
  // });
};

exports.getPhoto = async (req, res) => {
  const singlePhoto = await Photo.findById(req.params.id);
  res.render('photo', {
    singlePhoto,
  });
};

exports.createPhoto = async (req, res) => {
  // console.log(req.files.image)
  // await Photo.create(req.body);
  // res.redirect('/');

  const uploadDir = 'public/uploads';
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  let uploadedImage = req.files.image;
  let uploadPath = __dirname + '/../public/uploads/' + uploadedImage.name;

  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadedImage.name,
    });
    res.redirect('/');
  });
};

exports.updatePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();

  res.redirect(`/photos/${photo._id}`);
};

exports.deletePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  let deletedImage = __dirname + '/../public' + photo.image;
  fs.unlinkSync(deletedImage); 
  await Photo.findByIdAndRemove(req.params.id);
  res.redirect('/');
};
