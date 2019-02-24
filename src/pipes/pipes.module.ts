import { NgModule } from '@angular/core';
import { ThumbnailPipe } from './thumbnail/thumbnail';
import { RatingPipe } from './rating/rating';
import { CommentPipe } from './comment/comment';
import { FavoritePipe } from './favorite/favorite';
@NgModule({
	declarations: [ThumbnailPipe,
    RatingPipe,
    CommentPipe,
    FavoritePipe],
	imports: [],
	exports: [ThumbnailPipe,
    RatingPipe,
    CommentPipe,
    FavoritePipe]
})
export class PipesModule {}
