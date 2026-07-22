import { BaseState } from "../stateMachine.js";
import { drawGridToCanvas, current, myPads, myKeys, context, blockSize, dt } from "../scripts.js";

class PlayState extends BaseState {
    enter(params){
    }

    update(){
        current.update(dt);
    }

    draw(){
        drawGridToCanvas();
        current.draw();
    }
}



export { PlayState };