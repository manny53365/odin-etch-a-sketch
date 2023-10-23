const defaultGridSize = 16;

let currentSize = defaultGridSize
const grid = document.getElementById('container-grid')

let mouseDown = false;

const setCurrentSize = (newSize) => {
    currentSize = newSize
};

function setupGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-element')
        gridElement.addEventListener('mouseover', changeColor)
        gridElement.addEventListener('mousedown', changeColor)
        grid.appendChild(gridElement)
    }
}

function changeColor(event) {
    if (event.type === 'mouseover' && !mouseDown) return
    if (currentMode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        event.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } else if (currentMode === 'color') {
        event.target.style.backgroundColor = currentColor
    } else if (currentMode === 'eraser') {
        event.target.style.backgroundColor = '#fefefe'
    }
}

window.onload = () => {
    setupGrid(defaultGridSize)
}
