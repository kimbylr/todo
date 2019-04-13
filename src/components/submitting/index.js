import styled, { keyframes, css } from 'styled-components';

const pulsate = keyframes`
  0% {
    opacity: 0;
  }

  10% {
    opacity: 0;
  }

  40% {
    opacity: 1;
  }

  70% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;

const pulsateAnimation = css`
  animation: ${pulsate} 1.5s ease-in 0s infinite;
`;

export const Submitting = styled.div`
  position: fixed;
  top: 24px;
  right: 24px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #25db76;
  opacity: 0;
  ${({ active }) => (active ? pulsateAnimation : '')};
  transition: 0.2s ease;
`;
