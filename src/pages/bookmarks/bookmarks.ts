import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Subscription } from "rxjs/Subscription";
import { Media } from "./../../interfaces/media";
import { BookmarkProvider } from "./../../providers/bookmark/bookmark";
import { MediaProvider } from "./../../providers/media/media";

@IonicPage()
@Component({
  selector: "page-bookmarks",
  templateUrl: "bookmarks.html"
})
export class BookmarksPage implements OnInit {
  bookmarks: Media[] = [];
  subscribeBMChanged: Subscription;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private mediaProvider: MediaProvider,
    private bookmarkProvider: BookmarkProvider
  ) {}

  ngOnInit() {
    this.subscribeBMChanged = this.bookmarkProvider.bookmarksChanged.subscribe(
      (bm: Media[]) => {
        console.log(bm);

        this.bookmarks = bm;
      }
    );

    this.bookmarkProvider.getUserFavorites();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad BookmarksPage");
  }

  /**
   *
   *
   * @param {number} fileId
   * @memberof BookmarksPage
   */
  deleteBookmark(fileId: number) {
    const inx = this.bookmarks.findIndex(el => el.file_id === fileId);
    this.bookmarkProvider.deleteFavoriteByFileId(fileId).subscribe(res => {
      this.bookmarks.splice(inx, 1);
      this.mediaProvider.fetchMediaData();
    });
  }

  // getUserFavorites() {
  //   this.bookmarkProvider.getUserFavorites().subscribe((res: Favorites[]) => {
  //     console.log(res);
  //     this.favoriteList = [];

  //     res.forEach(item => {
  //       this.mediaProvider
  //         .getSingleMedia(item.file_id)
  //         .subscribe((res: Media) => {
  //           this.favoriteList.push(res);
  //           console.log(this.favoriteList);
  //         });
  //     });
  //   });
  // }
}
