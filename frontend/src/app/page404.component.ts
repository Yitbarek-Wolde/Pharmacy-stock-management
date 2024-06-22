import { Component } from '@angular/core';

@Component({
  selector: 'app-404',
  standalone: true,
  imports: [],
  template: `
  <div style="display: flex; justify-content: center;">
    <p style="font-size: 50px; color: red; font-weight: bolder">
      Error 404 the page you requested Exists Not!
    </p>
</div>

  `,
  styles: ``
})
export class page404Component {

}
