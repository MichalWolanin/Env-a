import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCommentComponent } from "../create-comment/create-comment.component";
import { Comment } from '../../interfaces/comment.interface';

@Component({
    selector: 'env-a-comment',
    standalone: true,
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss'],
    imports: [CommonModule, CreateCommentComponent]
})
export class CommentComponent {
  @Input() comment!: Comment;
  isExpanded = false;
  isReplying = false;

  toggleReplying() {
    this.isReplying = !this.isReplying;
    if (this.isReplying) {
      this.isExpanded = true;
    }
  }

  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }
}
