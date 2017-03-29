import {LOGIN,USERDETAILS,UPDATESTORE} from './actionTypes.js'
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'
const fields = ":(id,first-name,last-name,email-address,headline,picture-url,industry,summary,specialties,positions:(id,title,summary,start-date,end-date,is-current,company:(id,name,type,size,industry,ticker)),educations:(id,school-name,field-of-study,start-date,end-date,degree,activities,notes),associations,interests,num-recommenders,date-of-birth,publications:(id,title,publisher:(name),authors:(id,name),date,url,summary),patents:(id,title,summary,number,status:(id,name),office:(name),inventors:(id,name),date,url),languages:(id,language:(name),proficiency:(level,name)),skills:(id,skill:(name)),certifications:(id,name,authority:(name),number,start-date,end-date),courses:(id,name,number),recommendations-received:(id,recommendation-type,recommendation-text,recommender),honors-awards,three-current-positions,three-past-positions,volunteer)";
export function loginUser(){
return dispatch => {
  console.log(dispatch + "One")
  IN.User.authorize(()=>{dispatch(onUserAllows())});
  // return {type:"empty",data:{}};
}
}

export function onUserAllows(res){
  return dispatch=>{
  IN.API.Raw("people/~"+fields+"?format=json").method("GET").body().result(function(res){
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
  browserHistory.push(URL);
}
}

export function updateStoreData(updates){
  console.log(updates)
  return dispatch => {
    dispatch({
    type : UPDATESTORE,
    data : updates
  })
  }
}
