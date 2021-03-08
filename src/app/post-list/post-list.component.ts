import { Component, OnInit, Input } from '@angular/core';
import { Post } from './post.model';
import { PostService } from './post.service';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  // @Input() getpostsArrayFromPostList: Post[] = [];
  // posts = [
  //   { title: 'First title', content: 'This is first Content' },
  //   { title: 'Second title', content: 'This is Second Content' },
  //   { title: 'Third title', content: 'This is third Content' },
  //   { title: 'Fourth title', content: 'This is Fourth Content' }
  // ]

  posts = [];
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPost();
    this.postService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
    // .subscribe()
  }

}
