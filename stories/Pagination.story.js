import React from 'react';
import { storiesOf } from '@storybook/react';

import Board from '../src';

const PER_PAGE = 15;

function delayedPromise(durationInMs, resolutionPayload) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(resolutionPayload);
    }, durationInMs);
  });
}

function generateCards(requestedPage = 1) {
  const cards = [];
  const fetchedItems = (requestedPage - 1) * PER_PAGE;
  for (let i = fetchedItems + 1; i <= fetchedItems + PER_PAGE; i++) {
    cards.push({
      id: `${i}`,
      title: `Card${i}`,
      description: `Description for #${i}`
    });
  }
  return cards;
}

function paginate(requestedPage, laneId) {
  // simulate no more cards after page 2
  if (requestedPage > 2) {
    return delayedPromise(2000, []);
  }
  const newCards = generateCards(requestedPage);
  return delayedPromise(2000, newCards);
}

const data = {
  lanes: [
    {
      id: 'Lane1',
      title: 'Lane1',
      cards: generateCards()
    }
  ]
};

storiesOf('Basic Functions', module).add(
  'Infinite Scrolling',
  () => (
    <Board
      data={data}
      laneSortFunction={(card1, card2) => parseInt(card1.id) - parseInt(card2.id)}
      onLaneScroll={paginate}
    />
  ),
  {
    info: `
      Infinite scroll with onLaneScroll function callback to fetch more items
      
      The callback function passed to onLaneScroll will be of the following form
      ~~~js
      function paginate(requestedPage, laneId) {
        return fetchCardsFromBackend(laneId, requestedPage); 
      };
      ~~~
    `
  }
);
