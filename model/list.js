const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const list = new Schema({
    nome : {type : String, required: true},
    ingredienti : {type : Array, required: true}
});

module.exports = mongoose.model('list',list);