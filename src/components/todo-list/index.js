import React from 'react';
import { connect } from 'react-redux';
import styles from './styles';
import Todo from './todo';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { changeOrder } from '../../store/actions/todos';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: props.todos,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.todos === this.props.todos) {
      return;
    }

    this.setState({ todos: this.props.todos });
  }

  onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const todos = reorder(
      this.state.todos,
      result.source.index,
      result.destination.index,
    );

    this.setState({ todos });

    const ids = todos.map(({ id }) => id);
    this.props.dispatch(changeOrder(ids));
  };

  render() {
    const { dispatch } = this.props;
    const { todos } = this.state;

    return (
      <styles.TodosContainer>
        {!todos.length ? (
          <styles.AllCompleted>
            <span className="ion-ios-checkmark-outline" />
          </styles.AllCompleted>
        ) : (
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {provided => (
                <styles.List ref={provided.innerRef}>
                  {todos.map((todo, index) => (
                    <Draggable
                      key={todo.id}
                      draggableId={todo.id}
                      index={index}
                    >
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
          </DragDropContext>
        )}
      </styles.TodosContainer>
    );
  }
}

const mapStateToProps = state => {
  const context = state.contexts[state.activeContext];
  if (!context) return { todos: [] };

  const todos = context.todos || [];

  const { showPending, showCompleted } = state.filter;
  if (showPending && showCompleted) {
    return { todos };
  } else if (showPending) {
    return { todos: todos.filter(todo => !todo.completed) };
  } else if (showCompleted) {
    return { todos: todos.filter(todo => todo.completed) };
  }
};

export default connect(mapStateToProps)(TodoList);
