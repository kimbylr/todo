import {
  PUSH_TODO,
  CHANGE_TODO,
  REORDER_TODOS_OPTIMISTIC,
  CHANGE_TODOS,
  SET_SUBMITTING_TRUE,
} from '../actions';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const getParams = (method, passphrase, body) => ({
  method, // 'POST' etc.
  headers: {
    'Content-type': 'application/json',
    Authorization: passphrase,
  },
  body: JSON.stringify(body),
});

export const pushTodo = (todo, activeContext) => ({
  type: PUSH_TODO,
  payload: todo,
  activeContext,
});

export const addTodo = ({ content, link }, context) => (dispatch, getState) => {
  const activeContext = context || getState().activeContext;
  const url = API_BASE_URL + activeContext;
  const params = getParams('POST', getState().passphrase, { content, link });

  dispatch(SET_SUBMITTING_TRUE);
  return fetch(url, params)
    .then(response => response.json())
    .then(todo => dispatch(pushTodo(todo, activeContext)))
    .catch(error => console.log(error));
};

export const changeTodo = (todo, activeContext) => ({
  type: CHANGE_TODO,
  payload: todo,
  activeContext,
});

// TODO: refactor - "activeContextFacultative" allows changing todo in other context (used while moving)
export const triggerCompleted = (todo, activeContextFacultative) => (
  dispatch,
  getState,
) => {
  const activeContext = activeContextFacultative || getState().activeContext;
  const url = API_BASE_URL + activeContext + '/' + todo.id;
  const params = getParams('PUT', getState().passphrase, {
    completed: !todo.completed,
  });

  dispatch(SET_SUBMITTING_TRUE);

  // !! optimistic update (mostly for move to other context) !! -> will be overwritten
  const todoBefore = getState().contexts[activeContext][todo.id];
  dispatch(changeTodo({ ...todo, completed: !todo.completed }, activeContext));

  return fetch(url, params)
    .then(response => response.json())
    .then(todo => {
      // probably == optimistic, but let's stay consistent
      dispatch(changeTodo(todo, activeContext));
    })
    .catch(error => {
      console.log(error);
      dispatch(changeTodo(todoBefore, activeContext));
    });
};

export const changeContent = (
  todoId,
  content,
  link,
  activeContextFacultative,
) => (dispatch, getState) => {
  const activeContext = activeContextFacultative || getState().activeContext;
  const url = API_BASE_URL + activeContext + '/' + todoId;
  const params = getParams('PUT', getState().passphrase, { content, link });

  dispatch(SET_SUBMITTING_TRUE);
  return fetch(url, params)
    .then(response => response.json())
    .then(todo => dispatch(changeTodo(todo, activeContext)))
    .catch(error => console.log(error));
};

export const changeTodos = (activeContext, todos) => ({
  type: CHANGE_TODOS,
  payload: todos,
  activeContext,
});

export const reorderTodosOptimistic = (activeContext, todoIds) => ({
  type: REORDER_TODOS_OPTIMISTIC,
  payload: todoIds,
  activeContext,
});

export const changeOrder = ids => (dispatch, getState) => {
  const activeContext = getState().activeContext;
  const url = API_BASE_URL + activeContext + '/order/';
  const params = getParams('PUT', getState().passphrase, ids);

  dispatch(SET_SUBMITTING_TRUE);

  // !! optimistic update !! -> will be overwritten
  const todosBefore = getState().contexts[activeContext];
  dispatch(reorderTodosOptimistic(activeContext, ids));

  return fetch(url, params)
    .then(response => response.json())
    .then(todos => dispatch(changeTodos(activeContext, todos)))
    .catch(error => {
      console.log(error);
      dispatch(changeTodos(activeContext, todosBefore));
    });
};
