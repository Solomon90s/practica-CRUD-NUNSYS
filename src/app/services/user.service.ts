import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../components/entities/model/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public getAllUsers(): Observable<User[]> {
    let URI: string = 'http://localhost:8080/user/users';
    return this.http.get<User[]>(URI);
  }


  public getUserById(id: number): Observable<User> {
    let URI: string = 'http://localhost:8080/user/users/' + id;
    return this.http.get<User>(URI);
  }

  public insertUser(user: User): Observable<User> {
    let URI: string = 'http://localhost:8080/user/users';
    return this.http.post<User>(URI, user);
  }

  public updateUser(user: User): Observable<User> {
    let URI: string = 'http://localhost:8080/user/users';
    return this.http.patch<User>(URI, user);
  }




}
