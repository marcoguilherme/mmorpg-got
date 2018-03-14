module.exports.index = function(app, req, res){
    if(req.session.autenticado){
        res.render('jogo');
    }else{
        res.render('index', { validacao :{}})
    }
}

module.exports.sair = function(app, req, res){
    req.session.destroy((err)=>{
        res.render('index', {validacao : {}})
    })
}