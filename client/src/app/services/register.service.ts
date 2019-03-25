import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Register } from '../interfaces/register.interfaces';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  //prod
  //urlServer:string = "https://servernode-env-1.77gjg5mcid.us-east-2.elasticbeanstalk.com/landing/subscriptions";
  //dev
  urlServer:string = "http://localhost:3000/landing/subscriptions";
  constructor(private http:HttpClient) {

  }

  newRegister( register:Register){
    let body = JSON.stringify(register);
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });

    return this.http.post( this.urlServer, body, {headers} ).pipe(map( (resp) =>{
      console.log(resp);
      if(resp.hasOwnProperty('data')){
        return resp["data"].response.code;
      }
      return 0;
    }));
  }
}
