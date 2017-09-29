export default class DroiError {

  code: number = 0;
  appendedMessage: string;
  ticket: string;

  isOk(): boolean {
    return this.code == DroiError.OK;
  }

  setCode(code: number) {
    this.code = code;
  }

  getCode() {
    return this.code;
  }

  setAppendedMessage(appendedMessage: string) {
    this.appendedMessage = appendedMessage;
  }

  setTicket(ticket: string) {
    this.ticket = ticket;
  }

  toString(): string {
    var message = `Error code: ${this.code}", `;
    if (this.code != 0 && this.ticket != null)
      message += " Ticket: " + this.ticket;

    if (this.appendedMessage != null)
      message += " " + this.appendedMessage;

    return message;
  }

  constructor(code = 0, appendedMessage = "OK") {
    this.code = code;
    this.appendedMessage = appendedMessage;
  }

  static OK = 0;
  static UNKNOWN_ERROR = 1070000;
  static ERROR = 1070001;
  static USER_NOT_EXISTS = 1070002;
  static USER_PASSWORD_INCORRECT = 1070003;
  static USER_ALREADY_EXISTS = 1070004;
  static NETWORK_NOT_AVAILABLE = 1070005;
  static USER_NOT_AUTHORIZED = 1070006;
  static SERVER_NOT_REACHABLE = 1070007;
  static HTTP_SERVER_ERROR = 1070008;
  static SERVICE_NOT_ALLOWED = 1070009;
  static SERVICE_NOT_FOUND = 1070010;
  static INTERNAL_SERVER_ERROR = 1070011;
  static INVALID_PARAMETER = 1070012;
  static NO_PERMISSION = 1070013;
  static USER_DISABLE = 1070014;
  static EXCEED_MAX_SIZE = 1070015;
  static FILE_NOT_READY = 1070016;
  static CORE_NOT_INITIALIZED = 1070017;
  static USER_CANCELED = 1070018;
  static BANDWIDTH_LIMIT_EXCEED = 1070019;

  static TIME_UNCORRECTED = 1070201;
  static TIMEOUT = 1070202;

  // Users
  static USER_ALREADY_LOGIN = 1070301;
  static USER_CONTACT_HAD_VERIFIED = 1070302;
  static USER_CONTACT_EMPTY = 1070303;
  static USER_FUNCTION_NOT_ALLOWED = 1070304;

  static SIGNUP_USER_EXISTS = 1040008;
  static LOGIN_USER_NOT_EXISTS = 1040009;
  static LOGIN_USER_WRONG_PASSWORD = 1040010;
  static LOGIN_USER_DISABLE = 1040011;

  //DroiObject / DroiQuery

  // DroiFile
  static READ_CACHE_FAILED = 1070501;
  static UPLOAD_FAILED = 1070502;

}