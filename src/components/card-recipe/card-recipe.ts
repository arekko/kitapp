import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "card-recipe",
  templateUrl: "card-recipe.html"
})
export class CardRecipeComponent {
  @Input() item;
  @Output() showRecipe = new EventEmitter<number>();
  @Output() fileId = new EventEmitter<number>();


  constructor() {}

  addBookmark(fileId: number) {
    this.fileId.emit(fileId)
  }

  showRecipePage(fileId: number) {
    this.showRecipe.emit(fileId);
  }
}
