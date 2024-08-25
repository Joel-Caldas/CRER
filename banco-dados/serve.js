const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

// Inicializa o app Express
const app = express();

// Adiciona o middleware CORS
app.use(cors());

// Configura o middleware para parsear JSON e URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Servir arquivos estáticos

// Configuração do cliente MongoDB
const uri = "mongodb+srv://JoelCaldas:Jorelboy11@cluster0.8iyem.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

// Rota POST para inscrição
app.post('/inscricao', async (req, res) => {
    try {
        console.log('Recebendo dados do formulário:', req.body);
        await client.connect();
        console.log('Conectado ao banco de dados');
        const database = client.db('meuBancoDeDados');
        const collection = database.collection('minhaColecao');

        const doc = req.body;
        console.log('Documento a ser inserido:', doc);
        const result = await collection.insertOne(doc);
        console.log('Documento inserido com sucesso:', result);
        res.status(201).send(`Documento inserido com o ID: ${result.insertedId}`);
    } catch (err) {
        console.error('Erro ao inserir documento:', err);
        res.status(500).send('Erro ao inserir documento: ' + err.message);
    } finally {
        await client.close();
        console.log('Conexão com o banco de dados fechada');
    }
});

// Rota GET para buscar todos os documentos
app.get('/api/pessoas', async (req, res) => {
    try {
        await client.connect();
        console.log('Conectado ao banco de dados');
        const database = client.db('meuBancoDeDados');
        const collection = database.collection('minhaColecao');

        const pessoas = await collection.find().toArray();
        res.json(pessoas);
    } catch (err) {
        console.error('Erro ao buscar documentos:', err);
        res.status(500).send('Erro ao buscar documentos: ' + err.message);
    } finally {
        await client.close();
        console.log('Conexão com o banco de dados fechada');
    }
});

// Define a porta e inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
