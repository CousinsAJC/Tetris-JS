const blockArray = [
    [ // block i
        [2, 0, 2, 1, 2, 2, 2, 3],
        [2, 0, 2, 1, 2, 2, 2, 3],
        [2, 0, 2, 1, 2, 2, 2, 3],
        [2, 0, 2, 1, 2, 2, 2, 3]
    ],
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

class block{
    constructor(a, b, c, d){
        this.pos1 = [a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7]];
        this.pos2 = [b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7]];
        this.pos3 = [c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7]];
        this.pos4 = [d[0], d[1], d[2], d[3], d[4], d[5], d[6], d[7]];
    }
}

class i extends block {
    constructor(){
        this.color = "cyan";
    }
}

class j extends block {
    constructor(){
        this.color = "blue";
    }
}

class l extends block {
    constructor(){
        this.color = "orange";
    }
}

class o extends block {
    constructor(){
        this.color = "yellow";
    }
}

class s extends block {
    constructor(){
        this.color = "green";
    }
}

class t extends block {
    constructor(){
        this.color = "purple";
    }
}

class z extends block {
    constructor(){
        this.color = "red";
    }
}

export {blockArray, block, i, j, l, o, s, t, z};