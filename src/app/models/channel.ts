import { Message } from './message'

export class Channel {

    constructor(private _id: String, private _name: string, private _participants: String[], private _conversation: Message[], private _isPublic: boolean) { }

    public get id() {
        return this._id;
    }

    public get name() {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

    public get participants() {
        return this._participants;
    }

    public get conversation() {
        return this._conversation;
    }

    public get isPublic() {
        return this._isPublic;
    }
}
