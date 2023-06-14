import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import { v4 as uuidv4 } from 'uuid';

import boardReducer from 'rt/reducers/BoardReducer';
import DefaultComponents from 'rt/components';

import BoardContainer from './BoardContainer';

const middlewares = process.env.REDUX_LOGGING ? [logger] : [];

export default class Board extends React.Component {
  id = this.props.id || uuidv4();

  // When you create multiple boards, unique stores are created for isolation
  store = createStore(boardReducer, applyMiddleware(...middlewares));

  render() {
    const { className, components = DefaultComponents } = this.props;

    return (
      <Provider store={this.store}>
        <components.GlobalStyle />
        <BoardContainer
          id={this.id}
          data={this.props.data}
          {...this.props}
          className={['react-trello-board', className].filter(Boolean).join(' ')}
        />
      </Provider>
    );
  }
}

Board.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  components: PropTypes.shape({
    GlobalStyle: PropTypes.elementType.isRequired
  }),
  data: PropTypes.object.isRequired
};
