import { Component, OnDestroy, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Store } from "@ngrx/store";
import { NavController } from "ionic-angular";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import * as fromStore from "../../store";
import { RecipeViewPage } from "../recipe-view/recipe-view";
import { AddFavoriteResponse, Media } from "./../../interfaces/media";
import { BookmarkProvider } from "./../../providers/bookmark/bookmark";
import { MediaProvider } from "./../../providers/media/media";
import { UserProvider } from "./../../providers/user/user";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage implements OnInit, OnDestroy {
  media: Media[];
  subscriptionMediaChanged: Subscription;
  subscriptionShowRecipeView: Subscription;
  subscriptionBookmarkHandler: Subscription;

  searchList: Media[] = [];
  search = {
    title: ""
  };
  searchBar = "";

  media$: Observable<Media[]>;

  constructor(
    public navCtrl: NavController,
    private mediaProvider: MediaProvider,
    private storage: Storage,
    public userProvider: UserProvider,
    private bookmarkProvider: BookmarkProvider,
    private store: Store<fromStore.AppState>
  ) {}

  ngOnInit() {
    this.media$ = this.store.select<any>(fromStore.getMediaState);
    // .subscribe(state => console.log(state));

    this.store.dispatch(new fromStore.LoadMedia());

    // .subscribe(store => console.log(store));
    // this.store.select("media").subscribe(state => console.log(state));

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
      (fileId: number) => {
        this.bookmarkProvider
          .addBookmark({ file_id: fileId })
          .subscribe((res: AddFavoriteResponse) => {
            console.log(res);
            // this.mediaProvider.fetchMediaData();

            this.bookmarkProvider.getUserFavorites();
          });

        // FIXME: make the same thing like in home page means get set and etc
        console.log(fileId);
      }
    );
    this.bookmarkProvider.getUserFavorites();
  }

  ngOnDestroy() {
    this.subscriptionMediaChanged.unsubscribe();
    this.subscriptionShowRecipeView.unsubscribe();
  }

  // Fetching all media and store them to mediaList variable, if search word
  // is entered filters two arrays by their intersecting objects.
  getSearchMedia(searchData) {
    if (this.searchBar === " ") {
      this.media = this.searchList;
    } else {
      this.searchList = this.media.filter(value =>
        searchData.some(value2 => value.title === value2.title)
      );
      this.media = this.searchList;
    }
  }

  // Checks the searchbar and sends a request for an media array of files
  // containing the searched string in title.
  searchMedia() {
    if (this.searchBar !== "") {
      this.search.title = this.searchBar;
      this.mediaProvider.search(this.search).subscribe((response: Media[]) => {
        console.log("response", response);

        this.getSearchMedia(response);
        // this.media = response;
      });
    } else {
      this.mediaProvider.fetchMediaData();
    }
  }
}
