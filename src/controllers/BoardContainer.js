import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Container from 'rt/dnd/Container';
import Draggable from 'rt/dnd/Draggable';
import PropTypes from 'prop-types';
import isEqual from 'react-fast-compare';
import { PopoverWrapper } from 'react-popopo';

import * as boardActions from 'rt/actions/BoardActions';
import * as laneActions from 'rt/actions/LaneActions';

import Lane from './Lane';

const isBoardLoaded = ({ lanes }) =>
  lanes.every(
    (lane) =>
      typeof lane.currentPage === 'number' && lane.cards?.every((card) => card.laneId === lane.id)
  );

class BoardContainer extends React.Component {
  state = {
    addLaneMode: false
  };

  componentDidMount() {
    this.props.actions.loadBoard(this.props.data);

    this.props.eventBusHandle?.({ publish: this.publish });
  }

  publish = ({
    type,
    card,
    cardId,
    cards,
    data,
    fromLaneId,
    index,
    lane,
    laneId,
    lanes,
    toLaneId
  }) => {
    switch (type) {
      case 'ADD_CARD':
        return this.props.actions.addCard({ laneId, card });
      case 'UPDATE_CARD':
        return this.props.actions.updateCard({ laneId, card });
      case 'REMOVE_CARD':
        return this.props.actions.removeCard({ laneId, cardId });
      case 'REFRESH_BOARD':
        return this.props.actions.loadBoard(data);
      case 'MOVE_CARD':
        return this.props.actions.moveCardAcrossLanes({ fromLaneId, toLaneId, cardId, index });
      case 'UPDATE_CARDS':
        return this.props.actions.updateCards({ laneId, cards });
      case 'UPDATE_LANES':
        return this.props.actions.updateLanes(lanes);
      case 'UPDATE_LANE':
        return this.props.actions.updateLane(lane);
    }
  };

  componentWillUnmount() {
    this.props.actions.unloadBoard(this.props.data);
  }

  componentDidUpdate({ data, reducerData, onDataChange }) {
    if (this.props.reducerData && !isEqual(reducerData, this.props.reducerData)) {
      onDataChange(this.props.reducerData);
    }

    if (this.props.data && !isEqual(this.props.data, data)) {
      if (!isBoardLoaded(this.props.data)) {
        this.props.actions.loadBoard(this.props.data);
      }
      onDataChange(this.props.data);
    }
  }

  onDragStart = ({ payload }) => {
    this.props.handleLaneDragStart(payload.id);
  };

  onLaneDrop = ({ removedIndex, addedIndex, payload }) => {
    if (removedIndex !== addedIndex) {
      this.props.actions.moveLane({ oldIndex: removedIndex, newIndex: addedIndex });
      this.props.handleLaneDragEnd(removedIndex, addedIndex, payload);
    }
  };

  getCardDetails = (laneId, cardIndex) =>
    this.props.reducerData.lanes.find((lane) => lane.id === laneId).cards[cardIndex];

  getLaneDetails = (index) => this.props.reducerData.lanes[index];

  // + add
  hideEditableLane = () => this.setState({ addLaneMode: false });

  showEditableLane = () => this.setState({ addLaneMode: true });

  addNewLane = (params) => {
    this.hideEditableLane();
    this.props.actions.addLane(params);
    this.props.onLaneAdd(params);
  };

  get groupName() {
    return `TrelloBoard${this.props.id}`;
  }

  // Stick to whitelisting attributes to segregate board and lane props
  forwardLaneProps = () =>
    Object.fromEntries(
      Object.entries(this.props).filter(([key]) =>
        [
          'onCardMoveAcrossLanes',
          'onLaneScroll',
          'onLaneDelete',
          'onLaneUpdate',
          'onCardClick',
          'onBeforeCardDelete',
          'onCardDelete',
          'onCardAdd',
          'onCardUpdate',
          'onLaneClick',
          'laneSortFunction',
          'draggable',
          'laneDraggable',
          'cardDraggable',
          'collapsibleLanes',
          'canAddLanes',
          'hideCardDeleteIcon',
          'tagStyle',
          'handleDragStart',
          'handleDragEnd',
          'cardDragClass',
          'editLaneTitle',
          't'
        ].includes(key)
      )
    );

