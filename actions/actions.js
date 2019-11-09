import {
  LOGIN,
  USERDETAILS,
  UPDATESTORE,
  RETURNUSER,
  APIURL,
  UPDATEACCESSTOKEN
} from "./actionTypes.js";
import {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  SCOPE,
  GRANT_TYPE
} from "./constants";
import { Router, Route, Link, browserHistory, IndexRoute } from "react-router";
import qs from "qs";
import store from "../configureStore";

const fields =
  ":(id,first-name,last-name,email-address,headline,picture-url,industry,summary,specialties,positions:(id,title,summary,start-date,end-date,is-current,company:(id,name,type,size,industry,ticker)),educations:(id,school-name,field-of-study,start-date,end-date,degree,activities,notes),associations,interests,num-recommenders,date-of-birth,publications:(id,title,publisher:(name),authors:(id,name),date,url,summary),patents:(id,title,summary,number,status:(id,name),office:(name),inventors:(id,name),date,url),languages:(id,language:(name),proficiency:(level,name)),skills:(id,skill:(name)),certifications:(id,name,authority:(name),number,start-date,end-date),courses:(id,name,number),recommendations-received:(id,recommendation-type,recommendation-text,recommender),honors-awards,three-current-positions,three-past-positions,volunteer)";
import fetch from "isomorphic-fetch";

export var ACCESS_TOKEN = "";

export function loginUser() {
  return dispatch => {
    var params = {
      response_type: "code",
      client_id: CLIENT_ID,
      // redirect_uri: "https://realevents.herokuapp.com/",
      redirect_uri: REDIRECT_URI,
      scope: SCOPE
    };
    var esc = encodeURIComponent;
    var query = Object.keys(params)
      .map(k => k + "=" + params[k])
      .join("&");
    window.location.href =
      "https://www.linkedin.com/oauth/v2/authorization?" + query;
    // fetch("https://www.linkedin.com/oauth/v2/authorization?" + query, {
    //   method: "GET",
    //   // mode: "no-cors",
    //   headers: {
    //     "Access-Control-Request-Headers": "*",
    //     "Access-Control-Allow-Origin": "*"
    //   }
    // }).then(function(data) {
    //   console.log(data);
    // });
    // IN.User.authorize(() => {
    //   dispatch(onUserAllows());
    // });
    // return {type:"empty",data:{}};
  };
}

export function onUserAllows(res) {
  return dispatch => {
    IN.API.Raw("people/~" + fields + "?format=json")
      .method("GET")
      .body()
      .result(function(res) {
        dispatch(getUserDetails(res));
        dispatch(changeToURL("/EditUser"));
      });
  };
}

export function getUserDetails(resp) {
  return dispatch => {
    fetch(APIURL + "/user/id/" + resp.id, {
      //pass cookies, for authentication
      method: "GET"
      // mode: "no-cors",
      // headers:{'Access-Control-Request-Headers': "*","Access-Control-Allow-Origin":"*"},
    })
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          dispatch(putUserDetails(data[0]));
          dispatch(returningUser());
        } else {
          dispatch(putUserDetails(resp));
        }
      });
  };
  return {
    type: USERDETAILS,
    data: resp
  };
}

export function returningUser() {
  return {
    type: RETURNUSER,
    data: true
  };
}

export function putUserDetails(res) {
  return {
    type: USERDETAILS,
    data: res
  };
}

export function changeToURL(URL) {
  return dispatch => {
    browserHistory.push(URL);
  };
}

export function updateStoreData(updates) {
  return dispatch => {
    dispatch({
      type: UPDATESTORE,
      data: updates
    });
  };
}

export function updateLoginInfo(code) {
  return dispatch => {
    // let params = {
    //   grant_type: GRANT_TYPE,
    //   code: code,
    //   redirect_uri: REDIRECT_URI,
    //   client_id: CLIENT_ID,
    //   client_secret: CLIENT_SECRET
    // };
    // let formBody = [];
    // for (let property in params) {
    //   let encodedKey = encodeURIComponent(property);
    //   let encodedValue = encodeURIComponent(params[property]);
    //   formBody.push(encodedKey + "=" + encodedValue);
    // }
    // formBody = formBody.join("&");
    // var query = Object.keys(params)
    //   .map(k => k + "=" + encodeURIComponent(params[k]))
    //   .join("&");
    // // get access TOken
    // fetch("https://www.linkedin.com/oauth/v2/accessToken", {
    //   method: "POST",
    //   mode: "no-cors",
    //   body: formBody,
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   }
    // })
    //   .then(function(data) {
    //     console.log(data);
    //     return data.json();
    //   })
    //   .then(function(data) {
    //     console.log(data);
    //     feedAccessToken(data.access_token);
    //     var code = data.access_token;
    let params = {
      token: code
    };
    console.log(code);
    let formBody = [];
    for (let property in params) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = params[property];
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    var query = Object.keys(params)
      .map(k => k + "=" + encodeURIComponent(params[k]))
      .join("&");

    fetch(APIURL + "/getLinkedInData", {
      method: "POST",
      body: formBody,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(function(data) {
        return data.json();
      })
      .then(function(data) {
        dispatch(putUserDetails(data[0]));
      });
  };
}

// TODO: (make access token store to localStorage)
function feedAccessToken(access_token) {
  ACCESS_TOKEN = access_token;
  return {
    type: UPDATEACCESSTOKEN,
    data: access_token
  };
}

function getUserData() {
  console.log("getting user data");
  console.log(ACCESS_TOKEN);
  fetch(APIURL + "/getLinkedInData", {
    method: "POST",
    headers: { token: ACCESS_TOKEN }
  })
    .then(data => {
      console.log(data.json());
      return data.json();
    })
    .then(data => {
      console.log(data.body);
    });
}
