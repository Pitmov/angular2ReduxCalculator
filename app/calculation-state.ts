export class CalculationState {
  public currentResult:number;
  public currentInput:string;
  public invalidMessage:string;
  public operation:string;
  public operationHistory:string;
  public formattedResult:string ;

  constructor(currentResult:number,
              currentInput:string,
              invalidMessage:string,
              operation:string,
              operationHistory:string,
              formattedResult:string) {
    this.currentResult = currentResult;
    this.currentInput = currentInput;
    this.invalidMessage = invalidMessage;
    this.operation = operation;
    this.operationHistory = operationHistory;
    this.formattedResult = formattedResult;
  }
}
