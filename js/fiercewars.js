const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionReiniciar = document.getElementById("reiniciar")
const botonMascotaJugador = document.getElementById("boton-seleccionarmascota")
const botonReiniciar = document.getElementById("boton-reiniciar")
const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")
const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")
const contenedorSelectores = document.getElementById("contenedor-selectores")
const pNombreMascotaJugador = document.getElementById("nombremascotajugador")
const pNombreMascotaEnemigo = document.getElementById("nombremascotaenemigo")
const pResultado = document.getElementById("resultado")
const divAtaques = document.getElementById("contenedor-ataques")
const ataqueJugador = document.getElementById("ataque-jugador")
const ataqueEnemigo = document.getElementById("ataque-enemigo")
const pVictoriasMascotaJugador = document.getElementById("victoriasmascotajugador")
const pVictoriasMascotaEnemigo = document.getElementById("victoriasmascotaenemigo")
const anchoMaximoMapa = 500

let mascotas = []
let opcionesMascotas
let inputC  
let inputP
let inputW
let ataquesMascotas 
let jugadorAtaques = []
let enemigoAtaques = []
let ataquesMascotaEnemigo = []
let botonFuego
let botonAgua
let botonTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let mascotaJugador
let mascotaJugadorObjeto
let victoriasJugador = 0
let victoriasEnemigo = 0
let intervalo
let lienzo = mapa.getContext("2d")
let mapaBackground = new Image()
let largoRequerido
let anchoDePantalla = window.innerWidth - 20

if (anchoDePantalla > anchoMaximoMapa) {
    anchoDePantalla = anchoMaximoMapa - 40
}

largoRequerido = anchoDePantalla * 600 / 800

mapa.width = anchoDePantalla
mapa.height = largoRequerido

class Mascota {
    constructor(nombre, imagen, vida, mascotaMapa) {
        this.nombre = nombre
        this.imagen = imagen
        this.vida = vida
        this.mascotaMapa = new Image()
        this.mascotaMapa.src = mascotaMapa
        this.mascotaMapaAncho = 70
        this.mascotaMapaLargo = 70
        this.x = aleatorio(0, mapa.width - this.mascotaMapaAncho)
        this.y = aleatorio(0, mapa.height - this.mascotaMapaLargo)
        this.velocidadX = 0
        this.velocidadY = 0
        this.ataques = []
    }

    pintarMascota() {
        lienzo.drawImage(
            this.mascotaMapa,
            this.x,
            this.y,
            this.mascotaMapaAncho,
            this.mascotaMapaLargo
        )
    }
}

let cubisaurio = new Mascota('Cubisaurio', './assets/Cubisaurio.png', 3, './assets/Cubi_C3.png')
let pennysaurio = new Mascota('Pennysaurio', './assets/Pennysaurio.png', 3, './assets/Penny_C3.png')
let wilsonsaurio = new Mascota('Wilsonsaurio', './assets/Wilsonsaurio.png', 3, './assets/Wilson_C3.png')

let cubisaurioEnemigo = new Mascota('Cubisaurio', './assets/Cubisaurio.png', 3, './assets/Cubi_C3.png')
let pennysaurioEnemigo = new Mascota('Pennysaurio', './assets/Pennysaurio.png', 3, './assets/Penny_C3.png')
let wilsonsaurioEnemigo = new Mascota('Wilsonsaurio', './assets/Wilsonsaurio.png', 3, './assets/Wilson_C3.png')

cubisaurio.ataques.push(
    {nombre: 'Agua 💧', id: 'boton-agua'},
    {nombre: 'Agua 💧', id: 'boton-agua'},
    {nombre: 'Agua 💧', id: 'boton-agua'},
    {nombre: 'Fuego 🔥', id: 'boton-fuego'},
    {nombre: 'Tierra 🌱', id: 'boton-tierra'},
)

cubisaurioEnemigo.ataques.push(
    {nombre: 'Agua 💧', id: 'boton-agua'},
    {nombre: 'Agua 💧', id: 'boton-agua'},
    {nombre: 'Agua 💧', id: 'boton-agua'},
    {nombre: 'Fuego 🔥', id: 'boton-fuego'},
    {nombre: 'Tierra 🌱', id: 'boton-tierra'},
)

pennysaurio.ataques.push(
    {nombre: 'Tierra 🌱', id: 'boton-tierra'},
    {nombre: 'Tierra 🌱', id: 'boton-tierra'},
    {nombre: 'Tierra 🌱', id: 'boton-tierra'},
    {nombre: 'Agua 💧', id: 'boton-agua'},
    {nombre: 'Fuego 🔥', id: 'boton-fuego'},
)

pennysaurioEnemigo.ataques.push(
    {nombre: 'Tierra 🌱', id: 'boton-tierra'},
    {nombre: 'Tierra 🌱', id: 'boton-tierra'},
    {nombre: 'Tierra 🌱', id: 'boton-tierra'},
    {nombre: 'Agua 💧', id: 'boton-agua'},
    {nombre: 'Fuego 🔥', id: 'boton-fuego'},
)

