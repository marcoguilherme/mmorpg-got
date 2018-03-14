module.exports.index = function(app, req, res){
    res.render('cadastro', { validacao : "", dadosForm : ""});
}

module.exports.cadastrar = function(app, req, res){
    
    var dadosForm = req.body;

    req.assert('nome', 'Nome nao pode ser vazio').notEmpty();
    req.assert('usuario', 'Usuario nao pode ser vazio').notEmpty();
    req.assert('senha', 'Senha nao pode ser vazia').notEmpty();
    req.assert('casa', 'Casa nao pode estar vazia').notEmpty()

    var errors = req.validationErrors();

    if(errors){
        res.render('cadastro', { validacao : errors, dadosForm: dadosForm })
        return
    }

    var connection = app.config.database;
    var usuariosModel = new app.app.models.UsuariosModel;
    usuariosModel.inserirUsuario(dadosForm);

    res.send('Cadastro efetuado com sucesso');
}