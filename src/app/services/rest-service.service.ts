import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { Channel } from '../models/channel';
import { User } from '../models/user';
import { Message } from '../models/message'


@Injectable()
export class RestService {

    constructor(private http: Http) { }

    public checkIfUserExists(user: User){
        return this.post("/api/sql/user" , user);
    }

    public afterLogin(user: User){
        return this.post("/afterlogin", user);
    }

    public logout(){
        return this.get("/logout");
    }

    public getUsers() {
        return this.get("/api/sql/user/all");
    }

    public getChannels(username: String) {
        return this.get("/api/channels?username=" + username);
    }

    public createChannel(channel: Channel) {
        return this.post("/api/channel", channel);
    }

    public writeMessage(message: Message) {
        return this.post("/api/message", message);
    }

    public createUser(user: User){
        return this.post("/api/sql/user/new" , user);
    }

    private get(path: string): Observable<any> {
        path = "http://localhost:3000" + path;
        return this.http.get(path)
            .map(response => response.json().data)
            .catch(this.handleError);
    }

    private post(path: string, data: any): Observable<any> {
        return this.http.post(path, data).map(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
