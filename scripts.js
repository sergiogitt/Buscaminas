let tamanyo_tablero=5;
let array_tablero=[];
const filas = 5;
const columnas = 5;

function generarTablero(minas,tamanyo){
    const tablero = document.getElementById('tablero');
    for (let i = 0; i < filas; i++) {
        let fila_nueva=[];
        const fila = document.createElement('tr');
        for (let j = 0; j < columnas; j++) {
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
        // Agrega un salto de línea después de cada fila (opcional)
        tablero.appendChild(fila);
        
    }
    generarMinas(5);
    generarNumeros();
    console.log(array_tablero)
}
function abrirCasilla(fila,columna){
    console.log("abirendo "+fila+ columna)
    let casilla=document.getElementById(`boton-${fila}-${columna}`);
    casilla.removeAttribute('onclick');
    casilla.classList.remove('activo');
    casilla.classList="inactivo";
    
    let contenido=document.createTextNode(array_tablero[fila][columna]);
    casilla.appendChild(contenido)
    console.log(contenido)
    if(array_tablero[fila][columna]==0){
        console.log("recorro vecinas")
        recorrerVecinos(fila,columna)

    }
    
}
function recorrerVecinos(fila,columna){
    
    if(fila>=0&&fila<array_tablero.length&&columna>=0&&columna<array_tablero[0].length){
        for ( i=fila-1;i<=fila+1;i++){
            if (i>=0&&i<array_tablero.length){
                for ( j=columna-1;j<=columna+1;j++){
                    if ((j>=0&&j<array_tablero[i].length)&&(!(fila==i&&columna==j))){
                        console.log(array_tablero[i][j])
                        let casilla=document.getElementById(`boton-${i}-${j}`);
                        if (array_tablero[i][j]==0&&casilla.classList.contains("activo")){
                            abrirCasilla(i,j);
                            console.log("abro mas vecinas")
                        }

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
    console.log(array_tablero)
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
window.onload=generarTablero(10,2);