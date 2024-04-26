import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {User} from "../model/user.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  id?: number;
  mode: "NEW" | "UPDATE" = "NEW";
  user?: User;

  userForm?: FormGroup;

  constructor(private ar: ActivatedRoute,
              private userService: UserService,
              private formBuilder: FormBuilder) {

    this.buildForm();
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
      next: (userRequest) =>{
        this.user = userRequest;
        this.updateForm(userRequest);
      },
      error: (err) => {this.handleError(err);}
    })
  }

  private handleError(err: any):void {
    console.error(err);

  }

  private initializeUser():void {
    this.user = new User(undefined,"","","","");
  }

  public saveUser():void {
    const userToSave: User = this.createFromForm();
    if (this.mode === "NEW") {
      this.insertUser(userToSave);
    }

    if (this.mode === "UPDATE") {
      this.updateUser(userToSave);
    }
  }


  private insertUser(userToSave: User): void {
    this.userService.insertUser(userToSave).subscribe({
      next: (userInserted) =>{
        console.log("Insertado correctamente");
        console.log(userInserted);
      },
      error: (err) => {this.handleError(err);}
    })
  }

  private updateUser(userTosave: User): void {
    this.userService.updateUser(userTosave).subscribe({
      next: (userUpdated) =>{
        console.log("Modificado correctamente");
        console.log(userUpdated);
      },
      error: (err) => {this.handleError(err);}
    })

  }

  // Paso 1 para formularios reactivos, creacion formulario
  private buildForm(): void {
    this.userForm = this.formBuilder.group({
      id: [{value: undefined, disabled: true}],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      apellidos: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      email: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(50) , Validators.email]],
      roles: [Validators.required]
    });
  }

  // Paso 2 para formularios reactivos, actualización de datos del componente.ts al HTML
  private updateForm(user: User): void {
    this.userForm?.patchValue({
      id: user.id,
      name: user.name,
      apellidos: user.apellidos,
      email: user.email,
      roles: user.roles
    });
  }

  // Paso 3 para formularios reactivos, actualización de datos del HTML al componente.ts
  private createFromForm(): User {
    return {
      // esto devuelve o crea un item
      // ...this.user lo separa en diferentes atribubos
      ...this.user,
      id: this.userForm?.get(['id'])!.value,
      name: this.userForm?.get(['name'])!.value,
      apellidos: this.userForm?.get(['apellidos'])!.value,
      email: this.userForm?.get(['email'])!.value,
      roles: this.userForm?.get(['roles'])!.value,
    };
  }
}
