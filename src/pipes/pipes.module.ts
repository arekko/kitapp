import { NgModule } from '@angular/core';
import { ThumbnailPipe } from './thumbnail/thumbnail';
import { RatingPipe } from './rating/rating';
import { CommentPipe } from './comment/comment';
import { FavoritePipe } from './favorite/favorite';
import { OwnerPipe } from './owner/owner';
import { UsernamePipe } from './username/username';
import { AvatarPipe } from './avatar/avatar';
@NgModule({
	declarations: [ThumbnailPipe,
    RatingPipe,
    CommentPipe,
    FavoritePipe,
    OwnerPipe,
    UsernamePipe,
    AvatarPipe],
	imports: [],
	exports: [ThumbnailPipe,
    RatingPipe,
    CommentPipe,
    FavoritePipe,
    OwnerPipe,
    UsernamePipe,
    AvatarPipe]
})
export class PipesModule {}
