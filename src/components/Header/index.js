import React from 'react';
import logo from './logo.png';
import styled from 'styled-components';

const StyledHeader = styled.header`
  background-color: #69a6ce;
  height: 80px;
  padding: max(env(safe-area-inset-top), 16px) 0 16px;
  text-align: center;

  & img {
    height: 72px;
    position: relative;
    top: 4px;
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <img src={logo} alt="logo" onClick={reload} />
    </StyledHeader>
  );
};

const reload = () => window.location.reload();

export default Header;
