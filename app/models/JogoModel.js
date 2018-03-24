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

JogoModel.prototype.iniciaJogo = function(usuario, req, res, msg){
    this._connection.open( function(err, mongoclient){
        mongoclient.collection("jogo_parametros", function(err, collection){
            collection.find({
                usuario : usuario
            }).toArray(function(err, result){   
                res.render('jogo', { 
                    img_casa : req.session.casa,
                    parametros : result[0],
                    msg : msg
                });
            })
            mongoclient.close();
        })
    })
}

JogoModel.prototype.acao = function(acao, req, res){
    this._connection.open( (err, mongoclient)=>{
        mongoclient.collection('acao', (err, collection)=>{
            
            var date = new Date();
            var tempo = null;

            switch(parseInt(acao.acao)){
                case 1: tempo = 1 * 60 * 60000; break;
                case 2: tempo = 2 * 60 * 60000; break;
                case 3: tempo = 5 * 60 * 60000; break;
                case 4: tempo = 5 * 60 * 60000; break;
            }

            acao.acao_termina_em = date.getTime() + tempo;

            collection.insert(acao);
            mongoclient.close();
        })
    })
}

JogoModel.prototype.getAcoes = function(usuario, res){
    this._connection.open( (err, mongoclient)=>{
        mongoclient.collection('acao', (err, collection)=>{

            var date = new Date();
            var momento_atual = date.getTime();

            collection.find({ 
                usuario : usuario, 
                acao_termina_em : {$gt:momento_atual} 
            }).toArray((err, result)=>{
                res.render('pergaminhos', {acoes : result})
                mongoclient.close();      
            })
        })
    })
}

module.exports = function(){
    return JogoModel;
}