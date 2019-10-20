import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../model/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {
  objectComponent = new Category();
  titleDialog = 'New Category';
  constructor(
    public categoryService: CategoryService) {
  }
}
