import { BaseState } from "../stateMachine.js";
import { drawGridToCanvas, current, next, myPads, myKeys, context, blockSize, dt,
    nextX, nextY, nextWidth, nextHeight, nextTextX, nextTextY, blockArray,
    setCurrentBlock,
    setNextBlock} from "../scripts.js";
import { generateBlock } from "../blocks.js";





class PlayState extends BaseState {
    enter(params){

    }

    update(){
        current.update();
        if (current.ableToDrop == false){
            //current.lockPiece();
            setCurrentBlock(next);
            current.currentStartLocation();
            setNextBlock(generateBlock(false));
        }
    }

    draw(){
        drawGridToCanvas();
        current.draw();
        drawNextBox(nextX, nextY, nextWidth, nextHeight);
        next.draw();
        for (let i = 0; i < blockArray.length; i++){
            context.fillStyle = blockArray[i][2];
            context.fillRect(blockArray[i][0], blockArray[i][1], blockSize, blockSize);

            context.fillStyle = "white";
            context.strokeRect(blockArray[i][0], blockArray[i][1], blockSize, blockSize);
        }
    }
}


function drawNextBox(x, y, w, h){
    context.fillStyle = "white";
    context.fillText("Next", nextTextX, nextTextY)
    context.strokeRect(x, y, w, h);
}





export { PlayState };