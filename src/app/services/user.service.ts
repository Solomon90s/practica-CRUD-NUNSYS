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
    const URI: string = 'http://localhost:8080/user/users';
    return this.http.get<User[]>(URI);
  }


}
