import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SmoothDnD, { dropHandlers } from 'trello-smooth-dnd';

SmoothDnD.dropHandler = dropHandlers.reactDropHandler().handler;
SmoothDnD.wrapChild = (p) => p; // dont wrap children they will already be wrapped

class Container extends Component {
  constructor(props) {
    super(props);
    this.getContainerOptions = this.getContainerOptions.bind(this);
    this.setRef = this.setRef.bind(this);
  }

  componentDidMount() {
    if (this.containerDiv) {
      this.container = SmoothDnD(this.containerDiv, this.getContainerOptions());
    }
  }

  componentWillUnmount() {
    this.container?.dispose();
    this.container = null;
  }

  // componentDidUpdate() {
  //   if (this.containerDiv) {
  //     this.container?.dispose();
  //     this.container = SmoothDnD(this.containerDiv, this.getContainerOptions());
  //   }
  // }

  render() {
    if (this.props.render) {
      return this.props.render(this.setRef);
    } else {
      return (
        <div style={this.props.style} ref={this.setRef}>
          {this.props.children}
        </div>
      );
    }
  }

  setRef(element) {
    this.containerDiv = element;
  }

  getContainerOptions() {
    const functionProps = {};

    if (this.props.onDragStart) {
      functionProps.onDragStart = (...p) => this.props.onDragStart(...p);
    }

    if (this.props.onDragEnd) {
      functionProps.onDragEnd = (...p) => this.props.onDragEnd(...p);
    }

    if (this.props.onDrop) {
      functionProps.onDrop = (...p) => this.props.onDrop(...p);
    }

    if (this.props.getChildPayload) {
      functionProps.getChildPayload = (...p) => this.props.getChildPayload(...p);
    }

    if (this.props.shouldAnimateDrop) {
      functionProps.shouldAnimateDrop = (...p) => this.props.shouldAnimateDrop(...p);
    }

    if (this.props.shouldAcceptDrop) {
      functionProps.shouldAcceptDrop = (...p) => this.props.shouldAcceptDrop(...p);
    }

    if (this.props.onDragEnter) {
      functionProps.onDragEnter = (...p) => this.props.onDragEnter(...p);
    }

    if (this.props.onDragLeave) {
      functionProps.onDragLeave = (...p) => this.props.onDragLeave(...p);
    }

    if (this.props.render) {
      functionProps.render = (...p) => this.props.render(...p);
    }

    if (this.props.onDropReady) {
      functionProps.onDropReady = (...p) => this.props.onDropReady(...p);
    }

    if (this.props.getGhostParent) {
      functionProps.getGhostParent = (...p) => this.props.getGhostParent(...p);
    }

    return Object.assign({}, this.props, functionProps);
  }
}

Container.propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  behaviour: PropTypes.oneOf(['move', 'copy', 'drag-zone']),
  groupName: PropTypes.string,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  dragHandleSelector: PropTypes.string,
  className: PropTypes.string,
  nonDragAreaSelector: PropTypes.string,
  dragBeginDelay: PropTypes.number,
  animationDuration: PropTypes.number,
  autoScrollEnabled: PropTypes.string,
  lockAxis: PropTypes.string,
  dragClass: PropTypes.string,
  dropClass: PropTypes.string,
  /* eslint-enable react/no-unused-prop-types */
  style: PropTypes.object,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDrop: PropTypes.func,
  onDropReady: PropTypes.func,
  getChildPayload: PropTypes.func,
  shouldAnimateDrop: PropTypes.func,
  shouldAcceptDrop: PropTypes.func,
  onDragEnter: PropTypes.func,
  onDragLeave: PropTypes.func,
  render: PropTypes.func,
  getGhostParent: PropTypes.func,
  children: PropTypes.node,
};

export default Container;
