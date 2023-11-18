import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from "../../components/comment/comment.component";
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../interfaces/comment.interface';
import { CreateCommentComponent } from '../../components/create-comment/create-comment.component';
import { UserService } from '../../services/user.service';

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

    ngOnInit(): void {
        this.getComments();
    }

    getComments(): void {
        this.commentService.getComments()
         .subscribe((comments) => {
            this.comments.set(comments);
        })
    }

    createComment(formValues: {text: string}) {
        const {text} = formValues;
        const user = this.userService.getUserFromStorage();
        if (!user) {
            return;
        }
        this.commentService.createComment({
            text,
            userId: user._id,
        })
        .subscribe((createdComment) => {
            this.comments.set([createdComment, ...this.comments()]);
        });
    }
}
