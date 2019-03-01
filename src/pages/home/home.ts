import { Component, OnDestroy, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { NavController } from "ionic-angular";
import { Subscription } from "rxjs/Subscription";
import { RecipeViewPage } from "../recipe-view/recipe-view";
import { AddFavoriteResponse, Media } from "./../../interfaces/media";
import { MediaProvider } from "./../../providers/media/media";
import { UserProvider } from "./../../providers/user/user";

// TODO: add the infinity scroll
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage implements OnInit, OnDestroy {
  media: Media[];
  subscription: Subscription;

  constructor(
    public navCtrl: NavController,
    private mediaProvider: MediaProvider,
    private storage: Storage,
    private userProvider: UserProvider
  ) {}

  async ngOnInit() {
    if (localStorage.getItem("token")) {
      if (!this.userProvider.user) {
        this.storage.get("user").then(res => {
          this.userProvider.user = JSON.parse(res);
          this.userProvider.isLoggedIn = true;
        });
      }
    }

    this.subscription = this.mediaProvider.mediaChanged.subscribe(
      (media: Media[]) => {
        this.media = media;
      }
    );
    await this.mediaProvider.fetchMediaData();
  }

  ngOnDestroy() {
    console.log("home was destroyed");

    this.subscription.unsubscribe();
  }

  showRecipe(event) {
    this.userProvider.isLoggedIn
      ? this.navCtrl.push(RecipeViewPage, {
          item: event
        })
      : this.navCtrl.parent.select(1);
  }

  addBookmark(fileId: number) {
    console.log(fileId);

    this.mediaProvider
      .addBookmark({
        file_id: fileId
      })
      .subscribe((res: AddFavoriteResponse) => {
        console.log(res);
      });
  }
}
