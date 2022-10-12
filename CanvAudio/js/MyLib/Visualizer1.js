export default class Visualizer1 {
    constructor(ctx, width, height) {
        this.currentAnimFrame = null;

        this.ctx = ctx
        this.width = width
        this.height = height

        this.addI = 0
    }

    initAudioAnalyser(audioAnalyser) {
        this.audioAnalyser = audioAnalyser

        this.audioAnalyser.fftSize = 256; // 128 for default

        this.bufferLength = this.audioAnalyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength) // can contain only unsigned 8-bit integers

        this.barWidth = this.width / this.bufferLength


        /*this.ctx.lineCap = 'round'
        this.ctx.shadowOffsetX = 0
        this.ctx.shadowOffsetY = 0
        this.ctx.shadowBlur = 20
        this.ctx.globalCompositeOperation = `xor`*/
    }

    start() {
        if (!this.currentAnimFrame) this.animate()
    }

    stop() {
        cancelAnimationFrame(this.currentAnimFrame)
        this.currentAnimFrame = null;
        this.ctx.clearRect(0, 0, this.width, this.height)
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.audioAnalyser.getByteFrequencyData(this.dataArray); // copies current frequency data
        //this.drawVisualizerSimple()
        this.drawVisualizerSimple()
        this.addI+=0.1;
        this.currentAnimFrame = requestAnimationFrame(this.animate.bind(this))
    }

    drawVisualizerSimple() {
        let x = 0
        for (let i = 0; i < this.dataArray.length; i++) {
            const barHeight = this.dataArray[i] * 1.25
            this.ctx.fillStyle = `hsl(${i*0.6+this.addI}, 100%, 50%)`
            this.ctx.fillRect(x, this.height - barHeight, this.barWidth, barHeight)
            this.ctx.fillRect(x, this.height - barHeight, this.barWidth, barHeight)


            x += this.barWidth;

        }
    }

    drawVisualizerRound() {
        let x = 0
        for (let i = 0; i < this.bufferLength; i++) {
            const barHeight = this.dataArray[i] * 0.5

            this.ctx.save()

            this.ctx.translate(this.width/2, this.height/2)
            this.ctx.rotate(i * 6);

            this.ctx.lineWidth = this.barWidth/0.5
            this.ctx.strokeStyle = `rgba(120,120,120,1)`
            this.ctx.beginPath()
            this.ctx.moveTo(0,0)
            this.ctx.lineTo(0,barHeight)
            this.ctx.stroke()

            this.ctx.lineWidth = this.barWidth/0.4
            this.ctx.strokeStyle = `rgba(140,140,140,1)`
            this.ctx.beginPath()
            this.ctx.moveTo(0,0)
            this.ctx.lineTo(0,barHeight)
            this.ctx.stroke()

            x += this.barWidth;

            this.ctx.restore()
        }
    }

    drawVisualizerRound3() {
        const barWidth = 15
        let x = 0
        for (let i = 0; i < this.dataArray.length; i++) {
            const barHeight = this.dataArray[i] * 0.95

            this.ctx.save()

            this.ctx.translate(this.width/2, this.height/2)
            this.ctx.rotate(i + Math.PI*4 / this.bufferLength + this.addI*0.1);

            /*this.ctx.lineCap = 'round'
            this.ctx.shadowOffsetX = 0
            this.ctx.shadowOffsetY = 0
            this.ctx.shadowBlur = 20*/

            this.ctx.shadowColor = `hsl(${i*5 + this.addI}, 100%, 50%)`
            this.ctx.strokeStyle = `hsl(${i*5 + this.addI}, 100%, 50%)`
            this.ctx.fillStyle = `hsl(${i*5 + this.addI}, 100%, 50%)`

            this.ctx.lineWidth = Math.min(100 / barHeight, 20) + 5

            this.ctx.beginPath()
            this.ctx.moveTo(0, 0)
            this.ctx.lineTo(0, barHeight)
            this.ctx.stroke()

            this.ctx.beginPath()
            this.ctx.arc(0, barHeight * 1.2, barHeight/20, 0, Math.PI * 2)
            this.ctx.fill()


            this.ctx.beginPath()
            this.ctx.arc(0, barHeight * 1.5, barHeight/15, 0, Math.PI * 2)
            this.ctx.fill()

            this.ctx.beginPath()
            this.ctx.arc(0, barHeight * 1.8, barHeight/10, 0, Math.PI * 2)
            this.ctx.fill()

            x += barWidth;

            this.ctx.restore()
        }
    }

    drawVisualizerRound2() {
        const barWidth = 6
        let x = 0
        for (let i = 0; i < this.bufferLength; i++) {
            const barHeight = this.dataArray[i] * 1

            this.ctx.save()

            /*this.ctx.lineCap = 'round'
            this.ctx.shadowOffsetX = 0
            this.ctx.shadowOffsetY = 0
            this.ctx.shadowBlur = 20
            this.ctx.shadowColor = `hsl(${i*5+this.addI}, 100%, 50%)`
            this.ctx.globalCompositeOperation = `xor`*/

            this.ctx.translate(this.width * 0.5, this.height * 0.5)
            this.ctx.rotate(i * this.bufferLength / 1.2);
            this.ctx.lineWidth = barHeight * 0.14
            this.ctx.shadowColor = `hsl(${i*5 + this.addI}, 100%, 50%)`
            this.ctx.strokeStyle = `hsl(${i*5+this.addI}, 100%, 50%)`
            //ctx.fillStyle = `white`
            this.ctx.beginPath()
            this.ctx.moveTo(0, barHeight*0.95)
            this.ctx.lineTo(barHeight*0.95, barHeight)
            this.ctx.stroke()

            x += barWidth;

            this.ctx.restore()
        }
    }
    reset(newWidth, newHeight) {
        this.width = newWidth
        this.height = newHeight
        this.barWidth = this.width / this.bufferLength
    }
}