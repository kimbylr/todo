const filter = (state = {showPending: true, showCompleted: false}, action) => {
  switch(action.type) {

    case 'changeFilter':

      let { showPending, showCompleted } = state;

      if ( action.filter === 'pending' ) {
        showPending = !showPending
        if ( !showPending && !showCompleted ) showCompleted = true;
      }

      if ( action.filter === 'completed' ) {
        showCompleted = !showCompleted
        if ( !showPending && !showCompleted ) showPending = true;
      }

      return { showPending, showCompleted };

    default:
      return state;
  }
}

export default filter;
