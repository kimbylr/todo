import React, { useState, useEffect } from 'react';
import { changeContent, triggerCompleted } from '../../store/actions/todos';
import Overlay from '../../blueprints/overlay';
import styles from './styles';

const Todo = ({ todo, dispatch, isDragging, dragRelatedProps }) => {
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(todo.content);
  const [editLink, setEditLink] = useState(false);
  const [link, setLink] = useState(todo.link || '');

  useEffect(() => {
    setLink(todo.link || '');
  }, [todo.link]);

  const handleEdit = event => {
    event && event.preventDefault();
    if (content.trim() || link !== todo.link) {
      dispatch(changeContent(id, content, link || null));
    }
    setEditing(false);
  };

  const endEditing = () => {
    setEditing(false);
    handleEdit();
  };

  const evaluateLink = event => {
    event.preventDefault();
    setEditLink(false);
    if (!link) {
      setLink(todo.link);
    }
    handleEdit();
  };

  const selectAll = event => event.target.select();

  const { content: initialContent, link: initialLink, id, completed } = todo;
  const { innerRef, dragHandleProps, draggableProps } = dragRelatedProps;

  return (
    <styles.ListItem
      completed={completed}
      ref={innerRef}
      {...draggableProps}
      {...dragHandleProps}
      isDragging={isDragging}
    >
      <styles.ButtonArea>
        {editing && (
          <styles.IconButton
            className="ion-ios-link"
            active={!!link}
            onClick={() => setEditLink(true)}
          />
        )}
        {initialLink && !editing && (
          <styles.Link href={initialLink} target="_blank">
            <styles.IconButton className="ion-ios-link" />
          </styles.Link>
        )}
        <styles.IconButton
          className="ion-md-create"
          active={editing}
          onClick={() => (editing ? endEditing() : setEditing(true))}
        />
      </styles.ButtonArea>
      {editing ? (
        <form onSubmit={handleEdit}>
          <styles.Input
            type="text"
            placeholder={initialContent}
            value={content}
            onChange={({ currentTarget: { value } }) => setContent(value)}
            autoFocus
            onBlur={() => setEditing(editLink)}
            onFocus={selectAll}
          />
        </form>
      ) : (
        <div onClick={() => dispatch(triggerCompleted(todo))}>{content}</div>
      )}

      {/* edit link overlay */
      editLink && (
        <Overlay
          clickOffsideFn={() => {
            setLink(initialLink || '');
            setEditLink(false);
          }}
        >
          <styles.Overlay onSubmit={evaluateLink}>
            <styles.OverlayIcon>
              <i className="ion-ios-link" />
            </styles.OverlayIcon>
            <styles.OverlayInput
              type="text"
              placeholder="https://..."
              value={link || ''}
              onChange={({ currentTarget: { value } }) => setLink(value)}
              autoFocus
            />
          </styles.Overlay>
        </Overlay>
      )}
    </styles.ListItem>
  );
};

export default Todo;
