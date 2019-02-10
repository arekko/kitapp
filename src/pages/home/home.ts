import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { MediaProvider } from "./../../providers/media/media";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  constructor(
    public navCtrl: NavController,
    private mediaProvider: MediaProvider
  ) {}

  ionViewDidLoad() {
    console.log(this.mediaProvider.user);
  }
}
