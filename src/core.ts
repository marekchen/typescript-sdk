import DroiUser from "./user";

export default class Core {
  static User = DroiUser;

  static _config = {
    appId: "",
    apiKey: ""
  };

  static initialize(appId: string, apiKey: string) {
    this._config.appId = appId;
    this._config.apiKey = apiKey;
  }

}