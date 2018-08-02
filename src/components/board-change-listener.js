import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { setBoard } from '../actions/board-actions';
import { connect } from 'react-redux';

class BoardChangeListener extends Component {
  componentDidMount() {
    this._handlePathChange(this.props.location.pathname);

    this.props.history.listen(({ pathname }) => {
      this._handlePathChange(pathname);
    });
  }

  _handlePathChange(pathname) {
    const board = pathname.indexOf('/board') === 0 ?
      pathname.slice('/board/'.length, location.pathname.length) :
      '';

    if (this.props.board !== board) {
      this.props.setBoard(board);
    }
  }

  render() {
    return <React.Fragment/>;
  }
}

BoardChangeListener.propTypes = {
  board: PropTypes.string.isRequired,
  history: PropTypes.shape({
    listen: PropTypes.func.isRequired
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  setBoard: PropTypes.func.isRequired
};

export default connect(({ board }) => ({ board }), { setBoard })(withRouter(BoardChangeListener));
