import React from 'react';
import { connect } from 'react-redux';
import styles from './styles';
import Todo from './todo';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const TodoList = ({ dispatch, todos }) => (
  <styles.TodosContainer>
    {!todos.length ? (
      <styles.AllCompleted>
        <span className="ion-ios-checkmark-outline" />
      </styles.AllCompleted>
    ) : (
      <Droppable droppableId="todo-list">
        {provided => (
          <styles.List ref={provided.innerRef}>
            {todos.map((todo, index) => (
              <Draggable key={todo.id} draggableId={todo.id} index={index}>
                {(provided, { isDragging }) => (
                  <Todo
                    dispatch={dispatch}
                    dragRelatedProps={provided}
                    isDragging={isDragging}
                    {...todo}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </styles.List>
        )}
      </Droppable>
    )}
  </styles.TodosContainer>
);

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

export default connect(mapStateToProps)(TodoList);
