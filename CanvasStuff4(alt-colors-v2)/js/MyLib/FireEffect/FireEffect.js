import ParticleFire from "./ParticleFire.js";

export default class FireEffect {
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
                || particle.x > this.width + particle.radius
                || particle.y < 0 - particle.radius) {
                return false;
            }
            particle.update()
            return true;
        })
    }

    generateParticles(activeElement) {
        if (activeElement) {
            const size = Math.random() * 35 + 5;
            const x = Math.random() * activeElement.offsetWidth + activeElement.offsetLeft;
            const y = activeElement.offsetTop + size / 2;

            this.particlesArray.push(new ParticleFire(x, y, size))
        }
    }

    drawParticles(context) {
        this.particlesArray.forEach(particle => particle.draw(context))
    }

    reset(newWidth, newHeight) {
        this.width = newWidth
        this.height = newHeight
    }
}