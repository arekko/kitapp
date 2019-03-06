import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { of } from "rxjs/observable/of";
import { catchError, map, switchMap } from "rxjs/operators";
import { UserLoginResponse, UserRegisterResponse } from "../../interfaces/user";
import { UserProvider } from "../../providers/user/user";
import * as userActions from "../actions/user.action";

@Injectable()
export class UserEffects {
  @Effect()
  login = this.actions$.ofType(userActions.LOGIN_USER).pipe(
    switchMap((action: userActions.LoginUser) => {
      return this.userProvider
        .login({
          username: action.payload.username,
          password: action.payload.password
        })
        .pipe(
          map(
            (data: UserLoginResponse) => new userActions.LoginUserSuccess(data)
          ),
          catchError(error => of(new userActions.LoginUserFail(error)))
        );
    })
  );

  @Effect()
  register = this.actions$.ofType(userActions.REGISTER_USER).pipe(
    switchMap((action: userActions.RegisterUser) => {
      return this.userProvider
        .register({
          username: action.payload.username,
          email: action.payload.email,
          full_name: action.payload.full_name,
          password: action.payload.password
        })
        .pipe(
          map(
            (data: UserRegisterResponse) =>
              new userActions.RegisterUserSuccess(data)
          ),
          catchError(error => of(new userActions.RegisterUserFail(error)))
        );
    })
  );

  constructor(private actions$: Actions, private userProvider: UserProvider) {}
}
