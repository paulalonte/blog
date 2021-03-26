import { PostService } from './post.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPost } from './post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.scss']
})
export class AddContentComponent implements OnInit {

  @Output() submitFormClicked = new EventEmitter();

  formGroup: FormGroup;
  isSaving = false;

  constructor(private fb: FormBuilder, private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.fb.group(
      {
        title: ['', Validators.required],
        content: ['', Validators.required]
      }
    );
  }

  onSubmit() {
    if (this.formGroup.valid && !this.isSaving) {
      // this.isSaving = true;
      // this.submitFormClicked.emit({
      //   title: this.formGroup.value.title,
      //   content: this.formGroup.value.content
      // });

      this.submitFormClicked.emit();

      this.isSaving = true;
      const dataObj: IPost = {
        title: this.formGroup.value.title,
        content: this.formGroup.value.content
      };

      this.postService.postData(dataObj).subscribe(responseData => {
        this.formGroup.reset();
        this.isSaving = false;
        this.router.navigate(['/bloglist']);
      });
    }
  }

}
