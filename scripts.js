import { i, j, l, o, s, t, z, generateBlock } from "./blocks.js";
import { drawLine, getGamepadInput } from "./libFunctions.js";
import { StateMachine, BaseState } from "./stateMachine.js";
import { MenuState } from "./states/menuState.js";
import { OptionsState } from "./states/optionsState.js";
import { PlayState, lines, flash } from "./states/playState.js";
import { HighScore } from "./states/highScore.js";
import { GameOver } from "./states/gameOver.js";


// ----------------------------------------------------------------



// -- Get DOM Elements
const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
const startButton = document.getElementById("start-button");
startButton.addEventListener('click', e=>{
    isRunning = true;
})
let isRunning = false;
// -- Get DOM Elements

// ----------------------------------------------------------------

// -- Declare Variables
let score = 0;
let single = 40;
let double = 100;
let triple = 300;
let quad = 1200;
let level = 1;
let clearedLines = 0;

// -- Grid/Square setup
const blockSize = 20;
const gridLeft = 310;
const gridTop = 100;
const gridRight = gridLeft + blockSize * 10;
const gridBottom = gridTop + blockSize * 20;
const gridWidth = gridRight - gridLeft;
const gridHeight = gridBottom - gridTop;

const nextX = gridRight + (canvas.width - gridRight)/2 - (blockSize * 2);
const nextY = canvas.height/2 - blockSize * 2;
const nextWidth = blockSize * 4;
const nextHeight = blockSize * 4;
const nextTextX = nextX + blockSize * 2
const nextTextY = nextY - blockSize * 2

// -- Block Setup
let blockArray = [];
let filledSquares = [ [], [], [], [], [], [], [], [], [], [] ];  //each inner array represents a column in the grid.
let current = generateBlock(true);
let next = generateBlock(false);

// -- Place inputs into arrays to be accessed by all states
let myKeys = [];
let myPads = [];




document.addEventListener('keydown', (event) =>{
    myKeys.push(event.key);
});


// -- Initialize state machine
const gsm = new StateMachine({
    menu: ()=> new MenuState(),
    options: ()=> new OptionsState(),
    play: ()=> new PlayState(),
    gameOver: ()=> new GameOver(),
    scores: ()=> new HighScore()
});

gsm.change('play');
// -- Declare Variables

// ----------------------------------------------------------------

// -- Set game speed to ~ 60FPS & start game
const dt = 17;
setInterval(gameLoop, dt);

gameLoop();
// -- Set game speed to ~ 60FPS & start game

// ----------------------------------------------------------------



// ----------------------------------------------------------------

// -- Define Functions
function gameLoop(){
    if (isRunning){
        let gp = getGamepadInput();
        inputToArray(gp);
        gsm.update();

        myKeys = [];

        context.clearRect(0, 0, canvas.width, canvas.height);
        gsm.draw();
    }
    else {
        printToCenterScreen("Press Start to Begin", "green");
    }
}

function printToCenterScreen(text, color){
    context.font = "36px Arial";
    context.fillStyle = color;
    context.textAlign = "center";
    context.fillText(text, canvas.width/2, canvas.height/2);
}

function drawGridToCanvas(){
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 19; j++){
            context.fillStyle = "white";
            context.fillRect(gridLeft + i * blockSize + blockSize, gridTop + j * blockSize + blockSize, 1, 1)
        }
    }

    context.strokeStyle = "white";
    // -- Draw the border 1 pixel outside of the actual grid to avoid overlapping with blocks
    drawLine(gridLeft - 1, gridTop - 1, gridRight + 1, gridTop -1);
    drawLine(gridRight + 1, gridTop - 1, gridRight + 1, gridBottom + 1);
    drawLine(gridRight + 1, gridBottom + 1, gridLeft - 1, gridBottom + 1);
    drawLine(gridLeft - 1, gridBottom + 1, gridLeft - 1, gridTop - 1);
}


function inputToArray(gp){
    if (gp[0]){
        if (gp[0].A.pressed){
            myPads.push('a');
        }
    }
}
// -- Define Functions


