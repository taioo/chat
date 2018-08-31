import { Component } from '@angular/core';
import { User } from '../../models/user';
import { RestService } from '../../services/rest-service.service'

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  username: String = "";
  password: String = "";

  error: boolean = false;
  errorMessage: String = "";
  success: boolean = false;

  constructor(private _restService: RestService) { }

  register() {
    this.success = false;
    let user = new User(this.username, this.password);

    if (!user.username || !user.password) {
      this.error = true;
      this.errorMessage = "Incomplete"
    } else {
      this._restService.createUser(user).subscribe(data => {
        if(data.status){
          this.success = true;
          this.error = false;
        } else {
          this.success = false;
          this.error = true;
          this.errorMessage = data.message;
        }
      });
    }
  }
}
