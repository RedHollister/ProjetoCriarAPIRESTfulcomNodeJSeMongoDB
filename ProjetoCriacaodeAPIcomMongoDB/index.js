//config inicial
const express = require('express');
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


//entregar uma porta
app.listen(3000)       //Inicia o servidor/API na porta 3000