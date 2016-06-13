import { OPERATION_TYPES } from './operation-types';
import {CalculationActions} from "./calculation-action";
import {Action} from "@ngrx/store";
import {CalculationState} from "./calculation-state";

var calculationActions = new CalculationActions();

export const operationReducer:any = (state: CalculationState = new CalculationState(0,'0','','','','0'), action: Action) => {
  switch (action.type) {
    case OPERATION_TYPES.plus:
     return calculationActions.plus(state, {currentInput: action.payload, operation: action.type});
    case OPERATION_TYPES.minus:
      return calculationActions.minus(state, {currentInput: action.payload, operation: action.type});
    case OPERATION_TYPES.multiply:
      return calculationActions.multiply(state, {currentInput: action.payload, operation: action.type});
    case OPERATION_TYPES.divide:
      return calculationActions.divide(state, {currentInput: action.payload, operation: action.type});
    case OPERATION_TYPES.calculate:
      return calculationActions.calculate(action.type, state, {currentInput: action.payload, operation: action.type});
    case OPERATION_TYPES.reset:
      return calculationActions.reset(state);
    default:
      return state;
  }
}
