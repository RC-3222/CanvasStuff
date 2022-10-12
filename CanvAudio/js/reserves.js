/*
function drawVisualizerRound(bufferLength, x, barWidth, dataArray) {
    barWidth = 20
    for (let i = 0; i < dataArray.length; i++) {
        const barHeight = dataArray[i] * 1

        ctx.save()

        ctx.translate(canvas.width/2, canvas.height/2)
        ctx.rotate(i + Math.PI*6 / bufferLength);

        //ctx.fillStyle = `hsl(${dataArray[i] + 90}, 100%, 50%)`
        ctx.fillStyle = `hsl(${i*0.6+addI}, 100%, 50%)`
        //ctx.fillStyle = `white`
        ctx.fillRect(0, 0, barWidth, barHeight)
        x += barWidth;

        ctx.restore()
    }
}

function drawVisualizerDouble(bufferLength, x, barWidth, dataArray) {
    for (let i = 0; i < dataArray.length; i++) {
        const barHeight = dataArray[i] * 1.5

        const red = Math.min(i * dataArray[i], 255)
        const green = Math.min(i * 4, 255)
        const blue = Math.min(barHeight/2, 255)

        ctx.fillStyle = `white`
        ctx.fillRect(canvas.width/2-x, canvas.height - barHeight - 30, barWidth, barHeight)
        //ctx.fillStyle = `hsl(${dataArray[i] + 90}, 100%, 50%)`
        ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`
        //ctx.fillStyle = `white`
        ctx.fillRect(canvas.width/2-x, canvas.height - barHeight, barWidth, barHeight)
        x += barWidth;
    }
    for (let i = 0; i < dataArray.length; i++) {
        const barHeight = dataArray[i] * 1.5
        const red = Math.min(i * dataArray[i], 255)
        const green = Math.min(i * 2, 255)
        const blue = Math.min(Math.floor(barHeight*0.5), 255)

        ctx.fillStyle = `white`
        ctx.fillRect(x, canvas.height - barHeight - 30, barWidth, barHeight)
        //ctx.fillStyle = `hsl(${dataArray[i] + 90}, 100%, 50%)`
        ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`
        //ctx.fillStyle = `white`
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)
        x += barWidth;
    }
}*/


/*
let myAudio = new Audio("data:audio/mp3;base64," + myMusic)

myAudio.addEventListener('playing', function (ev) {
    console.log('audio started playing')
})
myAudio.addEventListener('ended', function (ev) {
    console.log('audio ended')
})*/


//const audioCtx = new (window.AudioContext || window.webkitAudioContext) ()


//myAudio.src = "data:audio/mp3;base64," + myMusic;
//myAudio.src = "./audio/sabatonStuff.mp3";

/*myAudio.addEventListener('pause', function (ev) {
    console.log('audio paused')
    stopVisualizer()
})*/