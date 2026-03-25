const router = require('express').Router()   //Importa a dependência "express" e cria um roteador usando a função "Router()"

const Person = require('../models/Person')   //Importa o modelo "Person" do arquivo "models/Person.js" para ser usado no arquivo principal da aplicação

//Criação de dados

router.post('/', async (req, res) => {   //Criando uma rota POST para o endpoint "/person" que recebe dados do cliente e os salva no banco de dados
    //req.body

    // {name: "Elton", salary: 5000, approved: true}
    const { name, salary, approved } = req.body   //Desestruturação dos dados recebidos no corpo da requisição

    if (!name) {  //Verifica se o campo "name" está presente nos dados recebidos
        res.status(422).json({ error: 'O nome é obrigatório!' })   //Se o campo "name" estiver ausente, retorna uma resposta com status 422 e uma mensagem de erro em formato JSON
        return 
    }

    if (!salary) {    //Verifica se o campo "salary" está presente nos dados recebidos
        res.status(422).json({ error: 'O salário é obrigatório!' }) //Se o campo "salary" estiver ausente, retorna uma resposta com status 422 e uma mensagem de erro em formato JSON
        return 
    }

    if (approved === undefined) {    //Verifica se o campo "approved" está presente nos dados recebidos
        res.status(422).json({ error: 'O campo aprovado é obrigatório!' })   //Se o campo "approved" estiver ausente, retorna uma resposta com status 422 e uma mensagem de erro em formato JSON
        return 
    }

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

//Leitura de dados
router.get('/', async (req, res) => {    //Criando uma rota GET para o endpoint "/person" que busca todos os documentos do banco de dados
    try {
        const people = await Person.find()   //Tenta buscar todos os documentos do banco de dados usando o modelo "Person" e armazena o resultado na variável "people"
        res.status(200).json(people)    //Se a busca for bem-sucedida, retorna uma resposta com status 200 e os dados encontrados em formato JSON
    } catch (error) {
        res.status(500).json({ error: error })   //Em caso de erro, retorna uma resposta com status 500 e o erro em formato JSON
    }
})

//Leitura de dados por ID
router.get('/:id', async (req, res) => {    //Criando uma rota GET para o endpoint "/person/:id" que busca um documento específico do banco de dados usando o ID fornecido na URL
    //Extrair o dado da requisição, pela URL = req.params
    const id = req.params.id   //Obtém o ID da URL usando "req.params.id" e armazena na variável "id"

    try {
        const person = await Person.findOne({ _id: id })   //Tenta buscar um documento específico no banco de dados usando o modelo "Person" e o ID fornecido, armazenando o resultado na variável "person"
        if (!person) {  //Verifica se o documento foi encontrado
            res.status(404).json({ error: 'Pessoa não encontrada!' })   //Se o documento não for encontrado, retorna uma resposta com status 404 e uma mensagem de erro em formato JSON
            return
        }
        res.status(200).json(person)    //Se o documento for encontrado, retorna uma resposta com status 200 e os dados do documento em formato JSON
    } catch (error) {
        res.status(500).json({ error: error })   //Em caso de erro, retorna uma resposta com status 500 e o erro em formato JSON
    }
})

//Update - atualização de dados (PUT, PATCH))
router.patch('/:id', async (req, res) => {  //Criando uma rota PATCH para o endpoint "/person/:id" que atualiza um documento específico do banco de dados usando o ID fornecido na URL
    const id = req.params.id   //Obtém o ID da URL usando "req.params.id" e armazena na variável "id"

    const { name, salary, approved } = req.body   //Desestruturação dos dados recebidos no corpo da requisição

    const person = {    //Criação de um objeto "person" com os dados desestruturados
        name,
        salary,
        approved
    }

    try {
        const updatedPerson = await Person.updateOne({ _id: id }, person)   //Tenta atualizar um documento específico no banco de dados usando o modelo "Person", o ID fornecido e os dados do objeto "person", armazenando o resultado na variável "updatedPerson"
        
        if (updatedPerson.matchedCount === 0) {    //Verifica se o documento foi encontrado para atualização
            res.status(404).json({ error: 'Pessoa não encontrada!' })   //Se o documento não for encontrado, retorna uma resposta com status 404 e uma mensagem de erro em formato JSON
            return
        }
        
        res.status(200).json(person)    //Se a atualização for bem-sucedida, retorna uma resposta com status 200 e os dados do documento atualizado em formato JSON
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//Delete - remoção de dados
router.delete('/:id', async (req, res) => {  //Criando uma rota DELETE para o endpoint "/person/:id" que remove um documento específico do banco de dados usando o ID fornecido na URL
    const id = req.params.id   //Obtém o ID da URL usando "req.params.id" e armazena na variável "id"

    try {
        const deletedPerson = await Person.deleteOne({ _id: id })   //Tenta remover um documento específico no banco de dados usando o modelo "Person" e o ID fornecido, armazenando o resultado na variável "deletedPerson"
        
        if (deletedPerson.deletedCount === 0) {    //Verifica se o documento foi encontrado para remoção
            res.status(404).json({ error: 'Pessoa não encontrada!' })   //Se o documento não for encontrado, retorna uma resposta com status 404 e uma mensagem de erro em formato JSON
            return
        }
        
        res.status(200).json({ message: 'Pessoa removida com sucesso!' })    //Se a remoção for bem-sucedida, retorna uma resposta com status 200 e uma mensagem de sucesso em formato JSON
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

module.exports = router    //Exporta o roteador para ser usado em outros arquivos do projeto, como o arquivo principal "index.js"