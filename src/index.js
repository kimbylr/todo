import React, { useEffect, useState, useRef } from 'react';
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

const WS_URL = process.env.REACT_APP_WS_URL;

const App = ({ submitting, dispatch }) => {
  useEffect(() => {
    setPassphraseAndFetch(dispatch);
  }, [dispatch]);

  // block refreshing (when moving todo) for 2s
  // otherwise context would be switched after refresh
  const [doRefresh, setDoRefresh] = useState(true);
  const disableRefresh = () => {
    setDoRefresh(false);
    setInterval(() => setDoRefresh(true), 2000);
  };
  const shouldRefetch = useRef();
  shouldRefetch.current = doRefresh;

  // handle WebSocket
  const [ws, setWs] = useState(null);
  useEffect(() => {
    if (ws && (ws.OPEN || ws.CONNECTING)) {
      return;
    }

    const socket = new WebSocket(WS_URL);
    socket.onopen = () => console.log('WS connection established');
    socket.onclose = () => setWs(null);
    socket.onmessage = ({ data }) => {
      shouldRefetch.current && data === 'refresh' && dispatch(fetchAllTodos());
    };

    setWs(socket);
  }, [dispatch, ws]);

  return (
    <>
      <Submitting active={submitting} />
      <Header />
      <NewTodo />
      <DragDropArea disableRefresh={disableRefresh} />
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
