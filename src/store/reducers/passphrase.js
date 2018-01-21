const passphrase = (state = '', action) => {
  switch(action.type) {

    case 'setPassphrase':
      return action.payload;

    default:
      return state;
  }
}

export default passphrase;
