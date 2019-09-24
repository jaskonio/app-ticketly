import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { Category } from '../../model/category';
import { CategoryService } from '../../services/category.service';

import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {

  @ViewChild(MatTable, { static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  categories = new MatTableDataSource<Category>();

  displayedColumns: string[] = ['name', 'actions'];

  pageSizeOptions = [5, 10, 20];

  constructor(
    private categoryService: CategoryService,
    public dialog: MatDialog) {
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.categories.paginator = this.paginator;
    this.categories.sort = this.sort;

    this.loadCategories();
  }

  addCategory(): void {
    const newCategory: Category = {
      name: ''
    };

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: newCategory
    });

    dialogRef.afterClosed().subscribe( resultCategory => {
      if (resultCategory === undefined) {
        return;
      }

      this.categoryService.add(resultCategory)
      .subscribe( data => {
        resultCategory.id = data.insertId;
        this.addRowData(resultCategory);
        this.refreshTableData();
      });
    });
  }

  editCategory(category: Category): void {
    console.log(category);
    const copyCategory: Category = Object.assign({}, category);
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: copyCategory
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('edit. afterClosed', result);
      if (result === undefined) {
        return;
      }

      this.categoryService.update(result)
      .subscribe(responseCategory => {
        this.updateRowData(category);
        this.refreshTableData();
      });
    });
  }

  deleteCategory(category: Category): void {
    this.categoryService.delete(category.id)
    .subscribe( responseCategory => {
      this.deleteRowData(category);
    });
  }

  applyFilter(categoryName: string): void {
    console.log(categoryName);
    this.categories.filter = categoryName.trim().toLowerCase();

    if (this.categories.paginator) {
      this.categories.paginator.firstPage();
    }
  }

  private loadCategories(): void {
    this.categoryService.getAll()
    .subscribe( data => {
      this.categories.data = data as Category[];
    });
  }

  private addRowData(category: Category): void {
    this.categories.data.push(category);
  }

  private deleteRowData(category: Category): void {
    this.categories.data = this.categories.data.filter((value) => {
      return value.id !== category.id;
    });
  }

  private updateRowData(category: Category): void {
    this.categories.data = this.categories.data.filter((value) => {
      if (value.id === category.id) {
        value.name = category.name;
      }

      return true;
    });
  }

  private refreshTableData(): void {
    this.categories.data = this.categories.data;
  }
}
