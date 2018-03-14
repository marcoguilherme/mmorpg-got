module.exports = function(app){
    app.get('/jogo', (req, res)=>{
        app.app.controllers.jogo.index(app, req, res)
    })
}