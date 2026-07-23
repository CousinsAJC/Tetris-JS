import { blockSize, context, gridWidth, gridLeft, gridTop, myKeys, dt, gridBottom, gridRight } from "./scripts.js";

class block {
    constructor(dt){
        this.timer = 1250;
        this.dropTimer = this.timer;
        this.pos = 1;
        this.ableToDrop = true;
        this.ableToLeft = true;
        this.ableToRight = true;
        this.ableToDown = true;
        this.destinedCoords = [];
        this.pos1 = [];
        this.pos2 = [];
        this.pos3 = [];
        this.pos4 = [];
    }

    update(){
        this.dropTimer = this.dropTimer - dt;
        if (this.dropTimer <= 0){
            this.timedDrop();
            this.dropTimer = this.timer;
        }
        if (myKeys.includes('a')){
            this.rotateLeft();
        }
        if (myKeys.includes('d')){
            this.rotateRight();
        }
        if (myKeys.includes('ArrowLeft')){
            this.moveLeft();
        }
        if (myKeys.includes('ArrowRight')){
            this.moveRight();
        }
        if (myKeys.includes('s') || myKeys.includes('ArrowDown')){
            this.moveDown();
        }
    }

    draw(){
        context.fillStyle = this.color;
        context.fillRect(this.x + this.coords[0]*blockSize, this.y + this.coords[1]*blockSize, blockSize, blockSize);
        context.fillRect(this.x + this.coords[2]*blockSize, this.y + this.coords[3]*blockSize, blockSize, blockSize);
        context.fillRect(this.x + this.coords[4]*blockSize, this.y + this.coords[5]*blockSize, blockSize, blockSize);
        context.fillRect(this.x + this.coords[6]*blockSize, this.y + this.coords[7]*blockSize, blockSize, blockSize);
        //console.log("drawing current block");
        context.fillStyle = "white";
        context.strokeRect(this.x + this.coords[0]*blockSize, this.y + this.coords[1]*blockSize, blockSize, blockSize)
        context.strokeRect(this.x + this.coords[2]*blockSize, this.y + this.coords[3]*blockSize, blockSize, blockSize)
        context.strokeRect(this.x + this.coords[4]*blockSize, this.y + this.coords[5]*blockSize, blockSize, blockSize)
        context.strokeRect(this.x + this.coords[6]*blockSize, this.y + this.coords[7]*blockSize, blockSize, blockSize)

        console.log(this.x + this.coords[0]*blockSize, this.y + this.coords[1]*blockSize)
        console.log(this.x + this.coords[2]*blockSize, this.y + this.coords[3]*blockSize)
        console.log(this.x + this.coords[4]*blockSize, this.y + this.coords[5]*blockSize)
        console.log(this.x + this.coords[6]*blockSize, this.y + this.coords[7]*blockSize)
        console.log("Left Grid: " + gridLeft);
        console.log("Right Grid: " + gridRight);

    }




    rotateRight(){
        if (this.pos == 1) {
            this.destinedCoords = this.pos2;
            if (this.readyToRotate()){
                this.pos = 2;
                this.coords = this.pos2;
            }
        } else if (this.pos == 2) {
            this.destinedCoords = this.pos3;
            if(this.readyToRotate()){
            this.pos = 3;
            this.coords = this.pos3;
            }
        } else if (this.pos == 3) {
            this.destinedCoords = this.pos4;
            if(this.readyToRotate()){
                this.pos = 4;
                this.coords = this.pos4;
            }
        } else if (this.pos == 4) {
            this.destinedCoords = this.pos1;
            if (this.readyToRotate()){
                this.pos = 1;
                this.coords = this.pos1;
            }
        }
    }

    rotateLeft(){
        if (this.pos == 1) {
            this.destinedCoords = this.pos4;
            if (this.readyToRotate()){
                this.pos = 4;
                this.coords = this.pos4;
            }
        } else if (this.pos == 2) {
            this.destinedCoords = this.pos1;
            if(this.readyToRotate()){
            this.pos = 1;
            this.coords = this.pos1;
            }
        } else if (this.pos == 3) {
            this.destinedCoords = this.pos2;
            if(this.readyToRotate()){
                this.pos = 2;
                this.coords = this.pos2;
            }
        } else if (this.pos == 4) {
            this.destinedCoords = this.pos3;
            if (this.readyToRotate()){
                this.pos = 3;
                this.coords = this.pos3;
            }
        }
    }

    readyToRotate(){
        for (let i = 0; i <= 6; i = i + 2){
            if (this.x + (this.destinedCoords[i] * blockSize) < gridLeft){
                return false;
            }
            if (this.x + (this.destinedCoords[i] * blockSize) >= gridRight){
                return false;
            }
            if (this.y + (this.destinedCoords[i] * blockSize) >= gridBottom){
                return false;
            }
        }
        return true;
    }

    moveLeft(){
        this.ableToLeft = true;
        for(let i = 0; i < 7; i = i + 2){
            if (this.x + (this.coords[i] * blockSize) <= gridLeft){
                this.ableToLeft = false;
            }
        }
        if (this.ableToLeft){
            this.x = this.x - blockSize;
        }
    }

    moveRight(){
        this.ableToRight = true;
        for(let i = 0; i < 7; i = i + 2){
            if (this.x + (this.coords[i] * blockSize) + blockSize >= gridRight){
                this.ableToRight = false;
            }
        }
        if (this.ableToRight){
            this.x = this.x + blockSize;
        }
    }

