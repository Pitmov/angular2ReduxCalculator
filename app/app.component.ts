import { Component } from '@angular/core';
import { CalculatorFormComponent } from "./calculator-form.component";

@Component({
  selector: 'my-app',
  template: `
      <h1>{{title}}</h1>
      <calculator-form></calculator-form>
    `,
  directives: [CalculatorFormComponent]
})
export class AppComponent {
  title:string = 'Angular 2 Calculator';
}
