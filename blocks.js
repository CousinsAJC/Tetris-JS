import { blockSize, context, gridWidth, gridLeft, gridTop, myKeys, dt, 
    gridBottom, gridRight, level, nextX, nextY, current, next, addCurrentToArray,
    blockArray, checkArray, flashLine } from "./scripts.js";



class block {
    constructor(c){
        this.dropSpeed = [48, 43, 38, 33, 28, 23, 18, 13, 8, 6, 5, 5, 5, 4, 4, 4, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1]
        this.timer = this.dropSpeed[level - 1] * 17
        this.dropTimer = this.timer;
        //this.paused = false;
        //this.pausedTimer = 3 * 17;
        this.pos = 1;
        this.ableToDown = true;
        this.ableToDrop = true;
        this.ableToLeft = true;
        this.ableToRight = true;
        this.destinedCoords = [];
        this.trueCoords = [];
        this.c = c;
    }

    update(){
        this.getTrueCoords(this.coords);
        this.keysInput();

        /*
        if(this.paused){
            this.pausedTimer = this.pausedTimer - dt;
            if (this.pausedTimer <= 0){
                this.paused = false;
                this.pausedTimer = 3 *dt;
            }
        } else {

            */
        this.dropTimer = this.dropTimer - dt;

        if (this.dropTimer <= 0){
            this.timedDrop();
            this.dropTimer = this.timer;
        }
        
        if (!this.ableToDrop){
            this.getTrueCoords(this.coords);
            this.lockPiece();
        }
    }

    draw(){
        this.drawBlock();
        this.drawBorder();
    }


    currentStartLocation(){
        this.x = gridLeft + gridWidth/2  - blockSize * 2;
        this.y = gridTop;
    }

    lockPiece(){
        addCurrentToArray();
        this.c = false;
    }

    rotateRight(){
        let isEmpty = null;
        if (this.pos == 1) {
            this.destinedCoords = this.pos2;
            isEmpty = checkArray(this.destinedCoords, 'rotate');
            if (this.readyToRotate() && isEmpty == true){
                this.pos = 2;
                this.coords = this.pos2;
            }
        } else if (this.pos == 2) {
            this.destinedCoords = this.pos3;
            isEmpty = checkArray(this.destinedCoords, 'rotate');
            if(this.readyToRotate() && isEmpty == true){
            this.pos = 3;
            this.coords = this.pos3;
            }
        } else if (this.pos == 3) {
            this.destinedCoords = this.pos4;
            isEmpty = checkArray(this.destinedCoords, 'rotate');
            if(this.readyToRotate() && isEmpty == true){
                this.pos = 4;
                this.coords = this.pos4;
            }
        } else if (this.pos == 4) {
            this.destinedCoords = this.pos1;
            isEmpty = checkArray(this.destinedCoords, 'rotate');
            if (this.readyToRotate() && isEmpty == true){
                this.pos = 1;
                this.coords = this.pos1;
            }
        }
    }

