import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import Filter from './components/filter';
import Header from './components/header';
import NewTodo from './components/new-todo';
import { Submitting } from './components/submitting';
import DragDropArea from './compositions/drag-drop-area';
import { setPassphraseAndFetch } from './helpers/setPassphraseAndFetch';
import { usePolling } from './helpers/usePolling';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

const App = ({ submitting, passphrase, dispatch }) => {
  // initial fetch
  useEffect(() => {
    setPassphraseAndFetch(dispatch);
  }, [dispatch]);

  usePolling(passphrase, dispatch);

  return (
    <>
      <Submitting active={submitting} />
      <Header />
      <NewTodo />
      <DragDropArea />
      <Filter />
    </>
  );
};

const mapStateToProps = state => ({
  submitting: state.submitting,
  passphrase: state.passphrase,
});

const ConnectedApp = connect(mapStateToProps)(App);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
