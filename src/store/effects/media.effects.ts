import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { of } from "rxjs/observable/of";
import { catchError, map, switchMap } from "rxjs/operators";
import * as fromServices from "../../providers/";
import * as mediaActions from "../actions/media.action";

@Injectable()
export class MediaEffects {
  @Effect()
  getMedia = this.actions$.ofType(mediaActions.LOAD_MEDIA).pipe(
    switchMap(() => {
      return this.mediaProvider.getListOfMediaByTag("kitapp").pipe(
        map(media => new mediaActions.LoadMediaSuccess(media)),
        catchError(error => of(new mediaActions.LoadMediaFail(error)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private mediaProvider: fromServices.MediaProvider
  ) {}
}
