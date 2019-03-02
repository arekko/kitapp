import { Component } from "@angular/core";
import {
  IonicPage,
  LoadingController,
  NavController,
  NavParams
} from "ionic-angular";
import { TagMessage } from "../../interfaces/media";
import { MediaProvider } from "../../providers/media/media";
import { HomePage } from "../home/home";

@IonicPage()
@Component({
  selector: "page-upload",
  templateUrl: "upload.html"
})
export class UploadPage {
  filedata: any;
  file: File;
  title = "";
  description = "";

  tag = {
    file_id: "",
    tag: "kitapp"
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider,
    public loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad UploadPage");
  }

  handleChange($event) {
    this.file = $event.target.files[0];
    this.showPreview();
  }

  showPreview() {
    const reader = new FileReader();
    console.log(this.file);
    reader.onloadend = () => {
      //console.log(reader.result);
      this.filedata = reader.result;
    };
    reader.readAsDataURL(this.file);
  }

  upload() {
    // show spinner
    const fd = new FormData();
    fd.append("title", this.title);
    fd.append("description", this.description);
    console.log(this.file);
    fd.append("file", this.file);
    this.mediaProvider.upload(fd).subscribe(resp => {
      console.log(resp);
      this.tag.file_id = resp.file_id;
      console.log(this.tag);
      this.postTag(this.tag);
      this.presentLoadingDefault();
      // setTimeout 2 secs
      // hide spinner
    });
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({});
    loading.present();

    setTimeout(() => {
      loading.dismiss();
      this.navCtrl.pop().catch();
      this.navCtrl.push(HomePage);
    }, 2000);
  }

  postTag(data) {
    this.mediaProvider.postNewTag(data).subscribe((response: TagMessage) => {
      console.log(response);
    });
  }
}
