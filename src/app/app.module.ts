import { HttpClientModule } from "@angular/common/http";
import { ErrorHandler, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { IonicStorageModule } from "@ionic/storage";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { HomePage } from "../pages/home/home";
import { MediaProvider } from "../providers/media/media";
import { CardCommentComponent } from "./../components/card-comment/card-comment";
import { CardRecipeComponent } from "./../components/card-recipe/card-recipe";
import { BookmarksPage } from "./../pages/bookmarks/bookmarks";
import { CommentsPage } from "./../pages/comments/comments";
import { FrontPage } from "./../pages/front/front";
import { LoginPage } from "./../pages/login/login";
import { ProfilePage } from "./../pages/profile/profile";
import { RecipeViewPage } from "./../pages/recipe-view/recipe-view";
import { TabsPage } from "./../pages/tabs/tabs";
import { UploadPage } from "./../pages/upload/upload";
import { PipesModule } from "./../pipes/pipes.module";
import { MyApp } from "./app.component";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FrontPage,
    LoginPage,
    TabsPage,
    ProfilePage,
    UploadPage,
    BookmarksPage,
    CardRecipeComponent,
    RecipeViewPage,
    CommentsPage,
    CardCommentComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FrontPage,
    LoginPage,
    TabsPage,
    ProfilePage,
    UploadPage,
    BookmarksPage,
    RecipeViewPage,
    CommentsPage
  ],
  providers: [
    HttpClientModule,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MediaProvider
  ]
})
export class AppModule {}
