import update from 'immutability-helper';

const LaneHelper = {
  initialiseLanes: (state, { lanes }) => {
    const newLanes = lanes.map((lane) => {
      lane.currentPage = 1;
      lane.cards?.forEach((card) => (card.laneId = lane.id));
      return lane;
    });
    return update(state, { lanes: { $set: newLanes } });
  },

  paginateLane: (state, { laneId, newCards, nextPage }) => {
    const updatedLanes = LaneHelper.appendCardsToLane(state, {
      laneId,
      newCards,
      index: undefined
    });
    updatedLanes.find((lane) => lane.id === laneId).currentPage = nextPage;
    return update(state, { lanes: { $set: updatedLanes } });
  },

  appendCardsToLane: (state, { laneId, newCards, index }) => {
    const lane = state.lanes.find((lane) => lane.id === laneId);

    newCards = newCards
      .map((card) => update(card, { laneId: { $set: laneId } }))
      .filter((card) => lane.cards.find((laneCard) => laneCard.id === card.id) === undefined);

    return state.lanes.map((lane) => {
      if (lane.id === laneId) {
        if (index !== undefined) {
          return update(lane, {
            cards: { $splice: [[index, 0, ...newCards]] }
          });
        } else {
          const cardsToUpdate = [...lane.cards, ...newCards];
          return update(lane, { cards: { $set: cardsToUpdate } });
        }
      } else {
        return lane;
      }
    });
  },

  appendCardToLane: (state, { laneId, card, index }) => {
    const newLanes = LaneHelper.appendCardsToLane(state, {
      laneId,
      newCards: [card],
      index
    });
    return update(state, { lanes: { $set: newLanes } });
  },

  addLane: (state, lane) => {
    const newLane = { cards: [], ...lane };
    return update(state, { lanes: { $push: [newLane] } });
  },

  updateLane: (state, updatedLane) => {
    const newLanes = state.lanes.map(
      (lane) => (updatedLane.id === lane.id ? { ...lane, ...updatedLane } : lane)
    );
    return update(state, { lanes: { $set: newLanes } });
  },

  removeCardFromLane: (state, { laneId, cardId }) => {
    const lanes = state.lanes.map((lane) => {
      if (lane.id === laneId) {
        const newCards = lane.cards.filter((card) => card.id !== cardId);
        return update(lane, { cards: { $set: newCards } });
      } else {
        return lane;
      }
    });
    return update(state, { lanes: { $set: lanes } });
  },

  moveCardAcrossLanes: (state, { fromLaneId, toLaneId, cardId, index }) => {
    let cardToMove = null;

    const interimLanes = state.lanes.map((lane) => {
      if (lane.id === fromLaneId) {
        cardToMove = lane.cards.find((card) => card.id === cardId);
        const newCards = lane.cards.filter((card) => card.id !== cardId);
        return update(lane, { cards: { $set: newCards } });
      } else {
        return lane;
      }
    });

    const updatedState = update(state, { lanes: { $set: interimLanes } });

    return LaneHelper.appendCardToLane(updatedState, {
      laneId: toLaneId,
      card: cardToMove,
      index
    });
  },

  updateCardsForLane: (state, { laneId, cards }) => {
    const lanes = state.lanes.map((lane) => {
      if (lane.id === laneId) {
        return update(lane, { cards: { $set: cards } });
      } else {
        return lane;
      }
    });

    return update(state, { lanes: { $set: lanes } });
  },

  updateCardForLane: (state, { laneId, card: updatedCard }) => {
    const lanes = state.lanes.map((lane) => {
      if (lane.id === laneId) {
        const cards = lane.cards.map(
          (card) => (card.id === updatedCard.id ? { ...card, ...updatedCard } : card)
        );
        return update(lane, { cards: { $set: cards } });
      } else {
        return lane;
      }
    });

    return update(state, { lanes: { $set: lanes } });
  },

  updateLanes: (state, lanes) => ({ ...state, ...{ lanes } }),

  moveLane: (state, { oldIndex, newIndex }) => {
    const laneToMove = state.lanes[oldIndex];
    const updatedState = update(state, { lanes: { $splice: [[oldIndex, 1]] } });
    return update(updatedState, {
      lanes: { $splice: [[newIndex, 0, laneToMove]] }
    });
  },

  removeLane: (state, { laneId }) => {
    const updatedLanes = state.lanes.filter((lane) => lane.id !== laneId);
    return update(state, { lanes: { $set: updatedLanes } });
  }
};

export default LaneHelper;
