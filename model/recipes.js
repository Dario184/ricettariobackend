const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipes = new Schema({
    autore : {type : String, required: true},
    titolo : {type : String, required: true},
    descrizione : {type : String, default: "non disponibile"},
    immagine : {type : String, required: true},
    categorie : {type: Array, required: true},
    ingredienti : {type : Array, required: true},
    procedimento : {type : Array, required: true},
    calorie : {type : Number, required: true},
    difficoltà : {type : String, required: true},
    preparazione : {type : Number, required: true},
    cottura: {type : Number, required: true},
    dosi: {type : Number, required: true},
    costo: {type : String, required: true}
});
module.exports = mongoose.model('recipes',recipes);