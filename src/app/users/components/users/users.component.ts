import { Component, OnInit } from '@angular/core';
import { usersService } from '../../services/users.service';
import { IUser } from '../../model/user.interface';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: IUser[] = [];

  constructor(private router: Router,
    private usersService: usersService) {
  }

  ngOnInit(): void {
    this.loadAllUsers();
  }

  loadAllUsers() {
    const users = this.usersService.getUsers();
    if (users) {
      this.users = users;
    } else {
      this.usersService.loadAllUsers()
        .pipe(take(1))
        .subscribe((res) => {
          this.users = res.users;
          this.usersService.setUsers(this.users);
        })
    }
  }

  trackByUser(index: number, user: IUser){
    return user.email; 
 }

  navigateToUpdateUser(user: IUser | null) {
    this.usersService.setCurrentUser(user);
    this.router.navigate(['user']);
  }

  addNewUser() {
    this.navigateToUpdateUser(null);
  }
}