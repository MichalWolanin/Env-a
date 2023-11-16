import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'env-a-comment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent {}