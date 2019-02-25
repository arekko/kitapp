import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
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
export class CommentsPage {
  fileId: number;
  commentsList: Comment[] = null;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private mediaProvider: MediaProvider
  ) {}

  ionViewDidLoad() {
    this.fileId = this.navParams.get("fileId");
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
        console.log(res);
        this.getComments(this.fileId);
      });
  }

  // FIXME:  add update feed
  addComment(f) {
    console.log(f.value.comment);
    this.mediaProvider
      .addCommentByFileId({
        file_id: this.fileId,
        comment: f.value.comment
      })
      .subscribe((res: CommentResponse) => {
        console.log(res);
        this.getComments(this.fileId);
      });
  }
}
