import React from 'react';
import PropTypes from 'prop-types';
import container, { dropHandlers } from 'trello-smooth-dnd';

container.dropHandler = dropHandlers.reactDropHandler().handler;
container.wrapChild = (child) => child; // dont wrap children they will already be wrapped

class Container extends React.Component {
  /** @type {HTMLDivElement | null} */ containerDiv = null;
  /** @type {HTMLDivElement | null} */ prevContainer = null;
  /** @type { { dispose: () => void } | null} */ container = null;

  componentDidMount() {
    this.prevContainer = this.containerDiv;
    if (this.containerDiv) {
      this.container = container(this.containerDiv, this.getContainerOptions());
    }
  }

  componentWillUnmount() {
    this.container?.dispose();
    this.container = null;
  }

  componentDidUpdate() {
    if (this.containerDiv && this.prevContainer && this.prevContainer !== this.containerDiv) {
      this.container?.dispose();
      this.container = container(this.containerDiv, this.getContainerOptions());
      this.prevContainer = this.containerDiv;
    }
  }

  setRef = (/** @type {HTMLDivElement | null} */ element) => {
    this.containerDiv = element;
  };

  render() {
    const { render, style, children } = this.props;

    return render ? (
      render(this.setRef)
    ) : (
      <div style={style} ref={this.setRef}>
        {children}
      </div>
    );
  }

  getContainerOptions = () => ({
    ...this.props,
    ...Object.fromEntries(
      Object.entries(this.props)
        .filter(
          ([key, value]) =>
            [
              'onDragStart',
              'onDragEnd',
              'onDrop',
              'getChildPayload',
              'shouldAnimateDrop',
              'shouldAcceptDrop',
              'onDragEnter',
              'onDragLeave',
              'render',
              'onDropReady',
              'getGhostParent'
            ].includes(key) && value
        )
        .map(([key, callable]) => [key, (...args) => callable(...args)])
    )
  });
}

Container.propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  behaviour: PropTypes.oneOf(['move', 'copy', 'drag-zone']),
  groupName: PropTypes.string,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  style: PropTypes.object,
  dragHandleSelector: PropTypes.string,
  className: PropTypes.string,
  nonDragAreaSelector: PropTypes.string,
  dragBeginDelay: PropTypes.number,
  animationDuration: PropTypes.number,
  autoScrollEnabled: PropTypes.string,
  lockAxis: PropTypes.string,
  dragClass: PropTypes.string,
  dropClass: PropTypes.string,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDrop: PropTypes.func,
  getChildPayload: PropTypes.func,
  shouldAnimateDrop: PropTypes.func,
  shouldAcceptDrop: PropTypes.func,
  onDragEnter: PropTypes.func,
  onDragLeave: PropTypes.func,
  onDropReady: PropTypes.func,
  getGhostParent: PropTypes.func,
  removeOnDropOut: PropTypes.bool,
  /* eslint-enable react/no-unused-prop-types */
  render: PropTypes.func,
  children: PropTypes.node
};

Container.defaultProps = {
  behaviour: 'move',
  orientation: 'vertical',
  className: 'reactTrelloBoard'
};

export default Container;
