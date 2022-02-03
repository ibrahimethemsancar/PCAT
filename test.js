const mongoose = require('mongoose');
const Shcema = mongoose.Schema;

//connect DB
mongoose.connect('mongodb://localhost/pcat-test-db',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//create schema

const photoSchema = new Shcema({
  title: String,
  description: String,
});

const Photo = mongoose.model('Photo', photoSchema);

//create a photo

// Photo.create({
//   title: 'Photo Title 2s',
//   description: 'Photo description 2 lorem ipsum',
// });

//read a photo
// Photo.find({},(err,data)=>{
//     console.log(data);
// })

//update photo

// const id = '61fba1829f438d6595a95c0f';

// Photo.findByIdAndUpdate(
//   id,
//   {
//     title: 'Photo Title 111 updated',
//     description: 'Photo description 111 updated',
//   },
//   {
//       new:true
//   },
//   (err, data) => {
//     console.log(data);
//   }
// );


//delete a photo

const id ='61fbd90b5f22bbef3f842d3c';

Photo.findByIdAndDelete(id,(err,data)=>{
    console.log('the photo is removed');
})
