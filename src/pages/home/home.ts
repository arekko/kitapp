import { Component, OnDestroy, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Store } from "@ngrx/store";
import { Loading, LoadingController, NavController } from "ionic-angular";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import * as fromStore from "../../store";
import { RecipeViewPage } from "../recipe-view/recipe-view";
import { Media } from "./../../interfaces/media";
import { MediaProvider } from "./../../providers/media/media";
import { UserProvider } from "./../../providers/user/user";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage implements OnInit, OnDestroy {
  subscriptionShowRecipeView: Subscription;

  // searchList: Media[] = [];
  // search = {
  //   title: ""
  // };
  searchBar = "";

  media$: Observable<Media[]>;
  loading: Loading;

  constructor(
    public navCtrl: NavController,
    private mediaProvider: MediaProvider,
    private storage: Storage,
    public userProvider: UserProvider,
    private store: Store<fromStore.AppState>,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    if (localStorage.getItem("token")) {
      this.storage.get("user").then(user => {
        console.log(user);

        this.store.dispatch(
          new fromStore.LoginUserSuccess({
            message: "Set user from token",
            token: localStorage.getItem("token"),
            user: JSON.parse(user)
          })
        );
      });
    }

    this.media$ = this.store.select<any>(fromStore.getMediaState);
    this.store
      .select(fromStore.getUserStatus)
      .subscribe(
        isLogin =>
          isLogin && this.store.dispatch(new fromStore.LoadUserBookmarks())
      );
    this.store.dispatch(new fromStore.LoadMedia());

    this.store.select(fromStore.getMediaLoading).subscribe(loading => {
      if (loading) {
        // because we create loadingControll instance more then one time, we have to create it here inside the listener
        this.loading = this.loadingCtrl.create({
          spinner: "crescent",
          showBackdrop: false
        });
        this.loading.present();
      }
    });

    this.store
      .select(fromStore.getMediaLoaded)
      .subscribe(loaded => loaded && this.loading.dismiss());

    // if (localStorage.getItem("token")) {
    //   if (!this.userProvider.user) {
    //     this.storage.get("user").then(res => {
    //       this.userProvider.user = JSON.parse(res);
    //       this.userProvider.isLoggedIn = true;
    //     });
    //   }
    // }

    this.subscriptionShowRecipeView = this.mediaProvider.showRecipeView.subscribe(
      (fileId: number) => {
        this.navCtrl.push(RecipeViewPage, {
          fileId: fileId
        });
      }
    );
  }

  ngOnDestroy() {
    this.subscriptionShowRecipeView.unsubscribe();
  }

  // Fetching all media and store them to mediaList variable, if search word
  // is entered filters two arrays by their intersecting objects.
  // getSearchMedia(searchData) {
  //   if (this.searchBar === " ") {
  //     this.media = this.searchList;
  //   } else {
  //     this.searchList = this.media.filter(value =>
  //       searchData.some(value2 => value.title === value2.title)
  //     );
  //     this.media = this.searchList;
  //   }
  // }

  searchMedia() {
    if (this.searchBar !== "") {
      // this.search.title = this.searchBar;
      // this.mediaProvider.search(this.search).subscribe((response: Media[]) => {
      //   console.log("response", response);

      //   this.getSearchMedia(response);
      //   // this.media = response;
      // });
      const data = {
        title: this.searchBar
      };
      this.store.dispatch(new fromStore.LoadSearching(data));
    } else {
      this.store.dispatch(new fromStore.LoadMedia());
    }
  }
}
