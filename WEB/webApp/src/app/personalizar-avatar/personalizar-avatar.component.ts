import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Avatar } from '../modelos/avatar.model';
import { AvatarService } from '../servicios/avatar.service';

@Component({
  selector: 'app-personalizar-avatar',
  templateUrl: './personalizar-avatar.component.html',
  styleUrls: ['./personalizar-avatar.component.css']
})
export class PersonalizarAvatarComponent implements OnInit {

  @Input() myForm: any;

  styleHair: number;
  colorHair: number;
  colorEyes: number;
  styleTShirt: number;
  colorTShirt: number;
  colorPants: number;

  avatar: Avatar;
  resultados:any;
  datos: any;
  urlAsset: string = "../../assets/Avatar/Masculino/";

  hair: string = this.urlAsset + "hair/1/HairM01-brown.png";
  urlHair: Array<Array<string>> = [
    [
      "hair/1/HairM01-brown.png", 
      "hair/1/HairM01-black.png", 
      "hair/1/HairM01-blue.png", 
      "hair/1/HairM01-red.png", 
      "hair/1/HairM01-green.png"
    ],
    [
      "hair/2/HairM02-brown.png", 
      "hair/2/HairM02-black.png", 
      "hair/2/HairM02-blue.png", 
      "hair/2/HairM02-red.png", 
      "hair/2/HairM02-green.png"
    ],
    [
      "hair/3/HairM03-brown.png", 
      "hair/3/HairM03-black.png", 
      "hair/3/HairM03-blue.png", 
      "hair/3/HairM03-red.png", 
      "hair/3/HairM03-green.png"
    ],
    [
      "hair/4/HairM04-brown.png", 
      "hair/4/HairM04-black.png", 
      "hair/4/HairM04-blue.png", 
      "hair/4/HairM04-red.png", 
      "hair/4/HairM04-green.png"
    ],
    [
      "hair/5/HairM05-brown.png", 
      "hair/5/HairM05-black.png", 
      "hair/5/HairM05-blue.png", 
      "hair/5/HairM05-red.png", 
      "hair/5/HairM05-green.png"
    ]
  ];

  eyes: string = this.urlAsset + "eyes/1/EyesM01-brown.png";
  urlEyes: Array<string> = ["eyes/1/EyesM01-brown.png", "eyes/1/EyesM01-black.png", "eyes/1/EyesM01-blue.png", "eyes/1/EyesM01-red.png", "eyes/1/EyesM01-green.png"];

  tshirt: string = this.urlAsset + "t-shirt/1/TShirtM01-brown.png";
  urlTShirt: Array<Array<string>> = [
    [
      "t-shirt/1/TShirtM01-brown.png",
      "t-shirt/1/TShirtM01-black.png",
      "t-shirt/1/TShirtM01-blue.png",
      "t-shirt/1/TShirtM01-green.png",
      "t-shirt/1/TShirtM01-red.png"
    ],
    [
      "t-shirt/2/TShirtM02-orange.png",
      "t-shirt/2/TShirtM02-black.png",
      "t-shirt/2/TShirtM02-blue.png",
      "t-shirt/2/TShirtM02-green.png",
      "t-shirt/2/TShirtM02-red.png"
    ],
    [
      "t-shirt/3/TShirtM03-brown.png",
      "t-shirt/3/TShirtM03-black.png",
      "t-shirt/3/TShirtM03-blue.png",
      "t-shirt/3/TShirtM03-green.png",
      "t-shirt/3/TShirtM03-orange.png"
    ],
    [
      "t-shirt/4/TShirtM04-orange.png",
      "t-shirt/4/TShirtM04-black.png",
      "t-shirt/4/TShirtM04-blue.png",
      "t-shirt/4/TShirtM04-green.png",
      "t-shirt/4/TShirtM04-red.png"
    ],
    [
      "t-shirt/5/TShirtM05-orange.png",
      "t-shirt/5/TShirtM05-black.png",
      "t-shirt/5/TShirtM05-blue.png",
      "t-shirt/5/TShirtM05-green.png",
      "t-shirt/5/TShirtM05-red.png"
    ]
  ];

  pants: string = this.urlAsset + "pants/1/PantsM01-blue.png";
  urlPants: Array<string> = ["pants/1/PantsM01-blue.png", "pants/1/PantsM01-black.png", "pants/1/PantsM01-gray.png", "pants/1/PantsM01-green.png", "pants/1/PantsM01-red.png"];

