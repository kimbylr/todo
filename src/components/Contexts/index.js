import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import styles from './styles';
import {
  addContext,
  renameContext,
  archiveContext,
} from '../../store/actions/contexts';
import Overlay from '../../blueprints/overlay';
import { selectAllText } from '../../helpers/selectAllText';

const Contexts = ({ contexts, activeContext, dispatch }) => {
  const [showAddContext, setShowAddContext] = useState(false);
  const [showEditContexts, setShowEditContexts] = useState(false);
  const [showEditContext, setShowEditContext] = useState(false);

  const [contextId, setContextId] = useState('');
  const [contextLabel, setContextLabel] = useState('');
  const [initialContextLabel, setInitialContextLabel] = useState('');

  /* select another context */
  const handleContextChange = event => {
    dispatch({
      type: 'changeContext',
      contextId: event.currentTarget.id,
    });
  };

  /* start renaming context */
  const showEditContextDialogue = (context, index) => {
    setShowEditContext(true);
    setContextId(context.id);
    setContextLabel(context.label);
    setInitialContextLabel(context.label);
  };

  /* rename context */
  const handleEdit = event => {
    event.preventDefault();

    if (contextLabel && contextLabel !== initialContextLabel) {
      dispatch(renameContext(contextId, contextLabel));
    }

    setContextLabel('');
    setShowEditContext(false);
    setShowEditContexts(false);
  };

  /* remove context */
  const handleRemove = ({ id, label }) => {
    if (window.confirm(`Archive "${label}"?`)) {
      dispatch(archiveContext(id));
      setShowEditContexts(false);
    }
  };

  /* add context */
  const handleAdd = event => {
    event.preventDefault();

    if (contextLabel) {
      dispatch(addContext(contextLabel));
      setContextLabel('');
      setShowAddContext(false);
    }
  };

  return (
    <>
      <styles.Container>
        <styles.MainIconButton
          active={showEditContexts}
          onClick={() => setShowEditContexts(!showEditContexts)}
        >
          <i className="ion-md-create" />
        </styles.MainIconButton>

        <styles.MainIconButton onClick={() => setShowAddContext(true)}>
          <i className="ion-md-add-circle" />
        </styles.MainIconButton>

        {contexts.map((context, index) => (
          <span className="context" key={context.id}>
            {context.id === activeContext ? (
              <styles.ContextButton
                id={context.id}
                onClick={handleContextChange}
                active
              >
                {context.label}
                <styles.ContextButtonCountBadge active>
                  {context.count}
                </styles.ContextButtonCountBadge>
              </styles.ContextButton>
            ) : (
              <Droppable
                droppableId={`context-${context.id}`}
                direction="vertical"
              >
                {(provided, { isDraggingOver }) => (
                  <span
                    style={{ position: 'relative' }}
                    ref={provided.innerRef}
                  >
                    <styles.ContextButton
                      id={context.id}
                      onClick={handleContextChange}
                      isDraggingOver={isDraggingOver}
                    >
                      {context.label}
                      <styles.ContextButtonCountBadge>
                        {context.count}
                      </styles.ContextButtonCountBadge>
                    </styles.ContextButton>

                    <styles.DropTarget id={`${context.id}-drop`}>
                      {context.label}
                      {provided.placeholder}
                    </styles.DropTarget>
                  </span>
                )}
              </Droppable>
            )}

            {showEditContexts && (
              <span>
                <styles.ContextListIconButton
                  onClick={() => showEditContextDialogue(context, index)}
                  value={context.id}
                >
                  <i className="ion-md-create" />
                </styles.ContextListIconButton>

                <styles.ContextListIconButton
                  onClick={() => handleRemove(context)}
                  value={context.id}
                >
                  <i className="ion-ios-trash" />
                </styles.ContextListIconButton>

                <br />
              </span>
            )}
          </span>
        ))}
      </styles.Container>

      {/* new context overlay */
      showAddContext && (
        <Overlay
          clickOffsideFn={() => {
            setShowAddContext(false);
            setContextLabel('');
          }}
        >
          <styles.Form onSubmit={handleAdd}>
            <styles.FormIcon>
              <i className="ion-md-add-circle" />
            </styles.FormIcon>
            <styles.FormInput
              type="text"
              placeholder="new context"
              value={contextLabel}
              onChange={({ currentTarget: { value } }) =>
                setContextLabel(value)
              }
              autoFocus
            />
          </styles.Form>
        </Overlay>
      )}

      {/* edit context overlay */
      showEditContext && (
        <Overlay
          clickOffsideFn={() => {
            setShowEditContext(false);
            setContextLabel('');
          }}
        >
          <styles.Form onSubmit={handleEdit}>
            <styles.FormIcon>
              <i className="ion-md-create" />
            </styles.FormIcon>
            <styles.FormInput
              type="text"
              placeholder={initialContextLabel}
              value={contextLabel}
              onChange={({ currentTarget: { value } }) =>
                setContextLabel(value)
              }
              autoFocus
              onFocus={selectAllText}
            />
          </styles.Form>
        </Overlay>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  activeContext: state.activeContext,
  contexts: Object.values(state.contexts)
    .sort(({ updatedAt: a }, { updatedAt: b }) => b - a)
    .map(({ id, label, todos }) => {
      const count = todos.filter(
        ({ completed, content }) => !completed && content !== '---',
      ).length;
      return { id, label, count };
    }),
});

export default connect(mapStateToProps)(Contexts);
