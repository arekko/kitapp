import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Observable } from "rxjs/Observable";
import * as fromStore from "../../store";
import {
  Comment,
  CommentDelete,
  CommentResponse
} from "./../../interfaces/media";
import { MediaProvider } from "./../../providers/media/media";

@IonicPage()
@Component({
  selector: "page-comments",
  templateUrl: "comments.html"
})
export class CommentsPage implements OnInit {
  fileId: number;
  commentsList: Comment[] = null;
  comments$: Observable<Comment[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private mediaProvider: MediaProvider,
    private store: Store<fromStore.AppState>
  ) {}

  ngOnInit() {
    this.fileId = this.navParams.get("fileId");
    this.comments$ = this.store.select(fromStore.getCommnets);
    this.store.dispatch(new fromStore.LoadComments(this.fileId))
  }

  ionViewDidLoad() {
    this.getComments(this.fileId);
  }

  getComments(fileId) {
    this.mediaProvider
      .getCommentsByFileId(fileId)
      .subscribe((res: Comment[]) => {
        this.commentsList = res;
      });
  }

  deleteComment(commentId: number) {
    this.mediaProvider
      .deleteCommentById(commentId)
      .subscribe((res: CommentDelete) => {
        this.getComments(this.fileId);
        // this.mediaProvider.fetchMediaData();
      });
  }

  addComment(f: NgForm) {
    this.mediaProvider
      .addCommentByFileId({
        file_id: this.fileId,
        comment: f.value.comment
      })
      .subscribe((res: CommentResponse) => {
        this.getComments(this.fileId);
        f.reset();
        // this.mediaProvider.fetchMediaData();
      });
  }
}
