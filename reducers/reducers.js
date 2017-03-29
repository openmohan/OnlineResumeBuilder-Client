import { combineReducers } from 'redux'
import {USERDETAILS,UPDATESTORE} from '../actions/actionTypes.js'

function user(state={},action){
  console.log(action)
  switch(action.type){
    case USERDETAILS : {console.log(action.data);return Object.assign({},state,{userdata : action.data})}
    case UPDATESTORE : {console.log("mohann");return Object.assign({},state , {userdata : Object.assign({},state.userdata,action.data)})}
    case "empty" : return state;
    default : return state;
  }
}

const myApp = combineReducers({
  user
})

export default myApp
