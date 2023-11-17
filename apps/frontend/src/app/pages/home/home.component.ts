import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from "../../components/comment/comment.component";
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../interfaces/comment.interface';

@Component({
    selector: 'env-a-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [CommonModule, CommentComponent]
})
export class HomeComponent implements OnInit {
    commentService = inject(CommentService);
    comments = signal<Comment[]>([]);
    ngOnInit(): void {
        this.getComments();
    }

    getComments(): void {
        this.commentService.getComments()
         .subscribe((comments) => {
            this.comments.set(comments);
        })
    }
}
