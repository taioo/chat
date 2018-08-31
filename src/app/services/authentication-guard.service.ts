import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AppGuardService implements CanActivate {

    constructor(private _authenticationService: AuthenticationService, private _router: Router) { }

    canActivate(): boolean {
        if(this._authenticationService.isLoggedIn()){
            this._router.navigate(["chatroom"]);
            return false;
        }

        return true;
    }
}

@Injectable()
export class ChatroomGuardService implements CanActivate {

    constructor(private _authenticationService: AuthenticationService, private _router: Router) { }

    canActivate(): boolean {
        if(!this._authenticationService.isLoggedIn()){
            this._router.navigate(["home"]);
            return false;
        }

        return true;
    }
}