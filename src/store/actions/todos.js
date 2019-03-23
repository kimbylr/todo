import { PUSH_TODO, CHANGE_TODO, CHANGE_TODOS } from '../actions';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const pushTodo = (todo, activeContext) => ({
  type: PUSH_TODO,
  payload: todo,
  activeContext,
});

export const addTodo = text => (dispatch, getState) => {
  const activeContext = getState().activeContext;
  const url = API_BASE_URL + activeContext;
  const params = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: getState().passphrase,
    },
    body: JSON.stringify({ content: text }),
  };

  return fetch(url, params)
    .then(response => response.json())
    .then(todo => dispatch(pushTodo(todo, activeContext)))
    .catch(error => {});
};

export const changeTodo = (todo, activeContext) => ({
  type: CHANGE_TODO,
  payload: todo,
  activeContext,
});

export const triggerCompleted = todo => (dispatch, getState) => {
  const activeContext = getState().activeContext;
  const url = API_BASE_URL + activeContext + '/' + todo.id;
  const params = {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      Authorization: getState().passphrase,
    },
    body: JSON.stringify({ completed: !todo.completed }),
  };

  return fetch(url, params)
    .then(response => response.json())
    .then(todo => dispatch(changeTodo(todo, activeContext)))
    .catch(error => {});
};

export const changeText = (todoId, content) => (dispatch, getState) => {
  const activeContext = getState().activeContext;
  const url = API_BASE_URL + activeContext + '/' + todoId;
  const params = {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      Authorization: getState().passphrase,
    },
    body: JSON.stringify({ content }),
  };

  return fetch(url, params)
    .then(response => response.json())
    .then(todo => dispatch(changeTodo(todo, activeContext)))
    .catch(error => {});
};

export const changeTodos = (activeContext, todos) => ({
  type: CHANGE_TODOS,
  payload: todos,
  activeContext,
});

export const changeOrder = ids => (dispatch, getState) => {
  const activeContext = getState().activeContext;
  const url = API_BASE_URL + activeContext + '/order/';
  const params = {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      Authorization: getState().passphrase,
    },
    body: JSON.stringify(ids),
  };

  return fetch(url, params)
    .then(response => response.json())
    .then(todos => dispatch(changeTodos(activeContext, todos)))
    .catch(error => {});
};
