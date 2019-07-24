import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import {AdminModule} from './admin/admin.module';
import { LoginComponent } from './login/login.component';
import {routing} from './app.routing';
import { NewContentComponent } from './new-content/new-content.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NewContentComponent
  ],
  imports: [
    BrowserModule,
    AdminModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
],
})
export class AppModule { }
