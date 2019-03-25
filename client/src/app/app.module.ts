import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Ng2Rut } from 'ng2-rut';
import { HttpClientModule } from "@angular/common/http";

//service
import { RegisterService } from "./services/register.service";
import { ValidateService } from "./services/validate.service";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2Rut,
    HttpClientModule
  ],
  providers: [
    RegisterService,
    ValidateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