    rotateLeft(){
        let isEmpty = null;
        if (this.pos == 1) {
            this.destinedCoords = this.pos4;
            isEmpty = checkArray(this.destinedCoords, 'rotate');
            if (this.readyToRotate() && isEmpty == true){
                this.pos = 4;
                this.coords = this.pos4;
            }
        } else if (this.pos == 2) {
            this.destinedCoords = this.pos1;
            isEmpty = checkArray(this.destinedCoords, 'rotate');
            if(this.readyToRotate() && isEmpty == true){
            this.pos = 1;
            this.coords = this.pos1;
            }
        } else if (this.pos == 3) {
            this.destinedCoords = this.pos2;
            isEmpty = checkArray(this.destinedCoords, 'rotate');
            if(this.readyToRotate() && isEmpty == true){
                this.pos = 2;
                this.coords = this.pos2;
            }
        } else if (this.pos == 4) {
            this.destinedCoords = this.pos3;
            isEmpty = checkArray(this.destinedCoords, 'rotate');
            if (this.readyToRotate() && isEmpty == true){
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
        for (let i = 0; i < 7; i = i + 2){
            // compare coords to grid boundary left side
            if (this.x + (this.coords[i] * blockSize) <= gridLeft){
                this.ableToLeft = false;
                break;
            }
        }

        if(this.ableToLeft){
            this.ableToLeft = checkArray(this.coords, 'left');
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

        if(this.ableToRight){
            this.ableToRight = checkArray(this.coords, 'right');
        }
        if (this.ableToRight){
            this.x = this.x + blockSize;
        }
    }

    moveDown(){
        this.ableToDown = true;
        for(let i = 1; i < 8; i = i + 2){
            if (this.y + (this.coords[i] * blockSize) + blockSize >= gridBottom){
                this.ableToDown = false;
            }
        }

        if(this.ableToDown){
            this.ableToDown = checkArray(this.coords, 'down');
        }
        if (this.ableToDown){
            this.y = this.y + blockSize;
        }
    }

    timedDrop(){
        this.ableToDrop = true;
        for (let i = 1; i < 8; i = i + 2){
            if (this.y + (this.coords[i] * blockSize) + blockSize >= gridBottom){
                this.ableToDrop = false;
            }
        }

        if(this.ableToDrop){
            this.ableToDrop = checkArray(this.coords, 'down');
        }
        if (this.ableToDrop) {
            this.y = this.y + blockSize;
        }
    }




    getTrueCoords(pos){
        this.coords = pos;
        for (let i = 0; i < 7; i = i + 2){
            this.trueCoords[i] = this.x + pos[i] * blockSize;
            this.trueCoords[i+1] = this.y + pos[i+1] * blockSize;
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

    drawBlock(){
        // Draw block
        context.fillStyle = this.color;
        context.fillRect(this.x + this.coords[0]*blockSize, this.y + this.coords[1]*blockSize, blockSize, blockSize);
        context.fillRect(this.x + this.coords[2]*blockSize, this.y + this.coords[3]*blockSize, blockSize, blockSize);
        context.fillRect(this.x + this.coords[4]*blockSize, this.y + this.coords[5]*blockSize, blockSize, blockSize);
        context.fillRect(this.x + this.coords[6]*blockSize, this.y + this.coords[7]*blockSize, blockSize, blockSize);
    }

    drawBorder(){
        // Draw block border
        context.fillStyle = "white";
        context.strokeRect(this.x + this.coords[0]*blockSize, this.y + this.coords[1]*blockSize, blockSize, blockSize)
        context.strokeRect(this.x + this.coords[2]*blockSize, this.y + this.coords[3]*blockSize, blockSize, blockSize)
        context.strokeRect(this.x + this.coords[4]*blockSize, this.y + this.coords[5]*blockSize, blockSize, blockSize)
        context.strokeRect(this.x + this.coords[6]*blockSize, this.y + this.coords[7]*blockSize, blockSize, blockSize)
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
}

class i extends block {
    constructor(c){
        super(block);
        this.pos1 = [0, 2, 1, 2, 2, 2, 3, 2];
        this.pos2 = [2, 0, 2, 1, 2, 2, 2, 3];
        this.pos3 = [0, 2, 1, 2, 2, 2, 3, 2];
        this.pos4 = [2, 0, 2, 1, 2, 2, 2, 3];
        this.color = "cyan";
        this.type = "i";
        if (c){
            this.currentStartLocation()
        } else {
            this.x = nextX;
            this.y = nextY;
        }

        this.getTrueCoords(this.pos1);
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
        
        this.type = "j";
        if (c){
            this.currentStartLocation()
        } else {
            this.x = nextX;
            this.y = nextY;
        }

        this.getTrueCoords(this.pos1);
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
        
        this.type = "l";
        if (c){
            this.currentStartLocation()
        } else {
            this.x = nextX;
            this.y = nextY;
        }

        this.getTrueCoords(this.pos1);
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
        this.type = "o";
        if (c){
            this.currentStartLocation()
        } else {
            this.x = nextX;
            this.y = nextY;
        }

        this.getTrueCoords(this.pos1);
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
        this.type = "s";
        if (c){
            this.currentStartLocation()
        } else {
            this.x = nextX;
            this.y = nextY;
        }

        this.getTrueCoords(this.pos1);
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
        this.type = "t";
        if (c){
            this.currentStartLocation()
        } else {
            this.x = nextX;
            this.y = nextY;
        }

        this.getTrueCoords(this.pos1);
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
        this.type = "z";
        if (c){
            this.currentStartLocation()
        } else {
            this.x = nextX;
            this.y = nextY;
        }

        this.getTrueCoords(this.pos1);
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