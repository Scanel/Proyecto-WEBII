export class Room{
    idroom:string;
    name: string;
    urlbanner:string;
    idusuario: number;
    constructor(){
        this.idroom = "";
        this.name = "";
        this.urlbanner = "";
        this.idusuario = 0;
    }
}

export class ResultadoRoom{
    data: Array<Room>;
    message: String;
    status: boolean;

    constructor(){
        this.data = [new Room()];
        this.message = "";
        this.status = false;
    }
}