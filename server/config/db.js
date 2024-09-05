const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/fitness-equipment')
    .then((data) => {
        console.log("db connection");
    })
    .catch((err) => {
        console.log("error is occured", err);
    })