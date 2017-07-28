import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FirebaseListFactoryOpts } from 'angularfire2/interfaces';

import { User } from '../model/user';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class UserService {

  users: FirebaseListObservable<User[]>;

  constructor(private db: AngularFireDatabase) { }

  findUserByUsername(username: string): Observable<User> {
    return this.db.list('users', {
      query: {
        orderByChild: 'username',
        equalTo: username
      }
    }).map(res => User.fromArray(res[0]))
      .do(user => console.log('user: ', user));
  }

  addUser(user: User) {
    this.users.push(User).then(_ => console.log(`User:${user.$id} added.`));
  }

  deleteUser(id: string) {
    this.users.remove(id).then(_ => console.log(`User:${id} deleted.`));
  }

  deleteAllUsers() {
    this.users.remove().then(_ => console.log(`All Users are deleted.`));
  }

  updateUser(user: User) {
    this.users.update(user.$id, user).then(_ => console.log(`User:${user.$id} updated.`));
  }
}
