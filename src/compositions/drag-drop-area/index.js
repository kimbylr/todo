import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { addTodo, changeContent, changeOrder, triggerCompleted } from '../../store/actions/todos';

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
        this.onDragToOtherContext(todo, this.props.activeContext, contextToMoveTo);
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

  onDragToOtherContext = async (todo, activeContext, contextToMoveTo) => {
    const { dispatch } = this.props;

    // TODO: overly imperative. there should be an endpoint on the API for this.
    // 1. check off -- slightly dangerous if adding fails, but done first because it triggers optimistic update
    if (!todo.completed) {
      await dispatch(triggerCompleted(todo, activeContext));
    }

    // 2. add to other context
    const { content, link } = todo;
    await dispatch(addTodo({ content, link }, contextToMoveTo));

    // 3. add note "moved" in active context
    const contentWithNote = `${NOTICE_MOVED}${todo.content}`;
    dispatch(changeContent(todo.id, contentWithNote, todo.link, activeContext));
  };

  render() {
    return <DragDropContext onDragEnd={this.onDragEnd}>{this.props.children}</DragDropContext>;
  }
}

const mapStateToProps = (state) => {
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
    return { activeContext, todos };
  } else if (showPending) {
    return { activeContext, todos: todos.filter((todo) => !todo.completed) };
  } else if (showCompleted) {
    return { activeContext, todos: todos.filter((todo) => todo.completed) };
  }
};

export default connect(mapStateToProps)(DragDropArea);
