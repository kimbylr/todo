import styled from 'styled-components';

const Todo = styled.li`
  margin: 0 0 3px;
  padding: 8px 25px;
  color: #333;
  font-size: 20px;
  background-color: #f8f8f8;
  cursor: default;

  ${({ completed }) =>
    completed
      ? ` text-decoration: line-through;
          color: #ccc;`
      : ''}

  ${({ isDragging }) =>
    isDragging
      ? ` box-shadow: 0 0 20px #666;
          opacity: 0.8;`
      : ''}
`;

const Link = styled.a`
  color: #999;
`;

const Input = styled.input`
  color: #69a6ce;
  background: transparent;
  width: calc(100% - 60px);
`;

const ButtonArea = styled.div`
  float: right;
  color: #999;
  font-size: 16px;
  position: relative;
  top: 2px;
`;

const IconButton = styled.i`
  padding: 3px 0;

  margin-left: 12px;
  &:hover {
    color: #555;
  }
  ${({ active }) => (active ? 'color: #69a6ce;' : 'cursor: pointer;')}
`;

const Overlay = styled.form`
  background-color: #69a6ce;
  padding: 20px;
  box-shadow: 0 0 40px #222;
`;

const OverlayIcon = styled.span`
  display: inline-block;
  font-weight: 400;
  font-size: 24px;
  color: rgba(255, 255, 255, 0.75);
  margin-right: 12px;
  position: relative;
  top: 2px;
`;

const OverlayInput = styled.input`
  max-width: 80vw;
  font-size: 20px;
  padding: 0 10px;
  padding: 4px 2px;
  font-weight: 400;
  color: #fff;
  caret-color: #fff;
  background: transparent;
  border-bottom: 1px solid #fff;
  -webkit-appearance: none;
  border-radius: 0;

  &::placeholder {
    color: rgba(255, 255, 255, 0.25);
  }
`;

export default {
  Todo,
  Link,
  Input,
  ButtonArea,
  IconButton,
  Overlay,
  OverlayIcon,
  OverlayInput,
};
