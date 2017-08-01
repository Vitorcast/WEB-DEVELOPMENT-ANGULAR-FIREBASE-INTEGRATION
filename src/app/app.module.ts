import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment.prod';
 
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
    MdButtonModule,
    MdCheckboxModule,
    MdCardModule,
    MdListModule,
    MdCoreModule,
    MdProgressSpinnerModule
} from '@angular/material';
import { PostComponent } from './post/post-item/post.component';
import { PostListComponent } from './post/post-list/post-list.component';
import { PostService } from './shared/post/post.service';
import { UserService } from './shared/user/user.service';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostListComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    MdCardModule,
    MdListModule,
    MdCoreModule,
    MdProgressSpinnerModule
  ],
  providers: [PostService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
