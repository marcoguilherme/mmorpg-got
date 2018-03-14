function UsuariosModel(connection){
    this._connection = connection();
}

UsuariosModel.prototype.inserirUsuario = function(usuario){
    this._connection.open( function(err, mongoclient){
        mongoclient.collection("usuarios", function(err, collection){
            collection.insert(usuario);
            mongoclient.close();
        })
    })
}

UsuariosModel.prototype.autenticarUsuario = function(usuario, req, res){
    this._connection.open( function(err, mongoclient){
        mongoclient.collection("usuarios", function(err, collection){
            collection.find(usuario).toArray(function(err, result){
                if( result[0] != undefined ){
                    req.session.autenticado = true;
                    req.session.usuario = result[0].usuario;
                    req.session.casa = result[0].casa;
                }

                if(req.session.autenticado){
                    res.redirect('jogo');
                }else{
                    res.render('index', { validacao : {} })
                }
            })
            mongoclient.close();
        })
    })
}

module.exports = function(){
    return UsuariosModel;
}