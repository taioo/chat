import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';
import { AppGuardService } from './services/authentication-guard.service';
import { ChatroomGuardService } from './services/authentication-guard.service';

export const ROUTE_CONFIG: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AppGuardService]
    },{
        path: 'login', 
        component: LoginComponent,
        canActivate: [AppGuardService]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [AppGuardService]
    },
    {
        path: 'chatroom',
        component: ChatroomComponent,
        canActivate: [ChatroomGuardService]
    },
    { 
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];