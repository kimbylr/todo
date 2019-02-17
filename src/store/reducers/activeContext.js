import { SET_CONTEXTS } from '../actions';

const activeContext = (state = '', action) => {
  switch (action.type) {
    case SET_CONTEXTS:
      const contexts = action.payload
        .map(({ id, updatedAt }) => ({
          id,
          updatedAt,
        }))
        .sort(({ updatedAt: a }, { updatedAt: b }) => b - a);

      if (!contexts[0]) return state;

      return contexts[0].id;

    case 'changeContext':
      return action.contextId;

    case 'pushContext':
      return action.payload.id;

    case 'removeContext':
      if (action.payload === state) return '';
      else return state;

    default:
      return state;
  }
};

export default activeContext;
