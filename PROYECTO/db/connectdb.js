const mongoose = require('mongoose');
const config = require('../config/config');

mongoose.connect(config.url(), {useNewUrlParser : true}).then(() => {console.log("connected")}).catch(err => console.log("not connected", err));


module.exports ={mongoose};