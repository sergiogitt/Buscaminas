let tamanyo_tablero=7;
let array_tablero=[];
let minas=4;
let jugando=false;
let intervaloID;
window.onload=generarTablero(5,5);

function generarTablero(){
    const tablero = document.getElementById('tablero');
    tablero.innerHTML="";
    let reloj=document.getElementById("reloj");
    reloj.innerHTML="000";
    clearInterval(intervaloID)
    jugando=false;
    array_tablero=[];
    let imagen_estado=document.getElementById("icono_estado");
    imagen_estado.src="happy.png";
    for (let i = 0; i < tamanyo_tablero; i++) {
        let fila_nueva=[];
        const fila = document.createElement('tr');
        for (let j = 0; j < tamanyo_tablero; j++) {
        const columna = document.createElement('td');
        const boton = document.createElement('button');
        fila_nueva.push("")
        
        boton.innerText = ``;
        boton.id = `boton-${i}-${j}`;
        boton.classList="activo";
        columna.appendChild(boton);
        fila.appendChild(columna)
        boton.setAttribute('onclick', `abrirCasilla(${i},${j})`);
        }
        array_tablero.push(fila_nueva)
        tablero.appendChild(fila);
        
    }
    generarMinas(minas);
    generarNumeros();
    controlClickDerecho();
    setContadorDeMinas(minas);
    console.log(array_tablero)
}
function comprobarGanador(){
    let contadorCasillas=minas;
    console.log("compronbndo")
    for (let i=0;i<tamanyo_tablero;i++){
        
        for (let j=0;j<tamanyo_tablero;j++){
            let casilla=document.getElementById(`boton-${i}-${j}`);
            if(casilla.classList.contains('inactivo')){
                contadorCasillas++;
            }
        }
    }
    if(contadorCasillas==tamanyo_tablero*tamanyo_tablero){
        console.log("ganas");
        finalizarJuego();
    }
}
function finalizarJuego(){
    clearInterval(intervaloID);
    for (let i=0;i<tamanyo_tablero;i++){
        
        for (let j=0;j<tamanyo_tablero;j++){
            let casilla=document.getElementById(`boton-${i}-${j}`);
            casilla.removeAttribute('onclick')
        }
    }
    lanzarConfeti()

}
function lanzarConfeti(){
    var count = 200;
var defaults = {
  origin: { y: 0.7 }
};

function fire(particleRatio, opts) {
  confetti(Object.assign({}, defaults, opts, {
    particleCount: Math.floor(count * particleRatio)
  }));
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});
fire(0.2, {
  spread: 60,
});
fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8
});
fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2
});
fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}
function setContadorDeMinas(numero){
    let selectorNumero=document.getElementById("numero_minas")
    let minasFormateados = numero.toString().padStart(3, "0");
    selectorNumero.innerHTML=minasFormateados;


}
function abrirCasilla(fila,columna){
    if(!jugando){
        jugando=true;
        intervaloID=setInterval(comenzarReloj,1000)
    }
    let casilla=document.getElementById(`boton-${fila}-${columna}`);
    casilla.removeAttribute('onclick');
    casilla.classList.remove('activo');
    casilla.classList="inactivo";
    var imagen = casilla.querySelector('img');

    // Verifica si existe una imagen dentro de la casilla
    if (imagen) {
      // Elimina la imagen
      imagen.parentNode.removeChild(imagen);
    }
    
    let contenido = document.createTextNode(array_tablero[fila][columna]);
    if (array_tablero[fila][columna] === 0) {
        contenido = document.createTextNode(" "); // Cambia el contenido a un espacio en blanco
    }
    
    if (array_tablero[fila][columna] === "*") {
        contenido = document.createTextNode(""); // Cambia el contenido a un espacio en blanco
        mostrarMinas();
        clearInterval(intervaloID)
        jugando=false;
        
    }else{
        comprobarGanador()
    }
    switch(array_tablero[fila][columna]){
        case 1:
            casilla.classList.add("blue");
            break;
        case 2:
            casilla.classList.add("green");
            break;
        case 3:
            casilla.classList.add("red");
            break;
        case 3:
            casilla.classList.add("cuatro");
            break;
        case "*":
            casilla.classList.add("flexible-boton");
            casilla.classList.add("mina-perder");
            const imagen = document.createElement("img");

            // Establece el atributo src de la imagen con la ruta de la imagen
            imagen.src = "mina.png"; // Reemplaza con la ruta de tu imagen
          
            // Agrega la imagen como hijo del botón
            casilla.appendChild(imagen);
            break;

    }
    casilla.appendChild(contenido);

    if(array_tablero[fila][columna]==0){
        recorrerVecinos(fila,columna)
    }
    
}

