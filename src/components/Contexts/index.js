import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';
import { addContext, renameContext, archiveContext } from '../../store/actions/contexts';



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
      contextInitialContent: ''
    }
  }

  /*** another context is selected ***/

  handleContextChange = (event) => {
    this.props.dispatch({ type: 'changeContext', contextId: event.currentTarget.id });
  }


  /* edit is clicked -> change to showEditContexts view */

  editContexts = () => {
    this.setState({ showEditContexts: !this.state.showEditContexts });
  }

  /* context rename */

  showEditContextBox = (context, index) => {
    this.setState({ showEditContext: true, editContextIndex: index, editContextId: context.id, contextInitialContent: context.label });
  }

  hideEditContextBox = () => {
    this.setState({ showEditContext: false });
  }

  handleEdit = (event) => {
    event.preventDefault();
    const { editContextId: id, contextInitialContent: initialText } = this.state;
    const text = this.input.value;
    if ( text !== '' && text !== initialText ) {
      this.props.dispatch(renameContext( id, text ));
    }
    this.setState({ showEditContext: false, showEditContexts: false });
  }

  /* context remove */

  handleRemove = (context) => {
    const { id, label } = context;
    if(window.confirm(`Archive "${label}"?`)) {
      this.props.dispatch(archiveContext( id ));
      this.setState({ showEditContexts: false });
    }
  }


  /*** add new context ***/

  showAddContextBox = () => {
    this.setState({ showAddContext: true });
  }

  hideAddContextBox = () => {
    this.setState({ showAddContext: false });
  }

  handleAddTextChange = (event) => {
    this.setState({ newContext: event.currentTarget.value });
  }

  handleAdd = (event) => {
    event.preventDefault();
    if ( this.state.newContext !== '' ) {
      this.props.dispatch(addContext( this.state.newContext ));
      this.setState({ newContext: '', showAddContext: false });
    }
  }

  render() {
    return(
      <div className="contexts">

        <button className={ this.state.showEditContexts ? 'edit-contexts active' : 'edit-contexts' } onClick={ this.editContexts } >
          <span className="ion-edit" />
        </button>

        <button className="add-context" onClick={ this.showAddContextBox } >
          <span className="ion-plus-circled" />
        </button>

        { /* new context popover */
          this.state.showAddContext &&
          <span>
            <div className={ this.state.showAddContext ? 'popover-dark active' : 'popover-dark' } onClick={ this.hideAddContextBox } />
            <div className={ this.state.showAddContext ? 'add-context-popover active' : 'add-context-popover' } >
              <form onSubmit= { this.handleAdd }>
                <input type="text"
                  placeholder="new context"
                  value={ this.state.newContext }
                  onChange={ this.handleAddTextChange }
                  autoFocus />
              </form>
            </div>
          </span>
        }

        { /* edit context popover */
          this.state.showEditContext &&
          <div style={{ position: 'relative', top: this.state.editContextIndex * 43 + 'px' }}>
            <div className={ this.state.showEditContext ? 'popover-dark active' : 'popover-dark' } onClick={ this.hideEditContextBox } />
            <div className={ this.state.showEditContext ? 'edit-context-popover active' : 'edit-context-popover' } >
              <form onSubmit= { this.handleEdit }>
                <input type="text"
                  placeholder={ this.state.contextInitialContent }
                  defaultValue={ this.state.contextInitialContent }
                  ref={ (input) => {
                    this.input = input;
                    input && input.select();
                  } }
                  autoFocus />
              </form>
            </div>
          </div>
        }

        {
          this.props.contexts.map( (context, index) => {
            return (
              <span className="context" key={ context.id }>
                  <button
                    id={ context.id }
                    onClick={ this.handleContextChange }
                    className={ this.props.activeContext === context.id ? 'context-button active' : 'context-button' } >
                      { `${context.label} (${context.count})` }
                  </button>

                  { this.state.showEditContexts &&
                    <span>
                      <button className="edit-context"
                        onClick={ () => this.showEditContextBox(context, index) }
                        value={ context.id } >
                        <span className="ion-edit" />
                      </button>

                      <button className="remove-context"
                        onClick={ () => this.handleRemove(context) }
                        value={ context.id } >
                        <span className="ion-ios-trash-outline" />
                      </button>

                      <br/>
                    </span>
                  }

              </span>
            )
          })
        }

      </div>
    )
  }
}


const mapStateToProps = state => {
  const contextKeys = Object.keys(state.contexts);
  const contexts = {};

  contextKeys.forEach( contextId => {
    const { id, label, todos } = state.contexts[contextId];

    const count = Object.keys(todos).reduce( (acc, todoId) => {
      if ( !todos[todoId].completed ) acc++;
      return acc;
    }, 0)

    contexts[id] = { id, label, count };
  });

  const contextsArray = contextKeys
    .map( contextId => contexts[contextId] );

  return {
    activeContext: state.activeContext,
    contexts: contextsArray
  }
}

export default connect(mapStateToProps)(Contexts);
