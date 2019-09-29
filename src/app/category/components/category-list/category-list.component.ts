import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {
  displayedColumns: string[] = ['name', 'actions'];

  constructor(
    public categoryService: CategoryService) {
  }
}
