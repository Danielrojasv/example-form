import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Register } from "../../interfaces/register.interfaces";
import { RegisterService } from "../../services/register.service";
import { ValidateService } from "../../services/validate.service";
import * as bodyParser from 'body-parser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  register:FormGroup;
  regElem:Register = {
    'name': '',
    'phone':'',
    'email':'',
    'rut':''
  };
  errors:any;
  messageFeedback:string;
  successResponse:boolean = false;
  isLoad:boolean = false;
  

  constructor(private _registerService:RegisterService, public _validateService:ValidateService) { 
    this.errors = this._validateService.errors;
    this.register = new FormGroup({
      'name': new FormControl( '', Validators.required ),
      'phone': new FormControl( '', [
        Validators.required,
        Validators.minLength(14),
        Validators.maxLength(14),
      ]),
      'email': new FormControl( '', [
        Validators.required,
        Validators.email,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ]),
      'rut': new FormControl( '', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(12)
      ]),
    });
  }

  submitValues(){
    this.isLoad = true;
    this.messageFeedback = "";
    const phoneValue = this.register.get("phone").value;
    if(phoneValue.length == 15){
      this.register.get("phone").setValue(phoneValue.substring(0, phoneValue.length-1));
    }

    const rutValue = this.register.get("rut").value;
    if(rutValue.length == 13){
      this.register.get("rut").setValue(rutValue.substring(0, rutValue.length-1));
    }
    
    if(!this._validateService.validSubmit(this.register)){
      this.isLoad = false;
      return;
    }
    this.regElem = this.register.value;
  
    this._registerService.newRegister( this.regElem ).subscribe( (resp) => {
      this.isLoad = false;
      if(resp == 0){
        this.messageFeedback = "A ocurrido un error, por favor reintentar.";
        console.log('error');
      }
      if(resp == 1){
        this.successResponse = true;
        console.log('success');
      }
      if(resp == 2){
        this.messageFeedback = "Ya estas registrado, pronto te contactaremos.";
        console.log('exist');
      }
    });

  }



  

  

}
