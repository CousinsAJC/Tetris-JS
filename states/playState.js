import { BaseState } from "../stateMachine.js";
import { drawGridToCanvas, current, next, myPads, myKeys, context, blockSize, dt,
    nextX, nextY, nextWidth, nextHeight, nextTextX, nextTextY, blockArray,
    setCurrentBlock, setNextBlock, checkForTetris, score, level, canvas,
    deleteLines, dropLinesPostTetris, flashLine} from "../scripts.js";
import { generateBlock } from "../blocks.js";

let flash = true;
let lines = [];
let paused = false;
let pausedTimer = 5 * 17;



class PlayState extends BaseState {
    enter(params){
    }

    update(){
        if (paused == false){
            current.update();
            if (current.ableToDrop == false){
                setCurrentBlock(next);
                current.currentStartLocation();
                setNextBlock(generateBlock(false));
            }
            lines = checkForTetris();
            if (lines.length > 0){
                paused = deleteLines(lines);
            }
            dropLinesPostTetris(lines);
            console.log('paused = ' + paused);
            console.log('timer = ' + pausedTimer);
        } else {
            pausedTimer = pausedTimer - dt;
            if (pausedTimer <= 0){
                pausedTimer = 5 * 17;
                paused = false;
            }
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

        if (paused == true){
            flash = flashLine(lines, flash);
        }

        drawScore();
        drawLevel();
    }
}


function drawNextBox(x, y, w, h){
    context.fillStyle = "white";
    context.fillText("Next", nextTextX, nextTextY)
    context.strokeRect(x, y, w, h);
}

function drawScore(){
    context.font = "24px Arial"
    context.fillStyle = 'green';
    context.fillText(score, 150, 150);
}

function drawLevel(){
    context.font = "36px Arial";
    context.fillStyle = 'white';
    context.fillText(level, canvas.width / 2, 50);
}





export { PlayState, flash, lines };