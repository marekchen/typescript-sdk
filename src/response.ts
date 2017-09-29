import DroiError from './error';

export default class DroiResponse {
  private droierror: DroiError;
  private result: any;

  setDroiError(error: DroiError) {
    this.droierror = error;
  }

  getDroiError(): DroiError {
    return this.droierror;
  }

  setResult(result: any) {
    this.result = result;
  }

  getResult(): any {
    return this.result;
  }

  constructor(error: DroiError, result: any = null) {
    this.droierror = error;
    this.result = result;
  }
}