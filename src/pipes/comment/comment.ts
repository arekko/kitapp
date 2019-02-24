import { Pipe, PipeTransform } from "@angular/core";
import { Comment } from "../../interfaces/media";
import { MediaProvider } from "../../providers/media/media";

@Pipe({
  name: "comment"
})
export class CommentPipe implements PipeTransform {
  constructor(private mediaProvider: MediaProvider) {}

  transform(value: number, ...args) {
    return new Promise((resolve, reject) => {
      this.mediaProvider
        .getCommentsByFileId(value)
        .subscribe((res: Comment[]) => {
          resolve(res.length);
        });
    });
  }
}
