const x = "❌";
const o = "⚽️";

//⚽️⚫ ❤️//

const cuadrados = document.querySelectorAll(".cuadrado");
const modal = document.querySelector("dialog");
const textoModal = modal.querySelector("h2");
let estadoJuego = "P1" 

function addClass(e) {
    const element= e.target;
    element.classList.add("x")
    console.log(element);
}

function addClass(e) {
	const element= e.target;
    element.classList.add("o")
    console.log(element);
}

document.querySelector(".cuadrado").addEventListener("click", addClass);


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
        tablero[0] === tablero[2] &&
        tablero[0] === tablero[3])
        return ([0, 1, 2, 3]);

    if(tablero[4] && 
        tablero[4] === tablero[5] && 
        tablero[4] === tablero[6] &&
        tablero[4] === tablero[7])
        return ([4, 5, 6, 7]);

    if(tablero[8] && 
        tablero[8] === tablero[9] && 
        tablero[8] === tablero[10] &&
        tablero[8] === tablero[11])
        return ([8, 9, 10, 11]);

    if(tablero[12] && 
        tablero[12] === tablero[13] && 
        tablero[12] === tablero[14] &&
        tablero[12] === tablero[15])
        return ([12, 13, 14, 15]);
        
    //verticales

    if(tablero[0] && 
        tablero[0] === tablero[4] && 
        tablero[0] === tablero[8] &&
        tablero[0] === tablero[12])
        return ([0, 4, 8, 12]);

    if(tablero[1] && 
        tablero[1] === tablero[5] && 
        tablero[1] === tablero[9] &&
        tablero[1] === tablero[13])
        return ([1, 5, 9, 13]);

    if(tablero[2] && 
        tablero[2] === tablero[6] && 
        tablero[2] === tablero[10] &&
        tablero[2] === tablero[14])
        return ([2, 6, 10, 14]);

    if(tablero[3] && 
        tablero[3] === tablero[7] && 
        tablero[3] === tablero[11] &&
        tablero[3] === tablero[15])
        return ([3, 7, 11, 15]);
        

    //  oblicuas
    if(tablero[0] && 
        tablero[0] === tablero[5] && 
        tablero[0] === tablero[10] &&
        tablero[0] === tablero[15]) 
        return [0,5,10,15];
    
    if(tablero[3] && 
        tablero[3] === tablero[6] && 
        tablero[3] === tablero[9] &&
        tablero[3] === tablero[12]) 
        return [3,6,9,12];
   
//Reviso empate
        if(tablero.includes("")) return false;
        return "empate";

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