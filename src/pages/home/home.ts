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
  searchList: Media[] = [];
  mArr: any;

  search = {
    "title": ""
  }
  searchBar = '';
  media: Media;
  defaultValue = null;

  constructor(
    public navCtrl: NavController,
    private mediaProvider: MediaProvider
  ) {}

  ionViewDidLoad() {
    console.log(this.searchBar);
    this.getAllMedia(this._tag, null);
  }

  // Fetching all media and store them to mediaList variable, if search word
  // is entered filters two arrays by their intersecting objects.
  getAllMedia(tag, title) {
    this.mediaProvider.getListOfMediaByTag(tag).subscribe((res: Media[]) => {
        this.mediaList = res;
        console.log(res);
        if (title == null) {
          this.mediaList;
        } else if (this.searchBar == ' ') {
          this.mediaList = this.searchList;
        } else {
          this.searchList = this.mediaList.filter(
            value => title.some(value2 => value.title === value2.title));
            console.log(this.searchList);
          this.mediaList = this.searchList;
          console.log(this.mediaList);
        };
    });
  }

  showRecipe(event) {
    console.log(event);

    this.navCtrl.push(RecipeViewPage, {
      item: event
    });
  }


  // Checks the searchbar and sends a request for an media array of files
  // containing the searched string in title.
  searchMedia(){
    console.log(this.searchBar);
    if(this.searchBar != '') {
      this.search.title = this.searchBar;
      console.log(this.search);
      this.mediaProvider.search(this.search).subscribe(
        (response: Media[]) => {
          console.log(response);
          this.getAllMedia(this._tag, response);
        });
      } else {
        this.getAllMedia(this._tag, null);
      };
    };
}
