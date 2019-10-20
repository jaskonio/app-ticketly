import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryModule } from './category/category.module';
import { ProjectModule } from './project/project.module';


const routes: Routes = [
  {
    path: 'categories',
    loadChildren: () => import('./category/category.module').then( m => CategoryModule)
  },
  {
    path: 'projects',
    loadChildren: () => import('./project/project.module').then( m => ProjectModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
