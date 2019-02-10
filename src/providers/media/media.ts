import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import {
  User,
  UserLogin,
  UserLoginResponse,
  UserRegister,
  UserRegisterResponse
} from "./../../interfaces/user";

@Injectable()
export class MediaProvider {

  // this variable contains current user's data (check User type for more details)
  user: User;

  constructor(public http: HttpClient) {
    console.log("Hello MediaProvider Provider");
  }

  _baseAPI = "http://media.mw.metropolia.fi/wbma";

  // User

  // Login user

  login(data: UserLogin): Observable<UserLoginResponse> {
    return this.http.post<UserLoginResponse>(`${this._baseAPI}/login`, data);
  }

  // Register user

  register(data: UserRegister): Observable<UserRegisterResponse> {
    return this.http.post<UserRegisterResponse>(`${this._baseAPI}/users`, data);
  }

  // Media
}
