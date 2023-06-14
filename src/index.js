import React from 'react';
import PropTypes from 'prop-types';

import Draggable from './dnd/Draggable';
import Container from './dnd/Container';
import BoardContainer from './controllers/BoardContainer';
import BoardController from './controllers/Board';
import Lane from './controllers/Lane';
import deprecationWarnings from './helpers/deprecationWarnings';
import DefaultComponents from './components';
import locales from './locales';

import widgets from './widgets';

import createTranslate from './helpers/createTranslate';

export { Draggable, Container, BoardContainer, Lane, createTranslate, locales, widgets };

export { DefaultComponents as components };

const DEFAULT_LANG = 'en';

const Board = ({ components, lang = DEFAULT_LANG, ...otherProps }) => {
  deprecationWarnings(otherProps);

  return (
    <BoardController
      t={createTranslate(locales[lang].translation)}
      components={{ ...DefaultComponents, ...components }}
      {...otherProps}
    />
  );
};

Board.propTypes = {
  components: PropTypes.shape({
    AddCardLink: PropTypes.elementType,
    BoardWrapper: PropTypes.elementType,
    Card: PropTypes.elementType,
    GlobalStyle: PropTypes.elementType,
    LaneFooter: PropTypes.elementType,
    LaneHeader: PropTypes.elementType,
    Loader: PropTypes.elementType,
    NewCardForm: PropTypes.elementType,
    NewLaneForm: PropTypes.elementType,
    NewLaneSection: PropTypes.elementType,
    ScrollableLane: PropTypes.elementType,
    Section: PropTypes.elementType
  }),
  lang: PropTypes.string
};

export default Board;
