import { fetchAllTodos } from '../store/actions/contexts';
import { setPassphrase } from '../store/actions/index';

export const setPassphraseAndFetch = async dispatch => {
  let passphrase = localStorage.getItem('passphrase');
  if (!passphrase) {
    passphrase = window.prompt('Enter passphrase');
    localStorage.setItem('passphrase', passphrase);
  }
  dispatch(setPassphrase(passphrase));
  await dispatch(fetchAllTodos());

  // dispatch get last edit
};
