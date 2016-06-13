import {ERROR_MESSAGES} from "./error-messages";


export class Calculation {
  plus(firstParam: number, secondParam: number):number {
    if (!this.isNumeric(firstParam) || !this.isNumeric(secondParam)) {
      throw new Error(ERROR_MESSAGES.onlyNumbersAreAcceptable);
    }
    return firstParam + secondParam;
  }

  minus(firstParam: number, secondParam: number):number {
    if (!this.isNumeric(firstParam) || !this.isNumeric(secondParam)) {
      throw new Error(ERROR_MESSAGES.onlyNumbersAreAcceptable);
    }
    return firstParam - secondParam;
  }

  multiply(firstParam: number, secondParam: number):number {
    if (!this.isNumeric(firstParam) || !this.isNumeric(secondParam)) {
      throw new Error(ERROR_MESSAGES.onlyNumbersAreAcceptable);
    }
    return firstParam * secondParam;
  }

  divide(firstParam: number, secondParam: number):number {
    if (!this.isNumeric(firstParam) || !this.isNumeric(secondParam)) {
      throw new Error(ERROR_MESSAGES.onlyNumbersAreAcceptable);
    }
    if (secondParam !== 0) {
      return firstParam/secondParam
    } else {
      throw new Error(ERROR_MESSAGES.zeroDeleteErrorMessage);
    }
  }

  isNumeric(value:any) {
    return !isNaN(Number(value)) && isFinite(value);
  }
}
