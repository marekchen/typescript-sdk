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
  private UserId: string;
  private Password: string;

  setUserId(userId: string) {
    this.UserId = userId;
  }

  setPassword(password: string) {
    this.Password = password;
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

  static login(userId: string, password: string) {
    var data = {
      "Password": shajs('sha256').update(password).digest('hex'),
      "UserId": userId,
      "Type": "general"
    }
    return request.dorequest("rest/users", "post", "login", null, data, null);
  }

}