import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import {
  changeOrder,
  triggerCompleted,
  changeText,
  addTodo,
} from '../../store/actions/todos';

import Contexts from '../../components/contexts';
import TodoList from '../../components/todo-list';

const TODO_LIST = 'todo-list';
const CONTEXT_PREFIX = 'context-';
const NOTICE_MOVED = '**verschoben** ';

class DragDropArea extends React.Component {
  onDragEnd = ({ destination, source: { index: oldIndex } }) => {
    // dropped outside the list
    if (!destination) {
      return;
    }

    const { droppableId, index: newIndex } = destination;

    // reordering withhin list
    if (droppableId === TODO_LIST) {
      this.onDragInsideList(oldIndex, newIndex);
      return;
    }

    //attach to new context
    if (droppableId.substring(0, CONTEXT_PREFIX.length) === CONTEXT_PREFIX) {
      const todo = this.props.todos[oldIndex];
      const contextToMoveTo = droppableId.substring(CONTEXT_PREFIX.length);

      if (todo && contextToMoveTo) {
        this.onDragToOtherContext(todo, contextToMoveTo);
      }
    }
  };

  onDragInsideList = (oldIndex, newIndex) => {
    const { todos, dispatch } = this.props;
    const todoIds = todos.map(({ id }) => id);

    const [removedId] = todoIds.splice(oldIndex, 1);
    todoIds.splice(newIndex, 0, removedId);

    dispatch(changeOrder(todoIds));
  };

  onDragToOtherContext = async (todo, contextToMoveTo) => {
    const { dispatch } = this.props;

    // 1. add to other context
    await dispatch(addTodo(todo.content, contextToMoveTo));

    // 2. check off + add note
    if (!todo.completed) {
      await dispatch(triggerCompleted(todo));
    }
    dispatch(changeText(todo.id, `${NOTICE_MOVED}${todo.content}`));
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Contexts />
        <TodoList />
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => {
  const {
    contexts,
    activeContext,
    filter: { showPending, showCompleted },
  } = state;

  if (!activeContext) {
    return { todos: [] };
  }

  const todos = contexts[activeContext].todos || [];
  if (showPending && showCompleted) {
    return { todos };
  } else if (showPending) {
    return { todos: todos.filter(todo => !todo.completed) };
  } else if (showCompleted) {
    return { todos: todos.filter(todo => todo.completed) };
  }
};

export default connect(mapStateToProps)(DragDropArea);