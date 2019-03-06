import { Action } from "@ngrx/store";
import { UserLogin, UserLoginResponse } from "../../interfaces/user";

// load media actions
export const LOGIN_USER = "LOGIN_USER";
export const LOGIN_USER_FAIL = "LOGIN_USER_FAIL";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";

export class LoginUser implements Action {
  readonly type = LOGIN_USER;
  constructor(public payload: UserLogin) {}
}
export class LoginUserFail implements Action {
  readonly type = LOGIN_USER_FAIL;
  constructor(public payload: any) {}
}
export class LoginUserSuccess implements Action {
  readonly type = LOGIN_USER_SUCCESS;
  constructor(public payload: UserLoginResponse) {}
}

// action types
export type UserActions = LoginUser | LoginUserFail | LoginUserSuccess;
