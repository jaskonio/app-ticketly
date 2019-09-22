import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryModule } from './category/category.module';


const routes: Routes = [
  {
    path: 'categories',
    loadChildren: () => import('./category/category.module').then( m => CategoryModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
