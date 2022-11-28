export class User{
    iduser:number;
    name: string;
    Apellido1:string;
    Apellido2:string;
    Email:string;
    Password:string;
    idRol:number;
    idavatar:number;

    constructor(){
        this.iduser = 0;
        this.name = "";
        this.Apellido1 = "";
        this.Apellido2 = "";
        this.Email = "";
        this.Password = "";
        this.idRol = 0;
        this.idavatar = 0;
    }
}

export class ResultadoUser{
    data: Array<User>;
    message: String;
    status: boolean;

    constructor(){
        this.data = [new User()];
        this.message = "";
        this.status = false;
    }
}