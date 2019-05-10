import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../../store/actions/todos';
import Overlay from '../../blueprints/overlay';
import styles from './styles';

const NewTodo = ({ dispatch }) => {
  const [content, setContent] = useState('');
  const [showLink, setShowLink] = useState(false);
  const [link, setLink] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    if (content) {
      dispatch(addTodo({ content, link: link || undefined }));
      setContent('');
      setLink('');
    }
  };

  return (
    <styles.Container>
      <styles.Form onSubmit={handleSubmit}>
        <styles.Input
          type="text"
          placeholder="ztond"
          value={content}
          onChange={({ currentTarget: { value } }) => setContent(value)}
          autoFocus
        />
        <styles.LinkButton
          active={!!link}
          type="button"
          onClick={() => setShowLink(true)}
          title={link || 'add link'}
        >
          <i className="ion-ios-link" />
        </styles.LinkButton>
      </styles.Form>

      {/* edit link overlay */
      showLink && (
        <Overlay
          clickOffsideFn={() => {
            setLink('');
            setShowLink(false);
          }}
        >
          <styles.Overlay
            onSubmit={event => {
              event.preventDefault();
              setShowLink(false);
            }}
          >
            <styles.OverlayIcon>
              <i className="ion-ios-link" />
            </styles.OverlayIcon>
            <styles.OverlayInput
              type="text"
              placeholder="https://..."
              value={link}
              onChange={({ currentTarget: { value } }) => setLink(value)}
              autoFocus
            />
          </styles.Overlay>
        </Overlay>
      )}
    </styles.Container>
  );
};

export default connect()(NewTodo);
