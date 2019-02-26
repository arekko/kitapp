import { Pipe, PipeTransform } from "@angular/core";
import { Favorites } from "../../interfaces/media";
import { MediaProvider } from "../../providers/media/media";

// FIXME: Think about favorite button implementation

@Pipe({
  name: "favorite"
})
export class FavoritePipe implements PipeTransform {
  constructor(private mediaProvider: MediaProvider) {}

  transform(value: number, ...args: any[]) {
    return new Promise((resolve, reject) => {
      this.mediaProvider.getUserFavorites().subscribe((res: Favorites[]) => {
        let isFavorite = false;

        // FIXME: Create more elegant way to implement it
        res.forEach(item => {
          if (item.file_id === value) {
            isFavorite = true;
          }
        });
        isFavorite ? resolve("heart") : resolve("heart-outline");
      });
    });
  }
}
