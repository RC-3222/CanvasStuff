import ParticlePixel from "./ParticlePixel.js";

export default class PixelatedEffect {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.particlesArray = []
    }

    updateParticles() {
        this.particlesArray = this.particlesArray.filter((particle) => {
            // filtering them out particles
            if (particle.size <= 0.5
                || particle.color.alpha <= 0.05
                || particle.y > this.height + particle.radius) {
                return false;
            }
            particle.update()
            return true;
        })
    }

    generateParticles(activeElement) {
        if (activeElement) {
            const size = Math.random() * 15 + 3;
            const x = Math.random() * activeElement.offsetWidth + activeElement.offsetLeft;
            const y = activeElement.offsetTop + activeElement.offsetHeight / 2;

            this.particlesArray.push(new ParticlePixel(x, y, size))
        }
    }

    _getDistance(particle1, particle2) {
        return Math.sqrt((particle2.x - particle1.x) ** 2 + (particle2.y - particle1.y) ** 2)
    }

    _drawLine(ctx, color, x1, y1, x2, y2) {
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.strokeStyle = color
        ctx.lineTo(x2, y2)
        ctx.stroke()
    }

    drawParticles(context) {
        this.particlesArray.forEach((particle, index, array) => {
                particle.draw(context)
                array.forEach(particle2 => {
                    if (this._getDistance(particle, particle2) > 80) return;

                    const color = `hsla(${particle.color.hue},${particle.color.saturation}%,${particle.color.lightness}%,${0.15})`
                    this._drawLine(context, color, particle.x + particle.size / 2, particle.y + particle.size / 2, particle2.x + particle2.size / 2, particle2.y + particle2.size / 2)
                })
            }
        )

    }


    reset(newWidth, newHeight) {
        this.width = newWidth
        this.height = newHeight
    }
}