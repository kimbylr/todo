import {
  SET_CONTEXTS,
  PUSH_CONTEXT,
  PUSH_NEW_CONTEXT_LABEL,
  REMOVE_CONTEXT,
  PUSH_TODO,
  CHANGE_TODO,
} from '../actions';

// '5a3b871056fee56c85faf6c4': { id: '5a3b871056fee56c85faf6c4', label: 'DO', todos, order, archived }
const contexts = (state = {}, action) => {
  switch(action.type) {

    case SET_CONTEXTS: {
      const contexts = {};
      action.payload.forEach( context => {
        const { _id: id, label, todos, order, archived } = context;
        const todoObj = {};
        todos.forEach( todo => { todoObj[todo._id] = todo; });
        contexts[id] = { id, label, todos: todoObj, order, archived };
      })
      return contexts;
    }

    case PUSH_CONTEXT: {
      const { _id: id, label, todos, order, archived } = action.payload;
      return ( { ...state, [id]: { id, label, todos, order, archived } } );
    }

    case PUSH_NEW_CONTEXT_LABEL: {
      const { _id: id, label, order, archived } = action.payload;
      const todos = {...state[id].todos};
      return ( { ...state, [id]: { id, label, todos, order, archived } } );
    }

    case REMOVE_CONTEXT: {
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    }

    case PUSH_TODO: {
      const currentContext = state[action.activeContext];
      currentContext.todos[action.payload._id] = action.payload;
      currentContext.order.push(action.payload._id);
      return { ...state, [currentContext.id]: currentContext };
    }

    case CHANGE_TODO: {
      const currentContextId = action.activeContext;
      const todos = { ...state[currentContextId].todos }
      todos[action.payload._id] = action.payload;
      return { ...state, [currentContextId]: { ...state[currentContextId], todos } };
    }

    default:
      return state;
  }
}

export default contexts;
