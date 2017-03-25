import {LOGIN,USERDETAILS} from './actionTypes.js'
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'

export function loginUser(){
  IN.User.authorize(onUserAllows);
}

export function onUserAllows(res){
  IN.API.Raw("people/~?format=json").method("GET").body().result(function(res){
    return dispatch => {
      dispatch(getUserDetails(res));
      dispatch(changeToURL('/EditUser'))
    }
  });
}

export function getUserDetails(res){
  return {
    type : USERDETAILS,
    data : res
  }
}

export function changeToURL(URL){
  browserHistory.push(URL)
}
