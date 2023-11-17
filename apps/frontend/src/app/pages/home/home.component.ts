import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from "../../components/comment/comment.component";

@Component({
    selector: 'env-a-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [CommonModule, CommentComponent]
})
export class HomeComponent {}
