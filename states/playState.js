import { BaseState } from "../stateMachine.js";
import { drawGridToCanvas, current, myPads, myKeys, context, blockSize } from "../scripts.js";

class PlayState extends BaseState {
    enter(params){

    }

    update(){

    }

    draw(){
        drawGridToCanvas();
        drawCurrentBlock(current);
    }
}

function drawCurrentBlock(current){
    context.fillStyle = current.color;
    context.fillRect(current.x + current.coords[0]*blockSize, current.y + current.coords[1]*blockSize, blockSize, blockSize);
    context.fillRect(current.x + current.coords[2]*blockSize, current.y + current.coords[3]*blockSize, blockSize, blockSize);
    context.fillRect(current.x + current.coords[4]*blockSize, current.y + current.coords[5]*blockSize, blockSize, blockSize);
    context.fillRect(current.x + current.coords[6]*blockSize, current.y + current.coords[7]*blockSize, blockSize, blockSize);
    console.log("drawing current block");
}


export { PlayState };