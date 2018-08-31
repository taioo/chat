export class User {

    constructor(private _username: String, private _password: String) {
    }

    public get username(): String {
        return this._username;
    }

    public get password(): String {
        return this._password;
    }
}
