import { blockSize, context, gridWidth, gridLeft, gridTop, myKeys, dt, gridBottom, gridRight, level, nextX, nextY } from "./scripts.js";



class block {
    constructor(c){
        this.dropSpeed = [48, 43, 38, 33, 28, 23, 18, 13, 8, 6, 5, 5, 5, 4, 4, 4, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1]
        this.timer = this.dropSpeed[0] * 17
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

        this.keysInput();
    }

    draw(){
        // Draw block
        context.fillStyle = this.color;
        context.fillRect(this.x + this.coords[0]*blockSize, this.y + this.coords[1]*blockSize, blockSize, blockSize);
        context.fillRect(this.x + this.coords[2]*blockSize, this.y + this.coords[3]*blockSize, blockSize, blockSize);
        context.fillRect(this.x + this.coords[4]*blockSize, this.y + this.coords[5]*blockSize, blockSize, blockSize);
        context.fillRect(this.x + this.coords[6]*blockSize, this.y + this.coords[7]*blockSize, blockSize, blockSize);
        
        // Draw block border
        context.fillStyle = "white";
        context.strokeRect(this.x + this.coords[0]*blockSize, this.y + this.coords[1]*blockSize, blockSize, blockSize)
        context.strokeRect(this.x + this.coords[2]*blockSize, this.y + this.coords[3]*blockSize, blockSize, blockSize)
        context.strokeRect(this.x + this.coords[4]*blockSize, this.y + this.coords[5]*blockSize, blockSize, blockSize)
        context.strokeRect(this.x + this.coords[6]*blockSize, this.y + this.coords[7]*blockSize, blockSize, blockSize)

        // printBlockBoundsTest()  //  Prints block positions and grid bounds to screen for checking errors

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
            let checkSpot = this.x + (this.destinedCoords[i] * blockSize);
            
            if (checkSpot < gridLeft){
                console.log("Unable to rotate to desired position.")
                return false;
            }
            if (checkSpot >= gridRight){
                console.log("Unable to rotate to desired position")
                return false;
            }
            if (checkSpot >= gridBottom){
                console.log("Unable to rotate to desired position")
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
        }
    }

