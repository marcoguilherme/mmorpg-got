//Require do modulo do servidor express
var express = require('express');
//Require do modulo consign para trabalhar com mvc sem precisar usar o require
var consign = require('consign');
//Require do modulo body-parser para trabalhar com formularios
var bodyParser = require('body-parser');
//Require do modulo de validacao de formulario express-validator
var expressValidator = require('express-validator');
//Require modulo de criacao do sessao express-session
var expressSession = require('express-session');

//Inicializacao do modulo do express
var app = express();

//Configuracao da engine view ejs
app.set('view engine', 'ejs');
app.set('views', './app/views');

//Definida o diretorio para usar assets
app.use(express.static('./app/public'));

//Configuracao do middleware bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Configuracao middleware expressValidator
app.use(expressValidator());

//Configuracao do middleware expressSession
app.use(expressSession({
	secret: 'iuashddiugfhhskadnf',
	resave: false,
	saveUninitialized: false
}));

//Configuracao do middleware consign
consign()
    .include('app/routes')
    .then('config/database.js')
    .then('app/models')
    .then('app/controllers')
    .into(app);

module.exports = app;
