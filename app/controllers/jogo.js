module.exports.index = function(app, req, res){
    
    if(req.session.autenticado !== true){
        res.render('index', { validacao :{}})
        return;
    }

    var comando_invalido = 'N';

    if(req.query.comando_invalido == 'S'){
        comando_invalido = 'S';
    }

    var usuario = req.session.usuario;
    var connection = app.config.database;
    
    var jogoModel = new app.app.models.JogoModel(connection);
    jogoModel.iniciaJogo(usuario, req, res, comando_invalido);

}

module.exports.sair = function(app, req, res){
    req.session.destroy((err)=>{
        res.render('index', {validacao : {}});
    })
}

module.exports.suditos = function(app, req, res){
    if(req.session.autenticado !== true){
        res.render('index', { validacao :{}})
        return;
    }
    res.render('suditos')
}

module.exports.pergaminhos = function(app, req, res){
    if(req.session.autenticado !== true){
        res.render('index', { validacao :{}})
        return;
    }
    res.render('pergaminhos')
}

module.exports.ordernar_acao_sudito = function(app,req,res){

    var dadosForm = req.body;
    
    req.assert('acao', 'Selecione uma opcao valida').notEmpty();
    req.assert('quantidade', 'Informe uma quantidade').notEmpty();
    var errors = req.validationErrors();

    if(errors){
        res.redirect('jogo?comando_invalido=S');
        return;
    }

    var connection = new app.config.database;
    
    var jogoModel = app.app.models.JogoModel(connection);
    jogoModel.acao(dadosForm);

}