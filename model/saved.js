const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saved = new Schema({
    nome : {type : String, required: true},
    ricette : {type : Array, required: true}
});
module.exports = mongoose.model('saved',saved);