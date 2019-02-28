import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Storage } from "@ionic/storage";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { MediaProvider } from "../../providers/media/media";
import { UserLoginResponse } from "./../../interfaces/user";
import { TabsPage } from "./../tabs/tabs";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  loginForm: FormGroup;
  submitAttempt: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider,
    public formbuilder: FormBuilder,
    private storage: Storage
  ) {
    this.loginForm = formbuilder.group({
      username: [
        "",
        Validators.compose([
          Validators.maxLength(30),
          Validators.minLength(3),
          Validators.pattern("[a-zA-Z ]*"),
          Validators.required
        ])
      ],
      password: [
        "",
        Validators.compose([
          Validators.maxLength(30),
          Validators.minLength(4),
          Validators.required
        ])
      ]
    });
  }

  ionViewDidLoad() {}

  log(username) {
    console.log(username);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { value } = this.loginForm;
      this.mediaProvider.login(value).subscribe((res: UserLoginResponse) => {
        this.mediaProvider.user = res.user;
        this.mediaProvider.isLoggedIn = true;

        this.storage.set("user", JSON.stringify(res.user));

        localStorage.setItem("token", res.token);
        this.navCtrl.push(TabsPage);
      });
    }
  }
}
