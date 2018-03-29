module.exports = function(app){
    app.get('/jogo', (req, res)=>{
        app.app.controllers.jogo.index(app, req, res);
    })
    app.get('/sair', (req, res)=>{
        app.app.controllers.jogo.sair(app, req, res);
    })
    app.get('/suditos', (req, res)=>{
        app.app.controllers.jogo.suditos(app, req, res);
    })
    app.get('/pergaminhos', (req, res)=>{
        app.app.controllers.jogo.pergaminhos(app, req, res);
    })
    app.post('/ordernar_acao_sudito', (req, res)=>{
        app.app.controllers.jogo.ordernar_acao_sudito(app, req, res);
    })
    app.get('/revogar_ordem', (req, res)=>{
        app.app.controllers.jogo.revogar_ordem(app, req, res);
    })
}