    moveDown(){
        this.ableToDown = true;
        for(let i = 1; i < 8; i = i + 2){
            if (this.y + this.coords[i] * blockSize + blockSize >= gridBottom){
                this.ableToDown = false;
            }
        }
        if (this.ableToDown){
            this.y = this.y + blockSize;
        }
    }

    timedDrop(){
        this.ableToDown = true;
        for (let i = 1; i < 8; i = i + 2){
            if (this.y + (this.coords[i] * blockSize) + blockSize >= gridBottom){
                this.ableToDrop = false;
            }
        }
        if (this.ableToDrop) {
            this.y = this.y + blockSize;
            console.log("Drop current piece");
        }
    }
}

class i extends block {
    constructor(){
        super(block);
        this.pos1 = [0, 2, 1, 2, 2, 2, 3, 2];
        this.pos2 = [2, 0, 2, 1, 2, 2, 2, 3];
        this.pos3 = [0, 2, 1, 2, 2, 2, 3, 2];
        this.pos4 = [2, 0, 2, 1, 2, 2, 2, 3];
        this.color = "cyan";
        this.coords = this.pos1
        this.x = gridLeft + gridWidth/2  - blockSize * 2;
        this.y = gridTop - blockSize * 2;

    }
}

class j extends block {
    constructor(){
        super(block);
        this.pos1 = [0, 1, 1, 1, 2, 1, 2, 2];
        this.pos2 = [0, 2, 1, 0, 1, 1, 1, 2];
        this.pos3 = [0, 0, 0, 1, 1, 1, 2, 1];
        this.pos4 = [1, 0, 2, 0, 1, 1, 1, 2];  
        this.color = "blue";
        this.coords = this.pos1
        this.x = gridLeft + gridWidth/2  - blockSize * 2;
        this.y = gridTop;
    }
}

class l extends block {
    constructor(){
        super(block);
        this.pos1 = [0, 1, 1, 1, 2, 1, 0, 2];
        this.pos2 = [0, 0, 1, 0, 1, 1, 1, 2];
        this.pos3 = [0, 1, 1, 1, 2, 1, 2, 0];
        this.pos4 = [1, 0, 1, 1, 1, 2, 2, 2];
        this.color = "orange";
        this.coords = this.pos1
        this.x = gridLeft + gridWidth/2  - blockSize * 2;
        this.y = gridTop - blockSize;
    }
}

class o extends block {
    constructor(){
        super(block);
        this.pos1 = [1, 1, 2, 1, 1, 2, 2, 2];
        this.pos2 = [1, 1, 2, 1, 1, 2, 2, 2];
        this.pos3 = [1, 1, 2, 1, 1, 2, 2, 2];
        this.pos4 = [1, 1, 2, 1, 1, 2, 2, 2];
        this.color = "yellow";
        this.coords = this.pos1
        this.x = gridLeft + gridWidth/2  - blockSize * 2;
        this.y = gridTop - blockSize;
    }
}

class s extends block {
    constructor(){
        super(block);
        this.pos1 = [0, 2, 1, 2, 1, 1, 2, 1];
        this.pos2 = [1, 0, 1, 1, 2, 1, 2, 2];
        this.pos3 = [0, 2, 1, 2, 1, 1, 2, 1];
        this.pos4 = [1, 0, 1, 1, 2, 1, 2, 2];
        this.color = "green";
        this.coords = this.pos1
        this.x = gridLeft + gridWidth/2  - blockSize * 2;
        this.y = gridTop - blockSize;
    }
}

class t extends block {
    constructor(){
        super(block);
        this.pos1 = [0, 1, 1, 1, 2, 1, 1, 2];
        this.pos2 = [0, 1, 1, 1, 1, 0, 1, 2];
        this.pos3 = [1, 0, 0, 1, 1, 1, 2, 1];
        this.pos4 = [1, 0, 1, 1, 1, 2, 2, 1];
        this.color = "purple";
        this.coords = this.pos1
        this.x = gridLeft + gridWidth/2  - blockSize * 2;
        this.y = gridTop - blockSize;
    }
}

class z extends block {
    constructor(){
        super(block);
        this.pos1 = [0, 1, 1, 1, 1, 2, 2, 2];
        this.pos2 = [2, 0, 2, 1, 1, 1, 1, 2];
        this.pos3 = [0, 1, 1, 1, 1, 2, 2, 2];
        this.pos4 = [2, 0, 2, 1, 1, 1, 1, 2];
        this.color = "red";
        this.coords = this.pos1
        this.x = gridLeft + gridWidth/2  - blockSize * 2;
        this.y = gridTop - blockSize;
    }
}


function generateBlock(){
    let int = Math.floor(Math.random() * 7) + 1;
    let instance = null;

    switch (int){
        case 1:
            instance = new i();
            break;
        case 2:
            instance = new j();
            break;
        case 3:
            instance = new l();
            break;
        case 4:
            instance = new o();
            break;
        case 5:
            instance = new s();
            break;
        case 6:
            instance = new t();
            break;
        case 7:
            instance = new z();
            break;
        default:
            console.log("An error occured when creating new block");
    }
    return instance;
}


export {i, j, l, o, s, t, z, generateBlock};