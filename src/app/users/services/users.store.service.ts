import { Injectable } from "@angular/core";
import { IUser } from "../model/user.interface";

@Injectable({
    providedIn: 'root'
})
export class UsersStoreService {
    private currentUser: IUser | null = null;
    private users: IUser[] | null = null;

    setUsers(users: IUser[]) {
        this.users = users;
    }

    getUsers() {
        return this.users;
    }

    setCurrentUser(user: IUser | null) {
        this.currentUser = user;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    addNewUser(user: IUser) {
        if (this.users) {
            this.users.push(user);
        }
    }

    updateUser(oldUser: IUser, newUser: IUser) {
        if (this.users) {
            const userIndex = this.users.findIndex(user => user.email === oldUser.email);
            if (userIndex > -1) {
                this.users[userIndex] = newUser;
            }
        }
    }
}