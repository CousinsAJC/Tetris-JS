import { blockArray, block, i, j, l, o, s, t, z } from "./blocks.js";


// -- Get DOM Elements
const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
const startButton = document.getElementById("start-button");
startButton.addEventListener('click', e=>{
    isRunning = true;
})
let isRunning = false;


// -- Declare Variables
const blockSize = 20;
const gridX = 310;
const gridY = 100;



// -- Set game speed to ~ 60FPS & start game
setInterval(gameLoop, 17);
gameLoop();





// -- Define Functions
function gameLoop(){
    if (isRunning){
        update();
        draw();
    }
    else {
        printToCenterScreen("Press Start to Begin", "green");
    }

}

function update(){
    //testUpdate();
}

function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    //testDraw();
    drawGridToCanvas();
}

function printToCenterScreen(text, color){
    context.font = "36px Arial";
    context.fillStyle = color;
    context.textAlign = "center";
    context.fillText(text, canvas.width/2, canvas.height/2);
}

function drawGridToCanvas(){
    for (let i = 0; i < 10; i++){
        for (let j = 0; j < 20; j++){
            context.fillStyle = "white";
            context.fillRect(gridX + i * blockSize, gridY + j * blockSize, 1, 1)
        }
    }
}













// -- Test Functions and Variables
function testUpdate(){
    px = px + ps;
    py = px + ps;
}

function testDraw(){
    context.fillStyle = "blue";
    context.fillRect(px, py, 10, 10);
}

let px = 1
let py = 1
let ps = 1
// -- Test Functions and Variables