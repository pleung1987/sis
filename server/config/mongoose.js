console.log('got to the mongoose.js file');

// require mongoose
var mongoose = require('mongoose');
// require the fs module for loading model files
var fs = require('fs');
// require path for getting the models path
var path = require('path');
//connecting our database server from express
mongoose.connect('mongodb://127.0.0.1/sis_users');
// create a variable that points to the path where all of the models live
var models_path = path.join(__dirname, './../models');
// read all of the files in the models_path and require (run) each of the javascript files

//function for fetching all the JS file on models that will be created
fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf('.js') >= 0) {
    // if the file name has .js in it, then we want it
    // require the file (this runs the model file which registers the schema)
    require(models_path + '/' + file);
    // require that file if it is a JS
  }
});

