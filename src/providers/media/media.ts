import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
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
import { HelperProvider } from "./../helper/helper";

@Injectable()
export class MediaProvider {
  mediaChanged = new Subject<Media[]>();
  mediaData: Media[] = [];
  _tag: string = "kitapp";

  showRecipeView = new Subject();

  constructor(
    public http: HttpClient,
    private helperProvider: HelperProvider
  ) {}

  // Media
  // Get list of files by tag
  getListOfMediaByTag(tag: string): Observable<Media[]> {
    return this.http.get<Media[]>(`${this.helperProvider.baseAPI}/tags/${tag}`);
  }

  fetchMediaData() {
    this.getListOfMediaByTag(this._tag).subscribe((media: Media[]) => {
      this.setMedia(media);
    });
  }

  getMediaData() {
    return this.mediaData.slice();
  }

  setMedia(media: Media[]) {
    this.mediaData = media;
    this.mediaChanged.next(this.mediaData.slice());
  }

  // Get single media
  getSingleMedia(id: number): Observable<Media> {
    return this.http.get<Media>(`${this.helperProvider.baseAPI}/media/${id}`);
  }

  // Request a list of ratings by file id
  getListOfRatingsByFileId(fileId: number): Observable<Rating[]> {
    return this.http.get<Rating[]>(
      `${this.helperProvider.baseAPI}/ratings/file/${fileId}`
    );
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
    return this.http.get<Comment[]>(
      `${this.helperProvider.baseAPI}/comments/file/${fileId}`
    );
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
    if (this.helperProvider.getHeaderWithToken()) {
      return this.http.delete<CommentDelete>(
        `${this.helperProvider.baseAPI}/comments/${commentId}`,
        this.helperProvider.getHeaderWithToken()
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
    if (this.helperProvider.getHeaderWithToken()) {
      return this.http.post<CommentResponse>(
        `${this.helperProvider.baseAPI}/comments`,
        data,
        this.helperProvider.getHeaderWithToken()
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
    if (this.helperProvider.getHeaderWithToken) {
      return this.http.get<Media[]>(
        `${this.helperProvider.baseAPI}/media/user`,
        this.helperProvider.getHeaderWithToken()
      );
    }
  }
}
