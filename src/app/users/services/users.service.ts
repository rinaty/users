import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { API_URL } from "src/app/core/enum/api-url";
import { httpService } from "src/app/core/services/http.service";
import { IUserResponse } from "../model/users-response";
import { IUserFormResponse } from "../model/user-form-response";
import { UsersStoreService } from "./users.store.service";
import { IUser } from "../model/user.interface";

@Injectable({
    providedIn: 'root'
})
export class usersService {

    constructor(private httpService: httpService,
            private usersStoreService:UsersStoreService
    ) {
    }

    loadAllUsers(): Observable<IUserResponse> {
        return this.httpService.get<IUserResponse>(API_URL.USERS_LIST);
    }

    loadUserForm(): Observable<IUserFormResponse> {
        return this.httpService.get<IUserFormResponse>(API_URL.NEW_USER);
    }

    setUsers(users:IUser[]) {
        this.usersStoreService.setUsers(users);
    }

    getUsers() {
        return this.usersStoreService.getUsers();
    }

    setCurrentUser(user:IUser | null) {
        this.usersStoreService.setCurrentUser(user);
    }

    getCurrentUser() {
        return this.usersStoreService.getCurrentUser();
    }

    addNewUser(user:IUser) {
        this.usersStoreService.addNewUser(user);
    }
    updateUser(oldUser:IUser,newUser: IUser) {
        this.usersStoreService.updateUser(oldUser, newUser);
    }
}