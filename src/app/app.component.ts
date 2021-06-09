import { Component, OnInit } from '@angular/core';
import { Comment } from './models/comment';
import { Post } from './models/post';
import { WordpressService } from './services/wordpress.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  posts: Post[] = [];
  postIds: number[] = [];
  comments: Comment[] = [];

  constructor(private service: WordpressService) {}

  ngOnInit() {
    this.service.getPosts().subscribe((posts: Post[]) => {
      this.postIds = posts.map((post) => post.ID);
      this.posts = posts;
    });
  }

  getComments() {
    this.service
      .getComments(this.postIds)
      .subscribe((comments: Comment[]) => (this.comments = comments));
  }

  getPostComment(id: number) {
    const comment =
      this.comments.find((comment) => comment.post.ID === id) ||
      ({} as Comment);
    return comment.raw_content;
  }
}
