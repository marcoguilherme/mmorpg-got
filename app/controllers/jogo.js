module.exports.index = function(app, req, res){
    if(req.session.autenticado !== true){
        res.render('index', { validacao :{}})
        return;
    }

    res.render('jogo', {img_casa : req.session.casa});
}

module.exports.sair = function(app, req, res){
    req.session.destroy((err)=>{
        res.render('index', {validacao : {}})
    })
}