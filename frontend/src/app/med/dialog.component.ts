import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatDialogActions, MatDialogContent, MatButtonModule],
  template: `

  <section style="padding: 1%; text-align: center;">

        <h6  style="color: red; font-weight: bold;">Delete {{data.name}}</h6>

        <p style="font-size: 20px;">{{data.message}}</p>

        <mat-dialog-actions style="justify-content: space-evenly; font-weight: bolder;">

          <button mat-flat-button (click)="data.cancel()" > Cancel </button>

          <button mat-flat-button (click)="data.deletefun()" style="background-color: red; "> Confirm </button>

      </mat-dialog-actions> 

  </section>

  `,
  styles: ``
})
export class DialogComponent {
data = inject<any>(MAT_DIALOG_DATA)


}
