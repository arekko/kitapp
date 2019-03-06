import { Action } from "@ngrx/store";
import { Media } from "../../interfaces/media";

// load media actions
export const LOAD_RECIPE = "LOAD_RECIPE";
export const LOAD_RECIPE_FAIL = "LOAD_RECIPE_FAIL";
export const LOAD_RECIPE_SUCCESS = "LOAD_RECIPE_SUCCESS";
export const CLEAR_RECIPE = "CLEAR_RECIPE";

export class LoadRecipe implements Action {
  readonly type = LOAD_RECIPE;
  constructor(public payload: number) {}
}
export class LoadRecipeFail implements Action {
  readonly type = LOAD_RECIPE_FAIL;
  constructor(public payload: any) {}
}
export class LoadRecipeSuccess implements Action {
  readonly type = LOAD_RECIPE_SUCCESS;
  constructor(public payload: Media) {}
}
export class clearRecipe implements Action {
  readonly type = CLEAR_RECIPE;
}

// action types
export type RecipeActions =
  | LoadRecipe
  | LoadRecipeFail
  | LoadRecipeSuccess
  | clearRecipe;
