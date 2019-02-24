import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { RecipeViewPage } from "../recipe-view/recipe-view";
import { Media } from "./../../interfaces/media";
import { MediaProvider } from "./../../providers/media/media";

// TODO: add the infinity scroll
// TODO: add single view page
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
    private mediaProvider: MediaProvider
  ) {}

  ionViewDidLoad() {
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

    this.navCtrl.push(RecipeViewPage, {
      item: event
    });
  }
}