function comenzarReloj() {
    let reloj = document.getElementById("reloj");
    let segundos = parseFloat(reloj.textContent);
    segundos++;
    let segundosFormateados = segundos.toString().padStart(3, "0");
    reloj.innerHTML = segundosFormateados;
  }
function mostrarMinas(){
    for (let i=0;i<tamanyo_tablero;i++){
        
        for (let j=0;j<tamanyo_tablero;j++){
           
            let casilla=document.getElementById(`boton-${i}-${j}`);
                
            if (array_tablero[i][j]=="*"&&casilla.classList.contains("activo")){
                //abrirCasilla(i,j);
                casilla.removeAttribute('onclick');
                casilla.classList.remove('activo');
                casilla.classList="inactivo";
                casilla.classList.add("flexible-boton");
                var imagenBandera = casilla.querySelector('img');

                // Verifica si existe una imagen dentro de la casilla
                if (imagenBandera) {
                // Elimina la imagen
                imagenBandera.parentNode.removeChild(imagenBandera);
                }
                const imagen = document.createElement("img");
    
                // Establece el atributo src de la imagen con la ruta de la imagen
                imagen.src = "mina.png"; // Reemplaza con la ruta de tu imagen
              
                // Agrega la imagen como hijo del botón
                casilla.appendChild(imagen);
                let imagen_estado=document.getElementById("icono_estado");
                imagen_estado.src="death.png";
            }else{
                casilla.removeAttribute('onclick');

            }
                

            
        }
        
    }
}
function recorrerVecinos(fila,columna){    
    let i=0;
    let j=0;
         for (i=fila-1;i<=fila+1;i++){
             if (i>=0&&i<tamanyo_tablero){
                 for ( j=columna-1;j<=columna+1;j++){
                     if ((j>=0&&j<tamanyo_tablero)&&!(columna==j&&fila==i)){
                         
                         let casilla=document.getElementById(`boton-${i}-${j}`);
                         
                         if (array_tablero[i][j]!="*"&&casilla.classList.contains("activo")){
                             abrirCasilla(i,j);
                         }else{
                            
                         }
                         
 
                     }
                 }
             }
         }
         
     
 }
function generarMinas(minas){
    numMinas=0;
    while(numMinas<minas){
        const fila = Math.floor(Math.random() * tamanyo_tablero );
        const columna = Math.floor(Math.random() * tamanyo_tablero );
        if(array_tablero[fila][columna]==""){
            array_tablero[fila][columna]="*";
            numMinas++;
        }


    }
}
function generarNumeros(){
    for (let i = 0; i < tamanyo_tablero; i++) {
        
        for (let j = 0; j < tamanyo_tablero; j++) {
            if(array_tablero[i][j]!="*"){
                array_tablero[i][j]=contarMinasVecinas(i,j)
            }

        }
    }
}
function contarMinasVecinas( fila,  columna) {
    numeroMinas=0;
    if(fila>=0&&fila<array_tablero.length&&columna>=0&&columna<array_tablero[0].length){
        for ( i=fila-1;i<=fila+1;i++){
            if (i>=0&&i<array_tablero.length){
                for ( j=columna-1;j<=columna+1;j++){
                    if ((j>=0&&j<array_tablero[i].length)&&(!(fila==i&&columna==j))){
                        if (array_tablero[i][j]=="*"){
                            numeroMinas++;
                        }

                    }
                }
            }
        }
    }
    return numeroMinas;
}
function colocarBandera(event,idCasilla){
    event.preventDefault();
    
    let casilla=document.getElementById(idCasilla)
    if(casilla.innerHTML==""){
        casilla.innerHTML='<img src="bandera.png" alt="Bandera">';
        let numeroMinas=document.getElementById("numero_minas").textContent;
        numeroMinas--,
        setContadorDeMinas(numeroMinas)

    }else{
        casilla.innerHTML='';
        let numeroMinas=document.getElementById("numero_minas").textContent;
        numeroMinas++,
        setContadorDeMinas(numeroMinas)
    }
    console.log("pulsando derevho"+i);
}
function controlClickDerecho(){
    var casillasActivas = document.getElementsByClassName("activo");
console.log(casillasActivas);
// Iterar sobre cada elemento con la clase "activo" y agregar un evento
for (var i = 0; i < casillasActivas.length; i++) {
    var casillaTablero = casillasActivas[i];
    let idCasilla = casillaTablero.getAttribute("id");
    casillaTablero.addEventListener("contextmenu", function(event) {
      colocarBandera(event, idCasilla);
    });
  }
  
}
