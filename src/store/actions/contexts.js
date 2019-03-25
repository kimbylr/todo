import { setPassphraseAndFetch } from '../../helpers/setPassphraseAndFetch';
import {
  SET_CONTEXTS,
  PUSH_CONTEXT,
  PUSH_NEW_CONTEXT_LABEL,
  REMOVE_CONTEXT,
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

export const setContexts = contexts => ({
  type: SET_CONTEXTS,
  payload: contexts,
});

export const fetchAllTodos = () => (dispatch, getState) => {
  const url = API_BASE_URL;
  const params = getParams('GET', getState().passphrase);

  dispatch(SET_SUBMITTING_TRUE);
  return fetch(url, params)
    .then(response => response.json())
    .then(todos => {
      if (todos.error) {
        localStorage.setItem('passphrase', '');
        setPassphraseAndFetch(dispatch);
      } else dispatch(setContexts(todos));
    })
    .catch(error => console.log(error));
};

export const pushContext = context => ({
  type: PUSH_CONTEXT,
  payload: context,
});

export const addContext = label => (dispatch, getState) => {
  const url = API_BASE_URL + 'context';
  const params = getParams('POST', getState().passphrase, { label });

  dispatch(SET_SUBMITTING_TRUE);
  fetch(url, params)
    .then(response => response.json())
    .then(context => dispatch(pushContext(context)))
    .catch(error => console.log(error));
};

export const pushNewContextLabel = context => ({
  type: PUSH_NEW_CONTEXT_LABEL,
  payload: context,
});

export const renameContext = (id, label) => (dispatch, getState) => {
  const url = API_BASE_URL + id;
  const params = getParams('PUT', getState().passphrase, { label });

  dispatch(SET_SUBMITTING_TRUE);
  fetch(url, params)
    .then(response => response.json())
    .then(context => dispatch(pushNewContextLabel(context)))
    .catch(error => console.log(error));
};

export const removeContext = contextId => ({
  type: REMOVE_CONTEXT,
  payload: contextId,
});

export const archiveContext = id => (dispatch, getState) => {
  const url = API_BASE_URL + id;
  const params = getParams('DELETE', getState().passphrase);

  dispatch(SET_SUBMITTING_TRUE);
  fetch(url, params)
    .then(response => response.json())
    .then(contextId => dispatch(removeContext(contextId)))
    .catch(error => console.log(error));
};
