export class RoomUser{
    idroom:string;
    iduser: number;

    constructor(){
        this.idroom = "";
        this.iduser = 0;
    }
}

export class ResultadoRoomUser{
    data: Array<RoomUser>;
    message: String;
    status: boolean;

    constructor(){
        this.data = [new RoomUser()];
        this.message = "";
        this.status = false;
    }
}