export default class ParticlePixel {
    constructor(x, y, size) {
        this.x = x
        this.y = y
        this.size = size

        this.weight = Math.random() * 1.5 + 1.5

        this.color = {
            hue: 0,
            saturation: 0,
            lightness: 100 - Math.random() * 20,
            alpha: 1
        }
    }

    update() {
        this.y += this.weight
        if (this.size >= 0.3) this.size -= 0.15;
        this.color.lightness -= 0.03;
        this.color.alpha -= 0.001;
    }

    draw(context) {
        context.fillStyle = `hsla(${this.color.hue},${this.color.saturation}%,${this.color.lightness}%,${this.color.alpha})`
        context.fillRect(this.x, this.y, this.size, this.size)
    }
}