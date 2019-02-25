import { Component } from '@angular/core';

/**
 * Generated class for the CardCommentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'card-comment',
  templateUrl: 'card-comment.html'
})
export class CardCommentComponent {

  text: string;

  constructor() {
    console.log('Hello CardCommentComponent Component');
    this.text = 'Hello World';
  }

}
