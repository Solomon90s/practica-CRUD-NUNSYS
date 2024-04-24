import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {User} from "../model/user.model";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  id?: number;
  mode: "NEW" | "UPDATE" = "NEW";
  user?: User;

  constructor(private ar: ActivatedRoute,
              private userService: UserService) {
    const entryParam: string = this.ar.snapshot.paramMap.get("id") ?? "new";

    if (entryParam !== "new") {
      this.id = +this.ar.snapshot.paramMap.get("id")!;
      this.mode = "UPDATE";
      this.getUserById(this.id!);
    } else {
      this.mode = "NEW";
      this.initializeUser();
    }
  }

  private getUserById(id: number) {
    this.userService.getUserById(id).subscribe({
      next: (userRequest) =>{this.user = userRequest},
      error: (err) => {this.handleError(err);}
    })
  }

  private handleError(err: any):void {
    // ToDo
  }

  private initializeUser():void {
    this.user = new User(undefined,"","","","");
  }

  public saveUser():void {
    if (this.mode === "NEW") {
      this.insertUser();
    }

    if (this.mode === "UPDATE") {
      this.updateUser();
    }

  }


  private insertUser(): void {
    this.userService.insertUser(this.user!).subscribe({
      next: (userInserted) =>{
        console.log("Insertado correctamente");
        console.log(userInserted);
      },
      error: (err) => {this.handleError(err);}
    })
  }

  private updateUser(): void {
    this.userService.updateUser(this.user!).subscribe({
      next: (userUpdated) =>{
        console.log("Modificado correctamente");
        console.log(userUpdated);
      },
      error: (err) => {this.handleError(err);}
    })

  }
}
