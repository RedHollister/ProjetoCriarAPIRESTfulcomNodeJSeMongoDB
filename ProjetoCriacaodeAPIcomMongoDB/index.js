//config inicial
require('dotenv').config()   //Carrega as variáveis de ambiente do arquivo .env para o processo Node.js, permitindo o uso de variáveis de ambiente em todo o aplicativo
const express = require('express')
const mongoose = require('mongoose')
const app = express();

// forma de ler JSON / middlewares
app.use(
    express.urlencoded({ 
        extended: true 
    }), //inicia a configuração de leitura de JSON via urlencoded
)

app.use(express.json());    //Vai poder ler JSON via body

//rotas da API
const personRoutes = require('./Routes/personRoutes')   //Importa as rotas definidas no arquivo "Routes/personRoutes.js" para ser usadas no arquivo principal da aplicação

app.use('/person', personRoutes)   //Configura o aplicativo para usar as rotas importadas do arquivo "Routes/personRoutes.js" para o endpoint "/person"

// rota inicial / endpoint
app.get('/', (req, res) => {     //Criando uma rota GET para o endpoint raiz

    //mostrar req
    res.json({ message: 'Oi Express!' })   //Resposta em JSON com uma mensagem
})

const DB_USER = process.env.DB_USER   //Obtém o valor da variável de ambiente "DB_USER" do arquivo .env e armazena na constante "DB_USER"
const DB_PASSWORD = process.env.DB_PASSWORD   //Obtém o valor da variável de ambiente "DB_PASSWORD" do arquivo .env e armazena na constante "DB_PASSWORD"

//entregar uma porta
mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@ac-qi0lody-shard-00-00.6hifddv.mongodb.net:27017,ac-qi0lody-shard-00-01.6hifddv.mongodb.net:27017,ac-qi0lody-shard-00-02.6hifddv.mongodb.net:27017/?ssl=true&replicaSet=atlas-uif2m4-shard-0&authSource=admin&appName=APICluster`)
    .then(() => {   //CASO a conexão com o MongoDB der certo...
        console.log('Conectado ao MongoDB Atlas!') //Mensagem de sucesso na conexão com o MongoDB Atlas
        app.listen(3000)       //Inicia o servidor/API na porta 3000  
    }
)
    .catch((error) => { //CASO a conexão com o MongoDB der errado...
        console.error('Erro ao conectar ao MongoDB Atlas:', error) //Mensagem de erro caso a conexão com o MongoDB Atlas falhe
    })