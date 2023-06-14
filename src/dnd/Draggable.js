import React from 'react';
import PropTypes from 'prop-types';
import { constants } from 'trello-smooth-dnd';

const Draggable = (
  /** @type {{ render?: () => React.ReactNode | any; className?: string; children: React.ReactChild; [x: string]: any; }} */
  { render, className, children, ...props }
) =>
  render ? (
    React.cloneElement(render(), {
      className: constants.wrapperClass
    })
  ) : (
    <div {...props} className={[className, constants.wrapperClass].filter(Boolean).join(' ')}>
      {children}
    </div>
  );

Draggable.propTypes = {
  render: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node
};

export default Draggable;
