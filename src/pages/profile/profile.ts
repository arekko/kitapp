import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, LoadingController } from "ionic-angular";
import { Media } from "./../../interfaces/media";
import { MediaProvider } from "./../../providers/media/media";
import { UploadPage } from "../upload/upload";

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {
  userMedia: Media[];
  userPostsAmount: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private mediaProvider: MediaProvider,
    public loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    this.getCurrentUserMedia();
  }

  getCurrentUserMedia() {
    this.mediaProvider.getCurrentUserMedia().subscribe((res: Media[]) => {
      this.userPostsAmount = res.length;
      this.userMedia = res;
    });
  }

  uploadMedia(){
    this.navCtrl.push(UploadPage);
  }

}
