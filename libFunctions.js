import { context } from "./scripts.js";


function drawLine(x1, y1, x2, y2){
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
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

function getKeysInput(){
    window.addEventListener('keydown', (event) => {
        if (event.key === "a"){
            current.rotateLeft();
            console.log("rotate left");
        }
    });
}

export { drawLine, getGamepadInput, getKeysInput };