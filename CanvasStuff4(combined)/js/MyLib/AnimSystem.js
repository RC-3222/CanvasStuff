import FireEffect from "./FireEffect/FireEffect.js";
import PixelatedEffect from "./PixelatedEffect/PixelatedEffect.js";

export default class AnimSystem {
    constructor(width, height, ctx, effectType) {
        this.width = width
        this.height = height
        this.ctx = ctx

        this.activeElement = null;
        this.animationStarted = false
        this.currentAnimationFrame = null

        switch (effectType) {
            case 'fire': {
                this.effect = new FireEffect(width, height)
                break;
            }
            case 'pixel': {
                this.effect = new PixelatedEffect(width, height)
                break;
            }
            default: {
                // default will PixelatedEffect, as it's more neutral
                this.effect = new PixelatedEffect(width, height)
                this.effect2 = new FireEffect(width, height)
            }
        }
    }

    setActiveElement(element) {
        this.activeElement = element;
    }

    resetActiveElement() {
        this.activeElement = null;
    }

    start() {
        if (this.animationStarted) return;

        this.animationStarted = true
        this._animate()
    }

    stop() {
        if (!this.animationStarted) return;

        this.animationStarted = false
        cancelAnimationFrame(this.currentAnimationFrame)
        this.currentAnimationFrame = null
    }

    _animate() {
        this.ctx.clearRect(0, 0, this.width, this.height)

        this.effect.generateParticles(this.activeElement)
        this.effect.updateParticles()
        this.effect.drawParticles(this.ctx)

        this.effect2?.generateParticles(this.activeElement)
        this.effect2?.updateParticles()
        this.effect2?.drawParticles(this.ctx)

        this.currentAnimationFrame = requestAnimationFrame(this._animate.bind(this))
    }

    reset(newWidth, newHeight, newCtx) {
        //this.stop()

        this.width = newWidth;
        this.height = newHeight

        this.ctx = newCtx

        this.effect?.reset(newWidth, newHeight)
        this.effect2?.reset(newWidth, newHeight)
    }
}