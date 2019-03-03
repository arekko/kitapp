import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Storage } from "@ionic/storage";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import {
  UserLoginResponse,
  UserRegisterResponse
} from "./../../interfaces/user";
import { UserProvider } from "./../../providers/user/user";
import { TabsPage } from "./../tabs/tabs";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  submitAttempt: boolean = false;
  showRegister: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formbuilder: FormBuilder,
    private storage: Storage,
    private userProvider: UserProvider
  ) {}

  ngOnInit() {
    this.loginForm = this.formbuilder.group({
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

    this.registerForm = this.formbuilder.group({
      username: [
        "",
        Validators.compose([
          Validators.maxLength(30),
          Validators.minLength(4),
          Validators.required
        ])
      ],
      email: [
        "",
        Validators.compose([
          Validators.maxLength(30),
          Validators.minLength(4),
          Validators.email,
          Validators.required
        ])
      ],
      full_name: [
        "",
        Validators.compose([
          Validators.maxLength(30),
          Validators.minLength(4),
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

  onLoginSubmit() {
    if (this.loginForm.valid) {
      const { value } = this.loginForm;
      this.userProvider.login(value).subscribe((res: UserLoginResponse) => {
        this.loginForm.reset();
        this.userProvider.user = res.user;
        this.userProvider.isLoggedIn = true;

        this.storage.set("user", JSON.stringify(res.user));

        localStorage.setItem("token", res.token);
        this.navCtrl.push(TabsPage);
      });
    }
  }

  onRegisterSubmit() {
    console.log(this.registerForm.value);

    this.userProvider
      .register(this.registerForm.value)
      .subscribe((res: UserRegisterResponse) => {
        this.registerForm.reset();
        this.showRegister = false;
      });
  }

  switchLoginRegisterPage() {
    this.showRegister = !this.showRegister;
  }
}
