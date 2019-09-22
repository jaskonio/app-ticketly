import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Category } from '../../model/category';
import { CategoryService } from '../../services/category.service';

import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {

  @ViewChild(MatTable, { static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  newCategory: Category = {
    name: ''
  };

  categories = new MatTableDataSource<Category>();

  displayedColumns: string[] = ['name'];

  pageSizeOptions = [5, 10, 20];
  constructor(
    private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.categories.paginator = this.paginator;
    this.categories.sort = this.sort;

    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAll()
    .subscribe( data => {
      this.categories.data = data as Category[];
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

      this.categories.data.push(newCategory);
      this.table.renderRows();
    });
  }

  delete(categoryId: number, index: number) {

    this.categoryService.delete(categoryId)
    .subscribe( response => {
      this.categories.data = this.categories.data.filter( category => category.id !== categoryId );
    });
  }

  update(category: Category, index: number) {
    this.categoryService.update(category)
    .subscribe(response => {
      this.categories.data[index] = category;
    });
  }

  applyFilter(categoryName: string) {
    console.log(categoryName);
    this.categories.filter = categoryName.trim().toLowerCase();

    if (this.categories.paginator) {
      this.categories.paginator.firstPage();
    }
  }
}
