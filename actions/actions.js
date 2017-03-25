import {LOGIN,USERDETAILS} from './actionTypes.js'

export function loginUser(){
  IN.User.authorize(onUserAllows);
}

export function onUserAllows(res){
  IN.API.Raw("people/~?format=json").method("GET").body().result(function(res){
    return dispatch => {
      dispatch(getUserDetails(res))
    }
  });
}

export function getUserDetails(res){
  return {
    type : USERDETAILS,
    data : res
  }
}
