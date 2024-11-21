const express = require('express');
const app = express();
const port = 3000;

//middleware para lidar com requisições POST
app.use(express.urlencoded({ extended: true}));

//array para armazenar produtos
let produtos = []

//rota para renderizar formulario
app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
});

//rota para adicionar produtos
app.post('/adicionar', (req, res) =>{
    const { nome, preco, descricao} = req.body;
    produtos.push({nome, preco, descricao});
    res.redirect('/');
})


app.listen(port, () =>{
    console.log(`Servidor esta rodando em http://localhost:${port}`);
})

