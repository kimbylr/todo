import React from 'react';
import styled from 'styled-components';

const DarkLayer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.75;
  z-index: 10;
  cursor: pointer;
`;

const Content = styled.div`
  z-index: 20;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = ({ children, clickOffsideFn = () => {} }) => (
  <>
    <DarkLayer />
    <Content onClick={clickOffsideFn}>
      <div onClick={event => event.stopPropagation()}>{children}</div>
    </Content>
  </>
);

export default Overlay;