  constructor(private router: Router, private AvatarService: AvatarService, private toastr: ToastrService) {
    this.styleHair = 0;
    this.colorHair = 0;
    this.colorEyes = 0;
    this.styleTShirt = 0;
    this.colorTShirt = 0;
    this.colorPants = 0;
    this.avatar = new Avatar();
   }

  ngOnInit(): void {
    const session = localStorage.getItem("session");
    if(session === null){
      this.router.navigate(["login"]);
    }else{
      this.datos = JSON.parse(session);
      this.ConsultarAvatar();
    }
  }

  Aumentar = (variable: string) => {
    switch(variable){
      case 'styleHair':
        this.styleHair++;
        if(this.styleHair > 4){
          this.styleHair = 0;
        }
      break;
      case 'colorHair':
        this.colorHair++;
        if(this.colorHair > 4){
          this.colorHair = 0;
        }
      break;
      case 'colorEyes':
        this.colorEyes++;
        if(this.colorEyes > 4){
          this.colorEyes = 0;
        }
      break;
      case 'styleTShirt':
        this.styleTShirt++;
        if(this.styleTShirt > 4){
          this.styleTShirt = 0;
        }
      break;
      case 'colorTShirt':
        this.colorTShirt++;
        if(this.colorTShirt > 4){
          this.colorTShirt = 0;
        }
      break;
      case 'colorPants':
        this.colorPants++;
        if(this.colorPants > 4){
          this.colorPants = 0;
        }
      break;
    }
    this.avatar.urlHair = this.urlAsset + this.urlHair[this.styleHair][this.colorHair];
    this.avatar.urlEyes = this.urlAsset + this.urlEyes[this.colorEyes];
    this.avatar.urlBody = this.urlAsset + this.urlTShirt[this.styleTShirt][this.colorTShirt];
    this.avatar.urlLegs = this.urlAsset + this.urlPants[this.colorPants];

    console.log(this.tshirt);
  }

  Disminuir = (variable: string) => {
    switch(variable){
      case 'styleHair':
        this.styleHair--;
        if(this.styleHair < 0){
          this.styleHair = 4;
        }
      break;
      case 'colorHair':
        this.colorHair--;
        if(this.colorHair < 0){
          this.colorHair = 4;
        }
      break;
      case 'colorEyes':
        this.colorEyes--;
        if(this.colorEyes < 0){
          this.colorEyes = 4;
        }
      break;
      case 'styleTShirt':
        this.styleTShirt--;
        if(this.styleTShirt < 0){
          this.styleTShirt = 4;
        }
      break;
      case 'colorTShirt':
        this.colorTShirt--;
        if(this.colorTShirt < 0){
          this.colorTShirt = 4;
        }
      break;
      case 'colorPants':
        this.colorPants--;
        if(this.colorPants < 0){
          this.colorPants = 4;
        }
      break;
    }
    this.avatar.urlHair = this.urlAsset + this.urlHair[this.styleHair][this.colorHair];
    this.avatar.urlEyes = this.urlAsset + this.urlEyes[this.colorEyes];
    this.avatar.urlBody = this.urlAsset + this.urlTShirt[this.styleTShirt][this.colorTShirt];
    this.avatar.urlLegs = this.urlAsset + this.urlPants[this.colorPants];
    console.log(this.tshirt);
  }

  ConsultarAvatar(){
    this.AvatarService.ConsultarAvatar(this.datos.iduser).subscribe(data => {
      this.resultados = data;
      if(this.resultados.status){
        this.avatar.iduser = data.data[0].iduser;
        this.avatar.urlSkin = data.data[0].urlSkin;
        this.avatar.urlEyes = data.data[0].urlEyes;
        this.avatar.urlFeet = data.data[0].urlFeet;
        this.avatar.urlHair = data.data[0].urlHair;
        this.avatar.urlLegs = data.data[0].urlLegs;
        this.avatar.urlBody = data.data[0].urlBody;
      }else{
        this.toastr.error(this.resultados.message);
      }
    })
  }

  ActualizarAvatar(){
    this.AvatarService.ActualizarAvatar(this.avatar.iduser, this.avatar).subscribe(data => {
      this.resultados = data;
      if(this.resultados.status){
        this.toastr.success(this.resultados.message);
      }else{
        this.toastr.error(this.resultados.message);
      }
    })
  }

}
