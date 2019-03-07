import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { of } from "rxjs/observable/of";
import { catchError, map, switchMap } from "rxjs/operators";
import * as fromServices from "../../providers/";
import * as recipeActions from "../actions/recipe.action";

@Injectable()
export class RecipeEffects {
  @Effect()
  getRecipe = this.actions$.ofType(recipeActions.LOAD_RECIPE).pipe(
    switchMap((action: recipeActions.LoadRecipe) => {
      return this.mediaProvider.getSingleMedia(action.payload).pipe(
        map(media => new recipeActions.LoadRecipeSuccess(media)),
        catchError(error => of(new recipeActions.LoadRecipeFail(error)))
      );
    })
  );

  @Effect()
  getComments = this.actions$.ofType(recipeActions.LOAD_COMMENTS).pipe(
    switchMap((action: recipeActions.LoadComments) => {
      return this.mediaProvider.getCommentsByFileId(action.payload).pipe(
        map(comments => new recipeActions.LoadCommentsSuccess(comments)),
        catchError(error => of(new recipeActions.LoadCommentsFail(error))),
        
      );
    })
  );

  constructor(
    private actions$: Actions,
    private mediaProvider: fromServices.MediaProvider
  ) {}
}
