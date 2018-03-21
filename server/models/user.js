//makes your Schema and setting the structure (the blueprint) for your database
console.log("got into the user.js");

var mongoose = require('mongoose')
var Email = require('mongoose-type-mail')

var UserSchema = new mongoose.Schema({
    name: { type: String, required:true, minlength: 2},
    email: { type: Email, required:true, minlength: 2}
}, {timestamps: true});

//setter
mongoose.model('User', UserSchema)
//Schema in our models as 'User' =  users in Mongo