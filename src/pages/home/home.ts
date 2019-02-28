import { Component } from "@angular/core";
import { Storage } from "@ionic/storage";
import { NavController } from "ionic-angular";
import { RecipeViewPage } from "../recipe-view/recipe-view";
import { AddFavoriteResponse, Media } from "./../../interfaces/media";
import { MediaProvider } from "./../../providers/media/media";
import { BookmarksPage } from "./../bookmarks/bookmarks";

// TODO: add the infinity scroll
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  _tag: string = "kitapp";
  // here we are storing all media with tag _tag
  mediaList: Media[] = null;
  mArr: any;

  constructor(
    public navCtrl: NavController,
    private mediaProvider: MediaProvider,
    private storage: Storage
  ) {}

  ionViewDidLoad() {
    if (localStorage.getItem("token")) {
      if (!this.mediaProvider.user) {
        this.storage.get("user").then(res => {
          this.mediaProvider.user = JSON.parse(res);
          this.mediaProvider.isLoggedIn = true;
        });
      }
    }
    this.getAllMedia(this._tag);
  }

  // Fetching all media and strore them to mediaList variable
  getAllMedia(tag) {
    this.mediaProvider.getListOfMediaByTag(tag).subscribe((res: Media[]) => {
      this.mediaList = res;
      console.log(res);
    });
  }

  showRecipe(event) {
    console.log(event);

    this.mediaProvider.isLoggedIn
      ? this.navCtrl.push(RecipeViewPage, {
          item: event
        })
      : this.navCtrl.parent.select(1);
  }

  addBookmark(fileId: number) {
    console.log(fileId);

    this.mediaProvider
      .addBookmark({
        file_id: fileId
      })
      .subscribe((res: AddFavoriteResponse) => {
        console.log(res);
        this.getAllMedia(this._tag);
        this.navCtrl.push(BookmarksPage);
      });
  }
}
