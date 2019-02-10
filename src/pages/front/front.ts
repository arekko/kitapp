import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { TabsPage } from "../tabs/tabs";
import { LoginPage } from "./../login/login";

/**
 * Generated class for the FrontPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-front",
  templateUrl: "front.html"
})
export class FrontPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    localStorage.getItem("token") && this.navCtrl.push(TabsPage);
  }

  showLoginPage() {
    this.navCtrl.push(LoginPage);
  }

  showRegisterPage() {
    this.navCtrl.push(LoginPage);
  }
}
