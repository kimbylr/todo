import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';


class Filter extends Component {

  handleFilterChange = (event) => {
    const newFilter = event.currentTarget.id;
      this.props.dispatch({ type: 'changeFilter', filter: newFilter });
  }

  render() {
    return(
      <div className="filters">
        show:
        <button id="pending" onClick={ this.handleFilterChange } className={ this.props.showPending ? 'active' : '' } >○</button>
        <button id="completed" onClick={ this.handleFilterChange } className={ this.props.showCompleted ? 'active' : '' } >✓</button>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    showPending:   state.filter.showPending,
    showCompleted: state.filter.showCompleted,
  }
}

export default connect(mapStateToProps)(Filter);
