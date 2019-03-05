import { Action } from "@ngrx/store";
import { Media } from "./../../interfaces/media";

// load media actions
export const LOAD_MEDIA = "LOAD_MEDIA";
export const LOAD_MEDIA_FAIL = "LOAD_MEDIA_FAIL";
export const LOAD_MEDIA_SUCCESS = "LOAD_MEDIA_SUCCESS";

export class LoadMedia implements Action {
  readonly type = LOAD_MEDIA;
}
export class LoadMediaFail implements Action {
  readonly type = LOAD_MEDIA_FAIL;
  constructor(public payload: any[]) {}
}
export class LoadMediaSuccess implements Action {
  readonly type = LOAD_MEDIA_SUCCESS;
  constructor(public payload: Media[]) {}
}

// action types
export type MediaActions = LoadMedia | LoadMediaFail | LoadMediaSuccess;
