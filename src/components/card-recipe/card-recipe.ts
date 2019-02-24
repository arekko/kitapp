import { Component, Input } from "@angular/core";

@Component({
  selector: "card-recipe",
  templateUrl: "card-recipe.html"
})
export class CardRecipeComponent {

  @Input() item;


  constructor() {}
}
