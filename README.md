# ng-summernote

This component integrate summernote wysiwyg editor as directive to Angular project.

## Access ng-summernote in Angular 2 application
- example main app module:
```
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgSummernote } from 'ng-summernote/ng-summernote';

import { AppComponent } from './app.component';
import { routes } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    NgSummernote,
    AppComponent
  ],
  providers: [
    {
        provide: APP_BASE_HREF,
        useValue: '<%= APP_BASE %>'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```
- Import in component:
```
import { Component } from '@angular/core';
import { NgSummernote } from 'ng-summernote/ng-summernote';

@Component({
  moduleId: module.id,
  selector: 'editor-example-component',
  templateUrl: 'editor-example.component.html'
})
export class EditorExampleComponent {

  // Editors ng-model bindings
  data: string = 'appendix';
  data2: string = 'content';
  
  // If you want add editors bindings to some model
  model: any = {
    data: this.data,
    data2: this.data2
  }
  
  // OnSubmit add current editors bindings to some model
  onSubmit() {
    this.model.data = this.data;
    this.model.data2 = this.data2;
  }
 }
```
- Component template example:
```
  <div class="row">
    <div class="col-md-6">
      <ng-summernote [(ngModel)]="data" lang="cs-CZ" serverImgUp hostUpload="{{hostUpload}}" uploadFolder="{{uploadFolder}}"></ng-summernote>
    </div>
  </div>
  <div class="row">
    <div class="col-md-6">
      <ng-summernote [(ngModel)]="data2" height="500" lang="cs-CZ"></ng-summernote>
    </div>
  </div>
```
## Inputs

- you can set inputs standalone or put them to config input as json
- config input is stronger than standalone inputs, so never combine them
  (set config json object or standalone inputs)

```
@Input() height: number;
@Input() minHeight: number;
@Input() maxHeight: number;
@Input() placeholder: string;
@Input() focus: boolean;
@Input() airMode: boolean;
@Input() dialogsInBody: string;
@Input() editable: boolean;
@Input() lang: string;
@Input() disableResizeEditor: string;
@Input() serverImgUp: boolean;
@Input() config: any;

/** URL for upload server images */
@Input() hostUpload: string;

/** Uploaded images server folder */
@Input() uploadFolder: string = "";
```

## Upload Image URL

If you want upload image to some URL set serverImgUp input
and then set hostUpload - it's your upload server URL
Components awaits returned array with URL of uploaded file
example: ["http://some-url.com/images/uploadedImg.jpg"]
