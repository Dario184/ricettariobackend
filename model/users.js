const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const users = new Schema({
    nome: {type : String, required: true},
    immagine : {type : String, default : "https://leragnaie.com/wp-content/uploads/2018/12/Profile_avatar_placeholder_large.png"},
    nickname: {type : String, required: true, unique: true},
    mail : {type : String, required: true, unique: true},
    password : {type : String, required: true},
    flag : {type : Boolean, default: false},
    id_lista : { type: String, default: 0},
    id_preferiti : { type: String, default: 0}
});
module.exports= mongoose.model('users',users);