const iArray = [
    [2, 0, 2, 1, 2, 2, 2, 3],
    [2, 0, 2, 1, 2, 2, 2, 3],
    [2, 0, 2, 1, 2, 2, 2, 3],
    [2, 0, 2, 1, 2, 2, 2, 3]
]
/*
    [ // block j
        [1, 0, 1, 1, 1, 2, 2, 2],
        [2, 0, 2, 1, 1, 1, 1, 0],
        [0, 0, 0, 1, 1, 1, 2, 1],
        [1, 0, 2, 0, 1, 1, 1, 2]
    ],
    [ // block l
        [0, 1, 1, 1, 2, 1, 0, 2],
        [0, 0, 1, 0, 1, 1, 1, 2],
        [0, 1, 1, 1, 2, 1, 2, 0],
        [1, 0, 1, 1, 1, 2, 2, 2]
    ],
    [ // block 0
        [1, 1, 2, 1, 1, 2, 2, 2],
        [1, 1, 2, 1, 1, 2, 2, 2],
        [1, 1, 2, 1, 1, 2, 2, 2],
        [1, 1, 2, 1, 1, 2, 2, 2]
    ],
    [ // block s
        [0, 2, 1, 2, 1, 1, 2, 1],
        [1, 0, 1, 1, 2, 1, 2, 2],
        [0, 2, 1, 2, 1, 1, 2, 1],
        [1, 0, 1, 1, 2, 1, 2, 2]
    ],
    [ // block t
        [0, 1, 1, 1, 2, 1, 1, 2],
        [0, 1, 1, 1, 1, 0, 1, 2],
        [1, 0, 0, 1, 1, 1, 2, 1],
        [1, 0, 1, 1, 1, 2, 2, 1]
    ],
    [ // block z
        [0, 1, 1, 1, 1, 2, 2, 2],
        [2, 0, 2, 1, 1, 1, 1, 2],
        [0, 1, 1, 1, 1, 2, 2, 2],
        [2, 0, 2, 1, 1, 1, 1, 2]
    ],
]
    */

class block{
    constructor(a){
        this.pos1 = [a[0][0], a[0][1], a[0][2], a[0][3], a[0][4], a[0][5], a[0][6], a[0][7]];
        this.pos2 = [a[1][0], a[1][1], a[1][2], a[1][3], a[1][4], a[1][5], a[1][6], a[1][7]];
        this.pos3 = [a[2][0], a[2][1], a[2][2], a[2][3], a[2][4], a[2][5], a[2][6], a[2][7]];
        this.pos4 = [a[3][0], a[3][1], a[3][2], a[3][3], a[3][4], a[3][5], a[3][6], a[3][7]];
    }
}

class i extends block {
    constructor(){
        super(block);
        this.color = "cyan";
    }
}

class j extends block {
    constructor(){
        super(block);
        this.color = "blue";
    }
}

class l extends block {
    constructor(){
        super(block);
        this.color = "orange";
    }
}

class o extends block {
    constructor(){
        super(block);
        this.color = "yellow";
    }
}

class s extends block {
    constructor(){
        super(block);
        this.color = "green";
    }
}

class t extends block {
    constructor(){
        super(block);
        this.color = "purple";
    }
}

class z extends block {
    constructor(){
        super(block);
        this.color = "red";
    }
}


function generateBlock(){
    let int = Math.floor(Math.random() * 7) + 1;
    let instance = new i(iArray);
    /*
    switch (int){
        case 1:
            instance = new i(blockArray[0][0], blockArray[0][1], blockArray[0][2], blockArray[0][3]);
            break;
        case 2:
            instance = new j(blockArray[1][0], blockArray[1][1], blockArray[1][2], blockArray[1][3]);
            break;
        case 3:
            instance = new l(blockArray[2][0], blockArray[2][1], blockArray[2][2], blockArray[2][3]);
            break;
        case 4:
            instance = new o(blockArray[3][0], blockArray[3][1], blockArray[3][2], blockArray[3][3]);
            break;
        case 5:
            instance = new s(blockArray[4][0], blockArray[4][1], blockArray[4][2], blockArray[4][3]);
            break;
        case 6:
            instance = new t(blockArray[5][0], blockArray[5][1], blockArray[5][2], blockArray[5][3]);
            break;
        case 7:
            instance = new z(blockArray[6][0], blockArray[6][1], blockArray[6][2], blockArray[6][3]);
            break;
        default:
            console.log("An error occured when creating new block");
    }
            */
    return instance;
}


export {iArray, block, i, j, l, o, s, t, z, generateBlock};