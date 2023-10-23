const defaultGridSize = 16;
const defaultGridColor = '#333333';
const defaultGridMode = 'color';

let currentSize = defaultGridSize;
let currentColor = defaultGridColor;
let currentMode = defaultGridMode;
const grid = document.getElementById('container-grid');

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

//Mapping vars to constants
const colorChange = document.getElementById('colorSelection');
const colorButton = document.getElementById('colorModeBtn');
const randomButton = document.getElementById('randomColorModeBtn');
const eraser = document.getElementById('eraserBtn');
const clear = document.getElementById('clearBtn');
const gridSize = document.getElementById('sizeValue');
const gridSizeSlider = document.getElementById('sizeSlider');

colorChange.oninput = event => setCurrentColor(event.target.value);
colorButton.onclick = () => setCurrentMode('color');
randomButton.onclick = () => setCurrentMode('random');
eraser.onclick = () => setCurrentMode('eraser');
clear.onclick = () => reload();
gridSize.onmousemove = event => setCurrentSize(event.target.value);
gridSizeSlider.onchange = event => changeGrideSize(event.target.value);

const setCurrentSize = (newSize) => {
    currentSize = newSize;
};

let setCurrentColor = (newColor) => {
    currentColor = newColor;
}

let setCurrentMode = (newMode) => {
    activateButton(newMode);
    currentMode = newMode;
}

function changeGrideSize(value) {
    setCurrentSize(value);
    updateSizeValue(value);
    reloadGrid();
}

function reloadGrid() {
    clearGrid();
    setupGrid(currentSize);
}

function clearGrid() {
    grid.innerHTML = ''
}

function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`;
}

function setupGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        gridElement.addEventListener('mouseover', changeColor);
        gridElement.addEventListener('mousedown', changeColor);
        grid.appendChild(gridElement);
    }
}

function changeColor(event) {
    if (event.type === 'mouseover' && !mouseDown) return
    if (currentMode === 'random') {
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

function activateButton(newMode) {
    if (currentMode === 'random') {
        randomButton.classList.remove('active')
    } else if (currentMode === 'color') {
      colorButton.classList.remove('active')
    } else if (currentMode === 'eraser') {
      eraser.classList.remove('active')
    }
  
    if (newMode === 'random') {
        randomButton.classList.add('active')
    } else if (newMode === 'color') {
        colorButton.classList.add('active')
    } else if (newMode === 'eraser') {
        eraser.classList.add('active')
    }
  }

window.onload = () => {
    setupGrid(defaultGridSize)
    activateButton(defaultGridMode)
}
