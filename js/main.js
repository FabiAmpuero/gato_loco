/**
 * Created by gerson on 10/03/17.
 */
$(document).ready(init);

var currentSection = null;

function init()
{
	currentSection = $('#saludo');
	$('#btn-saludo').click(onClickBtnSaludo);
	$('#btn-nombres').click(onClickBtnNombre);
    $('#btn-nombres').click(onClickBtnJuego);
    $('#btn-historial').click(onClickBtnHistorial);
    
    $("#lista-juegos").on("click","button",onClickBtnItemJuego);
    $("#btn-comentar").click(onClickBtnComentar);

	TweenMax.from($('#saludo h1'), 1, {marginBottom:'0px', ease:Elastic.easeOut});
}

function onClickBtnItemJuego(){
    var idGame = $(this).parent().data("id");
    //getSingleGame(idGame);
    
    gotoSection("historial-detalle");
    getComentarios(idGame);
    currentGameId = idGame;
}


function onClickBtnSaludo() {
	gotoSection('nombres');
}

function onClickBtnNombre() {
	gotoSection('juego');
}

function onClickBtnJuego() {
	gotoSection('juego');
    var jugador1=document.getElementById("jugador1");
    var jugador2=document.getElementById("jugador2");
    localStorage.setItem('nombre_1',jugador1.value);
    localStorage.setItem('nombre_2',jugador2.value);
    generarAleatorio();
}

function onClickBtnHistorial(evt) {
    evt.preventDefault();
	gotoSection('historial');
    getHistorial();
}

function getHistorial(){
    $.ajax({
        url:"http://test-ta.herokuapp.com/games"
    }).success(function(_data){
        dibujarHistorial(_data);
    });
}

function getSingleGame(_idGame){
    $.ajax({
        //por defecto es get
        url:"http://test-ta.herokuapp.com/games/"+_idGame,
        type: "GET"
    }).success(function(_data){
        console.log(_data);
    })
}

function dibujarHistorial(_datos) {
    var lista=$("#lista-juegos");
    for(var i in _datos){
        var datosId = _datos[i].id;
        var nombreGanadores = "<li data-id='"+ _datos[i].id +"' class='list-group-item'>Ganador: "+_datos[i].winner_player+"<button class='btn'>Comentar</button></li>";
        lista.append(nombreGanadores);
    }
}

function onClickBtnComentar() {
    var name= $("#name");
    var content = $("#content");
    
    var mensaje= $("#alert");
    if(name.val()!=""){
        mensaje.html("Tu comentario ha sido agregado exitosamente");
        enviarComentario(currentGameId,name.val(),content.val());
    }
    else{
        mensaje.html("Comentario inválido");
    }
    name.val("");
    content.val("");
}

function getComentarios(_idGame){
    $.ajax({
        //por defecto es get
        url:"http://test-ta.herokuapp.com/games/"+_idGame+"/comments",
        type: "GET"
    }).success(function(_data){
        console.log(_data);
        dibujarComentarios(_data);
    })
}

function dibujarComentarios(_datos) {
    var lista = $("#lista-comentarios");
    lista.empty();
    for(var i in _datos){
        var html = "<li class='list-group-item'>"+_datos[i].name+" dice: <p>"+_datos[i].content+"</p></li>";
        lista.append(html);
    }
}

function enviarComentario(_idGame, _name, _content) {
    $.ajax({
        url:"http://test-ta.herokuapp.com/games/"+_idGame+"/comments",
        type: "POST",
        data:{comment:{name:_name, content:_content, game_id:_idGame}}
    }).success(function(_data){
        console.log(_data);
        getComentarios(_idGame);
    });
}

function gotoSection(_identificadorDeSeccion)
{
	currentSection.removeClass('visible');
	var nextSection = $('#'+_identificadorDeSeccion);

	nextSection.addClass('visible');

	//TweenMax.from(nextSection, 1, {scale:0.2, opacity:0, ease:Elastic.easeOut});
	currentSection = nextSection;
}