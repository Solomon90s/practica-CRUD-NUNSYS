export class User {
  public id: number | undefined;
  public name: string;
  public apellidos: string;
  public email: string;
  public roles: string;


  constructor(id: number | undefined, nombre: string, apellidos: string, email: string, rol: string) {
    this.id = id;
    this.name = nombre;
    this.apellidos = apellidos;
    this.email = email;
    this.roles = rol;
  }

}
