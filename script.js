let isDrawing = false;
const gridContainer = document.querySelector(".grid");
const resetButton = document.getElementById("#resetBtn");
const sizeButton = document.getElementById("#sizeBtn");

function createGrid(size = 16) {
    
    gridContainer.innerHTML = '';
        
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;
        
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');

        cell.addEventListener('mousedown', startDrawing);
        cell.addEventListener('mouseover', draw);
        cell.addEventListener('touchstart', startDrawing);
        cell.addEventListener('touchmove', draw);

        gridContainer.appendChild(cell);
    }
}

function startDrawing(e){
    isDrawing = true;
    draw(e);
}

function draw(e) {
    if (!isDrawing && e.type !== 'touchmove') return;
    
    let target;
    if (e.type.includes('touch')) {
        e.preventDefault();
        const touch = e.touches[0];
        target = document.elementFromPoint(touch.clientX, touch.clientY);
    } else {
        target = e.target;
    }

    if (target && target.classList.contains('cell')) {
        target.classList.add('active');
    }
}

function stopDrawing(){
    isDrawing = false;
}

function resetGrid(){
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.classList.remove('active'));
}

function changeSize() {
    let newSize = prompt('Enter new grid size (max 64):', '16');
    newSize = parseInt(newSize);
    
    if (newSize && newSize > 0 && newSize <= 64) {
        createGrid(newSize);
    } else {
        alert('Please enter a valid number between 1 and 64');
    }
}

document.addEventListener('mouseup', stopDrawing);
document.addEventListener('touchend', stopDrawing);
resetBtn.addEventListener('click', resetGrid);
sizeBtn.addEventListener('click', changeSize);

document.addEventListener('DOMContentLoaded', () => createGrid(16));