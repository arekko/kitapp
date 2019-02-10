import { Component } from "@angular/core";
import { Storage } from "@ionic/storage";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { TabsPage } from "../tabs/tabs";
import { MediaProvider } from "./../../providers/media/media";
import { LoginPage } from "./../login/login";

@IonicPage()
@Component({
  selector: "page-front",
  templateUrl: "front.html"
})
export class FrontPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private mediaProvider: MediaProvider,
    private storage: Storage
  ) {}

  ionViewDidLoad() {
    /*
    Here we are checking if user token exists, 
    we take from Storage user data, parse it and 
    assign it to user variables. And then we push to
    the next page
*/
    if (localStorage.getItem("token")) {
      if (!this.mediaProvider.user) {
        this.storage.get("user").then(res => {
          this.mediaProvider.user = JSON.parse(res);
          this.navCtrl.push(TabsPage);
        });
      }
    }
  }

  async _getCurrentUser() {}

  showLoginPage() {
    this.navCtrl.push(LoginPage);
  }

  showRegisterPage() {
    this.navCtrl.push(LoginPage);
  }
}
