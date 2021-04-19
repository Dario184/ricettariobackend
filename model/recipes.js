const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipes = new Schema({
    titolo : {type : String, required: true, unique: true},
    descrizione : {type : String, default: "non disponibile"},
    immagine : {type : String, required: true},
    categorie : {type: Array, required: true},
    ingredienti : {type : Array, required: true},
    procedimento : {type : Array, required: true},
    difficoltà : {type : String, required: true},
    preparazione : {type : String, required: true},
    cottura: {type : String, required: true},
    dosi: {type : String, required: true},
    costo: {type : String, required: true}
});
module.exports = mongoose.model('recipes',recipes);