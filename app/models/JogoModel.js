function JogoModel(connection){
    this._connection = connection();
}

JogoModel.prototype.gerarParametros = function(usuario){
    this._connection.open( function(err, mongoclient){
        mongoclient.collection("jogo_parametros", function(err, collection){
            collection.insert({
                usuario: usuario,
                moeda: 15,
                suditos: 10,
                temor: Math.floor(Math.random() * 1000),
                sabedoria: Math.floor(Math.random() * 1000),
                comercio: Math.floor(Math.random() * 1000),
                magia: Math.floor(Math.random() * 1000)
            });
            mongoclient.close();
        })
    })
}

JogoModel.prototype.iniciaJogo = function(usuario, req, res, comando_invalido){
    this._connection.open( function(err, mongoclient){
        mongoclient.collection("jogo_parametros", function(err, collection){
            collection.find({
                usuario : usuario
            }).toArray(function(err, result){   
                res.render('jogo', { 
                    img_casa : req.session.casa,
                    parametros : result[0],
                    comando_invalido : comando_invalido
                });
            })
            mongoclient.close();
        })
    })
}

JogoModel.prototype.acao = function(usuario, req, res){
    
}

module.exports = function(){
    return JogoModel;
}