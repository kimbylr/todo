/*** contexts with todos ***/
export const SET_CONTEXTS = 'setContexts';
export const PUSH_CONTEXT = 'pushContext'; // also listened to by activeContext reducer
export const PUSH_NEW_CONTEXT_LABEL = 'pushNewContextLabel';
export const REMOVE_CONTEXT = 'removeContext'; // also listened to by activeContext reducer
export const REORDER_TODOS_OPTIMISTIC = 'reorderTodosOptimistic';
export const CHANGE_TODOS = 'changeTodos';

/*** single todo ***/
export const PUSH_TODO = 'pushTodo';
export const CHANGE_TODO = 'changeTodo';

/*** active context ***/
export const CHANGE_CONTEXT = 'changeContext';

export const changeContext = context => ({
  type: CHANGE_CONTEXT,
  payload: context,
});

/*** passphrase ***/
export const SET_PASSPHRASE = 'setPassphrase';

export const setPassphrase = passphrase => ({
  type: SET_PASSPHRASE,
  payload: passphrase,
});

/*** submitting ***/
export const SET_SUBMITTING_TRUE = { type: 'setSubmitting' };
