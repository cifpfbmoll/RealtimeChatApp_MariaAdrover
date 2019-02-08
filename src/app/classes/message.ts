import { User } from './user';

export class Message {
    message: string;
    createAt: Date;
    sender: User;

    constructor({ message, createAt, sender }) {
        this.message = message;
        this.createAt = createAt;
        this.sender = new User(sender);
    }
}
