import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../../store/actions/todos';
import Overlay from '../../blueprints/overlay';
import styles from './styles';

const ECHO_LINK_BASE = 'https://www.srf.ch/play/radio/echo-der-zeit/';

const transformEchoLink = async (content, link) => {
  if (content.startsWith(ECHO_LINK_BASE)) {
    try {
      const response = await fetch(content);
      const body = await response.text();
      const title = body
        .split('<title>')[1]
        .split(' - Radio - Play SRF</title>')[0];
      return { content: title, link: content };
    } catch (e) {
      console.error(e);
    }
  }

  return { content, link: link || undefined };
};

const NewTodo = ({ dispatch }) => {
  const [content, setContent] = useState('');
  const [showLink, setShowLink] = useState(false);
  const [link, setLink] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();

    if (content) {
      dispatch(addTodo(await transformEchoLink(content, link)));
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
