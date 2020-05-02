import {
  SET_CONTEXTS,
  PUSH_CONTEXT,
  PUSH_NEW_CONTEXT_LABEL,
  REMOVE_CONTEXT,
  PUSH_TODO,
  CHANGE_TODO,
  REORDER_TODOS_OPTIMISTIC,
  CHANGE_TODOS,
} from '../actions';

/* '5a3b871056fee56c85faf6c4': {
  id: '5a3b871056fee56c85faf6c4',
  label: 'DO',
  todos: [{}, {} {
    completed: boolean,
    content: "...",
    link: "..." | null | undefined,
    id: '5a3b871fee56c85faf6c4056',
    updatedAt: '2019-02-17T17:29:51.747Z'
  }],
  archived: boolean }
*/
const contexts = (state = {}, action) => {
  switch (action.type) {
    case SET_CONTEXTS: {
      const contexts = {};
      action.payload.forEach((context) => {
        const { id, label, todos, archived, updatedAt } = context;
        contexts[id] = { id, label, todos, archived, updatedAt };
      });
      return contexts;
    }

    case PUSH_CONTEXT: {
      const { id, label, todos, archived, updatedAt } = action.payload;
      return { ...state, [id]: { id, label, todos, archived, updatedAt } };
    }

    case PUSH_NEW_CONTEXT_LABEL: {
      const { id, label, archived, updatedAt, todos } = action.payload;
      return { ...state, [id]: { id, label, todos, archived, updatedAt } };
    }

    case REMOVE_CONTEXT: {
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    }

    case PUSH_TODO: {
      const context = state[action.activeContext];
      const todos = action.prepend
        ? [action.payload, ...context.todos]
        : [...context.todos, action.payload];
      return { ...state, [context.id]: { ...context, todos } };
    }

    case CHANGE_TODO: {
      const { activeContext, payload: changedTodo } = action;
      const todos = state[activeContext].todos.map((todo) => {
        return todo.id === changedTodo.id ? changedTodo : todo;
      });

      return {
        ...state,
        [activeContext]: { ...state[activeContext], todos },
      };
    }

    case REORDER_TODOS_OPTIMISTIC: {
      const currentContextId = action.activeContext;
      const sorting = action.payload;
      const todos = state[currentContextId].todos;
      const reorderedTodos = sorting.map((id) => todos.find((todo) => todo.id === id));

      return {
        ...state,
        [currentContextId]: {
          ...state[currentContextId],
          todos: reorderedTodos,
        },
      };
    }

    case CHANGE_TODOS: {
      const currentContextId = action.activeContext;
      const { id, label, todos, archived, updatedAt } = action.payload;
      return {
        ...state,
        [currentContextId]: { id, label, todos, archived, updatedAt },
      };
    }

    default:
      return state;
  }
};

export default contexts;
