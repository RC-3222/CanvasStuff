// handling particles
import ParticleFire from "./MyLib/FireEffect/ParticleFire";

let activeParticles = []
function handleParticles() {
    activeParticles = activeParticles.filter((particle)=>{
        // filtering them out particles
        if (particle.size <= 0.5
            || particle.color.alpha <= 0.05
            || particle.x > canvas.width + particle.radius
            || particle.y < 0 - particle.radius) {
            return false;
        }

        particle.update()
        particle.draw(ctx)
        return true;
    })
}


function createParticles() {
    if (activeButton) {

        /*
        const params = buttonMeasurements[activeButton.dataset.number]*//*
        const size = Math.random() * 40 + 10;
        const x = Math.random() * params.width + activeButton.offsetLeft;
        const y = activeButton.offsetTop + size/2;
        */

        const size = Math.random() * 35 + 5;
        const x = Math.random() * activeButton.offsetWidth + activeButton.offsetLeft;
        const y = activeButton.offsetTop + size/2;

        activeParticles.push(new ParticleFire(x,y,size))

    }
}

function animate() {
    ctx.clearRect(0,0, canvas.width,canvas.height);
    createParticles();
    handleParticles();
    requestAnimationFrame(animate)
}
animate()