export function addCurrentToArray(){
    let instance = [];
    instance = [current.trueCoords[0], current.trueCoords[1], current.color];
    blockArray.push(instance);
    instance = [current.trueCoords[2], current.trueCoords[3],current.color];
    blockArray.push(instance);
    instance = [current.trueCoords[4], current.trueCoords[5], current.color];
    blockArray.push(instance);
    instance = [current.trueCoords[6], current.trueCoords[7], current.color];
    blockArray.push(instance);
}

export function checkArray(coords, dir){  // This function converts relative coordinates to actual coordinates then compares to the block array.
    for (let i = 0; i < blockArray.length; i++){
        for (let j = 0; j < 7; j = j + 2){
            if (dir == 'rotate'){
                if ((current.x + (coords[j] * blockSize) == blockArray[i][0]) && (current.y + (coords[j+1] * blockSize) == blockArray[i][1])){
                    return false;
                }
            } else if (dir == 'left'){
                if ((current.x - blockSize) + (coords[j] * blockSize) == blockArray[i][0] && (current.y + (coords[j+1] * blockSize) == blockArray[i][1])){
                    return false;
                }
            } else if (dir == 'right'){
                if ((current.x + blockSize) + (coords[j] * blockSize) == blockArray[i][0] && (current.y + (coords[j+1] * blockSize) == blockArray[i][1])){
                    return false;
                }
            } else if (dir == 'down'){
                if (current.x + (coords[j] * blockSize) == blockArray[i][0] && ((current.y + blockSize) + (coords[j+1] * blockSize) == blockArray[i][1])){
                    return false;
                }
            }
            
        }
    }
    return true;
}

export function checkForTetris(){
    let linesToDelete = [];
    for (let i = gridBottom - blockSize; i >= gridTop; i = i - blockSize){
        let count = 0;
        for (let j = blockArray.length - 1; j >= 0; j--){
            if (blockArray[j][1] == i){
                count++;
            }
        }
        if (count == 10){
            console.log('tetris!  -  ' + i);
            linesToDelete.push(i);
        }
    }
    if (linesToDelete.length == 1){
        score = score + single * level;
    } else if (linesToDelete.length == 2){
        score = score + double * level;
    } else if (linesToDelete.length == 3){
        score = score + triple * level;
    } else if (linesToDelete.length == 4){
        score = score + quad * level;
    }

    clearedLines = clearedLines + linesToDelete.length;
    if (clearedLines >= 10){
        clearedLines = 0;
        level++;
    }
    return(linesToDelete);
}

export function deleteLines(arr){
    blockArray.sort((a, b) => a[1] - b[1]);
    for (let j = arr.length - 1; j >= 0; j--){
        for (let i = blockArray.length - 1; i >= 0; i--){
            if (arr[j] == blockArray[i][1]){
                blockArray.splice(i, 1);
            }
        }
    }
    return true;
}

export function dropLinesPostTetris(arr){
    //blockArray.sort((a, b) => a[1] - b[1]);
    //arr.sort((a, b) => a - b);
    for (let j = arr.length - 1; j >= 0; j--){
        for (let i = 0; i < blockArray.length; i++){
            if (blockArray[i][1] < arr[j]){
                blockArray[i][1] = blockArray[i][1] + blockSize;
            }
        }
    }
}

export function flashLine(arr, on){
    for ( let i = 0; i < arr.length; i ++){
        for (let j = gridLeft; j < gridRight; j = j + blockSize){
            if (on){
                context.fillStyle = "white";
            } else {
                context.fillStyle = "black";
            }
            context.fillRect(j, arr[i], blockSize, blockSize)
        }
    }

    if (on){
        on = false
    } else {
        on = true
    }

    return on;
}


export function setCurrentBlock(newBlock){
    current = newBlock;
}

export function setNextBlock(newBlock){
    next = newBlock;
}

export { context, drawGridToCanvas, current, next, myPads, myKeys, blockSize,
    gridLeft, gridRight, gridBottom, gridTop, gridWidth, gridHeight, dt, score,
    level, nextX, nextY, nextWidth, nextHeight, nextTextX, nextTextY, blockArray};