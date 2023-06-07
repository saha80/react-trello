import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import classNames from 'classnames';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import uuidv1 from 'uuid/v1';
import BoardContainer from './BoardContainer';
import boardReducer from 'rt/reducers/BoardReducer';
import DefaultComponents from '../components';

const middlewares = process.env.REDUX_LOGGING ? [logger] : [];

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.store = this.getStore();
    this.id = props.id || uuidv1();
  }

  // When you create multiple boards, unique stores are created for isolation
  getStore = () => createStore(boardReducer, applyMiddleware(...middlewares));

  render() {
    const { className, components = DefaultComponents } = this.props;
    const allClassNames = classNames('react-trello-board', className || '');
    return (
      <Provider store={this.store}>
        <>
          <components.GlobalStyle />
          <BoardContainer
            id={this.id}
            data={this.props.data}
            {...this.props}
            className={allClassNames}
          />
        </>
      </Provider>
    );
  }
}

Board.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  components: PropTypes.object,
  data: PropTypes.object.isRequired
};
