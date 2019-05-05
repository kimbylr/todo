import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const Container = styled.div`
  height: 40px;
  padding: 12px 25px;
  color: #999;
`;

const Button = styled.button`
  font-size: 25px;
  margin-left: 10px;
  position: relative;
  top: 4px;
  color: #ccc;
  border: none;
  cursor: pointer;
  ${({ active }) => (active ? 'color: #69a6ce;' : '')}
  &:hover {
    color: ${({ active }) => (active ? '#69a6ce;' : '#999')};
  }
`;

const Filter = ({ showPending, showCompleted, dispatch }) => {
  const handleFilterChange = event => {
    const newFilter = event.currentTarget.id;
    dispatch({ type: 'changeFilter', filter: newFilter });
  };

  return (
    <Container>
      show:
      <Button id="pending" onClick={handleFilterChange} active={showPending}>
        <i className="ion-md-radio-button-on" />
      </Button>
      <Button
        id="completed"
        onClick={handleFilterChange}
        active={showCompleted}
      >
        <i className="ion-ios-checkmark-circle" />
      </Button>
    </Container>
  );
};

const mapStateToProps = state => ({
  showPending: state.filter.showPending,
  showCompleted: state.filter.showCompleted,
});

export default connect(mapStateToProps)(Filter);
