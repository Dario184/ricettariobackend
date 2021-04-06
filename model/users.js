const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const users = new Schema({
    nome: {type : String, required: true},
    nickname: {type : String, required: true, unique: true},
    mail : {type : String, required: true, unique: true},
    password : {type : String, required: true},
    flag : {type : Boolean, default: false},
    id_lista : { type: String, default: 0},
    id_preferiti : { type: String, default: 0}
});
module.exports= mongoose.model('users',users);