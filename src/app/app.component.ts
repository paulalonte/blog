import { Component, OnInit, ViewEncapsulation, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { PostService } from './add-content/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent implements OnInit {
  title = 'Post It!';
  isSubmitting = false;
  arrText = ['paul', 'ideas', 'development', 'design', 'paul'];
  textObj = { text: '' };
  isDone = false;
  counter = 0;

  constructor() {
  }

  animateText(arrWords: Array<string>, textToAnimate: string) {
    const arrTextAnimate = arrWords[this.counter].split('');
    let index = 0;
    let textRef = '';

    const letterInterval = setInterval(() => {
      index++;
      if (index > arrTextAnimate.length) {
        clearInterval(letterInterval);
        if (this.counter === arrWords.length - 1) { return; }
        const letterDecrement = setInterval(() => {
          index--;
          textRef = this.textObj.text.substr(0, index);
          this.textObj.text = textRef;
          if (index === 0) {
            clearInterval(letterDecrement);
            this.counter++;
            if (this.counter < arrWords.length) {
              setTimeout(() => {
                this.textObj.text = '';
                textRef = '';
                this.animateText(this.arrText, this.textObj.text);
              }, 80);
            }
          }
        }, 150);
      } else {
        this.textObj.text += arrTextAnimate[index - 1];
      }
    }, 200);
  }

  ngOnInit(): void {
    // this.animateText(this.arrText, this.textObj.text);
  }

  onSubmitForm() {
    console.log('submitting');
    this.isSubmitting = true;
  }
}

