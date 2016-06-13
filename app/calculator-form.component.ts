import {Component, ChangeDetectionStrategy} from "@angular/core";
import {Store} from "@ngrx/store";
import {OPERATION_TYPES} from "./operation-types";
import {CalculationState} from "./calculation-state";
import {Observable} from "rxjs/Rx";
import {OPERATION_TYPES_SYMBOLS} from "./operation-types-symbols";


@Component({
  selector: 'calculator-form',
  templateUrl: 'app/calculator-form.component.html',
  styleUrls: ['app/calculator-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CalculatorFormComponent {

  currentInput:string = '0';
  public formState: Observable<CalculationState>;

  constructor(private _store:Store<any>) {
    this.formState = <any>_store.select('operations');

    this.formState.subscribe(data => {this.currentInput = data.currentInput});
  }


  setOperation(type:string) {
    this._store.dispatch({
      type: OPERATION_TYPES[type], payload: this.currentInput
    });
  }

  validate(event:KeyboardEvent) {
    let charCode = (event.which) ? event.which : event.keyCode;
    let symbol = String.fromCharCode(charCode);

    if (symbol === OPERATION_TYPES_SYMBOLS.plus) {
      this.setOperation(OPERATION_TYPES.plus);
    } else if (symbol === OPERATION_TYPES_SYMBOLS.minus) {
      this.setOperation(OPERATION_TYPES.minus);
    } else if (symbol === OPERATION_TYPES_SYMBOLS.multiply) {
      this.setOperation(OPERATION_TYPES.multiply);
    } else if (symbol === OPERATION_TYPES_SYMBOLS.divide) {
      this.setOperation(OPERATION_TYPES.divide);
    } else if (symbol === OPERATION_TYPES_SYMBOLS.calculate) {
      this.setOperation(OPERATION_TYPES.calculate);
    }

    if (symbol === '.') {
      if ((<HTMLInputElement>event.target).value.indexOf('.') === -1 && (<HTMLInputElement>event.target).value) {
        return true;
      } else {
        return false;
      }
    } else if (/[0-9]/.test(symbol)) {
      return true;
    }
    return false;
  }
}
