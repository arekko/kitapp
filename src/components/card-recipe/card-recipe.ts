import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "card-recipe",
  templateUrl: "card-recipe.html"
})
export class CardRecipeComponent {
  @Input() item;
  @Output() showRecipe = new EventEmitter<number>();

  constructor() {}

  showRecipePage(fileId: number) {
    this.showRecipe.emit(fileId);
  }
}
