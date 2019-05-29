const gc = document.getElementById('gc')
const ctx = gc.getContext('2d')
//const socket = io('http://localhost:3000')
const socket = io('https://tronserv.herokuapp.com')

// // Get the device pixel ratio, falling back to 1.
// let dpr = window.devicePixelRatio || 1;
// // Get the size of the canvas in CSS pixels.
// let rect = gc.getBoundingClientRect();
// // Give the canvas pixel dimensions of their CSS
// // size * the device pixel ratio.
// gc.width = rect.width * dpr;
// gc.height = rect.height * dpr;
// ctx.scale(dpr, dpr);

const DEG_TO_RAD = 0.0174533
const FPS = 60
const DT = 1000 / FPS

let ww
let wh
let scale

let C_FG = "#FFFFFF"
let C_BG = "#101010"

let frameGradient
let frameSize = 0.005

function resize () {
    ww = gc.clientWidth
    wh = gc.clientHeight
    scale = Math.min(ww, wh)

    gc.width = ww
    gc.height = wh

    frameGradient = ctx.createLinearGradient(0, 0, ww/8, wh)
    frameGradient.addColorStop(0, "#ff48c4")
    frameGradient.addColorStop(0.7, "#2bd1fc")
    frameGradient.addColorStop(1, "#f3ea5f")
}

window.addEventListener('resize', resize)
window.setInterval(loop, DT)

resize()
setupConnection()

function loop () {
    update()
    draw()
}

function setupConnection () {
    socket.on('connection', data => {
        console.log(data)
    })
    socket.on('state', data => {
        console.log(data)
    })
}

function update () {

}

function draw () {
    ctx.fillStyle = frameGradient
    ctx.fillRect(0, 0, ww, wh)
    ctx.fillStyle = C_BG
    ctx.fillRect(
        scale * frameSize,
        scale * frameSize,
        scale - ((scale * frameSize) * 2),
        scale - ((scale * frameSize) * 2),
    )
}