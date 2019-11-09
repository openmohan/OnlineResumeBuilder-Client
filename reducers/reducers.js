import { combineReducers } from "redux";
import {
  USERDETAILS,
  UPDATESTORE,
  RETURNUSER,
  UPDATEACCESSTOKEN
} from "../actions/actionTypes.js";

function user(state = {}, action) {
  switch (action.type) {
    case USERDETAILS: {
      return Object.assign({}, state, { userdata: action.data });
    }
    case UPDATESTORE: {
      return Object.assign({}, state, {
        userdata: Object.assign({}, state.userdata, action.data)
      });
    }
    case RETURNUSER: {
      return Object.assign({}, state, {
        userdata: Object.assign({}, state.userdata, { returningUser: true })
      });
    }
    case UPDATEACCESSTOKEN: {
      return Object.assign({}, state, {
        userdata: Object.assign({}, state, { accessToken: action.data })
      });
    }
    case "empty":
      return state;
    default:
      return state;
  }
}

const myApp = combineReducers({
  user
});

export default myApp;
