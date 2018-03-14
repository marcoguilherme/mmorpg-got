var mongo = require('mongodb');

var connMongoDB = function(){
    var db = mongo.Db(
        'got', //Nome da collection
        new mongo.Server(
            'localhost', //Caminho do banco de dados
            '27017', // Porta do banco
            {} //Opcoes de configuracao do servidor
        ),
        {} // Configuracoes opcionais
    );

    return db;
}

module.exports = function(){
    return connMongoDB;
}