import { drawGridToCanvas, current } from "./scripts.js";

class StateMachine {
    constructor(states = {}) {
        this.states = states;
        this.current = null;
    }

    change(state, params = {}){
        if (this.current) {
            this.current.exit();
            }

            // 2. Instantiate and enter the new state
            if (this.states[state]) {
            this.current = this.states[state](); // Call the factory function
            this.current.enter(params);
            } else {
            console.error(`State "${state}" does not exist.`);
        }
    }

    update(){
        if (this.current){
            this.current.update();
        }
    }

    draw(){
        if (this.current){
            this.current.draw();
        }
    }
};

class BaseState {
    constructor(){}
    enter(){}
    exit(){}
    update(){}
    render(){}
}

export { StateMachine, BaseState }