wilsonsaurio.ataques.push(
    {nombre: 'Fuego 🔥', id: 'boton-fuego'},
    {nombre: 'Fuego 🔥', id: 'boton-fuego'},
    {nombre: 'Fuego 🔥', id: 'boton-fuego'},
    {nombre: 'Agua 💧', id: 'boton-agua'},
    {nombre: 'Tierra 🌱', id: 'boton-tierra'},
)

wilsonsaurioEnemigo.ataques.push(
    {nombre: 'Fuego 🔥', id: 'boton-fuego'},
    {nombre: 'Fuego 🔥', id: 'boton-fuego'},
    {nombre: 'Fuego 🔥', id: 'boton-fuego'},
    {nombre: 'Agua 💧', id: 'boton-agua'},
    {nombre: 'Tierra 🌱', id: 'boton-tierra'},
)

mascotas.push(cubisaurio, pennysaurio, wilsonsaurio)

function reiniciarJuego() {
    location.reload()
}

function iniciarJuego() {   
    sectionSeleccionarAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    mascotas.forEach((mascota) => {
        opcionesMascotas = `
        <input type="radio" name="mascota" id=${mascota.nombre} />
        <label for=${mascota.nombre} class="selector-mascota">
            <p>${mascota.nombre}</p>
            <img src=${mascota.imagen} alt=${mascota.nombre}>
        </label>
        `
    contenedorSelectores.innerHTML += opcionesMascotas
    
    inputC = document.getElementById("Cubisaurio")
    inputP = document.getElementById("Pennysaurio")
    inputW = document.getElementById("Wilsonsaurio")
    })
    
    botonMascotaJugador.addEventListener('click', selccionarMascotaJugador)
    
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function selccionarMascotaJugador() {   
    sectionSeleccionarMascota.style.display = 'none'
    
    if(inputC.checked) {
        pNombreMascotaJugador.innerHTML = inputC.id
        mascotaJugador = inputC.id
    } else if(inputP.checked) {
        pNombreMascotaJugador.innerHTML = inputP.id
        mascotaJugador = inputP.id
    } else if(inputW.checked) {
        pNombreMascotaJugador.innerHTML = inputW.id
        mascotaJugador = inputW.id
    } else {
        alert("No haz elegido a tu mascota.\nDebes elegir a una.")
        location.reload()
    }
    
    extraerAtaques(mascotaJugador)

    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function selccionarMascotaEnemigo(enemigo) {
    pNombreMascotaEnemigo.innerHTML = enemigo.nombre

    ataquesMascotaEnemigo = enemigo.ataques

    secuenciaAtaque()
}

function obtenerObjetoMascota(mascotaJugador) {
    for (let i = 0; i < mascotas.length; i++) {
        if (mascotaJugador == mascotas[i].nombre) {
            return mascotas[i]
        } 
    }
}

function pintarEnCanvas() {
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    mapaBackground.src = './assets/fiercemap.png'
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )

    mascotaJugadorObjeto.pintarMascota()

    cubisaurioEnemigo.pintarMascota()
    pennysaurioEnemigo.pintarMascota()
    wilsonsaurioEnemigo.pintarMascota()

    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY

    if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0) {
        limitarMovimieto()
        revisarColision(cubisaurioEnemigo)
        revisarColision(pennysaurioEnemigo)
        revisarColision(wilsonsaurioEnemigo)
    }
}

function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -1
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -1
}

function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 1
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 1
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function teclaPresionada(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break;
        case 'ArrowLeft':
            moverIzquierda()
            break;
        case 'ArrowDown':
            moverAbajo()
            break;
        case 'ArrowRight':
            moverDerecha()
            break;
        default:
            break;
    }
}

function iniciarMapa() {
    mapa.width
    mapa.height

    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)

    intervalo = setInterval(pintarEnCanvas, 10)

    window.addEventListener('keydown', teclaPresionada)

    window.addEventListener('keyup', detenerMovimiento)
}

function limitarMovimieto() {
    if (mascotaJugadorObjeto.x < 0) {
        mascotaJugadorObjeto.x = 0
    }
    if (mascotaJugadorObjeto.y < 0) {
        mascotaJugadorObjeto.y = 0
    }
    if (mascotaJugadorObjeto.x > (mapa.width - mascotaJugadorObjeto.mascotaMapaAncho)) {
        mascotaJugadorObjeto.x = (mapa.width - mascotaJugadorObjeto.mascotaMapaAncho)
    }
    if (mascotaJugadorObjeto.y > (mapa.height - mascotaJugadorObjeto.mascotaMapaLargo)) {
        mascotaJugadorObjeto.y = (mapa.height - mascotaJugadorObjeto.mascotaMapaLargo)
    }
}

