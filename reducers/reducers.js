import { combineReducers } from 'redux'
import {USERDETAILS} from '../actions/actionTypes.js'
function user(state={},action){
  switch(action.type){
    case USERDETAILS : {return Object.assign({},state,{userdata : action.data})}
    default : return state;
  }
}

const myApp = combineReducers({
  user
})

export default myApp
