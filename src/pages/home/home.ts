import { Component, OnDestroy, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { NavController } from "ionic-angular";
import { Subscription } from "rxjs/Subscription";
import { RecipeViewPage } from "../recipe-view/recipe-view";
import { Media } from "./../../interfaces/media";
import { BookmarkProvider } from "./../../providers/bookmark/bookmark";
import { MediaProvider } from "./../../providers/media/media";
import { UserProvider } from "./../../providers/user/user";

// TODO: add the infinity scroll
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage implements OnInit, OnDestroy {
  media: Media[];
  subscriptionMediaChanged: Subscription;
  subscriptionShowRecipeView: Subscription;
  subscriptionBookmarkHandler: Subscription;

  constructor(
    public navCtrl: NavController,
    private mediaProvider: MediaProvider,
    private storage: Storage,
    private userProvider: UserProvider,
    private bookmarkProvider: BookmarkProvider
  ) {}

  ngOnInit() {
    if (localStorage.getItem("token")) {
      if (!this.userProvider.user) {
        this.storage.get("user").then(res => {
          this.userProvider.user = JSON.parse(res);
          this.userProvider.isLoggedIn = true;
        });
      }
    }

    this.subscriptionMediaChanged = this.mediaProvider.mediaChanged.subscribe(
      (media: Media[]) => {
        this.media = media;
      }
    );
    this.mediaProvider.fetchMediaData();

    this.subscriptionShowRecipeView = this.mediaProvider.showRecipeView.subscribe(
      (fileId: number) => {
        this.navCtrl.push(RecipeViewPage, {
          item: fileId
        });
      }
    );

    this.subscriptionBookmarkHandler = this.bookmarkProvider.bookmarkHandler.subscribe(
      (fileId: string) => {
        // FIXME: make the same thing like in home page means get set and etc
        console.log(fileId);
      }
    );
  }

  ngOnDestroy() {
    this.subscriptionMediaChanged.unsubscribe();
    this.subscriptionShowRecipeView.unsubscribe();
  }

  // addBookmark(fileId: number) {
  //   console.log(fileId);

  //   this.mediaProvider
  //     .addBookmark({
  //       file_id: fileId
  //     })
  //     .subscribe((res: AddFavoriteResponse) => {
  //       console.log(res);
  //     });
  // }
}
