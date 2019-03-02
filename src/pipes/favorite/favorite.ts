import { Pipe, PipeTransform } from "@angular/core";
import { BookmarkProvider } from "./../../providers/bookmark/bookmark";

@Pipe({
  name: "favorite"
})
export class FavoritePipe implements PipeTransform {
  constructor(private bookmarkProvider: BookmarkProvider) {}

  transform(value: number, ...args: any[]) {
    const bookmarkList = this.bookmarkProvider.getBookmarks();

    let isFavorite: Boolean = false;
    bookmarkList.forEach(bm => {
      if (bm.file_id === value) {
        isFavorite = true;
      }
    });

    return isFavorite;
  }
}
