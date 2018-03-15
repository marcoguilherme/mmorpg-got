module.exports = function(app){
    app.get('/jogo', (req, res)=>{
        app.app.controllers.jogo.index(app, req, res)
    })
    app.get('/sair', (req, res)=>{
        app.app.controllers.jogo.sair(app, req, res)
    })
}