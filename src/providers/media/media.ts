import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import {
  AddFavoriteRequest,
  AddFavoriteResponse,
  Comment,
  CommentDelete,
  CommentRequest,
  CommentResponse,
  Favorites,
  Media,
  Rating
} from "./../../interfaces/media";
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
  isLoggedIn: boolean = false;

  _baseAPI = "http://media.mw.metropolia.fi/wbma";
  mediaFilePath = "http://media.mw.metropolia.fi/wbma/uploads/";

  constructor(public http: HttpClient) {}

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

  // Request the user information

  getUserInfoByUserId(userId: number): Observable<User> {
    if (this._getHeaderWithToken()) {
      return this.http.get<User>(
        `${this._baseAPI}/users/${userId}`,
        this._getHeaderWithToken()
      );
    }
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

  // Comments methods
  // Request a list of comments by fileId
  /**
   *
   *
   * @param {number} fileId
   * @returns {Observable<Comment[]>}
   * @memberof MediaProvider
   */
  getCommentsByFileId(fileId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this._baseAPI}/comments/file/${fileId}`);
  }
  // Delete comment
  /**
   *
   *
   * @param {number} commentId
   * @returns {Observable<CommentDelete>}
   * @memberof MediaProvider
   */
  deleteCommentById(commentId: number): Observable<CommentDelete> {
    if (this._getHeaderWithToken()) {
      return this.http.delete<CommentDelete>(
        `${this._baseAPI}/comments/${commentId}`,
        this._getHeaderWithToken()
      );
    }
  }

  // Post new comments
  /**
   *
   *
   * @param {CommentRequest} data
   * @returns {Observable<CommentResponse>}
   * @memberof MediaProvider
   */
  addCommentByFileId(data: CommentRequest): Observable<CommentResponse> {
    if (this._getHeaderWithToken()) {
      return this.http.post<CommentResponse>(
        `${this._baseAPI}/comments`,
        data,
        this._getHeaderWithToken()
      );
    }
  }

  // Reuest a list of favorites
  /**
   *
   *
   * @returns {Observable<Favorites[]>}
   * @memberof MediaProvider
   */
  getUserFavorites(): Observable<Favorites[]> {
    if (this._getHeaderWithToken) {
      return this.http.get<Favorites[]>(
        `${this._baseAPI}/favourites`,
        this._getHeaderWithToken()
      );
    }
  }

  // Delete from favorite

  /**
   *
   *
   * @param {number} fileId
   * @memberof MediaProvider
   */
  deleteFavoriteByFileId(fileId: number) {
    if (this._getHeaderWithToken()) {
      return this.http.delete(
        `${this._baseAPI}/favourites/file/${fileId}`,
        this._getHeaderWithToken()
      );
    }
  }

  // Create new favorite
  /**
   *
   *
   * @param {AddFavoriteRequest} data
   * @returns {Observable<AddFavoriteResponse>}
   * @memberof MediaProvider
   */
  addBookmark(data: AddFavoriteRequest): Observable<AddFavoriteResponse> {
    if (this._getHeaderWithToken()) {
      return this.http.post<AddFavoriteResponse>(
        `${this._baseAPI}/favourites`,
        data,
        this._getHeaderWithToken()
      );
    }
  }

  // List of file of current user

  /**
   *
   *
   * @returns {Observable<Media[]>}
   * @memberof MediaProvider
   */
  getCurrentUserMedia(): Observable<Media[]> {
    if (this._getHeaderWithToken) {
      return this.http.get<Media[]>(
        `${this._baseAPI}/media/user`,
        this._getHeaderWithToken()
      );
    }
  }
}
