import {LOGIN,USERDETAILS} from './actionTypes.js'
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'

export function loginUser(){
return dispatch => {
  console.log(dispatch + "One")
  IN.User.authorize(()=>{dispatch(onUserAllows())});
  // return {type:"empty",data:{}};
}
}

export function onUserAllows(res){
  return dispatch=>{
  IN.API.Raw("people/~?format=json").method("GET").body().result(function(res){
      console.log("getting data")
      console.log(dispatch+"two")

      dispatch(getUserDetails(res));
      dispatch(changeToURL('/EditUser'));

  });
}
}

export function getUserDetails(res){
  console.log(res)
  return {
    type : USERDETAILS,
    data : res
  }
}

export function changeToURL(URL){
 return dispatch => {
  dispatch(browserHistory.push(URL));
}
}
