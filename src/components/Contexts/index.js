import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styles from './styles';
import './index.css';
import { connect } from 'react-redux';
import {
  addContext,
  renameContext,
  archiveContext,
} from '../../store/actions/contexts';

class Contexts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddContext: false,
      showEditContexts: false,
      showEditContext: false,
      newContext: '',
      editContextIndex: 0,
      editContextId: '',
      contextInitialContent: '',
    };
  }

  /*** another context is selected ***/
  handleContextChange = event => {
    this.props.dispatch({
      type: 'changeContext',
      contextId: event.currentTarget.id,
    });
  };

  /* edit is clicked -> change to showEditContexts view */
  editContexts = () => {
    this.setState({ showEditContexts: !this.state.showEditContexts });
  };

  /* context rename */
  showEditContextBox = (context, index) => {
    this.setState({
      showEditContext: true,
      editContextIndex: index,
      editContextId: context.id,
      contextInitialContent: context.label,
    });
  };

  hideEditContextBox = () => {
    this.setState({ showEditContext: false });
  };

  handleEdit = event => {
    event.preventDefault();
    const {
      editContextId: id,
      contextInitialContent: initialText,
    } = this.state;
    const text = this.input.value;
    if (text && text !== initialText) {
      this.props.dispatch(renameContext(id, text));
    }
    this.setState({ showEditContext: false, showEditContexts: false });
  };

  /* context remove */
  handleRemove = context => {
    const { id, label } = context;
    if (window.confirm(`Archive "${label}"?`)) {
      this.props.dispatch(archiveContext(id));
      this.setState({ showEditContexts: false });
    }
  };

  /*** add new context ***/
  showAddContextBox = () => {
    this.setState({ showAddContext: true });
  };

  hideAddContextBox = () => {
    this.setState({ showAddContext: false });
  };

  handleAddTextChange = event => {
    this.setState({ newContext: event.currentTarget.value });
  };

  handleAdd = event => {
    event.preventDefault();
    if (this.state.newContext !== '') {
      this.props.dispatch(addContext(this.state.newContext));
      this.setState({ newContext: '', showAddContext: false });
    }
  };

  render() {
    const { activeContext } = this.props;

    return (
      <div className="contexts">
        <button
          className={
            this.state.showEditContexts
              ? 'icon-button edit-contexts active'
              : 'icon-button edit-contexts'
          }
          onClick={this.editContexts}
        >
          <span className="ion-edit" />
        </button>

        <button
          className="icon-button add-context"
          onClick={this.showAddContextBox}
        >
          <span className="ion-plus-circled" />
        </button>

        {/* new context popover */
        this.state.showAddContext && (
          <span>
            <div
              className={
                this.state.showAddContext
                  ? 'popover-dark active'
                  : 'popover-dark'
              }
              onClick={this.hideAddContextBox}
            />
            <div
              className={
                this.state.showAddContext
                  ? 'add-context-popover active'
                  : 'add-context-popover'
              }
            >
              <form onSubmit={this.handleAdd}>
                <input
                  type="text"
                  placeholder="new context"
                  value={this.state.newContext}
                  onChange={this.handleAddTextChange}
                  autoFocus
                />
              </form>
            </div>
          </span>
        )}

        {/* edit context popover */
        this.state.showEditContext && (
          <div
            style={{
              position: 'relative',
              top: this.state.editContextIndex * 43 + 'px',
            }}
          >
            <div
              className={
                this.state.showEditContext
                  ? 'popover-dark active'
                  : 'popover-dark'
              }
              onClick={this.hideEditContextBox}
            />
            <div
              className={
                this.state.showEditContext
                  ? 'edit-context-popover active'
                  : 'edit-context-popover'
              }
            >
              <form onSubmit={this.handleEdit}>
                <input
                  type="text"
                  placeholder={this.state.contextInitialContent}
                  defaultValue={this.state.contextInitialContent}
                  ref={input => {
                    this.input = input;
                    input && input.select();
                  }}
                  autoFocus
                />
              </form>
            </div>
          </div>
        )}

        {/* contexts */
        this.props.contexts.map((context, index) => (
          <span className="context" key={context.id}>
            {context.id === activeContext ? (
              <styles.ContextButton
                id={context.id}
                onClick={this.handleContextChange}
                active
              >
                {context.label}
                <span className="count-badge">{context.count}</span>
              </styles.ContextButton>
            ) : (
              <Droppable
                droppableId={`context-${context.id}`}
                direction="vertical"
              >
                {(provided, { isDraggingOver }) => {
                  return (
                    <span
                      className="context-button-container"
                      ref={provided.innerRef}
                    >
                      <styles.ContextButton
                        id={context.id}
                        onClick={this.handleContextChange}
                        isDraggingOver={isDraggingOver}
                      >
                        {context.label}
                        <span className="count-badge">{context.count}</span>
                      </styles.ContextButton>

                      <div id={`${context.id}-drop`} className="drop-target">
                        {context.label}
                        {provided.placeholder}
                      </div>
                    </span>
                  );
                }}
              </Droppable>
            )}
            {this.state.showEditContexts && (
              <span>
                <button
                  className="icon-button edit-context"
                  onClick={() => this.showEditContextBox(context, index)}
                  value={context.id}
                >
                  <span className="ion-edit" />
                </button>

                <button
                  className="icon-button remove-context"
                  onClick={() => this.handleRemove(context)}
                  value={context.id}
                >
                  <span className="ion-ios-trash-outline" />
                </button>

                <br />
              </span>
            )}
          </span>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const contexts = Object.values(state.contexts)
    .sort(({ updatedAt: a }, { updatedAt: b }) => b - a)
    .map(({ id, label, todos }) => {
      const count = todos.filter(({ completed }) => !completed).length;
      return { id, label, count };
    });

  return {
    activeContext: state.activeContext,
    contexts,
  };
};

export default connect(mapStateToProps)(Contexts);
