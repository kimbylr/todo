import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import styled from 'styled-components';
import Contexts from './components/contexts';
import Filter from './components/filter';
import Header from './components/header';
import NewTodo from './components/new-todo';
import { Submitting } from './components/submitting';
import DragDropArea from './compositions/drag-drop-area';
import Todos from './compositions/todos';
import { setPassphraseAndFetch } from './helpers/setPassphraseAndFetch';
import { useRefreshOnFocus } from './helpers/useRefreshOnFocus';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

const Main = styled.main`
  background-color: #fff;
  /** header 80 + 16 + 16|notch */
  min-height: calc(100vh - 96px - max(env(safe-area-inset-top), 16px));
`;

const App = ({ submitting, passphrase, dispatch }) => {
  // initial fetch
  useEffect(() => {
    setPassphraseAndFetch(dispatch);
  }, [dispatch]);

  useRefreshOnFocus(passphrase, dispatch);

  return (
    <>
      <Submitting active={submitting} />
      <Header />
      <Main>
        <NewTodo />
        <DragDropArea>
          <Contexts />
          <Todos />
        </DragDropArea>
        <Filter />
      </Main>
    </>
  );
};

const mapStateToProps = (state) => ({
  submitting: state.submitting,
  passphrase: state.passphrase,
});

const ConnectedApp = connect(mapStateToProps)(App);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
