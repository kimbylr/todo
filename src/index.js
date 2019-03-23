import React from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { setPassphraseAndFetch } from './helpers/setPassphraseAndFetch';
import Contexts from './components/contexts';
import Filter from './components/filter';
import Header from './components/header';
import NewTodo from './components/new-todo';
import TodoList from './components/todo-list';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

class App extends React.Component {
  componentDidMount() {
    setPassphraseAndFetch(this.props.dispatch);
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <NewTodo />
        <Contexts />
        <TodoList />
        <Filter />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    todos: state.contexts,
    filter: state.filter,
  };
};

const ConnectedApp = connect(mapStateToProps)(App);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
