const submitting = (state = false, action) => {
  switch (action.type) {
    case 'setSubmitting':
      return action.payload;

    default:
      return state;
  }
};

export default submitting;
