const defaultGridSize = 16;
const defaultGridColor = '#333333';
const defaultGridMode = 'color';

let currentSize = defaultGridSize;
let currentColor = defaultGridColor;
let currentMode = defaultGridMode;
const grid = document.getElementById('container-grid');

let mouseDown = false;

document.body.addEventListener('mousedown', () => mouseDown = true);
document.body.addEventListener('mouseup', () => mouseDown = false);

// Mapping vars to constants
const colorChange = document.getElementById('colorSelection');
const colorButton = document.getElementById('colorModeBtn');
const randomButton = document.getElementById('randomColorModeBtn');
const eraser = document.getElementById('eraserBtn');
const clear = document.getElementById('clearBtn');
const gridSize = document.getElementById('sizeValue');
const gridSizeSlider = document.getElementById('sizeSlider');

const modeButtonMap = {
    'random': randomButton,
    'color': colorButton,
    'eraser': eraser
};

colorChange.addEventListener('input', event => setCurrentColor(event.target.value));
colorButton.addEventListener('click', () => setCurrentMode('color'));
randomButton.addEventListener('click', () => setCurrentMode('random'));
eraser.addEventListener('click', () => setCurrentMode('eraser'));
clear.addEventListener('click', reloadGrid);
gridSize.addEventListener('mousemove', event => setCurrentSize(event.target.value));
gridSizeSlider.addEventListener('change', event => changeGridSize(event.target.value));

const setCurrentSize = newSize => {
    currentSize = newSize;
};

const setCurrentColor = newColor => {
    currentColor = newColor;
}

const setCurrentMode = newMode => {
    deactivateButton(currentMode);
    activateButton(newMode);
    currentMode = newMode;
}

function changeGridSize(value) {
    setCurrentSize(value);
    updateSizeValue(value);
    reloadGrid();
}

function clearGrid() {
    const gridElements = grid.querySelectorAll('.grid-element');
    gridElements.forEach(element => {
        element.style.backgroundColor = '#fefefe';
    });
}


function reloadGrid() {
    clearGrid();
    setupGrid(currentSize);
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
    if (event.type === 'mouseover' && !mouseDown) return;
    switch (currentMode) {
        case 'random':
            const randomR = Math.floor(Math.random() * 256);
            const randomG = Math.floor(Math.random() * 256);
            const randomB = Math.floor(Math.random() * 256);
            event.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
            break;
        case 'color':
            event.target.style.backgroundColor = currentColor;
            break;
        case 'eraser':
            event.target.style.backgroundColor = '#fefefe';
            break;
    }
}

function activateButton(mode) {
    modeButtonMap[mode].classList.add('active');
}

function deactivateButton(mode) {
    modeButtonMap[mode].classList.remove('active');
}

window.onload = () => {
    setupGrid(defaultGridSize);
    activateButton(defaultGridMode);
}
