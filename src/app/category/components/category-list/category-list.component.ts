import { Component, OnInit } from '@angular/core';
import { Category } from '../../model/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  newCategory: Category = {
    name: ''
  };
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAll()
    .subscribe( data => {
      this.categories = data;
    });
  }

  addCategory() {
    this.categoryService.add(this.newCategory)
    .subscribe( data => {
      let newCategory: Category;
      newCategory = {
        id : data.insertId,
        name: this.newCategory.name
      };

      this.categories.push(newCategory);
    });
  }

  delete(categoryId: number, index: number) {

    this.categoryService.delete(categoryId)
    .subscribe( response => {
      this.categories.splice(index, 1);
    });
  }

  update(category: Category, index: number) {
    this.categoryService.update(category)
    .subscribe(response => {
      this.categories[index] = category;
    });
  }
}
