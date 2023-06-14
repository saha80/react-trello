const REPLACE_TABLE = {
  customLaneHeader: 'components.LaneHeader',
  newLaneTemplate: 'components.NewLaneSection',
  newCardTemplate: 'components.NewCardForm',
  children: 'components.Card',
  customCardLayout: 'components.Card',
  addLaneTitle: '`t` function with key "Add another lane"',
  addCardLink: '`t` function with key "Click to add card"'
};

const deprecationWarnings = (/** @type {Record<string, any>} */ props) =>
  Object.entries(REPLACE_TABLE).forEach(([prop, use]) => {
    if (Object.hasOwn(props, prop)) {
      console.warn(
        `react-trello property '${prop}' is removed. Use '${use}' instead. More - https://github.com/rcdexta/react-trello/blob/master/UPGRADE.md`
      );
    }
  });

export default deprecationWarnings;
