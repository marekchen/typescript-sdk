import DroiUser from "./user";
import DroiObject from "./object";
import DroiFile from "./file";

export default class Core {

  static User = DroiUser;
  static Object = DroiObject;
  static File = DroiFile;

  static _config = {
    appId: "",
    apiKey: ""
  };

  static initialize(appId: string, apiKey: string) {
    this._config.appId = appId;
    this._config.apiKey = apiKey;
  }

}