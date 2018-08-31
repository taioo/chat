import { User } from './user';

export class Message {

    constructor(private _channel: String, private _sender: String, private _message: String,  private _creationDate : Date) {}

    public get channel(): String {
        return this._channel;
    }

    public get sender(): String {
        return this._sender;
    }

    public get message(): String {
        return this._message;
    }

    public get creationDate() : Date {
        return this._creationDate;
    }
}
