import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableBaseComponent } from './components/tableBase/tableBase.component';
import { DialogComponent } from './components/dialog/dialog.component';

import { HttpClientModule } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ServiceBase } from './service/serviceBase';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotifyService } from './service/notify.service';


@NgModule({
  declarations: [
    TableBaseComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  providers: [
    ServiceBase,
    NotifyService
  ],
  exports: [
    TableBaseComponent,
    DialogComponent
  ],
  entryComponents : [
    DialogComponent
  ]
})
export class SharedModule { }
