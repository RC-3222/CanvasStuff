import myMusic from "./myMusic.js";

const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d');

const cont = document.querySelector('.canvas-cont')
const begCoords = cont.getBoundingClientRect()

canvas.height = begCoords.height;
canvas.width = begCoords.width;


const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
        const [{inlineSize: width, blockSize: height}] = entry.borderBoxSize;

        canvas.height = height;
        canvas.width = width;

    }
})
resizeObserver.observe(cont)
/*
let myAudio = new Audio("data:audio/mp3;base64," + myMusic)

myAudio.addEventListener('playing', function (ev) {
    console.log('audio started playing')
})
myAudio.addEventListener('ended', function (ev) {
    console.log('audio ended')
})*/


//const audioCtx = new (window.AudioContext || window.webkitAudioContext) ()

const audioCtx = new window.AudioContext()

let audioSrc;
let analyser;


const myAudio = document.getElementById('audio1')
//myAudio.src = "data:audio/mp3;base64," + myMusic;
myAudio.src = "./audio/sabatonStuff.mp3";

let currentAnimFrame;

myAudio.addEventListener('playing', function (ev) {
    console.log('audio started playing')
    animate()
})
myAudio.addEventListener('ended', function (ev) {
    console.log('audio ended')
    cancelAnimationFrame(currentAnimFrame)
})

audioSrc = audioCtx.createMediaElementSource(myAudio)
analyser = audioCtx.createAnalyser() // for getting 'frequency and time' data
audioSrc.connect(analyser)
analyser.connect(audioCtx.destination)
analyser.fftSize = 64;

const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength) // can contain only unsigned 8-bit integers

const barWidth = canvas.width / bufferLength
let barHeight;
let x;

function animate() {
    x = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(dataArray); // copies current frequency data
    for (let i = 0; i < dataArray.length; i++) {
        barHeight = dataArray[i]
        ctx.fillStyle = `hsl(${barHeight+90}, 100%, 50%)`
        //ctx.fillStyle = `white`
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)
        x += barWidth;
    }

    currentAnimFrame = requestAnimationFrame(animate)
}