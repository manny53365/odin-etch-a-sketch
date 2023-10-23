const defaultGridSize = 16;

let currentSize = defaultGridSize
const grid = document.getElementById('container-grid')

const setCurrentSize = (newSize) => {
    currentSize = newSize
};

function setupGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement('div')
        gridElement.classList.add('grid-element')
        gridElement.addEventListener('mouseover', changeColor)
        gridElement.addEventListener('mousedown', changeColor)
        grid.appendChild(gridElement)
    }
}



window.onload = () => {
    setupGrid(defaultGridSize)
}