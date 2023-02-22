import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import classNames from 'classnames';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import { v1 as uuidv1 } from 'uuid';
import BoardContainer from './BoardContainer';
import boardReducer from 'rt/reducers/BoardReducer';

const middlewares = process.env.REDUX_LOGGING ? [logger] : [];

class Board extends Component {
  constructor({ id }) {
    super();
    this.store = this.getStore();
    this.id = id || uuidv1();
  }

  // When you create multiple boards, unique stores are created for isolation
  getStore = () => createStore(boardReducer, applyMiddleware(...middlewares));

  render() {
    const { className, components } = this.props;
    const allClassNames = classNames('react-trello-board', className || '');
    return (
      <Provider store={this.store}>
        <>
          <components.GlobalStyle />
          <BoardContainer id={this.id} {...this.props} className={allClassNames} />
        </>
      </Provider>
    );
  }
}

Board.propTypes = {
  className: PropTypes.string,
  components: PropTypes.object,
  id: PropTypes.string,
};

export default Board;
