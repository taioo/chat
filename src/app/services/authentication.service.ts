import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { RestService } from '../services/rest-service.service'


@Injectable()
export class AuthenticationService {

    private loggedIn: boolean = false;
    private user: User;

    public constructor(private _router: Router, private _restService: RestService) { }

    public logout() {
        this.loggedIn = false;
    }

    public login(user: User) {
        let authenticatedUser;
        this._restService.checkIfUserExists(user).subscribe(
            data => {
                console.log(data);
                if (data.status) {
                    this.user = user;
                    this._restService.afterLogin(user).subscribe();
                    this.loggedIn = true;
                    this._router.navigate(["/chatroom"]);
                    return true;
                } else {
                    return false;
                }
            }
        );
    }

    public getUser(): User {
        return this.user;
    }

    public isLoggedIn(): boolean {
        return this.loggedIn;
    }
}
