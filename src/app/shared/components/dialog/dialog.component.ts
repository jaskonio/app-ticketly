import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  form: FormGroup;
  properties: string[];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.form = this.formBuilder.group(this.data);
    this.properties = this.setDefaultsKeys(this.data, ['id']);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  save() {
    console.log('DialogComponent');
    this.properties.forEach(property => {
      this.data[property] = this.form.controls[property].value;
    });

    console.log(this.data);
    this.dialogRef.close(this.data);
  }

  private setDefaultsKeys(obj, excludeKeys ): string[] {
    let keysEnableds: string[];

    keysEnableds = Object.keys(obj);

    keysEnableds = keysEnableds.filter( key => {
      return !excludeKeys.includes(key);
    });
    console.log(keysEnableds);
    return keysEnableds;
  }

}
