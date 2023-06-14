import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import isEqual from 'react-fast-compare';
import { v4 as uuidv4 } from 'uuid';

import Container from 'rt/dnd/Container';
import Draggable from 'rt/dnd/Draggable';

import * as laneActions from 'rt/actions/LaneActions';

const sortCards = (
  /** @type {boolean} */ collapsed,
  /** @type {any[] | undefined} */ cards,
  /** @type {((a: any, b: any) => number) | undefined} */ laneSortFunction
) => {
  if (collapsed || !cards) {
    return [];
  }

  if (laneSortFunction) {
    return [...cards].sort(laneSortFunction);
  }

  return cards;
};

class Lane extends React.Component {
  state = {
    loading: false,
    currentPage: this.props.currentPage,
    addCardMode: false,
    collapsed: false,
    isDraggingOver: false
  };

  scrollEventListener = ({ target }) => {
    const elementScrollPosition = target.scrollHeight - target.scrollTop - target.clientHeight;
    // In some browsers and/or screen sizes a decimal rest value between 0 and 1 exists, so it should be checked on < 1 instead of < 0
    if (elementScrollPosition < 1 && this.props.onLaneScroll && !this.state.loading) {
      this.setState({ loading: true });

      const nextPage = this.state.currentPage + 1;

      this.props.onLaneScroll(nextPage, this.props.id).then((newCards = []) => {
        if (newCards.length) {
          this.props.actions.paginateLane({ laneId: this.props.id, newCards, nextPage });
        }

        this.setState({ loading: false });
      });
    }
  };

  laneDidMount = (/** @type {EventTarget | null} */ ref) =>
    ref?.addEventListener('scroll', this.scrollEventListener);

  // apply patch
  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.cards, this.props.cards)) {
      this.setState({ currentPage: this.props.currentPage });
    }
  }

  removeCard = (cardId) => () => {
    const cardDelete = () => {
      this.props.onCardDelete?.(cardId, this.props.id);
      this.props.actions.removeCard({ laneId: this.props.id, cardId });
    };

    if (this.props.onBeforeCardDelete) {
      this.props.onBeforeCardDelete(cardDelete);
    } else {
      cardDelete();
    }
  };

  handleCardClick = ({ id, metadata, laneId }) => (event) => {
    this.props.onCardClick?.(id, metadata, laneId);
    event.stopPropagation();
  };

  showEditableCard = () => this.setState({ addCardMode: true });

  hideEditableCard = () => this.setState({ addCardMode: false });

  addNewCard = (params) => {
    const laneId = this.props.id;
    this.hideEditableCard();
    const card = { id: uuidv4(), ...params };
    this.props.actions.addCard({ laneId, card });
    this.props.onCardAdd(card, laneId);
  };

  onDragStart = ({ payload }) => {
    this.props.handleDragStart?.(payload.id, payload.laneId);
  };

  shouldAcceptDrop = ({ groupName }) => this.props.droppable && groupName === this.groupName;

  get groupName() {
    return `TrelloBoard${this.props.boardId}Lane`;
  }

  onDragEnd = (toLaneId) => ({ addedIndex: index, payload }) => {
    if (this.state.isDraggingOver) {
      this.onDragLeave();
    }

    if (index == null) {
      return;
    }

    const cardId = payload.id;
    const fromLaneId = payload.laneId;

    const response = this.props.handleDragEnd
      ? this.props.handleDragEnd(cardId, fromLaneId, toLaneId, index, {
          ...structuredClone(payload),
          laneId: toLaneId
        })
      : true;

    if (response === undefined || Boolean(response)) {
      this.props.actions.moveCardAcrossLanes({ fromLaneId, toLaneId, cardId, index });
      this.props.onCardMoveAcrossLanes(fromLaneId, toLaneId, cardId, index);
    }

    return response;
  };

  updateCard = (card) => {
    this.props.actions.updateCard({ laneId: this.props.id, card });
    this.props.onCardUpdate(this.props.id, card);
  };

  onDragEnter = () => this.setState({ isDraggingOver: true });

  onDragLeave = () => this.setState({ isDraggingOver: false });

  getCardDetails = (id) => (index) => this.props.getCardDetails(id, index);

  removeLane = () => {
    const { id: laneId } = this.props;
    this.props.actions.removeLane({ laneId });
    this.props.onLaneDelete(laneId);
  };

  updateTitle = (title) => {
    const { id } = this.props;
    this.props.actions.updateLane({ id, title });
    this.props.onLaneUpdate(id, { title });
  };

  toggleLaneCollapsed = () => {
    if (this.props.collapsibleLanes) {
      this.setState((state) => ({ collapsed: !state.collapsed }));
    }
  };

  onLaneClick = () => this.props.onLaneClick?.(this.props.id);

  forwardProps = () =>
    Object.fromEntries(
      Object.entries(this.props).filter(
        ([key]) =>
          ![
            'id',
            'cards',
            'collapsibleLanes',
            'components',
            'onLaneClick',
            'onLaneScroll',
            'onCardClick',
            'onCardAdd',
            'onBeforeCardDelete',
            'onCardDelete',
            'onLaneDelete',
            'onLaneUpdate',
            'onCardUpdate',
            'onCardMoveAcrossLanes'
          ].includes(key)
      )
    );

  render() {
    const {
      id,
      cards,
      collapsibleLanes,
      components,
      laneSortFunction,
      editable,
      hideCardDeleteIcon,
      cardDraggable,
      cardDragClass,
      cardDropClass,
      tagStyle,
      cardStyle,
      t,
      className
    } = this.props;

    const { loading, isDraggingOver, addCardMode, collapsed } = this.state;

    const forwardedProps = this.forwardProps();

    return (
      <components.Section
        {...forwardedProps}
        key={id}
        onClick={this.onLaneClick}
        draggable={false}
        className={['react-trello-lane', className].filter(Boolean).join(' ')}
      >
        <components.LaneHeader
          {...{ id, cards, ...forwardedProps }}
          onDelete={this.removeLane}
          onDoubleClick={this.toggleLaneCollapsed}
          updateTitle={this.updateTitle}
        />
        <components.ScrollableLane ref={this.laneDidMount} isDraggingOver={isDraggingOver}>
          <Container
            orientation="vertical"
            groupName={this.groupName}
            dragClass={cardDragClass}
            dropClass={cardDropClass}
            onDragStart={this.onDragStart}
            onDrop={this.onDragEnd(id)}
            onDragEnter={this.onDragEnter}
            onDragLeave={this.onDragLeave}
            shouldAcceptDrop={this.shouldAcceptDrop}
            getChildPayload={this.getCardDetails(id)}
          >
            {sortCards(collapsed, cards, laneSortFunction).map((cardProps, index) => {
              const { id, draggable = true } = cardProps;

              const card = (
                <components.Card
                  key={id}
                  index={index}
                  style={cardProps.style || cardStyle}
                  className="react-trello-card"
                  onDelete={this.removeCard(id)}
                  onClick={this.handleCardClick(cardProps)}
                  onChange={this.updateCard}
                  showDeleteButton={!hideCardDeleteIcon}
                  tagStyle={tagStyle}
                  cardDraggable={cardDraggable}
                  editable={editable}
                  t={t}
                  {...cardProps}
                />
              );

              return cardDraggable && draggable ? (
                <Draggable key={id}>{card}</Draggable>
              ) : (
                <span key={id}>{card}</span>
              );
            })}
          </Container>
          {addCardMode ? (
            <components.NewCardForm
              onCancel={this.hideEditableCard}
              t={t}
              laneId={id}
              onAdd={this.addNewCard}
            />
          ) : editable ? (
            <components.AddCardLink onClick={this.showEditableCard} t={t} laneId={id} />
          ) : null}
        </components.ScrollableLane>
        {loading && <components.Loader />}
        {collapsibleLanes && cards.length ? (
          <components.LaneFooter onClick={this.toggleLaneCollapsed} collapsed={collapsed} />
        ) : null}
      </components.Section>
    );
  }
}

