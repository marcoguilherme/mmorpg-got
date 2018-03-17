module.exports.index = function(app, req, res){
    if(req.session.autenticado !== true){
        res.render('index', { validacao :{}})
        return;
    }

    var usuario = req.session.usuario;
    var connection = app.config.database;
    
    var jogoModel = new app.app.models.JogoModel(connection);
    jogoModel.iniciaJogo(usuario, req, res);

}

module.exports.sair = function(app, req, res){
    req.session.destroy((err)=>{
        res.render('index', {validacao : {}});
    })
}

module.exports.suditos = function(app, req, res){
    res.render('suditos', {validacao : {}});
}

module.exports.pergaminhos = function(app, req, res){
    res.render('pergaminhos', {validacao : {}});
}