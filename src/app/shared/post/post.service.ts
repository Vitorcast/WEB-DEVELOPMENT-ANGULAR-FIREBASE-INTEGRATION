import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FirebaseListFactoryOpts } from 'angularfire2/interfaces';

import { Post } from '../model/post';
import { UserService } from '../user/user.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/combineLatest';


@Injectable()
export class PostService {

  private posts: FirebaseListObservable<Post[]>;

  constructor(private db: AngularFireDatabase, private userService: UserService) {
    this.posts = db.list('/posts');
  }

  getAllPosts(query: FirebaseListFactoryOpts = {}): Observable<Post[]> {
    return this.db.list('/posts', query)
      .map(Post.fromJsonList);
  }

  loadNextPage(startAt: string, limit = 5) {
    return this.getAllPosts({
      query: {
        orderByKey: true,
        limitToFirst: limit,
        startAt
      }
    });
  }

  findPostById(id): Observable<Post> {
    return this.db.object(`/posts/${id}`);
  }

  findPostKeysPerUser(userId: string, query: FirebaseListFactoryOpts = {}): Observable<string[]> {
    return this.db.list(`postsPerUser/${userId}`, query)
      .map(postIdsPerUser => postIdsPerUser.map(post => post.$id));
  }

  findPostsForPostKeys(postKeys$: Observable<string[]>): Observable<Post[]> {
    return postKeys$
      .map(postKeys => postKeys.map(postKey => this.findPostById(postKey)))
      .flatMap(fbObj => Observable.combineLatest(fbObj));
  }

  getPostsByUserKey(userKey: string, query: FirebaseListFactoryOpts): Observable<Post[]> {
    const firstPagePostKeys$ = this.findPostKeysPerUser(userKey, query);
    return this.findPostsForPostKeys(firstPagePostKeys$);
  }

  addPost(post: Post) {
    this.posts.push(Post).then(_ => console.log(`Post:${post.$id} added.`));
  }

  deletePost(id: string) {
    this.posts.remove(id).then(_ => console.log(`Post:${id} deleted.`));
  }

  deleteAllPosts() {
    this.posts.remove().then(_ => console.log(`All Posts are deleted.`));
  }

  updatePost(post: Post) {
    this.posts.update(post.$id, post).then(_ => console.log(`Post:${post.$id} updated.`));
  }








}
