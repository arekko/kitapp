import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Favorites, Media } from "./../../interfaces/media";
import { BookmarkProvider } from "./../../providers/bookmark/bookmark";
import { MediaProvider } from "./../../providers/media/media";

@IonicPage()
@Component({
  selector: "page-bookmarks",
  templateUrl: "bookmarks.html"
})
export class BookmarksPage {
  favoriteList: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private mediaProvider: MediaProvider,
    private bookmarkProvider: BookmarkProvider
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad BookmarksPage");
    this.getUserFavorites();
  }

  /**
   *
   *
   * @param {number} fileId
   * @memberof BookmarksPage
   */
  deleteBookmark(fileId: number) {
    const inx = this.favoriteList.findIndex(el => el.file_id === fileId);
    this.bookmarkProvider.deleteFavoriteByFileId(fileId).subscribe(res => {
      this.favoriteList.splice(inx, 1);
      this.mediaProvider.fetchMediaData();
    });
  }

  getUserFavorites() {
    this.bookmarkProvider.getUserFavorites().subscribe((res: Favorites[]) => {
      console.log(res);
      this.favoriteList = [];

      res.forEach(item => {
        this.mediaProvider
          .getSingleMedia(item.file_id)
          .subscribe((res: Media) => {
            this.favoriteList.push(res);
            console.log(this.favoriteList);
          });
      });
    });
  }
}
