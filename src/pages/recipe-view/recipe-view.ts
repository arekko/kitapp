import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Media } from "./../../interfaces/media";
import { MediaProvider } from "./../../providers/media/media";
import { CommentsPage } from "./../comments/comments";


// TODO: Implement adding rating

@IonicPage()
@Component({
  selector: "page-recipe-view",
  templateUrl: "recipe-view.html"
})
export class RecipeViewPage {
  recipe: Media;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider
  ) {}

  ionViewDidLoad() {
    this.recipe = this.navParams.get("item");
    console.log(this.recipe);
  }

  showComments(fileId) {
    this.navCtrl.push(CommentsPage, {
      fileId: fileId
    });
  }
}
