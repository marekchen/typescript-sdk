import DroiResponse from './response';
import DroiError from './error'
import DroiObject from './object'
import request = require('./request');
import fs = require('fs');
import MD5 = require('md5');

export default class DroiFile extends DroiObject {

  name: string;
  mime_type: string;
  _data: any;
  md5: string | number[];
  size: number;
  upload_url: string;
  token: string;
  session_id: string;
  fid: string;
  file_url: string;

  setObjectId(id:string){
    this.objectId = id;
  }

  constructor(name: string, data: any) {
    super()
    this.name = name;
    this._data = data;
  }

  fetch(){
    return new Promise((resolve, reject) => {
      return request.dorequest("rest/files", "get", this.objectId, null, null, null);
    });
  }

  save() {
    return new Promise((resolve, reject) => {
      this._fileToken().then((response: DroiResponse) => {
        if (response.getDroiError().isOk()) {
          var result = response.getResult();
          this.upload_url = result.UploadUrl;
          this.token = result.Token;
          this.session_id = result.SessionId;
          this.objectId = result.Id;
          request.uploadFile(this).then((uploadResponse: DroiResponse) => {
            if (uploadResponse.getDroiError().isOk()) {
              var uploadResult = uploadResponse.getResult();
              this.file_url = uploadResult.CDN;
              this.fid = uploadResult.FId;
            }
            resolve(uploadResponse);
          });
        }
        else {
          resolve(response);
        }
      });
    });
  }

  _fileToken() {

    this.md5 = MD5(this._data);
    this.size = 21542;
    this.mime_type = "image/jpg";

    var data = {
      "Name": "pic.jpg",//this.name,
      "Type": this.mime_type,
      "Size": this.size,
      "MD5": this.md5
    }
    return request.dorequest("rest/files", "post", "", null, data, null);
  }

}