    keysInput(){
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


    // -- Tests
    printBlockBoundsTest(){
        console.log(this.x + this.coords[0]*blockSize, this.y + this.coords[1]*blockSize)
        console.log(this.x + this.coords[2]*blockSize, this.y + this.coords[3]*blockSize)
        console.log(this.x + this.coords[4]*blockSize, this.y + this.coords[5]*blockSize)
        console.log(this.x + this.coords[6]*blockSize, this.y + this.coords[7]*blockSize)
        console.log("Left Grid: " + gridLeft);
        console.log("Right Grid: " + gridRight); 
    }
}

class i extends block {
    constructor(c){
        super(block);
        this.pos1 = [0, 2, 1, 2, 2, 2, 3, 2];
        this.pos2 = [2, 0, 2, 1, 2, 2, 2, 3];
        this.pos3 = [0, 2, 1, 2, 2, 2, 3, 2];
        this.pos4 = [2, 0, 2, 1, 2, 2, 2, 3];
        this.color = "cyan";
        this.coords = this.pos1
        if (c){
            this.x = gridLeft + gridWidth/2  - blockSize * 2;
            this.y = gridTop - blockSize * 2;
        } else {
            this.x = nextX;
            this.y = nextY;
        }
    }
}

class j extends block {
    constructor(c){
        super(block);
        this.pos1 = [0, 1, 1, 1, 2, 1, 2, 2];
        this.pos2 = [0, 2, 1, 0, 1, 1, 1, 2];
        this.pos3 = [0, 0, 0, 1, 1, 1, 2, 1];
        this.pos4 = [1, 0, 2, 0, 1, 1, 1, 2];  
        this.color = "blue";
        this.coords = this.pos1
        if (c){
            this.x = gridLeft + gridWidth/2  - blockSize * 2;
            this.y = gridTop;
        } else {
            this.x = nextX;
            this.y = nextY;
        }
    }
}

class l extends block {
    constructor(c){
        super(block);
        this.pos1 = [0, 1, 1, 1, 2, 1, 0, 2];
        this.pos2 = [0, 0, 1, 0, 1, 1, 1, 2];
        this.pos3 = [0, 1, 1, 1, 2, 1, 2, 0];
        this.pos4 = [1, 0, 1, 1, 1, 2, 2, 2];
        this.color = "orange";
        this.coords = this.pos1
        if (c){
            this.x = gridLeft + gridWidth/2  - blockSize * 2;
            this.y = gridTop;
        } else {
            this.x = nextX;
            this.y = nextY;
        }
    }
}

class o extends block {
    constructor(c){
        super(block);
        this.pos1 = [1, 1, 2, 1, 1, 2, 2, 2];
        this.pos2 = [1, 1, 2, 1, 1, 2, 2, 2];
        this.pos3 = [1, 1, 2, 1, 1, 2, 2, 2];
        this.pos4 = [1, 1, 2, 1, 1, 2, 2, 2];
        this.color = "yellow";
        this.coords = this.pos1
        if (c){
            this.x = gridLeft + gridWidth/2  - blockSize * 2;
            this.y = gridTop;
        } else {
            this.x = nextX;
            this.y = nextY;
        }
    }
}

class s extends block {
    constructor(c){
        super(block);
        this.pos1 = [0, 2, 1, 2, 1, 1, 2, 1];
        this.pos2 = [1, 0, 1, 1, 2, 1, 2, 2];
        this.pos3 = [0, 2, 1, 2, 1, 1, 2, 1];
        this.pos4 = [1, 0, 1, 1, 2, 1, 2, 2];
        this.color = "green";
        this.coords = this.pos1
        if (c){
            this.x = gridLeft + gridWidth/2  - blockSize * 2;
            this.y = gridTop;
        } else {
            this.x = nextX;
            this.y = nextY;
        }
    }
}

class t extends block {
    constructor(c){
        super(block);
        this.pos1 = [0, 1, 1, 1, 2, 1, 1, 2];
        this.pos2 = [0, 1, 1, 1, 1, 0, 1, 2];
        this.pos3 = [1, 0, 0, 1, 1, 1, 2, 1];
        this.pos4 = [1, 0, 1, 1, 1, 2, 2, 1];
        this.color = "purple";
        this.coords = this.pos1
        if (c){
            this.x = gridLeft + gridWidth/2  - blockSize * 2;
            this.y = gridTop;
        } else {
            this.x = nextX;
            this.y = nextY;
        }
    }
}

class z extends block {
    constructor(c){
        super(block);
        this.pos1 = [0, 1, 1, 1, 1, 2, 2, 2];
        this.pos2 = [2, 0, 2, 1, 1, 1, 1, 2];
        this.pos3 = [0, 1, 1, 1, 1, 2, 2, 2];
        this.pos4 = [2, 0, 2, 1, 1, 1, 1, 2];
        this.color = "red";
        this.coords = this.pos1
        if (c){
            this.x = gridLeft + gridWidth/2  - blockSize * 2;
            this.y = gridTop;
        } else {
            this.x = nextX;
            this.y = nextY;
        }
    }
}


function generateBlock(c){
    let int = Math.floor(Math.random() * 7) + 1;
    let instance = null;

    switch (int){
        case 1:
            instance = new i(c);
            break;
        case 2:
            instance = new j(c);
            break;
        case 3:
            instance = new l(c);
            break;
        case 4:
            instance = new o(c);
            break;
        case 5:
            instance = new s(c);
            break;
        case 6:
            instance = new t(c);
            break;
        case 7:
            instance = new z(c);
            break;
        default:
            console.log("An error occured when creating new block");
    }
    return instance;
}


export {i, j, l, o, s, t, z, generateBlock};