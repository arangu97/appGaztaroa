import * as ActionTypes from './ActionTypes';
import {baseUrl} from "../common/common";
import firebase from "../common/firebase";

export const paisajes = (state = { errMess: null, paisajes:[]}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_PAISAJES:

      return {...state, errMess: null, paisajes: action.payload ? action.payload : []};

    case ActionTypes.PAISAJES_FAILED:
      return {...state, errMess: action.payload};

    case ActionTypes.ADD_PAISAJE:
      state.paisajes.push(action.payload)
      fetch(baseUrl + 'paisajes/' + firebase.auth().currentUser.uid + '/' + action.payload.id + '.json', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(action.payload)
      })
      return {...state, errMess: null, paisajes: state.paisajes}

    case ActionTypes.DELETE_PAISAJE:
      fetch(baseUrl + 'paisajes/' + firebase.auth().currentUser.uid + '/' + action.payload + '.json', {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      return {...state, errMess: null, paisajes: state.paisajes.filter(paisaje => paisaje.id !== action.payload)}

    default:
      return state;
  }
};
