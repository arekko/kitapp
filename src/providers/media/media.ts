import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Media, Rating } from "./../../interfaces/media";
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
  _mediaFilePath = "http://media.mw.metropolia.fi/wbma/uploads/";

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
  // Get list of files by tag
  getListOfMediaByTag(tag: string): Observable<Media[]> {
    return this.http.get<Media[]>(`${this._baseAPI}/tags/${tag}`);
  }

  // Get single media
  getSingleMedia(id: number): Observable<Media> {
    return this.http.get<Media>(`${this._baseAPI}/media/${id}`);
  }

  // Request a list of ratings by file id
  getListOfRatingsByFileId(fileId: number): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this._baseAPI}/ratings/file/${fileId}`);
  }

  // Request a list of comments by fileId
  getCommentsByFileId(fileId: string) {
    return this.http.get(`${this._baseAPI}/comments/file/${fileId}`)
  }
}