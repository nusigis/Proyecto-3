import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../classes/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {

  private users: Array<User> = [];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.users = this.userService.getUsers();
    this.userService.subscribeToUsers().subscribe((users) => {
      this.users = users;
    });
  }

  deleteClick(user: User) {
    this.userService.delete(user);
  }

  editClick(user: User) {
    this.userService.editUser(user);
    console.log('USER=', user);
  }

}