Lane.propTypes = {
  actions: PropTypes.object,
  id: PropTypes.string.isRequired,
  boardId: PropTypes.string,
  title: PropTypes.node,
  index: PropTypes.number,
  laneSortFunction: PropTypes.func,
  style: PropTypes.object,
  cardStyle: PropTypes.object,
  tagStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  cards: PropTypes.array,
  label: PropTypes.string,
  currentPage: PropTypes.number,
  draggable: PropTypes.bool,
  collapsibleLanes: PropTypes.bool,
  droppable: PropTypes.bool,
  onCardMoveAcrossLanes: PropTypes.func,
  onCardClick: PropTypes.func,
  onBeforeCardDelete: PropTypes.func,
  onCardDelete: PropTypes.func,
  onCardAdd: PropTypes.func,
  onCardUpdate: PropTypes.func,
  onLaneDelete: PropTypes.func,
  onLaneUpdate: PropTypes.func,
  onLaneClick: PropTypes.func,
  onLaneScroll: PropTypes.func,
  editable: PropTypes.bool,
  laneDraggable: PropTypes.bool,
  cardDraggable: PropTypes.bool,
  cardDragClass: PropTypes.string,
  cardDropClass: PropTypes.string,
  canAddLanes: PropTypes.bool,
  t: PropTypes.func.isRequired,
  handleDragStart: PropTypes.func,
  handleDragEnd: PropTypes.func,
  hideCardDeleteIcon: PropTypes.bool,
  components: PropTypes.shape({
    AddCardLink: PropTypes.elementType.isRequired,
    Card: PropTypes.elementType.isRequired,
    LaneFooter: PropTypes.elementType.isRequired,
    LaneHeader: PropTypes.elementType.isRequired,
    Loader: PropTypes.elementType.isRequired,
    NewCardForm: PropTypes.elementType.isRequired,
    ScrollableLane: PropTypes.elementType.isRequired,
    Section: PropTypes.elementType.isRequired
  }),
  getCardDetails: PropTypes.func,
  className: PropTypes.string,
  editLaneTitle: PropTypes.bool
};

Lane.defaultProps = {
  style: {},
  titleStyle: {},
  labelStyle: {},
  label: undefined,
  editable: false,
  onLaneUpdate: () => {},
  onCardAdd: () => {},
  onCardUpdate: () => {}
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(laneActions, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(Lane);
