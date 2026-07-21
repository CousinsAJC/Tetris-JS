import { iArray, block, i, j, l, o, s, t, z, generateBlock } from "./blocks.js";


// -- Get DOM Elements
const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
const startButton = document.getElementById("start-button");
startButton.addEventListener('click', e=>{
    isRunning = true;
})
let isRunning = false;
// -- Get DOM Elements



// -- Declare Variables
const blockSize = 20;
const gridX = 310;
const gridY = 100;
const current = generateBlock();
const next = generateBlock();
// -- Declare Variables



// -- Set game speed to ~ 60FPS & start game
setInterval(gameLoop, 17);

gameLoop();
// -- Set game speed to ~ 60FPS & start game


// -- Every Frame Update/Draw
function update(){
    //testUpdate();
    let gp = getGamepadInput();
    inputLogic(gp);
}

function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    //testDraw();
    drawGridToCanvas();
}
// -- Every Frame Update/Draw









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

function getGamepadInput(){
    const gp = navigator.getGamepads();
    if (gp[0]){
        gp.A = gp[0].buttons[0];
        gp.B = gp[0].buttons[1];
        gp.X = gp[0].buttons[3];
        gp.Y = gp[0].buttons[4];
        gp.LB = gp[0].buttons[6];
        gp.RB = gp[0].buttons[7];
        gp.LT = gp[0].axes[3];
        gp.RT = gp[0].axes[4];

        gp.LS = gp[0].buttons[13];
        gp.RS = gp[0].buttons[14];
        gp.SEL = gp[0].buttons[10];
        gp.START = gp[0].buttons[11];

        gp.LEFTX = gp[0].axes[0];
        gp.LEFTY = gp[0].axes[1];
        gp.RIGHTX = gp[0].axes[2];
        gp.RIGHTY = gp[0].axes[5];

        //console.log(gp.A);
    }
    return gp
}

function inputLogic(gp){
    if (gp.A.pressed){
        console.log("A is being pressed");
    }
}
// -- Define Functions













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