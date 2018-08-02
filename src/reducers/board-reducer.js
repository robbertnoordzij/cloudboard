import { mapReducers } from 'redux-map-reducers';
import { SET_BOARD } from '../constants';

const reducerMap = {
  [SET_BOARD]: setBoard
};

function setBoard(state, { board }) {
  return board;
}

export default mapReducers(reducerMap, '');
