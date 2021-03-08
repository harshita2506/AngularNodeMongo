import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { stringify } from 'querystring';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  constructor(private http: HttpClient) { }


  getPosts() {
    this.http.get<{ message: string, posts: Post[] }>('http://localhost:3000/api/posts')
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
    // return [...this.posts];
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{ _id: string, title: string, content: string }>('http://localhost:3000/api/posts' + id);
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content }
    this.http.post<{ message: string }>('http://localhost:3000/api/posts', post)
      .subscribe((responseMessage) => {
        console.log("ressssss", responseMessage);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });

  }
  updatePost(id: string, title: string, content: string) {
    const post: Post = { id: id, title: title, content: content };
    this.http.put('http://localhost:3000/api/posts' + id, post)
      .subscribe(response => {
        const upatedPosts = [...this.posts];
        const oldPostIndex = upatedPosts.findIndex(p => p.id === post.id);
        upatedPosts[oldPostIndex] = post;
        this.posts = upatedPosts;
        this.postsUpdated.next([...this.posts]);
      })

  }


  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts' + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);

      })
  }
}
