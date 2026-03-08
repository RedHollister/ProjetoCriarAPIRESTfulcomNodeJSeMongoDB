//config inicial
const express = require('express')
const mongoose = require('mongoose')
const app = express();

const Person = require('./models/Person')   //Importa o modelo "Person" do arquivo "models/Person.js" para ser usado no arquivo principal da aplicação

// forma de ler JSON / middlewares
app.use(
    express.urlencoded({ 
        extended: true 
    }), //inicia a configuração de leitura de JSON via urlencoded
)

app.use(express.json());    //Vai poder ler JSON via body

//rotas da API
app.post('/person', async (req, res) => {   //Criando uma rota POST para o endpoint "/person" que recebe dados do cliente e os salva no banco de dados
    //req.body

    // {name: "Elton", salary: 5000, approved: true}
    const { name, salary, approved } = req.body   //Desestruturação dos dados recebidos no corpo da requisição

    const person = {    //Criação de um objeto "person" com os dados desestruturados
        name,
        salary,
        approved
    }

    try {
        //criando dados
        await Person.create(person)   //Tenta criar um novo documento no banco de dados usando o modelo "Person" com os dados do objeto "person"
        res.status(201).json({ message: 'Pessoa inserida com sucesso!' })   //Se a criação for bem-sucedida, retorna uma resposta com status 201 e uma mensagem de sucesso em formato JSON
        
    } catch (error) {
        res.status(500).json({ error: error })   //Em caso de erro, retorna uma resposta com status 500 e o erro em formato JSON
    }
    
})
// rota inicial / endpoint
app.get('/', (req, res) => {     //Criando uma rota GET para o endpoint raiz

    //mostrar req
    res.json({ message: 'Oi Express!' })   //Resposta em JSON com uma mensagem
})

//entregar uma porta
mongoose.connect('mongodb://elton:1234@ac-qi0lody-shard-00-00.6hifddv.mongodb.net:27017,ac-qi0lody-shard-00-01.6hifddv.mongodb.net:27017,ac-qi0lody-shard-00-02.6hifddv.mongodb.net:27017/?ssl=true&replicaSet=atlas-uif2m4-shard-0&authSource=admin&appName=APICluster')
    .then(() => {   //CASO a conexão com o MongoDB der certo...
        console.log('Conectado ao MongoDB Atlas!') //Mensagem de sucesso na conexão com o MongoDB Atlas
        app.listen(3000)       //Inicia o servidor/API na porta 3000  
    }
)
    .catch((error) => { //CASO a conexão com o MongoDB der errado...
        console.error('Erro ao conectar ao MongoDB Atlas:', error) //Mensagem de erro caso a conexão com o MongoDB Atlas falhe
    })