export class User {
  id: number | undefined;
  name: string;
  apellidos: string;
  email: string;
  roles: string;


  constructor(id: number | undefined, nombre: string, apellidos: string, email: string, rol: string) {
    this.id = id;
    this.name = nombre;
    this.apellidos = apellidos;
    this.email = email;
    this.roles = rol;
  }

}
