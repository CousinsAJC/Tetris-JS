import { i, j, l, o, s, t, z, generateBlock } from "./blocks.js";
import { drawLine, getGamepadInput } from "./libFunctions.js";
import { StateMachine, BaseState } from "./stateMachine.js";
import { MenuState } from "./states/menuState.js";
import { OptionsState } from "./states/optionsState.js";
import { PlayState } from "./states/playState.js";
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
const current = generateBlock('current');
const next = generateBlock('next');

// -- Place inputs into arrays to be accessed by all states
let myKeys = [];
let myPads = [];

document.addEventListener('keydown', (event =>{
    myKeys.push(event.key);
}))


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
let level = 1;
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
            console.log("a pushed");
        }
    }
}
// -- Define Functions

// ----------------------------------------------------------------

// -- Test Functions and Variables
function testUpdate(){ // -- Move a blue box across the screen
    px = px + ps;
    py = px + ps;
}

function testDraw(){ // -- Move a blue box across the screen
    context.fillStyle = "blue";
    context.fillRect(px, py, 10, 10);
}

let px = 1
let py = 1
let ps = 1
// -- Test Functions and Variables



export { context, drawGridToCanvas, current, myPads, myKeys, blockSize,
     gridLeft, gridRight, gridBottom, gridTop, gridWidth, gridHeight, dt,
      level, nextX, nextY, nextWidth, nextHeight, nextTextX, nextTextY };