function revisarColision(enemigo) {
    const arribaJugador = mascotaJugadorObjeto.y
    const derechaJugador = mascotaJugadorObjeto.x + mascotaJugadorObjeto.mascotaMapaAncho
    const abajoJugador = mascotaJugadorObjeto.y + mascotaJugadorObjeto.mascotaMapaLargo
    const izquierdaJugador = mascotaJugadorObjeto.x

    const arribaEnemigo = enemigo.y
    const derechaEnemigo = enemigo.x + enemigo.mascotaMapaAncho
    const abajoEnemigo = enemigo.y + enemigo.mascotaMapaLargo
    const izquierdaEnemigo = enemigo.x

    if (
        arribaJugador + 15 > abajoEnemigo ||
        derechaJugador - 15 < izquierdaEnemigo ||
        abajoJugador - 15 < arribaEnemigo ||
        izquierdaJugador + 15 > derechaEnemigo
    ) {
        return
    } else {
        alert("Haz encontrado a: " + enemigo.nombre)
        detenerMovimiento()
        clearInterval(intervalo)
        sectionVerMapa.style.display = 'none'
        sectionSeleccionarAtaque.style.display = 'flex'
        selccionarMascotaEnemigo(enemigo)
    }
}

function extraerAtaques(mascotaJugador) {
    let extraido
    for (let i = 0; i < mascotas.length; i++) {
        if (mascotaJugador == mascotas[i].nombre) {
            extraido = mascotas[i].ataques
        } 
    }
    
    mostrarAtaques(extraido)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMascotas = `
        <button id=${ataque.id} class="boton-ataque bAtaque">${ataque.nombre}</button>
        `
        divAtaques.innerHTML += ataquesMascotas
    })
    
    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua")
    botonTierra = document.getElementById("boton-tierra")
    botones = document.querySelectorAll(".bAtaque")
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent == 'Fuego 🔥') {
                jugadorAtaques.push('FUEGO')
                boton.style.background = "#4a22af"
                boton.disabled = true  
            } else if (e.target.textContent == 'Agua 💧') {
                jugadorAtaques.push('AGUA')
                boton.style.background = "#4a22af"
                boton.disabled = true 
            } else if (e.target.textContent == 'Tierra 🌱') {
                jugadorAtaques.push('TIERRA')
                boton.style.background = "#4a22af"
                boton.disabled = true
            }
            ataqueAleatorioEnemigo()
        })
    })
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesMascotaEnemigo.length - 1)

    if (ataquesMascotaEnemigo[ataqueAleatorio].nombre == 'Fuego 🔥') {
        enemigoAtaques.push('FUEGO')
    } else if (ataquesMascotaEnemigo[ataqueAleatorio].nombre == 'Agua 💧') {
        enemigoAtaques.push('AGUA')
    } else if (ataquesMascotaEnemigo[ataqueAleatorio].nombre == 'Tierra 🌱') {
        enemigoAtaques.push('TIERRA')
    }
    iniciarCombate()
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = jugadorAtaques[jugador]
    indexAtaqueEnemigo = enemigoAtaques[enemigo]
}

function combate() {
    for (let index = 0; index < jugadorAtaques.length; index++) {
        if (jugadorAtaques[index] == enemigoAtaques[index]) {
            indexAmbosOponentes(index, index)
            crearMensaje()
        } else if (jugadorAtaques[index] == 'FUEGO' && enemigoAtaques[index] == 'TIERRA') {
            indexAmbosOponentes(index, index)
            crearMensaje()
            victoriasJugador++ 
            pVictoriasMascotaJugador.innerHTML = victoriasJugador
        } else if (jugadorAtaques[index] == 'TIERRA' && enemigoAtaques[index] == 'AGUA') {
            indexAmbosOponentes(index, index)
            crearMensaje()
            victoriasJugador++ 
            pVictoriasMascotaJugador.innerHTML = victoriasJugador
        } else if (jugadorAtaques[index] == 'AGUA' && enemigoAtaques[index] == 'FUEGO') {
            indexAmbosOponentes(index, index)
            crearMensaje()
            victoriasJugador++ 
            pVictoriasMascotaJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponentes(index, index)
            crearMensaje()
            victoriasEnemigo++
            pVictoriasMascotaEnemigo.innerHTML = victoriasEnemigo
        }
    }
    
    revisarVictorias()
}

function iniciarCombate() {
    if (jugadorAtaques.length == 5) {
        combate()
    }
}

function revisarVictorias() {
    if (victoriasJugador == victoriasEnemigo) {
        mensajeFinal("¡FUE UN EMPATE! 😱")
    } else if (victoriasJugador > victoriasEnemigo) {
        mensajeFinal("¡HAZ GANADO! 😄")
    } else if (victoriasEnemigo > victoriasJugador) {
        mensajeFinal("¡HAZ PERDIDO! 😭")
    }
}

function crearMensaje() {   
    let nuevoAtaqueJugador = document.createElement('p')
    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador

    let nuevoAtaqueEnemigo = document.createElement('p')
    nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo

    ataqueJugador.appendChild(nuevoAtaqueJugador)
    ataqueEnemigo.appendChild(nuevoAtaqueEnemigo)
}

function mensajeFinal(resultadoFin) { 
    pResultado.innerHTML = resultadoFin  
    sectionReiniciar.style.display = 'block'

    botones.forEach((boton) => {
        if (boton.disabled == true) {
            boton.style.background = "#07122c"
        }
    })
}

window.addEventListener('load', iniciarJuego)