
const x = "❌";
const o = "⚫";


const cuadrados = document.querySelectorAll(".cuadrado");
const modal = document.querySelector("dialog");
const textoModal = modal.querySelector("h2");
let estadoJuego = "P1" 

cuadrados.forEach((cuadrado, posicion) =>{
    cuadrado.addEventListener("click", ()=>{
        if(estadoJuego === "PAUSA") return;
        if(cuadrado.textContent !== "") return;
        cuadrado.textContent = estadoJuego === "P1" ? x : o;
        estadoJuego = estadoJuego === "P1" ? "P2" : "P1";
        const posicionGanadora = revisarSiHayGanador();
        console.log(typeof posicionGanadora)
        if(typeof posicionGanadora === "object") {
            ganar(posicionGanadora)
            return
        };
        if (posicionGanadora === "empate"){
            mostrarModal("Empate")
        }
    })
})

modal.querySelector("button").addEventListener("click", ()=>{
    cuadrados.forEach(cuadrado => {
        cuadrado.textContent = "";
        cuadrado.classList.toggle("ganador",false);
    });
    modal.close();
    estadoJuego = "P1";
})

function revisarSiHayGanador(){
    const tablero = Array.from(cuadrados).map(cuadrado => cuadrado.textContent);
    console.log(tablero)

    // filas
    if(tablero[0] && 
        tablero[0] === tablero[1] && 
        tablero[0] === tablero[2])
        return ([0, 1, 2]);

    if(tablero[3] && 
        tablero[3] === tablero[4] && 
        tablero[3] === tablero[5])
        return ([3, 4, 5]);

    if(tablero[6] && 
        tablero[6] === tablero[7] && 
        tablero[6] === tablero[8])
        return ([6, 7, 8]);
        
//verticales

    if(tablero[0] && 
        tablero[0] === tablero[3] && 
        tablero[0] === tablero[6])
        return ([0, 3, 6]);

    if(tablero[1] && 
        tablero[1] === tablero[4] && 
        tablero[1] === tablero[7])
        return ([1, 4, 7]);

    if(tablero[2] && 
        tablero[2] === tablero[5] && 
        tablero[2] === tablero[8])
        return ([2, 5, 8]);
        

    //  oblicuas
    if(tablero[0] && 
        tablero[0] === tablero[4] && 
        tablero[0] === tablero[8]) 
        return [0,4,8];
    
    if(tablero[2] && 
        tablero[2] === tablero[4] && 
        tablero[2] === tablero[6]) 
        return [2,4,6];
   
}
// Marco las posiciones ganadoras y muestro el modal de victoria
function ganar(posicionesGanadoras){
    console.log(posicionesGanadoras)
    posicionesGanadoras.forEach(posicion => cuadrados[posicion].classList.toggle("ganador",true));
    mostrarModal("Ganador jugador " + (estadoJuego === "P1" ? "2" : "1"));
}

function mostrarModal(texto){
    textoModal.innerText = texto;
    modal.showModal();
    estadoJuego = "PAUSA";
}