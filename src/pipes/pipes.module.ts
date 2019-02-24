import { NgModule } from '@angular/core';
import { ThumbnailPipe } from './thumbnail/thumbnail';
import { RatingPipe } from './rating/rating';
@NgModule({
	declarations: [ThumbnailPipe,
    RatingPipe],
	imports: [],
	exports: [ThumbnailPipe,
    RatingPipe]
})
export class PipesModule {}
