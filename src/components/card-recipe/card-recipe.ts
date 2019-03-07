import { Component, EventEmitter, Input, Output } from "@angular/core";
import { BookmarkProvider } from "./../../providers/bookmark/bookmark";
import { MediaProvider } from "./../../providers/media/media";
import { UserProvider } from "./../../providers/user/user";

@Component({
  selector: "card-recipe",
  templateUrl: "card-recipe.html"
})
export class CardRecipeComponent {
  @Input() item;
  @Input() isLoggedIn
  @Output() fileId = new EventEmitter<number>();

  constructor(
    public userProvider: UserProvider,
    private mediaProvider: MediaProvider,
    private bookmarkProvider: BookmarkProvider
  ) {}

  addBookmark(fileId: number) {
    this.bookmarkProvider.bookmarkHandler.next(fileId);
  }

  showRecipePage(fileId: number) {
    this.mediaProvider.showRecipeView.next(fileId);
  }
}
