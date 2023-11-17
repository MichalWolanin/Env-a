import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCommentComponent } from "../create-comment/create-comment.component";

@Component({
    selector: 'env-a-comment',
    standalone: true,
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss'],
    imports: [CommonModule, CreateCommentComponent]
})
export class CommentComponent {
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
