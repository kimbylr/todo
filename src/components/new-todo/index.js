import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addTodo } from '../../store/actions/todos';

const Container = styled.div`
  background-color: #d2e4f0;
  height: 60px;
  padding: 24px;
`;

const Input = styled.input`
  width: calc(100% - 21px);
  height: 40px;
  font-size: 24px;
  padding: 0 10px;
  border: 0px;
  margin-top: 10px;
  border: 1px solid #ccc;
  font-weight: 400;
  color: #444;
  -webkit-appearance: none;
  border-radius: 0;

  &::placeholder {
    color: #ccc;
  }
`;

const NewTodo = ({ dispatch }) => {
  const [text, setText] = useState('');

  const handleTextChange = event => {
    setText(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (text) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="ztond"
          value={text}
          onChange={handleTextChange}
          autoFocus
        />
      </form>
    </Container>
  );
};

export default connect()(NewTodo);
