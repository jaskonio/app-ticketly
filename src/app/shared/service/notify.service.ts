import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  config: any = {
    duration: 5000,
    horizontalPosition: 'right',
    verticalPosition: 'bottom'
  };

  constructor(public snackBar: MatSnackBar) {

  }

  info() {
    return true;
  }

  warn(message) {
    this.snackBar.open(message, 'OK', this.config);
  }
}
