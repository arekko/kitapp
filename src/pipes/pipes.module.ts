import { NgModule } from '@angular/core';
import { ThumbnailPipe } from './thumbnail/thumbnail';
import { RatingPipe } from './rating/rating';
import { CommentPipe } from './comment/comment';
import { FavoritePipe } from './favorite/favorite';
import { OwnerPipe } from './owner/owner';
@NgModule({
	declarations: [ThumbnailPipe,
    RatingPipe,
    CommentPipe,
    FavoritePipe,
    OwnerPipe],
	imports: [],
	exports: [ThumbnailPipe,
    RatingPipe,
    CommentPipe,
    FavoritePipe,
    OwnerPipe]
})
export class PipesModule {}
