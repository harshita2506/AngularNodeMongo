import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'nodeAngular';
getpostsArrayFromPostCreate = []

  ngOnInit() {

  }
  appPosts(post) {
    console.log("eventtttt", post);
this.getpostsArrayFromPostCreate.push(post)
  }
}
