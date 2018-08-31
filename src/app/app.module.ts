import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ROUTE_CONFIG } from './app.route';
import { HttpModule } from '@angular/http';
import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';
import { AuthenticationService } from './services/authentication.service';
import { AppGuardService } from './services/authentication-guard.service';
import { ChatroomGuardService } from './services/authentication-guard.service';
import { RestService } from './services/rest-service.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ChatroomComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTE_CONFIG),
  ],
  providers: [AuthenticationService, AppGuardService, ChatroomGuardService, RestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
