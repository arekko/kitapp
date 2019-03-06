import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import * as fromMedia from "./media.reducer";
import * as fromUser from "./user.reducer";
export interface AppState {
  media: fromMedia.MediaState;
  user: fromUser.UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  media: fromMedia.reducer,
  user: fromUser.reducer
};

export const getMediaState = createFeatureSelector<fromMedia.MediaState>(
  "media"
);
