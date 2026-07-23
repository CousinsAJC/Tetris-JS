import { BaseState } from "../stateMachine.js";
import { drawGridToCanvas, current, myPads, myKeys, context, blockSize, dt,
    nextX, nextY, nextWidth, nextHeight, nextTextX, nextTextY } from "../scripts.js";





class PlayState extends BaseState {
    enter(params){

    }

    update(){
        current.update(dt);
    }

    draw(){
        drawGridToCanvas();
        current.draw();
        drawNextBox(nextX, nextY, nextWidth, nextHeight);
    }
}


function drawNextBox(x, y, w, h){
    context.fillStyle = "white";
    context.fillText("Next", nextTextX, nextTextY)
    context.strokeRect(x, y, w, h);
}





export { PlayState };