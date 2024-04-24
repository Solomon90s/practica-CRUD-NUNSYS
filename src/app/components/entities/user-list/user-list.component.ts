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
  userIdToDelete?: number;

  constructor(private userService: UserService) {
    this.getAllUsers();
  }

  private getAllUsers(): void {
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

  public prepareUserToDelete(userId: number): void {
    this.userIdToDelete = userId;
  }

  public deleteUserConfirm(): void {
    if (this.userIdToDelete) {
      this.userService.deleteUser(this.userIdToDelete).subscribe({
        next: (data) =>{
          this.getAllUsers();
        },
        error: (err)=> {this.handleError(err);}
      })
    }
  }
}
