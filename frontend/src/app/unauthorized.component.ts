import { Component } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [],
  template: `
    <div style="display: flex; justify-content: center;">
    <p style="font-size: 40px; color: red; font-weight: bolder">
      Error 401 forbidden you are... access from page!
    </p>
</div>
  `,
  styles: ``
})
export class UnauthorizedComponent {

}
