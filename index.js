// DOM elements
const grid = document.querySelector(".grid");
const scoreDisplay = document.getElementById("score");
const startBtn = document.getElementById("start");
const restartBtn = document.getElementById("restart");
const grid10 = document.getElementById("grid-10");
const grid12 = document.getElementById("grid-12");
const grid14 = document.getElementById("grid-14");
const grid16 = document.getElementById("grid-16");
const grid18 = document.getElementById("grid-18");
const grid20 = document.getElementById("grid-20");

// game 
let squares = [];
const squareSize = 20;
let currentSnake = [5, 4, 3];
let direction = 1;
let width = 16;
let appleIndex = 0;
const snakeSpeedStart = 500;
let snakeSpeedInterval = snakeSpeedStart;
let speed = 0.9;
let timerId = 0;
let gameOver = false;


function createGrid(numberOfSquares) {
    // clear the existing grid 
    clearGrid();

    // create new grid
    for (let i = 0; i < numberOfSquares; i++) {
        const square = document.createElement('div');
        square.classList.add("square")
        grid.appendChild(square)
        squares.push(square)
    }    
}

function updateGameBoard() {
    grid.style.width = width * squareSize;
    grid.style.height = width * squareSize;
}

function clearGrid() {
    while(grid.firstChild) {
        grid.removeChild(grid.firstChild)
    }
    squares = []
}

function createGameBoard() {
    createGrid(width*width);
    updateGameBoard();
    createSnake();
    generateApple();
}

function createSnake() {
    currentSnake.forEach(snakeSegment => squares[snakeSegment].classList.remove('snake'))
    currentSnake = [5, 4, 3];
    currentSnake.forEach(snakeSegment => squares[snakeSegment].classList.add('snake'))
}

function generateApple() {   
    // generate a random number that does not fall on a snake part 
    do {
        appleIndex = Math.floor(Math.random() * squares.length) 
    } while (squares[appleIndex].classList.contains('snake'))
    // style new apple
    squares[appleIndex].classList.add('apple')
}

function move() {

    if ( (direction ===  width && currentSnake[0] + width >= width*width)  ||   // hit bottom wall
    (direction === -width && currentSnake[0] - width <   0 )  ||   // hit top wall
    (direction ===  1  && currentSnake[0] % width === width-1)   ||   // hit right wall
    (direction === -1  && currentSnake[0] % width === 0 )  ||   // hit left wall
    (squares[currentSnake[0] + direction ].classList.contains('snake')) )  // snake hit itself
    {
        clearInterval(timerId)
        gameOver = true;
        startBtn.style.display = "none"
        restartBtn.style.display = "inline-block"
        return;
    }

    // move right = direction = 1
    const tail = currentSnake.pop()
    squares[tail].classList.remove('snake')
    currentSnake.unshift(currentSnake[0] + direction)
    

    // if snake eats the apple   
    if ( currentSnake[0] === appleIndex) {
        // remove the class of apple
        squares[appleIndex].classList.remove('apple')
        // grow our snake by adding class of snake to it
        squares[tail].classList.add('snake')
        // grow our snake array
        currentSnake.push(tail)
        // generate new apple
        generateApple()
        // add 1 to the score and update DOM
        scoreDisplay.textContent = Number(score.textContent) + 1
        // speed up snake
        
        clearInterval(timerId)
        snakeSpeedInterval = Math.floor(snakeSpeedInterval * speed);
        timerId = setInterval(move, snakeSpeedInterval)
    }
    squares[currentSnake[0]].classList.add('snake')    
}

function resetGame() {
    squares[appleIndex].classList.remove('apple')
    direction = 1
    snakeSpeedInterval = snakeSpeedStart;
    timerId = 0;
    scoreDisplay.textContent = 0;
    createGameBoard();
    startBtn.style.display = "inline-block"
    restartBtn.style.display = "none"
    gameOver = false;
}

function startGame() {

    if(!gameOver) {
        timerId = setInterval(move, snakeSpeedInterval)
        startBtn.style.display = "none"
        restartBtn.style.display = "inline-block"
    }
}

function control(e) {
    switch (e.keyCode) {
        case 37:   // left arrow key = direction - 1
            direction = -1
            break;
        case 38:   // up arrow key = direction - 10
            direction = -width
            break;        
        case 39:   // right arrow key = direction + 1
            direction = 1
            break;                    
        case 40:   // down arrow key = direction + 10
            direction = width
            break;      
        default:
            return;             
    }
}

// event listeners
startBtn.addEventListener('click', startGame)
restartBtn.addEventListener('click', resetGame)
document.addEventListener('keydown', control)

grid10.addEventListener('click', function() {
    width = 10;
    createGameBoard();
})

grid12.addEventListener('click', function() {
    width = 12;
    createGameBoard();
})

grid14.addEventListener('click', function() {
    width = 14;
    createGameBoard();
})

grid16.addEventListener('click', function() {
    width = 16;
    createGameBoard();
})

grid18.addEventListener('click', function() {
    width = 18;
    createGameBoard();
})

grid20.addEventListener('click', function() {
    width = 20;
    createGameBoard();
})

// on load 
createGameBoard();
