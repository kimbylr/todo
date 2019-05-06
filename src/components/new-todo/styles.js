import styled from 'styled-components';

const Container = styled.div`
  background-color: #d2e4f0;
  height: 60px;
  padding: 24px;
`;

const Form = styled.form`
  position: relative;
`;

const Input = styled.input`
  width: calc(100% - 45px);
  height: 40px;
  font-size: 24px;
  padding: 0 36px 0 10px;
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

const LinkButton = styled.button`
  position: absolute;
  padding: 2px;
  color: ${({ active }) => (active ? '#69a6ce' : '#999')};
  background: transparent;
  top: 20px;
  right: 10px;
  cursor: pointer;
  &:hover {
    color: #333;
  }
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
  Container,
  Form,
  Input,
  LinkButton,
  Overlay,
  OverlayIcon,
  OverlayInput,
};
