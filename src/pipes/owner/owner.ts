import { Pipe, PipeTransform } from "@angular/core";
import { MediaProvider } from "./../../providers/media/media";

@Pipe({
  name: "owner"
})
export class OwnerPipe implements PipeTransform {
  constructor(private mediaProvider: MediaProvider) {}

  transform(userId: number, ...args) {
    if (userId === this.mediaProvider.user.user_id) {
      return true;
    }

    return false;
    // return userId === this.mediaProvider.user.user_id;
  }
}
