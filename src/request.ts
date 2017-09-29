import DroiFile from './file';
import { message } from 'gulp-typescript/release/utils';
import * as console from 'console';
import { } from './error';
import request = require('superagent');
import Droi from './core';
import DroiError from './error';
import DroiResponse from './response';
import * as Constants from './constants';

export const dorequest = (service: string, method: string, path: string, query: any, data = {}, authOptions: any) => {
  if (!(Droi._config.appId && Droi._config.apiKey)) {
    throw new Error('Not initialized');
  }
  //AV._appRouter.refresh();
  const url = createApiUrl({ service, path });
  return setHeaders(authOptions).then(
    headers => ajax(method, url, query, data, headers)//.catch(handleError)
  );
};

// const handleError = (error: any) => {
//   new Promise((resolve, reject) => {
//     let errorJSON = {
//       code: error.code || -1,
//       error: error.message || error.responseText,
//     };
//     if (error.response && error.response.code) {
//       errorJSON = error.response;
//     } else if (error.responseText) {
//       try {
//         errorJSON = JSON.parse(error.responseText);
//       } catch (e) {
//         // If we fail to parse the error text, that's okay.
//       }
//     }
//     resolve(new DroiError(errorJSON.code, errorJSON.error));
//   });
// }

const setHeaders = (authOptions = {}) => {
  console.log(Droi._config.appId);
  console.log(Droi._config.apiKey);
  const headers = {
    'X-Droi-AppID': Droi._config.appId,
    'X-Droi-Api-Key': Droi._config.apiKey,
    'Content-Type': 'application/json;charset=UTF-8'
  };

  return Promise.resolve().then(() => {
    // Pass the session token
    // const sessionToken = getSessionToken(authOptions);
    // if (sessionToken) {
    //   headers['X-Droi-Session-Token'] = sessionToken;
    // } else if (!AV._config.disableCurrentUser) {
    //   return AV.User.currentAsync().then((currentUser) => {
    //     if (currentUser && currentUser._sessionToken) {
    //       headers['X-Droi-Session-Token'] = currentUser._sessionToken;
    //     }
    //     return headers;
    //   });
    // }
    return headers;
  });
};

const createApiUrl = ({
  service = 'api',
  path = "",
  version = 'v2',
}) => {
  let apiURL = "https://api.droibaas.com/" + service;
  console.log(apiURL);
  if (!apiURL) throw new Error(`undefined server URL for ${service}`);

  if (apiURL.charAt(apiURL.length - 1) !== '/') {
    apiURL += '/';
  }
  apiURL += version;
  if (apiURL.charAt(apiURL.length - 1) !== '/') {
    apiURL += '/';
  }
  if (path) {
    apiURL += path;
  }

  return apiURL;
};

let requestsCount = 0;

const ajax = (method: string, url: string, query: any, data: any, headers = {}) => {
  const count = requestsCount++;

  console.log(`request(${count})`, method, url, query, data, headers);

  // const flattenedQuery = {};
  // if (query) {
  //   for (const k in query) {
  //     if (typeof query[k] === 'object') {
  //       flattenedQuery[k] = JSON.stringify(query[k]);
  //     } else {
  //       flattenedQuery[k] = query[k];
  //     }
  //   }
  // }

  return new Promise((resolve, reject) => {
    const req = request(method, url)
      .set(headers)
      //.query(flattenedQuery)
      .send(data);
    // if (onprogress) {
    //   req.on('progress', onprogress);
    // }

    req.end((err, res) => {
      var error: DroiError;
      var result;
      if (err) {
        console.log("ERROR:" + err);
        error = new DroiError();
        error.setCode(DroiError.ERROR);
        error.setAppendedMessage(`ajax error: ${err}`);
      } else {
        if (res) {
          console.log(res);
          var httpStatus = res.status;
          var errorCode = res.body.Code;
          var message = res.body.Message;
          result = res.body.Result;
          error = checkDroiError(httpStatus, errorCode, message);
        }
      }
      var response = new DroiResponse(error, result);
      return resolve(response);
    });
  });
};

function checkDroiError(httpStatus: number, errorCode: number, message: string): DroiError {
  console.log(`HttpStatus: ${httpStatus}, errorCode: ${errorCode}"`)
  var error = new DroiError();
  if (httpStatus == 200 && errorCode == 0) {
    if (errorCode == 0) {
      error.setCode(DroiError.OK);
      error.setAppendedMessage("ok");
    } else {
      error.setCode(errorCode);
      error.setAppendedMessage(message);
    }
    return error;
  }
  if (httpStatus != 0 && httpStatus != 200) {
    if (httpStatus == 404)
      error.setCode(DroiError.SERVICE_NOT_FOUND);
    else if (httpStatus == 403 || httpStatus == 405)
      error.setCode(DroiError.SERVICE_NOT_ALLOWED);
    else if (httpStatus == 509)
      error.setCode(DroiError.BANDWIDTH_LIMIT_EXCEED);
    else {
      error.setCode(DroiError.HTTP_SERVER_ERROR);
      error.setAppendedMessage("status: " + httpStatus);
    }
  } else {
    error.setCode(DroiError.ERROR);
    error.setAppendedMessage(`HttpStatus: ${httpStatus}, errorCode: ${errorCode}"`);
  }
  return error;
}

export function uploadFile(droifile: DroiFile, saveOptions = {}) {
  return new Promise((resolve, reject) => {
    const req = request('POST', droifile.upload_url)
      .field('token', droifile.token)
      .field('x:Id', droifile.getObjectId())
      .field('x:SessionId', droifile.session_id)
      .field('x:AppId', Droi._config.appId)
      .field('x:ApiKey', Droi._config.apiKey)
      .attach('file', droifile._data);

    // if (saveOptions.onprogress) {
    //   req.on('progress', saveOptions.onprogress);
    // }
    req.end((err, res) => {
      var error: DroiError;
      var result;
      if (err) {
        //console.log("ERROR:" + err);
        error = new DroiError();
        error.setCode(DroiError.ERROR);
        error.setAppendedMessage(`ajax error: ${err}`);
      } else {
        if (res) {
          //console.log(res);
          var httpStatus = res.status;
          var errorCode = res.body.Code;
          var message = res.body.Message;
          result = res.body.Result;
          error = checkDroiError(httpStatus, errorCode, message);
        }
      }
      var response = new DroiResponse(error, result);
      return resolve(response);
    });
  });
}
