import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';
import { addTodo } from '../../store/actions/todos';


class NewTodo extends Component {

  constructor(props) {
    super(props);
    this.state = { text : '' }
  }

  handleTextChange = (event) => {
    const newText = event.currentTarget.value;
    this.setState({ text: newText });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if ( this.state.text !== '' ) {
      this.props.dispatch(addTodo( this.state.text ));
      this.setState({ text : '' });
    }
  }


  render() {
    return (
      <div className="NewTodo">
      <form onSubmit= { this.handleSubmit }>
        <input
          type="text"
          placeholder="ztond"
          value={ this.state.text }
          onChange={ this.handleTextChange } />
        </form>
      </div>
    )
  }
}

export default connect()(NewTodo);
