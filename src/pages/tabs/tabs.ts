import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { HomePage } from "../home/home";
import { MediaProvider } from "./../../providers/media/media";
import { BookmarksPage } from "./../bookmarks/bookmarks";
import { LoginPage } from "./../login/login";
import { ProfilePage } from "./../profile/profile";

@IonicPage()
@Component({
  selector: "page-tabs",
  templateUrl: "tabs.html"
})
export class TabsPage {
  homePage = HomePage;
  profilePage = ProfilePage;
  bookmarksPage = BookmarksPage;
  loginPage = LoginPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider
  ) {}
}
