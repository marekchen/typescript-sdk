import DroiError from './error';
import DroiResponse from './response';
import * as console from 'console';
import DroiObject from './object'
import request = require('./request');
import shajs = require('sha.js');
//import shajs from 'sha.js'
//import sha256 = require('fast-sha256')
enum OtpType {
  PHONE,
  EMAIL
}
export default class DroiUser extends DroiObject {

  static _TableName = "_User";
  private UserId: string;
  private Password: string;

  setUserId(userId: string) {
    this.UserId = userId;
  }

  getUserId(): string {
    return this.UserId
  }

  setPassword(password: string) {
    this.Password = password;
  }

  static getCurrentUser() {

  }

  static requestOtp(contact: string, type: string) {
    var data = {
      "UserId": "droiotp_" + contact,
      "ContactType": type,
      "Contact": contact
    }
    console.log(type);
    return request.dorequest("rest/users", "post", "otp/login", null, data, null, );
  }

  static loginOtp(contact: string, type: string, otp: string) {
    var user = new DroiUser();
    user.UserId = "droiotp_" + contact;
    var data = {
      "UserId": user.UserId,
      "OTP": {
        "Code": otp,
        "ContactType": type
      },
      "Type": "otp"
    }
    return request.dorequest("rest/users", "post", "login", null, data, null, );
  }

  signUp() {
    var data = {
      Data: {
        "UserId": this.UserId,
        //Password:sha256.hash(this.Password).digest()
        "Password": shajs('sha256').update(this.Password).digest('hex')
      },
      Type: "general"
    }
    return request.dorequest("rest/users", "post", "signup", null, data, null, );
  }

  // {
  //   "Code": 0,
  //   "Result": {
  //     "Data": {
  //       "Email": "droi@droi.com",
  //       "Enabled": true,
  //       "PhoneNum": "",
  //       "UserId": "MyTestUser",
  //       "_ACL": {
  //         "creator": "194444d79ebc1211d0900774",
  //         "pr": true,
  //         "pw": true
  //       },
  //       "_ClassName": "DroiUser",
  //       "_CreationTime": "2017-03-16T01:54:05.487Z",
  //       "_Id": "194444d79ebc1211d0900774",
  //       "_ModifiedTime": "2017-03-16T01:54:05.487Z"
  //     },
  //     "ExpiredAt": "2017-04-15T01:54:05.513Z",
  //     "Token": "f9d9b30931741142"
  //   }
  // }
  static login(userId: string, password: string) {
    var data = {
      "Password": shajs('sha256').update(password).digest('hex'),
      "UserId": userId,
      "Type": "general"
    }
    return request.dorequest("rest/users", "post", "login", null, data, null)
      .then(function (resp: DroiResponse) {
        var droiError = resp.getDroiError();
        if (droiError.code == DroiError.LOGIN_USER_NOT_EXISTS)
          droiError.setCode(DroiError.USER_NOT_EXISTS);
        else if (droiError.code == DroiError.LOGIN_USER_WRONG_PASSWORD)
          droiError.setCode(DroiError.USER_PASSWORD_INCORRECT);
        else if (droiError.code == DroiError.LOGIN_USER_DISABLE)
          droiError.setCode(DroiError.USER_DISABLE);
      });
  }

}