  render() {
    const {
      id,
      components,
      reducerData,
      draggable,
      laneDraggable,
      laneDragClass,
      laneDropClass,
      style,
      onDataChange,
      onCardAdd,
      onCardUpdate,
      onCardClick,
      onBeforeCardDelete,
      onCardDelete,
      onLaneScroll,
      onLaneClick,
      onLaneAdd,
      onLaneDelete,
      onLaneUpdate,
      editable,
      canAddLanes,
      laneStyle,
      onCardMoveAcrossLanes,
      t,
      ...otherProps
    } = this.props;

    const { addLaneMode } = this.state;

    const forwardedlaneProps = this.forwardLaneProps();

    return (
      <components.BoardWrapper style={style} {...otherProps} draggable={false}>
        <PopoverWrapper>
          <Container
            orientation="horizontal"
            onDragStart={this.onDragStart}
            dragClass={laneDragClass}
            dropClass={laneDropClass}
            onDrop={this.onLaneDrop}
            lockAxis="x"
            getChildPayload={this.getLaneDetails}
            groupName={this.groupName}
          >
            {reducerData.lanes.map((laneProps, index) => {
              const { id, droppable = true, ...otherProps } = laneProps;
              const lane = (
                <Lane
                  key={id}
                  boardId={this.groupName}
                  components={components}
                  id={id}
                  getCardDetails={this.getCardDetails}
                  index={index}
                  droppable={droppable}
                  style={laneStyle || laneProps.style || {}}
                  labelStyle={laneProps.labelStyle || {}}
                  cardStyle={this.props.cardStyle || laneProps.cardStyle}
                  editable={editable && !laneProps.disallowAddingCard}
                  {...otherProps}
                  {...forwardedlaneProps}
                />
              );
              return draggable && laneDraggable ? <Draggable key={id}>{lane}</Draggable> : lane;
            })}
          </Container>
        </PopoverWrapper>
        {canAddLanes && (
          <Container orientation="horizontal">
            {editable && !addLaneMode ? (
              <components.NewLaneSection t={t} onClick={this.showEditableLane} />
            ) : (
              addLaneMode && (
                <components.NewLaneForm
                  onCancel={this.hideEditableLane}
                  onAdd={this.addNewLane}
                  t={t}
                />
              )
            )}
          </Container>
        )}
      </components.BoardWrapper>
    );
  }
}

BoardContainer.propTypes = {
  id: PropTypes.string,
  components: PropTypes.shape({
    BoardWrapper: PropTypes.elementType.isRequired,
    NewLaneSection: PropTypes.elementType.isRequired,
    NewLaneForm: PropTypes.elementType.isRequired
  }),
  actions: PropTypes.shape({
    loadBoard: PropTypes.func,
    unloadBoard: PropTypes.func,
    addLane: PropTypes.func,
    moveLane: PropTypes.func,
    addCard: PropTypes.func,
    updateCard: PropTypes.func,
    removeCard: PropTypes.func,
    moveCardAcrossLanes: PropTypes.func,
    updateCards: PropTypes.func,
    updateLanes: PropTypes.func,
    updateLane: PropTypes.func
  }),
  data: PropTypes.object.isRequired,
  reducerData: PropTypes.object,
  onDataChange: PropTypes.func,
  eventBusHandle: PropTypes.func,
  onLaneScroll: PropTypes.func,
  onCardClick: PropTypes.func,
  onBeforeCardDelete: PropTypes.func,
  onCardDelete: PropTypes.func,
  onCardAdd: PropTypes.func,
  onCardUpdate: PropTypes.func,
  onLaneAdd: PropTypes.func,
  onLaneDelete: PropTypes.func,
  onLaneClick: PropTypes.func,
  onLaneUpdate: PropTypes.func,
  laneSortFunction: PropTypes.func,
  draggable: PropTypes.bool,
  collapsibleLanes: PropTypes.bool,
  editable: PropTypes.bool,
  canAddLanes: PropTypes.bool,
  hideCardDeleteIcon: PropTypes.bool,
  handleDragStart: PropTypes.func,
  handleDragEnd: PropTypes.func,
  handleLaneDragStart: PropTypes.func,
  handleLaneDragEnd: PropTypes.func,
  style: PropTypes.object,
  tagStyle: PropTypes.object,
  laneDraggable: PropTypes.bool,
  cardDraggable: PropTypes.bool,
  cardDragClass: PropTypes.string,
  laneDragClass: PropTypes.string,
  laneDropClass: PropTypes.string,
  className: PropTypes.string,
  onCardMoveAcrossLanes: PropTypes.func.isRequired,
  laneStyle: PropTypes.object,
  cardStyle: PropTypes.object,
  editLaneTitle: PropTypes.bool,
  t: PropTypes.func.isRequired
};

BoardContainer.defaultProps = {
  t: (key) => key,
  onDataChange: () => {},
  handleDragStart: () => {},
  handleDragEnd: () => {},
  handleLaneDragStart: () => {},
  handleLaneDragEnd: () => {},
  onCardUpdate: () => {},
  onLaneAdd: () => {},
  onLaneDelete: () => {},
  onCardMoveAcrossLanes: () => {},
  onLaneUpdate: () => {},
  editable: false,
  canAddLanes: false,
  hideCardDeleteIcon: false,
  draggable: false,
  collapsibleLanes: false,
  laneDraggable: true,
  cardDraggable: true,
  cardDragClass: 'react_trello_dragClass',
  laneDragClass: 'react_trello_dragLaneClass',
  laneDropClass: ''
};

const mapStateToProps = (state) => (state.lanes ? { reducerData: state } : {});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...boardActions, ...laneActions }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardContainer);
