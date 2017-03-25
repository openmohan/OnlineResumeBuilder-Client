import { combineReducers } from 'redux'
import {USERDETAILS} from '../actions/actionTypes.js'

function user(state={},action){
  console.log(action.data)
  switch(action.type){
    case USERDETAILS : {console.log(action.data);return Object.assign({},state,{userdata : action.data})}
    case "empty" : return state;
    default : return state;
  }
}

const myApp = combineReducers({
  user
})

export default myApp
