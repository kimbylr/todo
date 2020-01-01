import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import Filter from './components/filter';
import Header from './components/header';
import NewTodo from './components/new-todo';
import { Submitting } from './components/submitting';
import DragDropArea from './compositions/drag-drop-area';
import { setPassphraseAndFetch } from './helpers/setPassphraseAndFetch';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import { fetchAllTodos } from './store/actions/contexts';

const App = ({ submitting, dispatch }) => {
  const [lastEdit, setLastEdit] = useState(null);

  useEffect(() => {
    setPassphraseAndFetch(dispatch);
  }, [dispatch]);

  // polling while window is in focus
  useEffect(() => {
    if (!lastEdit) {
      console.log('last update == null -> abort');
      return;
    }

    console.log(222);

    window.addEventListener('focus', () => {
      // polling –> if timestamp newer: dispatch(fetchAllTodos())
    });
    window.addEventListener('blur', () => {
      // stop polling
    });

    // return () => {
    //   window.removeEventListener()
    // };
  }, [lastEdit]);

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
});

const ConnectedApp = connect(mapStateToProps)(App);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
