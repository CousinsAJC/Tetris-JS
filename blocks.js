class i {
    constructor(){
        this.pos1 = [2, 0, 2, 1, 2, 2, 2, 3];
        this.pos2 = [2, 0, 2, 1, 2, 2, 2, 3];
        this.pos3 = [2, 0, 2, 1, 2, 2, 2, 3];
        this.pos4 = [2, 0, 2, 1, 2, 2, 2, 3];
        this.color = "cyan";
    }
}

class j {
    constructor(){
        this.pos1 = [1, 0, 1, 1, 1, 2, 2, 2];
        this.pos2 = [2, 0, 2, 1, 1, 1, 1, 0];
        this.pos3 = [0, 0, 0, 1, 1, 1, 2, 1];
        this.pos4 = [1, 0, 2, 0, 1, 1, 1, 2];  
        this.color = "blue";
    }
}

class l {
    constructor(){
        this.pos1 = [0, 1, 1, 1, 2, 1, 0, 2];
        this.pos2 = [0, 0, 1, 0, 1, 1, 1, 2];
        this.pos3 = [0, 1, 1, 1, 2, 1, 2, 0];
        this.pos4 = [1, 0, 1, 1, 1, 2, 2, 2];
        this.color = "orange";
    }
}

class o {
    constructor(){
        this.pos1 = [1, 1, 2, 1, 1, 2, 2, 2];
        this.pos2 = [1, 1, 2, 1, 1, 2, 2, 2];
        this.pos3 = [1, 1, 2, 1, 1, 2, 2, 2];
        this.pos4 = [1, 1, 2, 1, 1, 2, 2, 2];
        this.color = "yellow";
    }
}

class s {
    constructor(){
        this.pos1 = [0, 2, 1, 2, 1, 1, 2, 1];
        this.pos2 = [1, 0, 1, 1, 2, 1, 2, 2];
        this.pos3 = [0, 2, 1, 2, 1, 1, 2, 1];
        this.pos4 = [1, 0, 1, 1, 2, 1, 2, 2];
        this.color = "green";
    }
}

class t {
    constructor(){
        this.pos1 = [0, 1, 1, 1, 2, 1, 1, 2];
        this.pos2 = [0, 1, 1, 1, 1, 0, 1, 2];
        this.pos3 = [1, 0, 0, 1, 1, 1, 2, 1];
        this.pos4 = [1, 0, 1, 1, 1, 2, 2, 1];
        this.color = "purple";
    }
}

class z {
    constructor(){
        this.pos1 = [0, 1, 1, 1, 1, 2, 2, 2];
        this.pos2 = [2, 0, 2, 1, 1, 1, 1, 2];
        this.pos3 = [0, 1, 1, 1, 1, 2, 2, 2];
        this.pos4 = [2, 0, 2, 1, 1, 1, 1, 2];
        this.color = "red";
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