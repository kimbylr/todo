import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';
import { triggerCompleted, changeText } from '../../store/actions/todos';


class TodoList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showEditTodo: false,
      editTodoId: '',
      todoInitialContent: '',
      editTodoIndex: 0
    }
  }

  completeTodo = (todo) => {
    if (!this.state.showEditTodo) this.props.dispatch( triggerCompleted(todo) );
  }

  editTodo = (todo) => {
    console.log('edit');
    console.log(todo);
  }

  showEditTodoBox = (todo, index) => {
    this.setState({ showEditTodo: true, editTodoId: todo._id, todoInitialContent: todo.content, editTodoIndex: index });
  }

  hideEditTodoBox = () => {
    this.setState({ showEditTodo: false });
  }

  handleEdit = (event) => {
    event.preventDefault();
    const { editTodoId: id, todoInitialContent: initialText } = this.state;
    const text = this.input.value;
    if ( text !== '' && text !== initialText ) {
      this.props.dispatch(changeText( id, text ));
    }
    this.setState({ showEditTodo: false });
  }


  render() {
    return (
      <div className="todos">
      { this.props.todos.length === 0
        ? <div className="all-done" >
            <span className="ion-ios-checkmark-outline" />
          </div>
        :

        <span>
          { // box to edit todo
            this.state.showEditTodo && (
              <div style={{ position: 'relative', top: this.state.editTodoIndex * 42 + 'px' }}>
                <div className={ this.state.showEditTodo ? 'popover-dark active' : 'popover-dark' } onClick={ this.hideEditTodoBox } />
                <div className={ this.state.showEditTodo ? 'edit-todo-popover active' : 'edit-todo-popover' } >
                  <form onSubmit= { this.handleEdit }>
                    <input type="text"
                    placeholder={ this.state.todoInitialContent }
                    defaultValue={ this.state.todoInitialContent }
                    ref={ (input) => {
                      this.input = input;
                      input && input.select();
                    } }
                    autoFocus />
                  </form>
                </div>
              </div>
            )
          }

          <ul>
            {
              this.props.todos.map( (todo, index) => {
                return (
                  <li
                  key={ todo._id }
                  className={ todo.completed ? 'TodoItem-completed' : '' } >
                    <div className="clickArea" onClick={ () => this.completeTodo(todo) }>
                      { todo.content }
                    </div>
                    <div className="buttons">
                      <span className="ion-edit" onClick={ () => this.showEditTodoBox(todo, index) } />
                      <span className="ion-drag" />
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </span>
      }
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  const context = state.contexts[state.activeContext];
  if ( !context ) return { todos: [] };

  const todos = context.order.map( id => context.todos[id] );

  const { showPending, showCompleted } = state.filter;
  if ( showPending && showCompleted ) {
    return { todos };
  } else if ( showPending ) {
    return { todos: todos.filter( todo => !todo.completed )};
  } else if ( showCompleted ) {
    return { todos: todos.filter( todo => todo.completed )};
  }
};

export default connect(mapStateToProps)(TodoList);
