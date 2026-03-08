//config inicial
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// forma de ler JSON / middlewares
app.use(
    express.urlencoded({ 
        extended: true 
    }), //inicia a configuração de leitura de JSON via urlencoded
)

app.use(express.json());    //Vai poder ler JSON via body


// rota inicial / endpoint
app.get('/', (req, res) => {     //Criando uma rota GET para o endpoint raiz

    //mostrar req
    res.json({ message: 'Oi Express!' })   //Resposta em JSON com uma mensagem
})

//mongodb+srv://elton:1234@apicluster.6hifddv.mongodb.net/?appName=APICluster


//entregar uma porta
mongoose.connect('mongodb+srv://elton:1234@apicluster.6hifddv.mongodb.net/?appName=APICluster')
    .then(() => {
        console.log('Conectado ao MongoDB Atlas!') //Mensagem de sucesso na conexão com o MongoDB Atlas
        app.listen(3000)       //Inicia o servidor/API na porta 3000  
    }
)
    .catch((error) => {
        console.error('Erro ao conectar ao MongoDB Atlas:', error) //Mensagem de erro caso a conexão com o MongoDB Atlas falhe
    })