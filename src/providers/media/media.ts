import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Comment, Favorites, Media, Rating, TagMessage, MediaUpload } from "./../../interfaces/media";
import {
  User,
  UserLogin,
  UserLoginResponse,
  UserRegister,
  UserRegisterResponse,
} from "./../../interfaces/user";

@Injectable()
export class MediaProvider {
  // this variable contains current user's data (check User type for more details)
  user: User;
  isLoggedIn: boolean = false;

  _baseAPI = "http://media.mw.metropolia.fi/wbma";
  mediaFilePath = "http://media.mw.metropolia.fi/wbma/uploads/";



  constructor(public http: HttpClient) {
    console.log("Hello MediaProvider Provider");
  }

  private _getHeaderWithToken(): object | null {
    const token = localStorage.getItem("token");
    let options: object | null = null;

    if (token) {
      options = {
        headers: new HttpHeaders({
          "x-access-token": token
        })
      };
    }
    return options;
  }

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
  getCommentsByFileId(fileId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this._baseAPI}/comments/file/${fileId}`);
  }

  // Reuest a list of favorites
  getUserFavorites(): Observable<Favorites[]> {
    if (this._getHeaderWithToken) {
      return this.http.get<Favorites[]>(
        `${this._baseAPI}/favourites`,
        this._getHeaderWithToken()
      );
    }
  }

  // List of file of current user
  getCurrentUserMedia() {
    if (this._getHeaderWithToken) {
      return this.http.get<Media[]>(
        `${this._baseAPI}/media/user`,
        this._getHeaderWithToken()
      );
    }
  }

  // Post a upload reguest
  upload(data: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token'),
      }),
    };

    return this.http.post<MediaUpload>(this._baseAPI + '/media', data, httpOptions)
  }

  // Post a new tag
  postNewTag(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token'),
      }),
    };

    return this.http.post<TagMessage>(this._baseAPI + '/tags', data, httpOptions)
  }

    // Search for files by their title
    search(data: any){
      const httpOptions = {
        headers: new HttpHeaders({
          'x-access-token': localStorage.getItem('token'),
        }),
      };
  
      return this.http.post<Media[]>(this._baseAPI + '/media/search', data, httpOptions)
  
    }

}
