import { setPassphraseAndFetch } from '../../helpers/setPassphraseAndFetch';
import {
  SET_CONTEXTS,
  PUSH_CONTEXT,
  PUSH_NEW_CONTEXT_LABEL,
  REMOVE_CONTEXT,
  setSubmitting,
} from '../actions';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const setContexts = contexts => ({
  type: SET_CONTEXTS,
  payload: contexts,
});

export const fetchAllTodos = () => (dispatch, getState) => {
  const url = API_BASE_URL;
  const params = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: getState().passphrase,
    },
  };

  dispatch(setSubmitting(true));
  return fetch(url, params)
    .then(response => response.json())
    .then(todos => {
      if (todos.error) {
        localStorage.setItem('passphrase', '');
        setPassphraseAndFetch(dispatch);
      } else dispatch(setContexts(todos));
    })
    .catch(error => console.log(error))
    .finally(dispatch(setSubmitting(false)));
};

export const pushContext = context => ({
  type: PUSH_CONTEXT,
  payload: context,
});

export const addContext = label => (dispatch, getState) => {
  const url = API_BASE_URL + 'context';
  const params = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: getState().passphrase,
    },
    body: JSON.stringify({ label }),
  };

  dispatch(setSubmitting(true));
  fetch(url, params)
    .then(response => response.json())
    .then(context => dispatch(pushContext(context)))
    .catch(error => console.log(error))
    .finally(dispatch(setSubmitting(false)));
};

export const pushNewContextLabel = context => ({
  type: PUSH_NEW_CONTEXT_LABEL,
  payload: context,
});

export const renameContext = (id, label) => (dispatch, getState) => {
  const url = API_BASE_URL + id;
  const params = {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      Authorization: getState().passphrase,
    },
    body: JSON.stringify({ label }),
  };

  dispatch(setSubmitting(true));
  fetch(url, params)
    .then(response => response.json())
    .then(context => dispatch(pushNewContextLabel(context)))
    .catch(error => console.log(error))
    .finally(dispatch(setSubmitting(false)));
};

export const removeContext = contextId => ({
  type: REMOVE_CONTEXT,
  payload: contextId,
});

export const archiveContext = id => (dispatch, getState) => {
  const url = API_BASE_URL + id;
  const params = {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      Authorization: getState().passphrase,
    },
  };

  dispatch(setSubmitting(true));
  fetch(url, params)
    .then(response => response.json())
    .then(contextId => dispatch(removeContext(contextId)))
    .catch(error => console.log(error))
    .finally(dispatch(setSubmitting(false)));
};
