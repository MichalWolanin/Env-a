import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Comment } from '../interfaces/comment.interface';
import { environment } from '../../environment';
import { Observable } from 'rxjs';

type CreateCommentDto = {
  parentId?: string;
  text: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  http = inject(HttpClient);

  getComments(parentId: string = ''): Observable<Comment[]> {
    let url = `${environment.apiBaseUrl}/comments`;
    if (parentId) {
      url += `?parentId=${parentId}`;
    }
    return this.http.get<Comment[]>(url);
  }

  createComment(comment: CreateCommentDto): Observable<Comment> {
    return this.http.post<Comment>
      (`${environment.apiBaseUrl}/comments`,
      comment
    );
  }
}
