import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Favorites, Media } from "./../../interfaces/media";
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
    private mediaProvider: MediaProvider
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
    this.mediaProvider.deleteFavoriteByFileId(fileId).subscribe(res => {
      this.favoriteList.splice(inx, 1);
      this.mediaProvider.fetchMediaData();
    });
  }

  getUserFavorites() {
    this.mediaProvider.getUserFavorites().subscribe((res: Favorites[]) => {
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
