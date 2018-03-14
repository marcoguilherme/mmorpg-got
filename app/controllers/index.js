module.exports.index = function(app, req, res){
    res.render('index', { validacao : {} });
}

module.exports.autenticar = function(app, req, res){
    
    var dadosForm = req.body;

    req.assert('usuario', 'Campo usuario nao pode ser vazio').notEmpty();
    req.assert('senha', 'Campo senha nao pode ser vazio').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        res.render('index', { validacao : errors });
        return;
    }

    var connection = app.config.database;
    var UsuariosModel = new app.app.models.UsuariosModel(connection);

    UsuariosModel.autenticarUsuario(dadosForm,req, res);

}