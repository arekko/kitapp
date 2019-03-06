import { AsyncPipe } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Events, IonicPage, NavController, NavParams } from "ionic-angular";
import { Observable } from "rxjs/Observable";
import { Media } from "../../interfaces/media";
import * as fromStore from "../../store";
import { CommentsPage } from "../comments/comments";
import { LoginPage } from "../login/login";
import { HelperProvider } from "./../../providers/helper/helper";
import { MediaProvider } from "./../../providers/media/media";
import { UserProvider } from "./../../providers/user/user";

@IonicPage()
@Component({
  selector: "page-recipe-view",
  templateUrl: "recipe-view.html",
  providers: [AsyncPipe]
})
export class RecipeViewPage implements OnInit, OnDestroy {
  fileId: number;

  recipe$: Observable<Media>;
  isLoggedIn$: Observable<boolean>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider,
    public helperProvider: HelperProvider,
    public events: Events,
    public userProvider: UserProvider,
    public store: Store<fromStore.AppState>,
    private async: AsyncPipe
  ) {}

  ngOnInit() {
    this.fileId = this.navParams.get("fileId");
    this.recipe$ = this.store.select<Media>(fromStore.getRecipe);
    this.isLoggedIn$ = this.store.select(fromStore.getUserStatus);
    this.store.dispatch(new fromStore.LoadRecipe(this.fileId));

    this.events.subscribe("star-rating:changed", starRating => {
      console.log(starRating);

      this.mediaProvider
        .addRating({
          file_id: this.fileId,
          rating: starRating
        })
        .subscribe(res => {});
    });
  }

  ngOnDestroy() {
    this.store.dispatch(new fromStore.clearRecipe());
  }

  /**
   * @param {number} fileId
   * @memberof RecipeViewPage
   */
  showComments(fileId: number) {
    const isLoggedIn = this.async.transform(this.isLoggedIn$);
    console.log(isLoggedIn);

    isLoggedIn
      ? this.navCtrl.push(CommentsPage, {
          fileId: fileId
        })
      : this.navCtrl.push(LoginPage);
  }
}
