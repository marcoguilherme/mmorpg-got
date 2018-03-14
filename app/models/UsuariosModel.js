function UsuariosModel(connection){
    connection();
}

UsuariosModel.prototype.inserirUsuario = function(usuario){
    console.log(usuario);
}

module.exports = function(){
    return UsuariosModel;
}