//config inicial
const express = require('express');
const app = express();

// forma de ler JSON / middlewares
app.use(
    express.urlencoded({ 
        extended: true 
    }), //inicia leitura de dados do body
)

app.use(express.json());    //inicia leitura de JSON


// rota inicial / endpoint

//entregar uma porta