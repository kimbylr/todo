import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../../store/actions/todos';
import Overlay from '../../blueprints/overlay';
import styles from './styles';

const LINK_DEFAULT = 'https://';

const NewTodo = ({ dispatch }) => {
  const [content, setContent] = useState('');
  const [showLink, setShowLink] = useState(false);
  const [link, setLink] = useState(LINK_DEFAULT);

  const handleSubmit = event => {
    event.preventDefault();

    if (content) {
      const parsedLink = link === LINK_DEFAULT ? undefined : link;
      dispatch(addTodo({ content, link: parsedLink }));
      setContent('');
      setLink(LINK_DEFAULT);
    }
  };

  const evaluateLink = event => {
    event.preventDefault();
    setShowLink(false);
    if (!link) {
      setLink(LINK_DEFAULT);
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
          active={link !== LINK_DEFAULT}
          type="button"
          onClick={() => setShowLink(true)}
          title={link !== LINK_DEFAULT ? link : 'add link'}
        >
          <i className="ion-ios-link" />
        </styles.LinkButton>
      </styles.Form>

      {/* edit link overlay */
      showLink && (
        <Overlay
          clickOffsideFn={() => {
            setLink(LINK_DEFAULT);
            setShowLink(false);
          }}
        >
          <styles.Overlay onSubmit={evaluateLink}>
            <styles.OverlayIcon>
              <i className="ion-ios-link" />
            </styles.OverlayIcon>
            <styles.OverlayInput
              type="text"
              placeholder={LINK_DEFAULT}
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
