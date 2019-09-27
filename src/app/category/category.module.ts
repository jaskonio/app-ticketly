import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';

import { CategoryListComponent } from './components/category-list/category-list.component';

import { FormsModule } from '@angular/forms';

import { CategoryService } from './services/category.service';

import { HttpClientModule } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceBase } from '../shared/service/serviceBase';

@NgModule({
  declarations: [
    CategoryListComponent,
    DialogComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  providers: [
    ServiceBase,
    CategoryService
  ],
  entryComponents: [DialogComponent]

})
export class CategoryModule { }
