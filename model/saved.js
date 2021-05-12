const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saved = new Schema({
    ricette : {type : Array, required: true}
});
module.exports = mongoose.model('saved',saved);