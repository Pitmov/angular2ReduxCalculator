export class Format {
  public formatResult(value:number):string {
    return Number(value.toFixed(9)).toString();
  }

  public formatHistory(previousHistory:string, currentOperation:string, currentValue:string):string {
    return previousHistory + currentOperation + currentValue;
  }
}
