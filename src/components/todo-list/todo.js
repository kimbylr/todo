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

  toggleEditing = () => {
    this.setState({ editing: !this.state.editing });
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
      link,
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
              onBlur={this.toggleEditing}
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
          {(link || editing) && (
            <styles.IconButton
              className="ion-ios-link"
              active={link}
              onClick={this.toggleEditing}
            />
          )}
          <styles.IconButton
            className="ion-md-create"
            active={editing}
            onClick={this.toggleEditing}
          />
        </styles.ButtonArea>
      </styles.ListItem>
    );
  }
}

export default Todo;
