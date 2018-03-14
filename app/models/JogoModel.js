function JogoModel(connection){
    this._connection = connection();
}

JogoModel.prototype.gerarParametros(usuario){
    this._connection.open( function(err, mongoclient){
        mongoclient.collection("jogo_parametros", function(err, collection){
            collection.insert({
                moeda: 15,
                suditos: 10,
                temor: Math.floor(Math.random() * 1000),
                sabedoria: Math.floor(Math.random() * 1000),
                comercio: Math.floor(Math.random() * 1000),
                magia: Math.floor(Math.random() * 1000)
            })
        })
    })
}

module.exports = function(){
    return JogoModel;
}