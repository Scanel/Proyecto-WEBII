export class Avatar{
    idAvatar:number;
    urlHair:string;
    urlSkin:string;
    urlBody:string;
    urlLegs:string;
    urlEyes:string;
    urlFeet:string;
    iduser: number;

    constructor(){
        this.idAvatar = 0;
        this.urlHair = "";
        this.urlSkin = "";
        this.urlBody = "";
        this.urlLegs = "";
        this.urlEyes = "";
        this.urlFeet = "";
        this.iduser = 0;
    }
}

export class ResultadoAvatar{
    data: Array<Avatar>;
    message: String;
    status: boolean;

    constructor(){
        this.data = [new Avatar()];
        this.message = "";
        this.status = false;
    }
}