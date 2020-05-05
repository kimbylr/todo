import styled from 'styled-components';

export const Container = styled.div`
  background-color: #d2e4f0;
  height: 60px;
  padding: 24px;
`;

export const Form = styled.form`
  position: relative;
`;

export const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 42px;
  font-size: 24px;
  padding: 0 60px 0 10px;
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

export const LinkButton = styled.button`
  position: absolute;
  padding: 2px;
  color: ${({ active }) => (active ? '#69a6ce' : '#999')};
  background: transparent;
  top: 20px;
  right: 36px;
  cursor: pointer;
  &:hover {
    color: #333;
  }
`;

export const PrependButton = styled(LinkButton)`
  content: '';
  right: 12px;
  width: 13px;
  height: 12px;
  margin-top: 6px;

  ${({ prepend }) =>
    prepend
      ? `
    border-top: 2px solid #69a6ce;
    border-bottom: 2px solid #ccc;
  `
      : `
    border-top: 2px solid #ccc;
    border-bottom: 2px solid #69a6ce;
  `}

  /** middle line */
  ::after {
    content: '';
    position: absolute;
    left: 0;
    top: 3px;
    background: #ccc;
    width: 100%;
    height: 2px;
  }
`;

export const Overlay = styled.form`
  background-color: #69a6ce;
  padding: 20px;
  box-shadow: 0 0 40px #222;
`;

export const OverlayIcon = styled.span`
  display: inline-block;
  font-weight: 400;
  font-size: 24px;
  color: rgba(255, 255, 255, 0.75);
  margin-right: 12px;
  position: relative;
  top: 2px;
`;

export const OverlayInput = styled.input`
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
