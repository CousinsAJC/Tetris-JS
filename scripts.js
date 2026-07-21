const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
const startButton = document.getElementById("start-button");
startButton.addEventListener('click', e=>{
    isRunning = true;
})
let isRunning = false;

let px = 1
let py = 1
let ps = 1





setInterval(gameLoop, 17);

load();
gameLoop();


function gameLoop(){
    if (isRunning){
        update();
        draw();
    }
    else {
        printToCanvas("Press Start to Begin");
    }

}

function load(){
    
}

function update(){
    px = px + ps;
    py = px + ps;
}

function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "blue";
    context.fillRect(px, py, 10, 10);

}

function printToCanvas(text){
    context.font = "36px Arial";
    context.fillStyle = "green";
    context.textAlign = "center";
    context.fillText(text, canvas.width/2, canvas.height/2);
}

