import styled from 'styled-components';

const ContextButton = styled.button`
  margin-left: 10px;
  margin-top: 10px;
  padding: 6px 8px;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  cursor: default;
  position: relative;
  color: ${({ active }) => (active ? '#fcfcfc' : '#69a6ce')};
  background-color: ${({ active }) => (active ? '#69a6ce' : '#fcfcfc')};
  border: ${({ active, isDraggingOver }) =>
    isDraggingOver
      ? '2px dashed red; padding: 5px 7px'
      : active
      ? '1px solid #69a6ce'
      : '1px solid #ccc'};

  & .count-badge {
    position: relative;
    top: -1px;
    padding: 4px 0 3px 8px;
    margin-left: 8px;
    font-size: 12px;
    color: ${({ active }) => (active ? '#fcfcfc' : '#69a6ce')};
    border-left: 1px solid ${({ active }) => (active ? '#fcfcfc' : '#69a6ce')};
    height: calc(100% + 2px);
    box-sizing: border-box;
  }
`;

export default {
  ContextButton,
};
