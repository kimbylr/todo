import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPassphraseAndFetch } from '../../resources/setPassphraseAndFetch'
import './index.css';

import Header from '../Header';
import Contexts from '../Contexts';
import NewTodo from '../NewTodo';
import TodoList from '../TodoList';
import Filter from '../Filter';



class App extends Component {

  componentDidMount() {
    setPassphraseAndFetch(this.props.dispatch);
  }

  render() {
    return (
      <div className="App">
        <Header />
        <NewTodo />
        <Contexts />
        <TodoList />
        <Filter />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.contexts,
    filter: state.filter
  }
};

export default connect(mapStateToProps)(App);
