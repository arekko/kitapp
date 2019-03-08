import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Storage } from "@ionic/storage";
import { Store } from "@ngrx/store";
import {
  IonicPage,
  LoadingController,
  NavController,
  NavParams
} from "ionic-angular";
import * as fromStore from "../../store";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage implements OnInit {
  [x: string]: any;
  loginForm: FormGroup;
  registerForm: FormGroup;
  submitAttempt: boolean = false;
  showRegister: boolean = false;
  file: File;
  filedata: any;
  // errorMessage$: Observable<{ message: string }>;
  errorMessage: boolean | null = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formbuilder: FormBuilder,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    private store: Store<fromStore.AppState>
  ) {}

  ngOnInit() {
    this.store
      .select(fromStore.getCurrentUser)
      .subscribe(state => console.log(state));

    this.store.select(fromStore.getUserStatus).subscribe(state => {
      this.store.select(fromStore.getCurrentUser).subscribe(state => {
        this.storage.set("user", JSON.stringify(state));
      });

      this.store.select(fromStore.getToken).subscribe(token => {
        if (token) {
          localStorage.setItem("token", token);
          state && this.navCtrl.parent.select(0);
        }
      });
    });

    this.store.select<any>(fromStore.getError).subscribe(state => {
      if (state) {
        this.errorMessage = state.message;
        setTimeout(() => {
          this.errorMessage = null;
        }, 2000);
      }
    });

    this.store.select(fromStore.getRegStatus).subscribe(
      state =>
        state &&
        this.store.dispatch(
          new fromStore.LoginUser({
            username: this.registerForm.value.username,
            password: this.registerForm.value.password
          })
        )
    );

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

  onLoginSubmit() {
    if (this.loginForm.valid) {
      const { value } = this.loginForm;
      this.store.dispatch(new fromStore.LoginUser(value));
    }
  }

  onRegisterSubmit() {
    const { value } = this.registerForm;
    this.store.dispatch(new fromStore.RegisterUser(value));
  }

  switchLoginRegisterPage() {
    this.showRegister = !this.showRegister;
  }
}
