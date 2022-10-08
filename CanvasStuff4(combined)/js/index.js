import AnimSystem from "./MyLib/AnimSystem.js";

const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d');

const cont = document.querySelector('.canvas-cont')
const begCoords = cont.getBoundingClientRect()

canvas.height = begCoords.height;
canvas.width = begCoords.width;

const animSystem = new AnimSystem(canvas.width, canvas.height, ctx, 'gff')
animSystem.start()

//const [button1, button2, button3] = [...document.querySelectorAll('.button')]
const buttons = [...document.querySelectorAll('.button')]

const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
        switch (entry.target) {
            case cont: {
                const [{inlineSize: width, blockSize: height}] = entry.borderBoxSize;
                canvas.height = height;
                canvas.width = width;

                animSystem.reset(canvas.width, canvas.height, ctx)
                break;
            }
            default: {
                console.log(entry.target)
            }
        }
    }
})

resizeObserver.observe(cont);

buttons.forEach((button) => {
    button.addEventListener('mouseenter', function () {
        animSystem.setActiveElement(this)
    })
    button.addEventListener('mouseleave', function () {
        animSystem.resetActiveElement()
    })
})

/*[button1, button2, button3].forEach((button) => button.addEventListener('mouseenter', function () {
    animSystem.setActiveElement(this)
}));

[button1, button2, button3].forEach((button) => button.addEventListener('mouseleave', function () {
    animSystem.resetActiveElement()
}));*/

