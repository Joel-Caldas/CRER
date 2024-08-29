const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Inicializa o app Express
const app = express();

// Adiciona o middleware CORS
app.use(cors());

// Configura o middleware para parsear JSON e URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Servir arquivos estáticos

// Conexão com o MongoDB usando Mongoose
const mongoUri = "mongodb+srv://JoelCaldas:Jorelboy11@cluster0.8iyem.mongodb.net/meuBancoDeDados?retryWrites=true&w=majority";
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão:'));
db.once('open', () => {
    console.log('Conectado ao banco de dados');
});

// Definição do esquema e modelo
const pessoaSchema = new mongoose.Schema({
    nome: String,
    sexo: String,
    idade: Number,
    celular: String,
    endereco: String,
    frequentaIgreja: String,
    igreja: String,
    frequentaCelula: String,
    celula: String,
    lider: String,
    pastor: String,
    convidadoPor: String,
    remedioControlado: String,
    remedio: String,
    problemaSaude: String,
    parenteNome: String,
    grauParentesco: String,
    parenteCelular: String
});

const Pessoa = mongoose.model('Pessoa', pessoaSchema);

// Rota GET para buscar todos os documentos
app.get('/api/pessoas', async (req, res) => {
    try {
        const pessoas = await Pessoa.find();
        res.json(pessoas);
    } catch (err) {
        console.error('Erro ao buscar documentos:', err);
        res.status(500).send('Erro ao buscar documentos: ' + err.message);
    }
});

// Rota POST para inscrição
app.post('/inscricao', async (req, res) => {
    try {
        console.log('Recebendo dados do formulário:', req.body);
        const doc = new Pessoa(req.body);
        const result = await doc.save();
        console.log('Documento inserido com sucesso:', result);
        res.status(201).send(`Documento inserido com o ID: ${result._id}`);
    } catch (err) {
        console.error('Erro ao inserir documento:', err);
        res.status(500).send('Erro ao inserir documento: ' + err.message);
    }
});

// Define a porta e inicia o servidor
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
