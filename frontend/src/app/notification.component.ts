import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [MatDialogActions, MatDialogContent, MatButtonModule],
  template: `
  @if(data.green === true){
    <section style="padding: 1%; text-align: center; background-color: green;">

<h6  style="color: white; font-weight: bold;">{{data.name}}</h6>

<p style="font-size: 20px; color: white;">{{data.message}}</p>


</section>}
@else {

  <section style="padding: 1%; text-align: center;  background-color: red;">

<h6  style="color: white; font-weight: bold;">{{data.name}}</h6>

<p style="font-size: 20px; color: white;">{{data.message}}</p>
</section>
}
  `,
  styles: ``
})
export class NotificationComponent {
  data = inject<any>(MAT_DIALOG_DATA)
}
