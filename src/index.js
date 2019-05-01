import React from 'react';
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

class App extends React.Component {
  componentDidMount() {
    setPassphraseAndFetch(this.props.dispatch);
  }

  render() {
    return (
      <React.Fragment>
        <Submitting active={this.props.submitting} />
        <Header />
        <NewTodo />
        <DragDropArea />
        <Filter />
      </React.Fragment>
    );
  }
}

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
