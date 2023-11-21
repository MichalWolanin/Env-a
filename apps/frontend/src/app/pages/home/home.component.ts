import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from "../../components/comment/comment.component";
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../interfaces/comment.interface';
import { CreateCommentComponent } from '../../components/create-comment/create-comment.component';
import { UserService } from '../../services/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'env-a-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [CommonModule, CommentComponent, CreateCommentComponent]
})
export class HomeComponent implements OnInit {
    commentService = inject(CommentService);
    comments = signal<Comment[]>([]);
    userService = inject(UserService);
    private destroyRef = inject(DestroyRef);

    ngOnInit(): void {
        this.getComments();
    }

    getComments(): void {
        this.commentService.getComments()
        .pipe(takeUntilDestroyed(this.destroyRef))
         .subscribe((comments) => {
            this.comments.set(comments);
        })
    }

    createComment(formValues: {text: string}): void {
        const {text} = formValues;
        const user = this.userService.getUserFromStorage();
        if (!user) {
            return;
        }
        this.commentService.createComment({
            text,
            userId: user._id,
        })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((createdComment) => {
            this.comments.set([createdComment, ...this.comments()]);
        });
    }

    commentTrackBy(_index: number, comment: Comment): string {
        return comment._id;
    }
}
