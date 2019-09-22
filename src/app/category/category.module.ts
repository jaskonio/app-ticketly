import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';

import { CategoryComponent } from './components/category/category.component';
import { CategoryListComponent } from './components/category-list/category-list.component';

import { FormsModule } from '@angular/forms';

import { CategoryService } from './services/category.service';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    CategoryComponent,
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    CategoryService
  ]
})
export class CategoryModule { }
