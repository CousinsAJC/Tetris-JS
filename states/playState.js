import { BaseState } from "../stateMachine.js";
import { drawGridToCanvas, current, myPads, myKeys, context, blockSize } from "../scripts.js";

class PlayState extends BaseState {
    enter(params){

    }

    update(){
        current.update();
    }

    draw(){
        drawGridToCanvas();
        current.draw();
    }
}



export { PlayState };