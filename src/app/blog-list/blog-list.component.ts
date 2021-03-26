import { PostService } from './../add-content/post.service';
import { IPost } from './../add-content/post';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  title = 'Posts';
  blogList: IPost[] = [];
  isFetching = false;
  postText: string;
  isRed = false;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.onFetchData();
  }

  onFetchData() {
    this.isFetching = true;
    this.postService.fetchData().subscribe(responseData => {
      this.blogList = responseData;
      this.isFetching = false;
    }, error => {
      console.log(error);
    });
  }

  onClearPosts() {
    console.log('delete posts');
    this.postService.clearPosts().subscribe(() => {
      this.blogList.splice(0, this.blogList.length);
    });
  }
}
