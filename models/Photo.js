const mongoose=require('mongoose');
const schema=mongoose.Schema;

//create schema

const photoSchema = new schema({
    title: String,
    description: String,
    image:String,
    dateCreated:{
        type:Date,
        default:Date.now,
    },
  });

  const Photo = mongoose.model('Photo', photoSchema);

  module.exports=Photo;