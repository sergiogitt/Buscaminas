let tamanyo_tablero=7;
let array_tablero=[];
let minas=4;

function generarTablero(minas,tamanyo){
    const tablero = document.getElementById('tablero');
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
    
    console.log(array_tablero)
}
function abrirCasilla(fila,columna){
    let casilla=document.getElementById(`boton-${fila}-${columna}`);
    casilla.removeAttribute('onclick');
    casilla.classList.remove('activo');
    casilla.classList="inactivo";
    
    let contenido = document.createTextNode(array_tablero[fila][columna]);
    if (array_tablero[fila][columna] === 0) {
        contenido = document.createTextNode(" "); // Cambia el contenido a un espacio en blanco
    }
    if (array_tablero[fila][columna] === "*") {
        contenido = document.createTextNode(""); // Cambia el contenido a un espacio en blanco
        mostrarMinas();
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
    console.log(contenido)
    casilla.appendChild(contenido);

    if(array_tablero[fila][columna]==0){
        recorrerVecinos(fila,columna)
    }
    
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
                const imagen = document.createElement("img");
    
                // Establece el atributo src de la imagen con la ruta de la imagen
                imagen.src = "mina.png"; // Reemplaza con la ruta de tu imagen
              
                // Agrega la imagen como hijo del botón
                casilla.appendChild(imagen);
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
window.onload=generarTablero(5,5);