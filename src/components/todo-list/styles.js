import styled from 'styled-components';

const TodosContainer = styled.div`
  margin: 0 0 30px;
  user-select: none;
`;

const AllCompleted = styled.div`
  font-size: 80px;
  position: relative;
  color: #ccc;
  margin: 20px auto 0;
  padding: 10px 0;
  text-align: center;
  background-color: #fbfbfb;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

/* ====== */

const ListItem = styled.li`
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

const Input = styled.input`
  color: #69a6ce;
  background: #fbfbfb;
  width: calc(100% - 60px);
`;

const ButtonArea = styled.div`
  display: inline;
  float: right;
  color: #999;
  font-size: 16px;
  position: relative;
  top: -20px;
`;

const IconButton = styled.i`
  padding: 3px 0;

  margin-left: 12px;
  &:hover {
    color: #555;
  }
  ${({ active }) => (active ? 'color: #69a6ce;' : 'cursor: pointer;')}
`;

export default {
  TodosContainer,
  AllCompleted,
  List,
  ListItem,
  Input,
  ButtonArea,
  IconButton,
};
