import React, { Component } from 'react';
import { changeText, triggerCompleted } from '../../store/actions/todos';
import styles from './styles';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };
  }

  toggleCompleteTodo = () => {
    const { id, completed, dispatch } = this.props;
    const todo = { id, completed };
    dispatch(triggerCompleted(todo));
  };

  editTodo = () => {
    this.setState({ editing: true });
  };

  handleEdit = event => {
    event.preventDefault();
    const { content: initialContent, id } = this.props;
    const newContent = this.input.value;
    if (newContent.trim() && newContent !== initialContent) {
      this.props.dispatch(changeText(id, newContent));
    }
    this.setState({ editing: false });
  };

  render() {
    const {
      completed,
      content,
      dragRelatedProps: { innerRef, dragHandleProps, draggableProps },
      isDragging,
    } = this.props;
    const { editing } = this.state;

    return (
      <styles.ListItem
        completed={completed}
        ref={innerRef}
        {...draggableProps}
        {...dragHandleProps}
        isDragging={isDragging}
      >
        {editing ? (
          <form onSubmit={this.handleEdit}>
            <styles.Input
              type="text"
              placeholder={content}
              defaultValue={content}
              autoFocus
              className="editing "
              ref={input => {
                this.input = input;
                input && input.select();
              }}
            />
          </form>
        ) : (
          <div onClick={this.toggleCompleteTodo}>{content}</div>
        )}
        <styles.ButtonArea>
          <styles.IconButton
            className="ion-edit"
            editing={editing}
            onClick={this.editTodo}
          />
        </styles.ButtonArea>
      </styles.ListItem>
    );
  }
}

export default Todo;
