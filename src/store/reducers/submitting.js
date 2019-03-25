import {
  SET_SUBMITTING_TRUE,
  SET_CONTEXTS,
  PUSH_CONTEXT,
  PUSH_NEW_CONTEXT_LABEL,
  REMOVE_CONTEXT,
  CHANGE_TODOS,
  CHANGE_TODO,
  PUSH_TODO,
} from '../actions';

const submitting = (state = false, action) => {
  switch (action.type) {
    case SET_SUBMITTING_TRUE.type:
      return true;

    case SET_CONTEXTS:
    case PUSH_CONTEXT:
    case PUSH_NEW_CONTEXT_LABEL:
    case REMOVE_CONTEXT:
    case PUSH_TODO:
    case CHANGE_TODO:
    case CHANGE_TODOS:
      return false;

    default:
      return state;
  }
};

export default submitting;
