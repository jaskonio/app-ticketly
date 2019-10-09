import { Component, ViewChild, Input } from '@angular/core';

import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { Category } from 'src/app/category/model/category';

@Component({
  selector: 'app-table-base',
  templateUrl: './tableBase.component.html',
  styleUrls: ['./tableBase.component.css']
})
export class TableBaseComponent {

  @ViewChild(MatTable, { static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  // tslint:disable-next-line: no-input-rename
  @Input('service') service: any;
  // tslint:disable-next-line: no-input-rename
  @Input('displayedColumns') displayedColumns: string[];
  // tslint:disable-next-line: no-input-rename
  @Input('typeObject') typeObject: any;
  // tslint:disable-next-line: no-input-rename
  @Input('titleDialog') titleDialog: string;

  pageSizeOptions = [5, 10, 20];
  datasource = new MatTableDataSource<any>();

  constructor(
    public dialog: MatDialog) {
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;

    this.loaddatasource();
    this.displayedColumns = this.displayedColumns === undefined ?  this.setDefaultsKeys() : this.displayedColumns;
  }

  private setDefaultsKeys(): string[] {
    let excludeKeys: string[];
    let keysEnableds: string[];

    excludeKeys = ['id'];

    keysEnableds = Object.keys(this.typeObject);

    keysEnableds = keysEnableds.filter( key => {
      return !excludeKeys.includes(key);
    });

    keysEnableds.push(this.AddButtonColumns());

    return keysEnableds;
  }

  private AddButtonColumns(): string {
    return 'actions';
  }

  addRow(): void {
    const rowEmpty: any = Object.assign({}, this.typeObject);
    console.log('add Row', rowEmpty);
    console.log(this.titleDialog);

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {data: rowEmpty, title: this.titleDialog},
    });

    dialogRef.afterClosed().subscribe( rowWithData => {
      if (rowWithData === undefined) {
        return;
      }

      this.service.add(rowWithData)
      .subscribe( data => {
        rowWithData.id = data.insertId;
        this.addRowData(rowWithData);
        this.refreshTableData();
      });
    });
  }

  editCategory(currentRow: Category): void {
    console.log('editCategory', currentRow);
    const copyCurrentRow: Category = Object.assign({}, currentRow); // Para no actualizar el valor en la tabla
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {data: copyCurrentRow, title: this.titleDialog}
    });

    dialogRef.afterClosed().subscribe(rowModified => {
      console.log('edit. afterClosed', rowModified);
      if (rowModified === undefined) {
        return;
      }

      this.service.update(rowModified)
      .subscribe(responseRow => {
        this.updateRowData(rowModified);
        this.refreshTableData();
      });
    });
  }

  deleteCategory(row: any): void {
    this.service.delete(row.id)
    .subscribe( responseService => {
      this.deleteRowData(row);
    });
  }

  applyFilter(filterValue: string): void {
    console.log('applyFilter', filterValue);
    this.datasource.filter = filterValue.trim().toLowerCase();

    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }

  private loaddatasource(): void {
    this.service.getAll()
    .subscribe( data => {
      this.datasource.data = data;
    });
  }

  private addRowData(row: any): void {
    this.datasource.data.push(row);
  }

  private deleteRowData(row: any): void {
    this.datasource.data = this.datasource.data.filter((value) => {
      return value.id !== row.id;
    });
  }

  private updateRowData(row: any): void {
    this.datasource.data = this.datasource.data.filter((value) => {
      if (value.id === row.id) {
        value.name = row.name;
      }

      return true;
    });
  }

  private refreshTableData(): void {
    console.log('refreshTableData');
    // If there's no data in filter we do update using pagination, next page or previous page
    if (this.datasource.filteredData === []) {
      if (this.datasource.paginator.pageIndex === 0) {
        this.datasource.paginator.nextPage();
        this.datasource.paginator.previousPage();
      } else {
        this.datasource.paginator.previousPage();
        this.datasource.paginator.nextPage();
      }
      // If there's something in filter, we reset it to 0 and then put back old value
    } else {
      this.datasource.filter = '';
      // this.datasource.filter = this.filter.nativeElement.value;
    }
  }
}
