import { API_BASE_URL } from '../../resources/API_URL';

import {
  PUSH_TODO,
  CHANGE_TODO,
} from '../actions';


export const pushTodo = (todo, activeContext) => ({
  type: PUSH_TODO,
  payload: todo,
  activeContext
});

export const addTodo = (text) => (dispatch, getState) => {
  const activeContext = getState().activeContext;
  const url = API_BASE_URL + activeContext;
  const params = {
    method: 'POST',
    headers: { 'Content-type': 'application/json', 'Authorization': getState().passphrase },
    body: JSON.stringify({ content: text })
  };

  return fetch(url, params)
    .then( response => response.json() )
    .then( todo => dispatch(pushTodo(todo, activeContext)) )
    .catch( error => {} );
}


export const changeTodo = (todo, activeContext) => ({
  type: CHANGE_TODO,
  payload: todo,
  activeContext
});

export const triggerCompleted = (todo) => (dispatch, getState) => {
  const activeContext = getState().activeContext;
  const url = API_BASE_URL + activeContext + '/' + todo._id;
  const params = {
    method: 'PUT',
    headers: { 'Content-type': 'application/json', 'Authorization': getState().passphrase },
    body: JSON.stringify({ completed: !todo.completed })
  };

  return fetch(url, params)
    .then( response => response.json() )
    .then( todo => dispatch(changeTodo(todo, activeContext)) )
    .catch( error => {} );
}

export const changeText = (todoId, content) => (dispatch, getState) => {
  const activeContext = getState().activeContext;
  const url = API_BASE_URL + activeContext + '/' + todoId;
  console.log(url);
  const params = {
    method: 'PUT',
    headers: { 'Content-type': 'application/json', 'Authorization': getState().passphrase },
    body: JSON.stringify({ content })
  };

  return fetch(url, params)
    .then( response => response.json() )
    .then( todo => dispatch(changeTodo(todo, activeContext)) )
    .catch( error => {} );
}
