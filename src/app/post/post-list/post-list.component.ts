import { Component, OnInit } from '@angular/core';
import { Post } from '../../shared/model/post';
import { PostService } from '../../shared/post/post.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/publishReplay';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  postlist: Observable<Post[]>;
  postLimit = 5;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postlist = this.postService.getAllPosts({query: {
      limitToFirst: this.postLimit
    }})
      .publishReplay().refCount().do(()=> {
        console.log(this.postlist);
      }); // to avoid multiple subscribe network load
  }

}
