import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  errors:any = {
    name: {
      error: false,
      message: ''
    },
    phone: {
      error: false,
      message: ''
    },
    email: {
      error: false,
      message: ''
    },
    rut: {
      error: false,
      message: ''
    },
  }

  constructor() { }

  validSubmit( register:FormGroup ){
    const controls = register.controls
    let isErr = false;
    for (const key in controls) {
      if (controls.hasOwnProperty(key)) {
        const control = register.get(key);
        if( control.errors !== null ){
          isErr = true;
          let message = "";
          if( control.errors.required ){
            message +='Este campo es obligatorio.'
          } 
          if( control.errors.pattern || control.errors.email ){
            message +='El formato es incorrecto.'
          }  

          if( control.errors.minlength ){
            if( control.errors.minlength.requiredLength !== control.errors.minlength.actualLength){
              message +='El largo actual es '+ control.errors.minlength.actualLength + ' y debe ser de mínimo ' + control.errors.minlength.requiredLength + '.';
            }  
          }
          this.errors[key] = {
            error: true,
            message
          }
        }else{
          this.errors[key] = {
            error: false,
            message: ''
          }
        }
      }
    }

    if(isErr){
      return false;
    }
    return true;
  }

  formatPhone( event:any ){
    const valueLength = event.target.value.length;
    if(event.keyCode == 8) {
      return;
    }
    if( valueLength > 14){
      event.target.value = event.target.value.substring(0 , valueLength - 1 );
    }
    for (let i = 0; i < valueLength; i++) {
      let completeaValue = event.target.value;
      const letter = completeaValue.charAt(i);
      if( (letter == " "  && i != 4 && i != 9 ) || (isNaN(letter) && i != 0) ){
        event.target.value = completeaValue.replace(letter, "");
      } else {
        if( ( i == 4 || i == 9 ) && letter != " " ){
          event.target.value = completeaValue.substring(0 , i ) + " " + completeaValue.substring(i , valueLength);
        }
      }
      if( i == 0 && letter != "+" ){
        if(isNaN(letter)){
          completeaValue = "";
        }
        event.target.value = "+" + completeaValue;
      }
    }
  }

  formateaRut(event:any ) {
    const rut = event.target.value;
    const actual = rut.replace(/^0+/, "");
    const valueLength = event.target.value.length;
    const lastLetter = event.target.value.substring(valueLength - 1, valueLength );
    const isK =  event.target.value.substring(valueLength - 2, valueLength - 1) == "k" || event.target.value.substring(valueLength - 2, valueLength - 1) == "K";
    if( valueLength > 12 || isNaN(lastLetter) || isK){
      if(! ( (valueLength >= 10 && valueLength <= 12) && (lastLetter == "k" || lastLetter == "K" ) ) ){
        event.target.value = event.target.value.substring(0 , valueLength - 1 );
        return;
      }
    }
    if((lastLetter == "k" || lastLetter == "K") && isK){
      event.target.value = event.target.value.substring(0 , valueLength - 1 );
      return;
    }
    if (actual != '' && actual.length > 1) {
        const sinPuntos = actual.replace(/\./g, "");
        const actualLimpio = sinPuntos.replace(/-/g, "");
        const inicio = actualLimpio.substring(0, actualLimpio.length - 1);
        let rutPuntos = "";
        let i = 0;
        let j = 1;
        for (i = inicio.length - 1; i >= 0; i--) {
            let letra = inicio.charAt(i);
            rutPuntos = letra + rutPuntos;
            if (j % 3 == 0 && j <= inicio.length - 1) {
                rutPuntos = "." + rutPuntos;
            }
            j++;
        }
        let dv = actualLimpio.substring(actualLimpio.length - 1);
        rutPuntos = rutPuntos + "-" + dv;
        event.target.value = rutPuntos;
      }

      
  }
    
}
