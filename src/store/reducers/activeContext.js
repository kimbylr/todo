const activeContext = (state = '', action) => {
  switch(action.type) {

    case 'changeContext':
      return action.contextId;

    case 'pushContext':
      return action.payload._id;

    case 'removeContext':
      if ( action.payload === state ) return '';
      else return state;

    default:
      return state;
  }
}

export default activeContext;
