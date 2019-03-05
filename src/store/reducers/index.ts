import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import * as fromMedia from "./media.reducer";

export interface AppState {
  media: fromMedia.MediaState;
}

export const reducers: ActionReducerMap<AppState> = {
  media: fromMedia.reducer
};

export const getMediaState = createFeatureSelector<fromMedia.MediaState>(
  "media"
);
