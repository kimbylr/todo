import React, { useState, useEffect } from 'react';
import { changeContent, triggerCompleted } from '../../store/actions/todos';
import Overlay from '../../blueprints/overlay';
import styles from './styles';

const LINK_DEFAULT = 'https://';

const Todo = ({ todo, dispatch, isDragging, dragRelatedProps }) => {
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(todo.content);
  const [editLink, setEditLink] = useState(false);
  const [link, setLink] = useState(todo.link || LINK_DEFAULT);

  useEffect(() => {
    setLink(todo.link || LINK_DEFAULT);
  }, [todo.link]);

  const handleEdit = event => {
    event && event.preventDefault();
    if (content.trim() || link !== todo.link) {
      const linkOrNull = link === LINK_DEFAULT || link === '' ? null : link;
      dispatch(changeContent(id, content, linkOrNull));
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
      <styles.ButtonArea>
        {editing && (
          <styles.IconButton
            className="ion-ios-link"
            active={link !== LINK_DEFAULT}
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

      {/* edit link overlay */
      editLink && (
        <Overlay
          clickOffsideFn={() => {
            setLink(initialLink || LINK_DEFAULT);
            setEditLink(false);
          }}
        >
          <styles.Overlay onSubmit={evaluateLink}>
            <styles.OverlayIcon>
              <i className="ion-ios-link" />
            </styles.OverlayIcon>
            <styles.OverlayInput
              type="text"
              placeholder={LINK_DEFAULT}
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
