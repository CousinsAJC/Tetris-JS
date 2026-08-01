import { context, myPads } from "./scripts.js";


function drawLine(x1, y1, x2, y2){
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
}

function getGamepadInput(){
    const gamepads = navigator.getGamepads();
    const gp = gamepads[0];
    if (gp){
        if (gp.buttons[0].pressed){
            myPads.push('a');
        }
        if (gp.buttons[1].pressed){
            myPads.push('b');
        }
        if (gp.buttons[2].pressed){
            myPads.push('x');
        }
        if (gp.buttons[3].pressed){
            myPads.push('y');
        }
    }
}

function pressedOrHeld(){
    
}
    /*


    function inputToArray(pad){
        if (pad[0]){
            if (pad[0].A.pressed){
                myPads.push('a');
                console.log('gamepad A pressed');
            }
        }
    }


        gp.A = gp[0].buttons[0];
        gp.B = gp[0].buttons[1];
        gp.Y = gp[0].buttons[3];
        gp.X = gp[0].buttons[2];
        gp.LB = gp[0].buttons[5];
        gp.RB = gp[0].buttons[4];
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
        */

export { drawLine, getGamepadInput };