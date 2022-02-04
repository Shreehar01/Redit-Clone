import { Component, OnInit } from '@angular/core';
import { PostModel } from '../shared/post-model';
import { PostService } from '../shared/post.service';
import {faArrowUp, faArrowDown, faComments} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faComments = faComments;

  posts$: Array<PostModel> = [];
  constructor(private postService: PostService) { 
    this.postService.getAllPosts().subscribe(post => {
      this.posts$ = post;
    });
  }

  ngOnInit(): void {
  }

}
