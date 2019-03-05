import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from "@ngrx/store";
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

// export const selectFeature = (state: AppState) => state.media;

// media state
// export const getMediaState = createSelector(
//   getAppState,
//   (state: AppState) => state.media
// );

export const getAllMedia = createSelector(
  getMediaState,
  fromMedia.getMedia
);
export const getMediaLoaded = createSelector(
  getMediaState,
  fromMedia.getMediaLoaded
);
export const getMediaLoading = createSelector(
  getMediaState,
  fromMedia.getMediaLoading
);
