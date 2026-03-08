const mongoose = require('mongoose') //Importa o Mongoose para conectar com o MongoDB

const Person = mongoose.model('Person', {   //Cria um modelo de dados chamado "Person" com um esquema definido
    name: String,   //Campo "name" do tipo String
    salary: Number, //Campo "salary" do tipo Number
    approved: Boolean,  //Campo "approved" do tipo Boolean
})

module.exports = Person    //Exporta o modelo "Person" para ser usado em outros arquivos do projeto