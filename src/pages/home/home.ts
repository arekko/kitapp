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

    // Modified
    search = {
      "title": ""
    }
    searchBar = '';
    media: Media;
    //

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
      if(res[0].tag = 'kitapp'){
        this.getSingleMedia(res[0].file_id)
      }
    });
  }

  getSingleMedia(id){
    this.mediaProvider.getSingleMedia(id).subscribe(
      (response: Media) => {
        console.log(response);
      });
  }

  showRecipe(event) {
    console.log(event);

    this.navCtrl.push(RecipeViewPage, {
      item: event
    });
  }


  // Modified
  searchMedia(){
    console.log(this.searchBar);
    if(this.searchBar != ''){
      this.search.title = this.searchBar;
      console.log(this.search);
      console.log(this.search.title);
      this.mediaProvider.search(this.search).subscribe(
        (response: Media[]) => {
          console.log(response);
        });
      }
    }
  //


}
