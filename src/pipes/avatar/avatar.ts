import { Pipe, PipeTransform } from "@angular/core";
import { Media } from "../../interfaces/media";
import { MediaProvider } from "./../../providers/media/media";

@Pipe({
  name: "avatar"
})
export class AvatarPipe implements PipeTransform {
  constructor(private mediaProvider: MediaProvider) {}

  transform(userId: number, tag: string, ...args) {
    return new Promise((resolve, reject) => {
      this.mediaProvider.getListOfMediaByTag(tag).subscribe((res: Media[]) => {
        console.log(res);

        res.forEach(item => {
          if (item.user_id === userId) {
            resolve(item.file_id);
          }
        });
      });
    });
  }
}
