import styled from 'styled-components';

const Container = styled.div`
  margin: 14px 25px 20px 15px;
  color: #999;
  text-align: left;
  user-select: none;
`;

const ContextButton = styled.button`
  margin-left: 10px;
  margin-top: 10px;
  padding: 6px 8px;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  position: relative;
  color: ${({ active }) => (active ? '#fcfcfc' : '#69a6ce')};
  background-color: ${({ active }) => (active ? '#69a6ce' : '#fcfcfc')};
  border: ${({ active, isDraggingOver }) =>
    isDraggingOver
      ? '2px dashed red; padding: 5px 7px'
      : active
      ? '1px solid #69a6ce'
      : '1px solid #ccc'};

  &:focus {
    box-shadow: 0 0 5px #69a6ce;
  }
`;

const ContextButtonCountBadge = styled.span`
  position: relative;
  top: -1px;
  padding: 4px 0 3px 8px;
  margin-left: 8px;
  font-size: 12px;
  color: ${({ active }) => (active ? '#fcfcfc' : '#69a6ce')};
  border-left: 1px solid ${({ active }) => (active ? '#fcfcfc' : '#69a6ce')};
  height: calc(100% + 2px);
  box-sizing: border-box;
`;

const DropTarget = styled.div`
  position: absolute;
  opacity: 0;
  left: 10px;
  top: -6px;
  width: 100%;
  padding: 4px 8px;
  pointer-events: none;

  & li {
    display: none;
  }
`;

const IconButton = styled.button`
  background-color: inherit;
  border: none;
  color: #999;
  cursor: pointer;

  &:hover {
    color: #555;
  }

  & span {
    display: inline-block;
    width: 23px;
  }

  &:focus span {
    border-radius: 50%;
    color: #69a6ce;
  }

  ${({ active }) => (active ? 'color: #69a6ce;' : '')}
`;

const MainIconButton = styled(IconButton)`
  float: right;
  font-size: 20px;
  padding: 6px 5px;

  &:first-of-type {
    margin-left: 2px;
    padding: 6px 2px;
  }
`;

const ContextListIconButton = styled(IconButton)`
  margin-left: 12px;
  font-size: 120%;

  &:last-of-type {
    font-size: 140%;
  }
`;

const Form = styled.form`
  background-color: #69a6ce;
  padding: 20px;
  box-shadow: 0 0 40px #222;
`;

const FormIcon = styled.span`
  display: inline-block;
  font-weight: 400;
  font-size: 24px;
  color: rgba(255, 255, 255, 0.75);
  margin-right: 12px;
  position: relative;
  top: 2px;
`;

const FormInput = styled.input`
  max-width: 80vw;
  font-size: 24px;
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
  Container,
  ContextButton,
  ContextButtonCountBadge,
  DropTarget,
  IconButton,
  MainIconButton,
  ContextListIconButton,
  Form,
  FormIcon,
  FormInput,
};
