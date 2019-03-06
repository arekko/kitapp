import { Media } from "../../interfaces/media";
import * as fromRecipe from "../actions/recipe.action";

export interface RecipeState {
  recipe: Media;
  loaded: boolean;
  loading: boolean;
}

export const initialState: RecipeState = {
  recipe: null,
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromRecipe.RecipeActions
): RecipeState {
  switch (action.type) {
    case fromRecipe.LOAD_RECIPE:
      return {
        ...state,
        loading: true
      };
    case fromRecipe.LOAD_RECIPE_SUCCESS:
      const recipe = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        recipe
      };
    case fromRecipe.LOAD_RECIPE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false
      };
    case fromRecipe.CLEAR_RECIPE:
      return {
        ...state,
        loading: false,
        loaded: false,
        recipe: null
      };
  }

  return state;
}

// selectors

export const getRecipe = (state: RecipeState) => state.recipe;
export const getRecipeLoaded = (state: RecipeState) => state.loaded;
export const getRecipeLoading = (state: RecipeState) => state.loading;
