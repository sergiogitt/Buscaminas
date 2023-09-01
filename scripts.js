let tamanyo_tablero=5;
let array_tablero=[];
const filas = 5;
const columnas = 5;

function generarTablero(minas,tamanyo){
    const tablero = document.getElementById('tablero');
    for (let i = 0; i < filas; i++) {
        let fila_nueva=[];
        for (let j = 0; j < columnas; j++) {
        const boton = document.createElement('button');
        fila_nueva.push("")
       
        boton.innerText = ``;
        boton.id = `boton-${i}-${j}`;
        tablero.appendChild(boton);

        boton.addEventListener('click', function() {
            alert(`Has hecho clic en el botón ${i + 1}-${j + 1}`);
        });
        }
        array_tablero.push(fila_nueva)
        // Agrega un salto de línea después de cada fila (opcional)
        const br = document.createElement('br');
        tablero.appendChild(br);
        console.log(array_tablero)
    }
    generarMinas(5);
   generarNumeros();
    console.log(array_tablero)
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