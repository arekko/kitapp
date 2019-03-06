import { Action } from "@ngrx/store";
import {
  UserLogin,
  UserLoginResponse,
  UserRegister,
  UserRegisterResponse
} from "../../interfaces/user";

// load media actions
export const LOGIN_USER = "LOGIN_USER";
export const LOGIN_USER_FAIL = "LOGIN_USER_FAIL";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";

export const REGISTER_USER = "REGISTER_USER";
export const REGISTER_USER_FAIL = "REGISTER_USER_FAIL";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";

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

export class RegisterUser implements Action {
  readonly type = REGISTER_USER;
  constructor(public payload: UserRegister) {}
}
export class RegisterUserFail implements Action {
  readonly type = REGISTER_USER_FAIL;
  constructor(public payload: any) {}
}
export class RegisterUserSuccess implements Action {
  readonly type = REGISTER_USER_SUCCESS;
  constructor(public payload: UserRegisterResponse) {}
}

// action types
export type UserActions =
  | LoginUser
  | LoginUserFail
  | LoginUserSuccess
  | RegisterUser
  | RegisterUserFail
  | RegisterUserSuccess;
