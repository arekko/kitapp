import { HttpClientModule } from "@angular/common/http";
import { ErrorHandler, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { HomePage } from "../pages/home/home";
import { MediaProvider } from "../providers/media/media";
import { FrontPage } from "./../pages/front/front";
import { LoginPage } from "./../pages/login/login";
import { MyApp } from "./app.component";

@NgModule({
  declarations: [MyApp, HomePage, FrontPage, LoginPage],
  imports: [BrowserModule, IonicModule.forRoot(MyApp), HttpClientModule],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, FrontPage, LoginPage],
  providers: [
    HttpClientModule,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MediaProvider
  ]
})
export class AppModule {}
