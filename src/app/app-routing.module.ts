import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddContentComponent } from './add-content/add-content.component';
import { BlogListComponent } from './blog-list/blog-list.component';


const routes: Routes = [
  { path: 'addpost', component: AddContentComponent},
  { path: 'bloglist', component: BlogListComponent},
  { path: '**', redirectTo: 'addpost'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
