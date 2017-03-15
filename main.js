var turno ="x";
var turno2="o";
var bandera=1;
var ban=false;
var opciones=new Array(9);

function generarAleatorio(){
    // random
    jugadorUno=localStorage.getItem("nombre_1",jugador1);
    jugadorDos=localStorage.getItem("nombre_2",jugador2);

    var numeroAleatorio=Math.floor((Math.random()*2));
    if(numeroAleatorio==0){
        document.getElementById("div_turno").innerHTML="Turno de "+ jugadorUno;
    }else{
        document.getElementById("div_turno").innerHTML="Turno de "+ jugadorDos;
    }
}

var jugador;

function marcar (id){
   
   var celda =document.getElementById(id);
   if (bandera%2!=0 &&opciones[id]!=0)
       {
           celda.value=turno;
           document.getElementById("div_turno").innerHTML="Turno de "+ jugadorUno;
           opciones[id]=1;
           jugador = jugadorDos;
       }else if(bandera%2==0 && opciones[id]!=1){
           
           celda.value=turno2;
           document.getElementById("div_turno").innerHTML="Turno de "+ jugadorDos;
           opciones[id]=0;
           jugador = jugadorUno;
       }
           bandera++;
           gameWinner(1);
           gameWinner(0);
}

function gameWinner(_option){
   if (opciones[1]==_option && opciones [2]==_option &&opciones[3]==_option){
       alert("felicidades " +jugador+" ganaste");
       
   }else if (opciones[4]==_option && opciones [5]==_option &&opciones[6]==_option){
       alert("felicidades " +jugador+" ganaste");
   }else if (opciones[7]==_option && opciones [8]==_option &&opciones[9]==_option){
       alert("felicidades " +jugador+" ganaste");
   }else if (opciones[1]==_option && opciones [5]==_option &&opciones[9]==_option){
       alert("felicidades " +jugador+" ganaste");
   }else if (opciones[3]==_option && opciones [5]==_option &&opciones[7]==_option){
       alert("felicidades "+jugador+ " ganaste");
   }else if (opciones[1]==_option && opciones [4]==_option &&opciones[7]==_option){
       alert("felicidades " +jugador+" ganaste");
   }else if (opciones[2]==_option && opciones [5]==_option &&opciones[8]==_option){
       alert("felicidades " +jugador+" ganaste");
   }else if (opciones[3]==_option && opciones [6]==_option &&opciones[9]==_option){
       alert("felicidades " +jugador+" ganaste");
   }
}

   
function reiniciar(){
   location.reload();
} 

    
    
    
    
    
    
    
    