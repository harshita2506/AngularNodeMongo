import { Component, OnInit, Output , EventEmitter} from '@angular/core';
import { Post } from '../post-list/post.model';
import {NgForm} from '@angular/forms';
import { PostService } from '../post-list/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  @Output() postCreated = new EventEmitter();
  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  onAddPost(form: NgForm) {
    // const post: Post = {
    //   title: form.value.title,
    //   content: form.value.content
    // };

    // this.postCreated.emit(post);
    this.postService.addPost(form.value.title, form.value.content)
  }
}
