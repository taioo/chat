import { Component, ElementRef } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {

    private username: string = "";
    private password: string = "";
    private error: boolean = false;

    public constructor(private _service: AuthenticationService, private _router: Router) { }

    private login() {
        if (!this._service.login(new User(this.username, this.password))) {
            this.error = true;
        } else {
            this._router.navigate(["chatroom"]);
        }
    }
}