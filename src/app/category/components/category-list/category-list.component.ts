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

  editCategory(currentCategory: Category): void {
    console.log(currentCategory);
    const copycurrentCategory: Category = Object.assign({}, currentCategory); // Para no actualizar el valor en la tabla
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: copycurrentCategory
    });

    dialogRef.afterClosed().subscribe(modifiedCategory => {
      console.log('edit. afterClosed', modifiedCategory);
      if (modifiedCategory === undefined) {
        return;
      }

      this.categoryService.update(modifiedCategory)
      .subscribe(responseCategory => {
        this.updateRowData(modifiedCategory);
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
        console.log(value);
        console.log(category);
        value.name = category.name;
      }

      return true;
    });
  }

  private refreshTableData(): void {
    console.log("refreshTableData")
    // If there's no data in filter we do update using pagination, next page or previous page
    if (this.categories.filteredData === []) {
      if (this.categories.paginator.pageIndex === 0) {
        this.categories.paginator.nextPage();
        this.categories.paginator.previousPage();
      } else {
        this.categories.paginator.previousPage();
        this.categories.paginator.nextPage();
      }
      // If there's something in filter, we reset it to 0 and then put back old value
    } else {
      this.categories.filter = '';
      //this.categories.filter = this.filter.nativeElement.value;
    }
  }
}
