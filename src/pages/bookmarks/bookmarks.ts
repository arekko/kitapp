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

  getUserFavorites() {
    this.mediaProvider.getUserFavorites().subscribe((res: Favorites[]) => {
      console.log(res);

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
