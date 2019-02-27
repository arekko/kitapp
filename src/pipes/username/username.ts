import { Pipe, PipeTransform } from "@angular/core";
import { User } from "../../interfaces/user";
import { MediaProvider } from "./../../providers/media/media";

@Pipe({
  name: "username"
})
export class UsernamePipe implements PipeTransform {
  constructor(private mediaProvider: MediaProvider) {}

  transform(userId: number, type: string, ...args) {
    return new Promise((resolve, reject) => {
      this.mediaProvider.getUserInfoByUserId(userId).subscribe((res: User) => {
        console.log("userid " + userId + " type " + type + res);

        switch (type) {
          case "username":
            resolve(res.username);
          case "fullname":
            res.full_name ? resolve(res.full_name) : resolve(res.username);
        }
      });
    });
  }
}
