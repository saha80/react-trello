import Lh from 'rt/helpers/LaneHelper';

const mapLaneAction = {
  LOAD_BOARD: Lh.initialiseLanes,
  ADD_CARD: Lh.appendCardToLane,
  REMOVE_CARD: Lh.removeCardFromLane,
  MOVE_CARD: Lh.moveCardAcrossLanes,
  UPDATE_CARDS: Lh.updateCardsForLane,
  UPDATE_CARD: Lh.updateCardForLane,
  UPDATE_LANES: Lh.updateLanes,
  UPDATE_LANE: Lh.updateLane,
  PAGINATE_LANE: Lh.paginateLane,
  MOVE_LANE: Lh.moveLane,
  REMOVE_LANE: Lh.removeLane,
  ADD_LANE: Lh.addLane
};

const boardReducer = (state = { lanes: [] }, { payload, type }) => {
  const laneAction = mapLaneAction[type];
  return laneAction ? laneAction(state, payload) : state;
};

export default boardReducer;
