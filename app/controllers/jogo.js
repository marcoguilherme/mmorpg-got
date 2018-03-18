module.exports.index = function(app, req, res){
    
    if(req.session.autenticado !== true){
        res.render('index', { validacao :{}})
        return;
    }

    var msg = '';

    if(req.query.msg !== ''){
        msg = req.query.msg;
    }

    var usuario = req.session.usuario;
    var connection = app.config.database;
    
    var jogoModel = new app.app.models.JogoModel(connection);
    jogoModel.iniciaJogo(usuario, req, res, msg);

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
        res.redirect('jogo?msg=1');
        return;
    }

    var connection = app.config.database;
    
    var jogoModel = new app.app.models.JogoModel(connection);
    dadosForm.usuario = req.session.usuario;
    jogoModel.acao(dadosForm);

    res.redirect('jogo?msg=2');

}