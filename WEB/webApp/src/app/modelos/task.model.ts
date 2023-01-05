export class Task{
    idtask:number;
    idroom: string;
    titulo: string;
    descripcion: string;
    r1:string;
    r2:string;
    r3:string;
    r4:string;

    constructor(){
        this.idtask = 0;
        this.idroom = "";
        this.titulo = "";
        this.descripcion = "";
        this.r1 = "";
        this.r2 = "";
        this.r3 = "";
        this.r4 = "";
    }
}

export class ResultadoTask{
    data: Array<Task>;
    message: String;
    status: boolean;

    constructor(){
        this.data = [new Task()];
        this.message = "";
        this.status = false;
    }
}