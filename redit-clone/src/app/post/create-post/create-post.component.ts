import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { PostService } from 'src/app/shared/post.service';
import { CreatePostPayload } from './create-post.payload';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  createPostForm: FormGroup;
  postPayload: CreatePostPayload;
  subreddits: Array<SubredditModel>;



  constructor(private router: Router, private postService: PostService, private subredditService: SubredditService) {
    this.postPayload = {
      postName: '',
      url: '',
      description: '',
      subredditName: ''
    }

   }

  ngOnInit(): void {
    this.createPostForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      subredditName: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });

    this.subredditService.getAllSubreddits().subscribe((data) =>{
      this.subreddits = data;
    }, error => {
      throwError(error);
    })

  }


  createPost(){
    this.postPayload.postName = this.createPost.get('postName').value;
    this.postPayload.description = this.createPost.get('description').value;
    this.postPayload.subredditName = this.createPost.get('url').value;
    this.postPayload.url = this.createPost.get('subredditName').value;


    this.postService.createPost(this.postPayload).subscribe((data) =>{
      this.router.navigateByUrl('/');
    }, error =>{
      throwError(error);
    })
  }


  discardPost(){
    this.router.navigateByUrl('/');
  }

}
