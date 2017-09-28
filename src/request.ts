import * as console from 'console';
import { } from './error';
import request = require('superagent');
import Droi from "./core";
import DroiError from "./error";

export const dorequest = (service: string, method: string, path: string, query: any, data = {}, authOptions: any, signKey: boolean = true) => {
  if (!(Droi._config.appId && Droi._config.apiKey)) {
    throw new Error('Not initialized');
  }
  //AV._appRouter.refresh();
  const url = createApiUrl({ service, path });
  return setHeaders(authOptions).then(
    headers => ajax(method, url, query, data, headers)
      .catch(handleError)
  );
};

const handleError = (error: any) => {
  new Promise((resolve, reject) => {
    let errorJSON = {
      code: error.code || -1,
      error: error.message || error.responseText,
    };
    if (error.response && error.response.code) {
      errorJSON = error.response;
    } else if (error.responseText) {
      try {
        errorJSON = JSON.parse(error.responseText);
      } catch (e) {
        // If we fail to parse the error text, that's okay.
      }
    }

    // Transform the error into an instance of AVError by trying to parse
    // the error string as JSON.
    reject(new DroiError(errorJSON.code, errorJSON.error));
  });
}

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
  // query, // don't care
  // method, // don't care
  // data, // don't care
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
    const req = request
      .post(url)
      .set(headers)
      //.query(flattenedQuery)
      .send(data);
    // if (onprogress) {
    //   req.on('progress', onprogress);
    // }
    req.end((err: DroiError, res) => {
      if (res) {
        console.log(`response(${count})`, res.status, res.body || res.text, res.header);
      }
      if (err) {
        if (res) {
          err.code = res.body.Code;
          var result = res.body.Result;
        }
        return reject(err);
      }
      console.log(res.body);
      return resolve(res.body);
    });
  });
};

//export { dorequest };