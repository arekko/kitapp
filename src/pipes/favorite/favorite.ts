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
    console.log("user_id" + value);

    return new Promise((resolve, reject) => {
      this.mediaProvider.getUserFavorites().subscribe((res: Favorites[]) => {
        res.forEach(item => {
          if (item.file_id === value) {
            resolve("heart");
          } else {
            resolve("heart-outline");
          }
        });
      });
    });

    // this.mediaProvider.getUserFavorites().subscribe((res: Favorites[]) => {
    //   console.log(res);
    // });
  }
}
