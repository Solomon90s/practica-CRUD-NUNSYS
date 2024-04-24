import { Component } from '@angular/core';
import {User} from "../model/user.model";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  users: User[] = [];

  constructor(private userService: UserService) {
    this.getUsers();
  }

  private getUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (userRequest) =>{
        this.users = userRequest;
      },
      error: (err)=> {this.handleError(err);}
    })
  }
  private handleError(error: any): void {
    console.log(error);
  }
}
