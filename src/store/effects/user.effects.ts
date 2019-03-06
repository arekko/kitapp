import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { of } from "rxjs/observable/of";
import { catchError, map, switchMap } from "rxjs/operators";
import { UserLoginResponse } from "../../interfaces/user";
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

  // @Effect()
  // getSearching = this.actions$.ofType(mediaActions.LOAD_SEARCHING).pipe(
  //   switchMap((action: mediaActions.LoadSearching) => {
  //     return this.mediaProvider.search(action.payload).pipe(
  //       map(media => new mediaActions.LoadSearchingSuccess(media)),
  //       catchError(error => of(new mediaActions.LoadSearchingFail(error)))
  //     )
  //   })
  // )

  constructor(private actions$: Actions, private userProvider: UserProvider) {}
}
