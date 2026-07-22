import { i, j, l, o, s, t, z, generateBlock } from "./blocks.js";
import { drawLine, getGamepadInput, getKeysInput } from "./libFunctions.js";
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

// -- Block Setup
const current = generateBlock();
const next = generateBlock();

let myKeys = {};
let myPads = {};


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
setInterval(gameLoop, 17);

gameLoop();
// -- Set game speed to ~ 60FPS & start game

// ----------------------------------------------------------------

// -- Every Frame Update/Draw
function update(){

}

function draw(){
    
}
// -- Every Frame Update/Draw

// ----------------------------------------------------------------

// -- Define Functions
function gameLoop(){
    if (isRunning){
        let gp = getGamepadInput();
        inputLogic(gp);
        gsm.update();

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


function inputLogic(gp){
    if (gp[0]){
        if (gp.A.pressed){
            myPads.push('a');
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



export { context, drawGridToCanvas, current, myPads, myKeys, blockSize, gridLeft, gridRight, gridBottom, gridTop, gridWidth, gridHeight };