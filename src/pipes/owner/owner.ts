import { Pipe, PipeTransform } from "@angular/core";
import { UserProvider } from "../../providers/user/user";

@Pipe({
  name: "owner"
})
export class OwnerPipe implements PipeTransform {
  constructor(private userProvider: UserProvider) {}

  transform(userId: number, ...args) {
    if (userId === this.userProvider.user.user_id) {
      return true;
    }
    return false;
  }
}
