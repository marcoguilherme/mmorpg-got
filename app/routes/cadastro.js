module.exports = function(app){
    app.get('/cadastro', function(req, res) {
        app.app.controllers.cadastro.index(app, req, res);
    })

    app.post('/cadastrar', function(req, res){
        app.app.controllers.cadastro.cadastrar(app, req, res);
    })
}