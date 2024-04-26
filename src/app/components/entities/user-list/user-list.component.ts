import {Component} from '@angular/core';
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


  nameFilter?: string;

  constructor(private userService: UserService) {
    this.getAllUsers();
  }

  private getAllUsers(): void {

    const filters: string | undefined = this.buildFilters();

    this.userService.getAllUsers(filters).subscribe({
      next: (userRequest) => {
        this.users = userRequest;
      },
      error: (err) => {
        this.handleError(err);
      }
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
        next: (data) => {
          this.getAllUsers();
        },
        error: (err) => {
          this.handleError(err);
        }
      })
    }
  }

  public searchByFilters(): void {
    this.getAllUsers();

  }

  private buildFilters(): string | undefined {
    const filters: string[] = [];

    if (this.nameFilter) {
      filters.push("name:MATCH:" + this.nameFilter);
    }

    if (filters.length > 0) {

      let globalFilters: string = "";
      for (let filter of filters) {
        globalFilters = globalFilters + filter + ","
      }
      globalFilters = globalFilters.substring(0, globalFilters.length-1);
      return globalFilters;

    } else {
      return undefined;
    }
  }
}
