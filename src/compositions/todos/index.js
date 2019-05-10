import React from 'react';
import { connect } from 'react-redux';
import styles from './styles';
import Todo from '../../components/todo';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const Todos = ({ dispatch, todos }) => {
  if (!todos) {
    return null;
  }

  if (!todos.length) {
    return (
      <styles.TodosContainer>
        <styles.AllCompleted>
          <i className="ion-ios-checkmark-circle-outline" />
        </styles.AllCompleted>
      </styles.TodosContainer>
    );
  }

  return (
    <styles.TodosContainer>
      <Droppable droppableId="todo-list">
        {provided => (
          <styles.List ref={provided.innerRef}>
            {todos.map((todo, index) => (
              <Draggable key={todo.id} draggableId={todo.id} index={index}>
                {(provided, { isDragging }) => (
                  <Todo
                    todo={todo}
                    dispatch={dispatch}
                    dragRelatedProps={provided}
                    isDragging={isDragging}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </styles.List>
        )}
      </Droppable>
    </styles.TodosContainer>
  );
};

const mapStateToProps = state => {
  const {
    contexts,
    activeContext,
    filter: { showPending, showCompleted },
  } = state;

  if (!activeContext) {
    return { todos: null };
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

export default connect(mapStateToProps)(Todos);
