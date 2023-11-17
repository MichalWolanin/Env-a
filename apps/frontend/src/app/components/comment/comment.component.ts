import { Component, Input, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCommentComponent } from "../create-comment/create-comment.component";
import { Comment } from '../../interfaces/comment.interface';
import { CommentService } from '../../services/comment.service';

@Component({
    selector: 'env-a-comment',
    standalone: true,
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss'],
    imports: [CommonModule, CreateCommentComponent]
})
export class CommentComponent {
  @Input() comment!: Comment;
  isExpanded = signal(false);
  isReplying = signal(false);
  commentService = inject(CommentService);
  nestedComments = signal<Comment[]>([]);

  nestedCommentsEffect = effect(() => {
    if (this.isExpanded()) {
      this.commentService.getComments(this.comment._id)
      .subscribe(comments => {
        this.nestedComments.set(comments);
      })
    };
  });

  toggleReplying() {
    this.isReplying.set(!this.isReplying());
    if (this.isReplying()) {
      this.isExpanded.set(true);
    }
  }

  toggleExpanded() {
    this.isExpanded.set(!this.isExpanded());
  }
}
