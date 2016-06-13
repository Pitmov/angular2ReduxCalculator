import {Calculation} from './calculcation';
import {Format} from './format';
import {CalculationState} from "./calculation-state";
import {OPERATION_TYPES} from "./operation-types";
import {OPERATION_TYPES_SYMBOLS} from "./operation-types-symbols";
import {ERROR_MESSAGES} from "./error-messages";

var format = new Format();
var calculation = new Calculation();

export class CalculationActions {

  operation(operation:string ,state:any, data:any):CalculationState {
    let currentResult: number;
    let history: string;
    let formattedResult: string;
    let invalidMessage: string;

    if (data.currentInput && !calculation.isNumeric(data.currentInput)) {
      return Object.assign({}, state, {
        currentResult: state.currentResult,
        currentInput: null,
        invalidMessage: ERROR_MESSAGES.onlyNumbersAreAcceptable,
        operation: data.operation,
        operationHistory: state.operationHistory,
        formattedResult: state.formattedResult
      });
    }

    if (!state.operationHistory && data.currentInput) {
      currentResult = +data.currentInput;
      return Object.assign({},state,{
        currentResult: currentResult,
        currentInput: null,
        invalidMessage: '',
        operation: data.operation,
        operationHistory: currentResult.toString(),
        formattedResult: format.formatResult(currentResult)
      });
    }

    if (state.operation && data.currentInput) {
      try {
        currentResult = calculation[operation](state.currentResult, +data.currentInput);
      } catch(e) {
        invalidMessage = e.message;
      }
      if (!invalidMessage) {
        history = format.formatHistory(state.operationHistory,
          OPERATION_TYPES_SYMBOLS[operation],
          (+data.currentInput).toString());
        formattedResult = format.formatResult(currentResult);
        return Object.assign({}, state, {
          currentResult: currentResult,
          currentInput: null,
          invalidMessage: '',
          operation: data.operation,
          operationHistory: history,
          formattedResult: format.formatResult(currentResult)
        });
      } else {
        return Object.assign({}, state, {
          currentResult: state.currentResult,
          currentInput: null,
          invalidMessage: invalidMessage,
          operation: data.operation,
          operationHistory: state.operationHistory,
          formattedResult: state.formattedResult
        });
      }
    }

    if (state.operation && !data.currentInput) {
      return Object.assign({},state, {
        currentResult: state.currentResult,
        currentInput: null,
        invalidMessage: '',
        operation: data.operation,
        operationHistory: state.operationHistory,
        formattedResult: state.formattedResult
      });
    }

    if (!state.operation && data.currentInput) {
      try {
        currentResult = calculation[operation](state.currentResult, +data.currentInput);
      } catch(e) {
        invalidMessage = e.message;
      }
      if (!invalidMessage) {
        history = format.formatHistory(state.operationHistory,
          OPERATION_TYPES_SYMBOLS[operation],
          (+data.currentInput).toString());
        formattedResult = format.formatResult(currentResult);
        return Object.assign({}, state, {
          currentResult: currentResult,
          currentInput: null,
          invalidMessage: '',
          operation: '',
          operationHistory: history,
          formattedResult: format.formatResult(currentResult)
        });
      } else {
        return Object.assign({}, state, {
          currentResult: state.currentResult,
          currentInput: null,
          invalidMessage: invalidMessage,
          operation: data.operation,
          operationHistory: state.operationHistory,
          formattedResult: state.formattedResult
        });
      }
    }

    return Object.assign({}, state, {
      currentResult: state.currentResult,
      currentInput: state.currentInput,
      invalidMessage: state.currentMessage,
      operation: data.operation,
      operationHistory: state.operationHistory,
      formattedResult: state.formattedResult
    });
  }

  plus(state:any, data:any):CalculationState {
    return this.operation(OPERATION_TYPES.plus, state, data);
  }

  minus(state:any, data:any):CalculationState {
    return this.operation(OPERATION_TYPES.minus, state, data);
  }

  divide(state:any, data:any):CalculationState {
    return this.operation(OPERATION_TYPES.divide, state, data);
  }

  multiply(state:any, data:any):CalculationState {
    return this.operation(OPERATION_TYPES.multiply, state, data);
  }


  calculate(operation:string, state:any, data:any):CalculationState {
    if (this[state.operation]) {
      return this[state.operation](state, {
        currentInput: data.currentInput,
        operation: ''
      });
    }
    return state;
  }

  reset(state: any):CalculationState {
    return Object.assign({}, state, {
      currentResult: 0,
      currentInput: '0',
      invalidMessage: '',
      operation: '',
      operationHistory: '',
      formattedResult: '0'
    });
  }
}

